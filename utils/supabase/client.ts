// @ts-ignore - Legacy Supabase utils, using Drizzle ORM
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // @ts-ignore
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
