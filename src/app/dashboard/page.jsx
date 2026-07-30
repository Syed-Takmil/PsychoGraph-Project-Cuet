'use client'

import { useEffect, useState, useCallback } from 'react'
import CognitiveTrendChart from '@/components/CognitiveTrendChart'
import { getActivityResults } from '@/lib/activityResults'
import ACTIVITY_ORDER from '@/lib/activityOrder'

const ALL_PATHS = ACTIVITY_ORDER.map(a => a.path)

export default function Dashboard() {
  const [history] = useState(() => {
    try {
      const saved = localStorage.getItem('psychograph_session_history')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [latestAiReport, setLatestAiReport] = useState(() => {
    try {
      const saved = localStorage.getItem('latest_ai_report')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activityResults] = useState(() => getActivityResults())

  const completedCount = ALL_PATHS.filter(p => activityResults[p]).length

  const triggerAnalysis = useCallback(async (results) => {
    if (!results) results = getActivityResults()
    const comp = ALL_PATHS.filter(p => results[p]).length
    if (comp === 0) return
    setIsAnalyzing(true)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityResults: results,
          totalActivities: comp,
          userId: 'usr_demo',
        })
      })

      const result = await res.json()
      if (result.success) {
        setLatestAiReport(result.data)
        localStorage.setItem('latest_ai_report', JSON.stringify(result.data))
      }
    } catch (err) {
      console.error('Failed to analyze with Gemini:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  useEffect(() => {
    if (completedCount === ALL_PATHS.length && !latestAiReport) {
      setTimeout(() => triggerAnalysis(activityResults), 0)
    }
  }, [])

  const totalSessions = history.length
  const avgCognitiveIndex = totalSessions > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.cognitiveIndex || 0), 0) / totalSessions)
    : 0

  const chartData = history.map((session, idx) => ({
    date: session.dateLabel || `Session ${idx + 1}`,
    cognitiveScore: session.cognitiveIndex || 0,
    sleepHours: session.sleepHours || 7.0
  }))

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">PsychoGraph Dashboard</h1>
          <p className="text-gray-400 text-sm">Real-time Dynamic Cognitive Tracking & AI Insights</p>
        </div>
        <button
          onClick={() => triggerAnalysis()}
          disabled={isAnalyzing || completedCount === 0}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing with Gemini...' : 'Re-Run AI Analysis'}
        </button>
      </header>

      {/* ACTIVITY PROGRESS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Activities Completed</span>
          <div className="text-2xl font-bold text-white mt-1">{completedCount} / {ALL_PATHS.length}</div>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Total Sessions</span>
          <div className="text-2xl font-bold text-white mt-1">{totalSessions}</div>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Avg Cognitive Index</span>
          <div className="text-2xl font-bold text-indigo-400 mt-1">
            {totalSessions > 0 ? `${avgCognitiveIndex} / 100` : '--'}
          </div>
        </div>
      </div>

      {/* ACTIVITY RESULTS CARD */}
      {completedCount > 0 && (
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Activity Results</h3>
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
                    {hasResult ? '✓ Completed' : 'Pending'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* COGNITIVE TREND CHART */}
      <CognitiveTrendChart data={chartData.length > 0 ? chartData : undefined} />

      {/* GEMINI AI INSIGHTS CARD */}
      {latestAiReport ? (
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Gemini AI Report
            </span>
            <span className="bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-700">
              Cognitive Index: {latestAiReport.cognitiveIndex}
            </span>
          </div>

          <div className="text-xl font-bold text-gray-100">
            Current State: <span className="text-indigo-400">{latestAiReport.predictedMood}</span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
            {latestAiReport.summary}
          </p>

          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Tailored Suggestions
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
              {latestAiReport.suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center text-gray-400 text-sm">
          {isAnalyzing
            ? 'Analyzing your activity results with Gemini...'
            : completedCount === ALL_PATHS.length
              ? 'Analysis complete! Loading results...'
              : `Complete all ${ALL_PATHS.length} activities to generate your AI-powered assessment.`}
        </div>
      )}
    </div>
  )
}
