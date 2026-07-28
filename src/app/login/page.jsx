'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Hexagon, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'
import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: '/',
      })

      if (error) {
        setErrorMsg(error.message || 'Invalid email or password.')
      } else {
        router.push('/')
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setErrorMsg('')
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      })
    } catch (err) {
      setErrorMsg('Google sign-in failed. Please try again.')
      setGoogleLoading(false)
    }
  }

  const inputClass = 'w-full pl-12 pr-4 py-3.5 rounded-2xl border border-purple-500/20 bg-gray-50/80 dark:bg-gray-950/80 text-gray-900 dark:text-gray-100 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-inner text-sm'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 dark:text-white relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Animated Glows Matching Signature Theme */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-600/10 dark:bg-pink-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse delay-1000" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl p-[2px] overflow-hidden shadow-2xl"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #a855f7, #ec4899, #3b82f6, #a855f7)',
            animation: 'spin-border 5s linear infinite',
          }}
        >
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-white/10 shadow-2xl space-y-6 transition-colors duration-300">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-flex items-center justify-center gap-2 group mb-2">
                <Hexagon className="w-8 h-8 text-purple-600 dark:text-purple-500 group-hover:rotate-90 transition-transform duration-500" />
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3 h-3" />
                Welcome Back
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Log in to Psychograph</h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Enter your credentials to access your cognitive dashboard.</p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.17 21.36 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.64 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
              <span className="px-3 text-xs text-gray-500 uppercase tracking-widest font-semibold">Or with email</span>
              <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500"><Mail className="w-4 h-4" /></span>
                <input
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500"><Lock className="w-4 h-4" /></span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 px-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 dark:border-purple-500/30 bg-gray-50 dark:bg-gray-950 text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-semibold text-sm rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Sign Up redirect */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}