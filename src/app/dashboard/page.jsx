// File: app/dashboard/page.js
'use client'

import { useEffect, useState } from 'react'
import CognitiveTrendChart from '@/components/CognitiveTrendChart'

export default function Dashboard() {
  const [history, setHistory] = useState([])
  const [latestAiReport, setLatestAiReport] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Load all saved session data on mount
  useEffect(() => {
    // 1. Fetch AI Report
    const savedReport = localStorage.getItem('latest_ai_report')
    if (savedReport) {
      try {
        setLatestAiReport(JSON.parse(savedReport))
      } catch (e) {
        console.error('Failed to parse AI report from localStorage', e)
      }
    }

    // 2. Fetch Historical Sessions
    const savedHistory = localStorage.getItem('psychograph_session_history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to parse history from localStorage', e)
      }
    }
  }, [])

  // Dynamic Aggregated Metrics
  const totalSessions = history.length
  const avgCognitiveIndex = totalSessions > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.cognitiveIndex || 0), 0) / totalSessions)
    : 0

  // Format dynamic chart data from stored history
  const chartData = history.map((session, idx) => ({
    date: session.dateLabel || `Session ${idx + 1}`,
    cognitiveScore: session.cognitiveIndex || 0,
    sleepHours: session.sleepHours || 7.0
  }))

  // Trigger a new AI analysis across all combined metrics
  const triggerFreshAnalysis = async () => {
    if (history.length === 0) return
    setIsAnalyzing(true)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_demo',
          totalSessions,
          avgCognitiveIndex,
          recentSessions: history.slice(-5) // Send last 5 sessions
        })
      })

      const result = await res.json()
      if (result.success) {
        setLatestAiReport(result.data)
        localStorage.setItem('latest_ai_report', JSON.stringify(result.data))
      }
    } catch (err) {
      console.error('Failed to re-analyze with Gemini:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">PsychoGraph Dashboard</h1>
          <p className="text-gray-400 text-sm">Real-time Dynamic Cognitive Tracking & AI Insights</p>
        </div>
        <button
          onClick={triggerFreshAnalysis}
          disabled={isAnalyzing || history.length === 0}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing with Gemini...' : 'Re-Run AI Analysis'}
        </button>
      </header>

      {/* DYNAMIC METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Current Predicted Mood</span>
          <div className="text-2xl font-bold text-sky-400 mt-1">
            {latestAiReport ? latestAiReport.predictedMood : 'No Data'}
          </div>
        </div>
      </div>

      {/* DYNAMIC HISTORICAL CHART */}
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
          No recent analysis available. Complete test activities to generate dynamic AI reports.
        </div>
      )}
    </div>
  )
}