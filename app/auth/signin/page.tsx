'use client';

import { signInAction } from '@/app/actions/auth';
import { createClient } from '@/src/lib/supabase-client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    setSystemTime(new Date().toISOString().slice(11, 19));
    const interval = setInterval(() => {
      setSystemTime(new Date().toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Fill in all credential fields.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const res = await signInAction(formData);
      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      } else if (res?.success) {
        window.location.href = '/fintech/dashboard';
      }
    } catch (err) {
      setError('Network handshake failed.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/api/auth/callback`,
        },
      });
      if (err) throw err;
    } catch (err: any) {
      setError(err.message || 'Google OAuth failed.');
      setIsGoogleLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#fafbfe] relative overflow-hidden flex items-center justify-center p-3 md:p-6 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      
      {/* Premium Dribbble-style blurred glowing background meshes */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-200/25 to-violet-200/25 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/25 to-blue-200/25 blur-[110px] pointer-events-none"></div>

      {/* Compact Main Container */}
      <div className="w-full max-w-[390px] relative z-10 space-y-4">
        
        {/* Top Logo & Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-800 tracking-wide font-mono">VELOX LEDGER LINK</span>
          </div>
          <p className="text-slate-400 text-[9px] font-bold font-mono uppercase tracking-widest">
            NODE IDENTITY INTEGRATION
          </p>
        </div>

        {/* Elevated Dribbble-Style Compact Card */}
        <div 
          style={{
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.02), 0 30px 50px -10px rgba(94, 92, 230, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
          className="rounded-2xl p-5 md:p-7 space-y-4"
        >
          
          {/* Card Header */}
          <div className="text-center space-y-1">
            <h2 
              style={{ color: '#0f172a' }} 
              className="text-2xl font-black tracking-tight"
            >
              Access your ledger
            </h2>
            <p 
              style={{ color: '#64748b' }} 
              className="text-[11px] leading-relaxed max-w-[280px] mx-auto"
            >
              Enter credentials or use Google OAuth to securely sync node logs.
            </p>
          </div>

          {error && (
            <div 
              style={{ border: '1px solid rgba(239, 68, 68, 0.1)', background: '#fef2f2' }}
              className="p-2.5 text-rose-600 rounded-lg text-[11px] font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              {error}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-3.5">
            
            {/* Center Email Input */}
            <div className="space-y-1 text-center">
              <label 
                style={{ color: '#94a3b8' }} 
                className="text-[9px] font-bold uppercase tracking-wider font-mono block text-center"
              >
                Enterprise Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@velox.com"
                style={{
                  textAlign: 'center',
                  color: '#0f172a',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0'
                }}
                className="block w-full px-3 py-2.5 rounded-xl placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-sans font-medium"
              />
            </div>

            {/* Center Password Input */}
            <div className="space-y-1 text-center">
              <label 
                style={{ color: '#94a3b8' }} 
                className="text-[9px] font-bold uppercase tracking-wider font-mono block text-center w-full"
              >
                System Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  textAlign: 'center',
                  color: '#0f172a',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0'
                }}
                className="block w-full px-3 py-2.5 rounded-xl placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              style={{
                height: '42px',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.1)',
                transition: 'all 0.15s ease-in-out'
              }}
              className="hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign in to Velox'
              )}
            </button>

          </form>

          {/* Centered Divider */}
          <div className="relative flex py-0.5 items-center font-mono">
            <div className="flex-grow border-t border-slate-200/80"></div>
            <span className="flex-shrink mx-3 text-[9px] text-slate-400 font-bold uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-slate-200/80"></div>
          </div>

          {/* Google Single Sign On */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
            style={{
              height: '42px',
              width: '100%',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              color: '#1e293b',
              fontWeight: '600',
              fontSize: '13px',
              border: '1.5px solid #e2e8f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.15s ease-in-out'
            }}
            className="hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Compact real-time status card */}
          <div className="bg-[#f8fafc] border border-slate-200/50 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-[8px] font-bold text-slate-500 font-mono tracking-wider">LEDGER TUNNEL</span>
              </div>
              <span className="text-[8px] font-bold text-slate-400 font-mono">{systemTime}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-white border border-slate-200/40 p-2 rounded-lg space-y-0.5">
                <span className="text-[7.5px] font-bold text-slate-400 block font-mono">ENCRYPTION</span>
                <span className="text-[10px] font-extrabold text-slate-700 flex items-center gap-0.5 font-mono">
                  <Lock className="w-3 h-3 text-indigo-500" /> AES_256
                </span>
              </div>
              <div className="bg-white border border-slate-200/40 p-2 rounded-lg space-y-0.5">
                <span className="text-[7.5px] font-bold text-slate-400 block font-mono">RLS SCHEMA</span>
                <span className="text-[10px] font-extrabold text-slate-700 flex items-center gap-0.5 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ENFORCED
                </span>
              </div>
            </div>
          </div>

          {/* Account Enrollment Link */}
          <div className="text-center pt-0.5">
            <Link 
              href="/auth/signup" 
              className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Request enrollment <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[10px] font-medium">
          <Shield className="w-3.5 h-3.5 text-slate-300" />
          <span>Secured by multi-party protocols</span>
        </div>

      </div>

    </div>
  );
}
