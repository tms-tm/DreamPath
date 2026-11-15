'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Loader2,
  GraduationCap,
  BriefcaseBusiness,
} from 'lucide-react';
import { playSound } from '@/utils/sound';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_PERSONAS } from '@/data/demoPersonas';

function SignInPageContent() {
  const router = useRouter();
  const { signIn, signInAsPersona } = useAuth();
  const [isPersonaLoading, setIsPersonaLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSelect = (personaId: string) => {
    if (isLoading || isPersonaLoading) return;
    setIsPersonaLoading(true);
    playSound('click');
    setError('');
    try {
      const selected = signInAsPersona(personaId);
      if (!selected) {
        setError('That demo profile is unavailable. Please refresh and try again.');
        setIsPersonaLoading(false);
        return;
      }
      router.replace('/home');
    } catch (err) {
      console.error('Demo persona selection error:', err);
      setError('Could not open this demo profile. Please try again.');
      setIsPersonaLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        setError(result.error || 'Sign in failed. Please try again.');
        return;
      }

      router.replace('/onboarding/education');
      router.refresh();
    } catch (err) {
      console.error('Signin error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-[#0B0C15] dark:via-[#10122A] dark:to-[#1A0B2E] transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" onClick={() => playSound('click')} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              DreamPath
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-base text-slate-600 dark:text-[#94A3B8]">Sign in to continue your career exploration journey</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-[#2E3254] dark:bg-[#16172B] sm:p-8">
          <section aria-labelledby="persona-heading" className="mb-7">
            <div className="mb-4">
              <h2 id="persona-heading" className="text-lg font-bold text-slate-900 dark:text-white">Sign in as Persona</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try the app with a ready-made demo profile. No account is created.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DEMO_PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handlePersonaSelect(persona.id)}
                  disabled={isLoading || isPersonaLoading}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2E3254] dark:bg-[#101221] dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10"
                  aria-label={`Continue as ${persona.name}`}
                >
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">{persona.name.charAt(0)}</span>
                    {persona.name}
                  </span>
                  <span className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />{persona.education}</span>
                  <span className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300"><BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" /><span>{persona.exploringCareers ? 'Exploring Careers' : persona.careerInterests.join(' · ')}</span></span>
                </button>
              ))}
            </div>
          </section>

          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-[#2E3254]" />Or use your account<span className="h-px flex-1 bg-slate-200 dark:bg-[#2E3254]" /></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-[#94A3B8]" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onFocus={() => playSound('click')}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-base text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-[#2E3254] dark:bg-[#0B0C15] dark:text-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 dark:text-[#94A3B8]" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onFocus={() => playSound('click')}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-12 text-base text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-[#2E3254] dark:bg-[#0B0C15] dark:text-white"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => { playSound('click'); setShowPassword(!showPassword); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /><span>Signing in...</span></> : <><span>Sign in</span><ArrowRight className="h-5 w-5" /></>}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200/50 pt-6 dark:border-[#2E3254]/50">
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Demo personas are local preview profiles. Email and password sign-in uses your account.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-[#94A3B8]">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-semibold text-indigo-500 hover:underline" onClick={() => playSound('click')}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignInPageContent />
    </Suspense>
  );
}
