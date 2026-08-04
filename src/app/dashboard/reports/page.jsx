'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { FileText, Download, CheckCircle, Brain, Calendar, ShieldAlert, Loader2, Sparkles, RefreshCw } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const GUEST_FALLBACK_ID = 'guest_user'

const subscribe = () => () => {}
const getDateSnapshot = () => new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
const getServerSnapshot = () => ''

export default function ReportsPage() {
  const { data: session, isPending } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || GUEST_FALLBACK_ID

  const reportRef = useRef(null)
  const currentDate = useSyncExternalStore(subscribe, getDateSnapshot, getServerSnapshot)

  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch existing saved report (GET) or generate via POST
  const fetchGeminiReport = async (userId, force = false) => {
    try {
      setLoading(true)
      setError(null)

      // First check if a saved report exists via GET (unless forced)
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

      // Generate fresh analysis via POST
      const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          forceRefresh: force,
        }),
      }).catch(() => null)

      if (!response) {
        throw new Error('Could not connect to analysis backend server at http://localhost:5000.')
      }

      const result = await response.json()

      if (result.success && result.data) {
        setAiAnalysis(result.data)
      } else {
        setError(result.error || 'Failed to retrieve Gemini AI analysis.')
      }
    } catch (err) {
      console.error('Error fetching Gemini report:', err)
      setError(err.message || 'Could not connect to analysis backend server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isPending) return
    fetchGeminiReport(activeUserId, false)
  }, [activeUserId, isPending])

  const handleReRunAnalysis = () => {
    if (isPending || loading) return
    fetchGeminiReport(activeUserId, true)
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Psychograph Diagnostic Summary
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Export a comprehensive summary of your recent cognitive tests and lifestyle baselines powered by Gemini.
          </p>
          {session?.user?.name && (
            <p className="text-xs text-purple-500 mt-1 font-medium">
              Subject: {session.user.name} ({activeUserId})
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handleReRunAnalysis}
            disabled={loading || isPending}
            className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Synthesizing...' : 'Re-Run AI Analysis'}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={loading || isPending || !aiAnalysis}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download className="w-5 h-5" />
            Download / Print PDF
          </button>
        </div>
      </div>

      {/* PRINTABLE REPORT CONTAINER */}
      <div 
        ref={reportRef}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-xl space-y-8 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black"
      >
        {/* Report Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6 print:border-gray-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 text-white rounded-2xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">PsychoGraph Report</h2>
              <p className="text-xs text-gray-500 print:text-gray-600">
                Subject: {session?.user?.name || 'Guest User'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 print:text-gray-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 print:text-purple-700 block mt-1">
              Status: AI Synthesized
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {(loading || isPending) && (
          <div className="py-12 text-center space-y-3 print:py-4">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isPending ? 'Authenticating session...' : 'Synthesizing activity telemetry logs with Google Gemini...'}
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && !isPending && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* AI REPORT BODY */}
        {!loading && !isPending && aiAnalysis && (
          <>
            {/* Executive Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 print:text-purple-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Executive Summary
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed print:text-black">
                {aiAnalysis.summary}
              </p>
            </div>

            {/* Radar Metrics Table */}
            {aiAnalysis.radarScores && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-700">
                  Psychograph Normalized Axes (0-100)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 print:border-gray-300">
                        <th className="py-2.5 font-semibold">Cognitive Axis</th>
                        <th className="py-2.5 font-semibold">Target Domain</th>
                        <th className="py-2.5 font-semibold text-right">Normalized Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 print:divide-gray-200">
                      <tr>
                        <td className="py-3 font-medium">Cognitive Speed</td>
                        <td className="py-3 text-gray-500 print:text-gray-700">Latency & Reaction Times</td>
                        <td className="py-3 text-right font-bold text-purple-600">{aiAnalysis.radarScores.cognitiveSpeed}/100</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Attention Focus</td>
                        <td className="py-3 text-gray-500 print:text-gray-700">Accuracy & Impulse Inhibition</td>
                        <td className="py-3 text-right font-bold text-purple-600">{aiAnalysis.radarScores.attentionFocus}/100</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Memory Span</td>
                        <td className="py-3 text-gray-500 print:text-gray-700">Pattern Sequence & Card Recall</td>
                        <td className="py-3 text-right font-bold text-purple-600">{aiAnalysis.radarScores.memorySpan}/100</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Emotional Resilience</td>
                        <td className="py-3 text-gray-500 print:text-gray-700">Color Interference & Visual Choice</td>
                        <td className="py-3 text-right font-bold text-purple-600">{aiAnalysis.radarScores.emotionalResilience}/100</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Sleep Hygiene</td>
                        <td className="py-3 text-gray-500 print:text-gray-700">Lifestyle & Baseline Sleep Hours</td>
                        <td className="py-3 text-right font-bold text-purple-600">{aiAnalysis.radarScores.sleepHygiene}/100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Strengths & AI Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
              {aiAnalysis.strengths && (
                <div className="p-5 bg-green-50 dark:bg-green-950/20 rounded-2xl border border-green-100 dark:border-green-500/20 space-y-2 print:bg-gray-50 print:border-gray-200">
                  <h4 className="font-bold text-sm text-green-900 dark:text-green-300 print:text-black flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" /> Key Strengths
                  </h4>
                  <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5 print:text-black">
                    {aiAnalysis.strengths.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis.recommendations && (
                <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-500/20 space-y-2 print:bg-gray-50 print:border-gray-200">
                  <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 print:text-black flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" /> Actionable Recommendations
                  </h4>
                  <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5 print:text-black">
                    {aiAnalysis.recommendations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {/* Academic Disclaimer Footer */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 text-xs text-gray-400 print:text-gray-500 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <p>
            <strong>Disclaimer:</strong> This generated report is an educational university project prototype powered by Google Gemini, designed strictly for cognitive self-assessment and mental health awareness. It is not a formal medical diagnosis.
          </p>
        </div>

      </div>
    </div>
  )
}