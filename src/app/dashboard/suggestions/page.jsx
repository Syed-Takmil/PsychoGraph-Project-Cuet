'use client'

import { useState, useEffect } from 'react'
import { BrainCircuit, RefreshCw, Activity, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react'
import { getActivityResults } from '@/lib/activityResults'
import ACTIVITY_ORDER from '@/lib/activityOrder'

const ALL_PATHS = ACTIVITY_ORDER.map(a => a.path)

export default function SuggestionsPage() {
  const [report, setReport] = useState(null)
  const [activityResults, setActivityResults] = useState({})
  const [completedCount, setCompletedCount] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('latest_ai_report')
    if (saved) {
      try { setReport(JSON.parse(saved)) } catch {}
    }
    const results = getActivityResults()
    setActivityResults(results)
    setCompletedCount(ALL_PATHS.filter(p => results[p]).length)
  }, [])

  const triggerAnalysis = async () => {
    const results = getActivityResults()
    const comp = ALL_PATHS.filter(p => results[p]).length
    if (comp === 0) return
    setIsAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityResults: results, totalActivities: comp, userId: 'usr_demo' })
      })
      const result = await res.json()
      if (result.success) {
        setReport(result.data)
        localStorage.setItem('latest_ai_report', JSON.stringify(result.data))
      }
    } catch (err) {
      console.error('Failed to analyze:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">AI Suggestions</h1>
          <p className="text-gray-400 text-sm">Personalized insights from your activity results</p>
        </div>
        <button
          onClick={triggerAnalysis}
          disabled={isAnalyzing || completedCount === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analyzing...' : 'Re-run Analysis'}
        </button>
      </header>

      <div className="flex items-center gap-3 bg-gray-800/60 p-4 rounded-2xl border border-gray-700/50">
        <Activity className="w-5 h-5 text-indigo-400 shrink-0" />
        <div className="text-sm text-gray-300">
          Activities completed: <strong className="text-white">{completedCount}</strong> / {ALL_PATHS.length}
        </div>
      </div>

      {!report && !isAnalyzing && (
        <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700 text-center">
          <BrainCircuit className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-300 mb-2">No Analysis Available</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {completedCount === ALL_PATHS.length
              ? 'Click "Re-run Analysis" to generate your AI-powered suggestions.'
              : `Complete all ${ALL_PATHS.length} activities to receive personalized AI insights.`}
          </p>
        </div>
      )}

      {isAnalyzing && (
        <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700 text-center">
          <RefreshCw className="w-10 h-10 text-indigo-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-400 text-sm">Analyzing your activity data with Gemini AI...</p>
        </div>
      )}

      {report && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider mb-3">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Current State
              </div>
              <div className="text-2xl font-bold text-indigo-300">{report.predictedMood}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider mb-3">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                Cognitive Index
              </div>
              <div className="text-2xl font-bold text-emerald-400">{report.cognitiveIndex} / 100</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Summary
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
              {report.summary}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 px-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Tailored Suggestions ({report.suggestions.length})
            </h3>
            {report.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-5 rounded-2xl border border-gray-700 flex items-start gap-4 hover:border-indigo-700/50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                  idx === 0
                    ? 'bg-purple-900/40 text-purple-300'
                    : idx === 1
                      ? 'bg-blue-900/40 text-blue-300'
                      : 'bg-emerald-900/40 text-emerald-300'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className="text-gray-200 text-sm leading-relaxed">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>

          {completedCount > 0 && (
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Activity Data Used for Analysis
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {ALL_PATHS.map((path) => {
                  const hasResult = !!activityResults[path]
                  const activity = ACTIVITY_ORDER.find(a => a.path === path)
                  return (
                    <div
                      key={path}
                      className={`p-3 rounded-xl text-center text-sm border ${
                        hasResult
                          ? 'bg-indigo-900/30 border-indigo-700/50 text-indigo-300'
                          : 'bg-gray-900/30 border-gray-700/30 text-gray-500'
                      }`}
                    >
                      <div className="font-medium truncate">{activity?.label || path.replace('/', '')}</div>
                      <div className={`text-xs mt-1 ${hasResult ? 'text-green-400' : 'text-gray-600'}`}>
                        {hasResult ? '✓ Included' : 'Pending'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
