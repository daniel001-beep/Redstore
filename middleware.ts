import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Strip quotes and whitespace that could be introduced during build/parsing
  const supabaseUrl = rawUrl?.replace(/['"]/g, "").trim();
  const supabaseAnonKey = rawKey?.replace(/['"]/g, "").trim();

  let isValidUrl = false;
  if (supabaseUrl && (supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://"))) {
    try {
      new URL(supabaseUrl);
      isValidUrl = !supabaseUrl.includes("YOUR_SUPABASE_URL") && !supabaseUrl.includes("placeholder");
    } catch {
      isValidUrl = false;
    }
  }

  if (!isValidUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: DO NOT remove or modify supabase.auth.getUser() call.
  // This refreshes the session token and fetches the user object.
  let user: any = null;
  const localUserCookie = request.cookies.get('velox-local-user');
  if (localUserCookie?.value) {
    try {
      let val = localUserCookie.value.trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      let decoded = decodeURIComponent(val);
      if (decoded.includes('%')) {
        decoded = decodeURIComponent(decoded);
      }
      user = JSON.parse(decoded);
    } catch (e) {
      try {
        let val = localUserCookie.value.trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        user = JSON.parse(val);
      } catch (innerErr) {
        console.error('Failed to parse local user cookie', innerErr);
      }
    }
  }

  if (!user) {
    const authRes = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
    user = authRes?.data?.user || null;
  }

  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isFintechRoute = request.nextUrl.pathname.startsWith('/fintech');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/fintech/admin');

  // 1. If not logged in and requesting a protected route, redirect to sign-in
  if (!user && (isFintechRoute || isAdminRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';
    // Clean up query params to prevent infinite redirect loops
    url.search = '';
    return NextResponse.redirect(url);
  }

  // 2. If logged in and requesting an auth route, redirect to dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/fintech/dashboard';
    return NextResponse.redirect(url);
  }

  // 3. Strict Admin RBAC
  if (isAdminRoute) {
    const normalizedEmail = user?.email ? user.email.toLowerCase().trim() : "";
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase().trim();
    if (!adminEmail || normalizedEmail !== adminEmail) {
      const url = request.nextUrl.clone();
      url.pathname = '/fintech/dashboard';
      url.searchParams.set('error', 'unauthorized_admin');
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, and logo assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
