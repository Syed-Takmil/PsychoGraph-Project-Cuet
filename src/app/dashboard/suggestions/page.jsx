'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { 
  Sparkles, 
  Lightbulb, 
  Target, 
  Zap, 
  Brain, 
  Calendar, 
  ShieldAlert, 
  Loader2, 
  CheckCircle2, 
  RefreshCw,
  Activity,
  Droplet,
  Moon,
  Smile,
  Flame
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const GUEST_FALLBACK_ID = 'guest_user'

const subscribe = () => () => {}
const getDateSnapshot = () => new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
const getServerSnapshot = () => ''

export default function SuggestionsPage() {
  const { data: session, isPending } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || GUEST_FALLBACK_ID

  const reportRef = useRef(null)
  const currentDate = useSyncExternalStore(subscribe, getDateSnapshot, getServerSnapshot)

  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch saved report or generate synthesis
  const fetchSuggestions = async (userId, force = false) => {
    try {
      setLoading(true)
      setError(null)

      if (!force) {
        const getRes = await fetch(`http://localhost:5000/api/gemini/${userId}`).catch(() => null)
        if (getRes && getRes.ok) {
          const getResult = await getRes.json()
          if (getResult.success && getResult.data) {
            setAiAnalysis(getResult.data)
            setLoading(false)
            return
          }
        }
      }

      const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          forceRefresh: force,
        }),
      }).catch(() => null)

      if (!response) {
        throw new Error('Could not connect to backend server at http://localhost:5000.')
      }

      const result = await response.json()

      if (result.success && result.data) {
        setAiAnalysis(result.data)
      } else {
        setError(result.error || 'Failed to generate AI recommendations.')
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err)
      setError(err.message || 'Could not connect to backend server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isPending) return
    fetchSuggestions(activeUserId, false)
  }, [activeUserId, isPending])

  const handleReRun = () => {
    if (isPending || loading) return
    fetchSuggestions(activeUserId, true)
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400 shrink-0" />
            AI Cognitive Recommendations
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Personalized, actionable guidance synthesized by Gemini based on your recent activity telemetry.
          </p>
          {session?.user?.name && (
            <p className="text-xs text-purple-500 mt-1 font-medium">
              Subject: {session.user.name} ({activeUserId})
            </p>
          )}
        </div>

        <button
          onClick={handleReRun}
          disabled={loading || isPending}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Synthesizing...' : 'Refresh Suggestions'}
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div 
        ref={reportRef}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-xl space-y-8"
      >
        {/* Sub Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 text-white rounded-2xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Optimization Plan</h2>
              <p className="text-xs text-gray-500">Google Gemini Telemetry Guidance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 block mt-1">
              Status: Action Items Ready
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {(loading || isPending) && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isPending ? 'Authenticating session...' : 'Synthesizing tailored recommendations with Google Gemini...'}
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && !isPending && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* AI SUGGESTIONS BODY */}
        {!loading && !isPending && aiAnalysis && (
          <div className="space-y-8">
            
            {/* AI Summary Banner */}
            <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-500/20 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Strategic Cognitive Overview
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>

            {/* Top Actionable Suggestions (Dynamically Generated from DB Data) */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" /> Immediate AI Focus Areas
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {aiAnalysis.recommendations?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 rounded-2xl flex items-start gap-3 shadow-sm hover:border-purple-300 transition-all"
                  >
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-xl shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                        Priority Recommendation #{idx + 1}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths to Leverage */}
            {aiAnalysis.strengths && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" /> Strengths to Leverage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiAnalysis.strengths.map((strength, idx) => (
                    <div 
                      key={idx}
                      className="p-5 bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-500/20 rounded-2xl space-y-1"
                    >
                      <h4 className="font-bold text-xs text-green-800 dark:text-green-300 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-green-600" /> Confirmed Advantage
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                        {strength}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specific Daily Wellness Routine */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800/40 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-pink-500" /> Non-Negotiable Daily Routine
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 dark:text-gray-300">
                <div className="p-3.5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300">
                    <Droplet className="w-4 h-4 text-blue-500" /> Hydration Protocol
                  </div>
                  <p className="leading-relaxed">
                    Drink a full glass (300–500 mL) of water immediately after waking up to rehydrate your brain and kickstart attention focus.
                  </p>
                </div>

                <div className="p-3.5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300">
                    <Smile className="w-4 h-4 text-amber-500" /> Morning Prayer & Breathwork
                  </div>
                  <p className="leading-relaxed">
                    Spend 5–10 minutes after waking for deep breathing exercises and prayer to clear mental clutter before looking at screens.
                  </p>
                </div>

                <div className="p-3.5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-pink-900 dark:text-pink-300">
                    <Activity className="w-4 h-4 text-green-500" /> Daily Yoga & Movement
                  </div>
                  <p className="leading-relaxed">
                    Perform 10–15 minutes of light yoga or stretching to improve cerebral blood flow, release physical tension, and reduce stress levels.
                  </p>
                </div>

                <div className="p-3.5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-indigo-100 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300">
                    <Moon className="w-4 h-4 text-indigo-400" /> Strict Sleep Consistency
                  </div>
                  <p className="leading-relaxed">
                    Maintain an identical sleep and wake schedule every day to anchor your circadian rhythm and optimize memory consolidation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 text-xs text-gray-400 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <p>
            <strong>Disclaimer:</strong> Suggestions generated by Google Gemini are intended for educational self-improvement and wellness optimization. They do not constitute clinical advice or medical treatment plans.
          </p>
        </div>

      </div>
    </div>
  )
}