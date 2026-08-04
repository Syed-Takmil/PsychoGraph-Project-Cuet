'use client'

import { useEffect, useState, useCallback } from 'react'
import CognitiveTrendChart from '@/components/CognitiveTrendChart'
import { getActivityResults } from '@/lib/activityResults'
import ACTIVITY_ORDER from '@/lib/activityOrder'
import { authClient } from '@/lib/auth-client'

const ALL_PATHS = ACTIVITY_ORDER.map(a => a.path)
const GUEST_FALLBACK_ID = 'guest_user'

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || GUEST_FALLBACK_ID

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

  // Helper function to GET the analysis from backend
  const fetchAnalysis = useCallback(async (userId) => {
    try {
      const getRes = await fetch(`http://localhost:5000/api/gemini/${userId}`)
      const getResult = await getRes.json()
      if (getResult.success && getResult.data) {
        setLatestAiReport(getResult.data)
        localStorage.setItem('latest_ai_report', JSON.stringify(getResult.data))
      }
    } catch (err) {
      console.error('Failed to GET Gemini analysis:', err)
    }
  }, [])

  // Trigger Gemini Analysis (POST) then Fetch Analysis (GET)
  const triggerAnalysis = useCallback(async (force = false) => {
    if (isPending) return
    setIsAnalyzing(true)

    try {
      // 1. Send POST request to generate/save Gemini analysis in DB
      const res = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          forceRefresh: force,
        })
      })

      const postResult = await res.json()

      // 2. Fetch the newly saved analysis via GET route
      if (postResult.success) {
        await fetchAnalysis(activeUserId)
      }
    } catch (err) {
      console.error('Failed to trigger Gemini analysis:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }, [activeUserId, fetchAnalysis, isPending])

  // Fetch Existing Saved Report via GET on Mount
  useEffect(() => {
    if (isPending) return

    async function loadSavedReport() {
      try {
        const res = await fetch(`http://localhost:5000/api/gemini/${activeUserId}`)
        const result = await res.json()
        if (result.success && result.data) {
          setLatestAiReport(result.data)
          localStorage.setItem('latest_ai_report', JSON.stringify(result.data))
        } else if (completedCount > 0 && !latestAiReport) {
          triggerAnalysis(false)
        }
      } catch (err) {
        console.error('Failed to fetch existing analysis on mount:', err)
        if (completedCount > 0 && !latestAiReport) {
          triggerAnalysis(false)
        }
      }
    }

    loadSavedReport()
  }, [activeUserId, isPending, completedCount, latestAiReport, triggerAnalysis])

  const totalSessions = history.length
  const avgCognitiveIndex = totalSessions > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.cognitiveIndex || 0), 0) / totalSessions)
    : 0

  const chartData = history.map((sessionItem, idx) => ({
    date: sessionItem.dateLabel || `Session ${idx + 1}`,
    cognitiveScore: sessionItem.cognitiveIndex || 0,
    sleepHours: sessionItem.sleepHours || 7.0
  }))

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">PsychoGraph Dashboard</h1>
          <p className="text-gray-400 text-sm">Real-time Dynamic Cognitive Tracking & AI Insights</p>
          {session?.user?.name && (
            <p className="text-xs text-purple-400 mt-1 font-medium">
              Subject: {session.user.name} ({activeUserId})
            </p>
          )}
        </div>
        <button
          onClick={() => triggerAnalysis(true)}
          disabled={isAnalyzing || isPending || completedCount === 0}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition disabled:opacity-50 cursor-pointer"
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
                  <div className="font-medium truncate">{activity?.label || path.replace('/activities/', '')}</div>
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
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Gemini 2.0 AI Psychograph Summary
            </span>
            {latestAiReport.radarScores?.cognitiveSpeed && (
              <span className="bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-700">
                Speed Score: {latestAiReport.radarScores.cognitiveSpeed}/100
              </span>
            )}
          </div>

          {latestAiReport.summary && (
            <p className="text-gray-200 text-sm leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
              {latestAiReport.summary}
            </p>
          )}

          {/* RADAR METRICS BREAKDOWN */}
          {latestAiReport.radarScores && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-700/40">
                <span className="text-xs text-gray-400 block">Cognitive Speed</span>
                <span className="text-lg font-bold text-indigo-400">{latestAiReport.radarScores.cognitiveSpeed}</span>
              </div>
              <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-700/40">
                <span className="text-xs text-gray-400 block">Attention Focus</span>
                <span className="text-lg font-bold text-indigo-400">{latestAiReport.radarScores.attentionFocus}</span>
              </div>
              <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-700/40">
                <span className="text-xs text-gray-400 block">Memory Span</span>
                <span className="text-lg font-bold text-indigo-400">{latestAiReport.radarScores.memorySpan}</span>
              </div>
              <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-700/40">
                <span className="text-xs text-gray-400 block">Emotional Resilience</span>
                <span className="text-lg font-bold text-indigo-400">{latestAiReport.radarScores.emotionalResilience}</span>
              </div>
              <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-700/40">
                <span className="text-xs text-gray-400 block">Sleep Hygiene</span>
                <span className="text-lg font-bold text-indigo-400">{latestAiReport.radarScores.sleepHygiene}</span>
              </div>
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {latestAiReport.recommendations && latestAiReport.recommendations.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Tailored Action Plan & Recommendations
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                {latestAiReport.recommendations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center text-gray-400 text-sm">
          {isAnalyzing
            ? 'Analyzing your activity telemetry with Google Gemini...'
            : completedCount > 0
              ? 'Click "Re-Run AI Analysis" to synthesize your completed test scores.'
              : `Complete activities to generate your Gemini-powered Psychograph assessment.`}
        </div>
      )}
    </div>
  )
}