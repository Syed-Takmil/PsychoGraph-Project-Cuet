'use client'

import { useState, useEffect } from 'react'
import { BarChart3, ShieldCheck, Brain, Zap, Target, Moon, Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const GUEST_FALLBACK_ID = 'guest_user'

export default function PsychographPage() {
  const { data: session, isPending } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || GUEST_FALLBACK_ID

  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isPending) return

    async function fetchResults() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`http://localhost:5000/api/psychograph/results/${activeUserId}`)
        const result = await res.json()

        if (result.success && result.data) {
          setTestResults(result.data)
        } else {
          setError(result.message || 'No assessment data recorded yet.')
        }
      } catch (err) {
        console.error('Network error fetching assessment results:', err)
        setError('Could not connect to backend server.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [activeUserId, isPending])

  if (loading || isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <p className="text-sm font-medium text-gray-500">
          {isPending ? 'Authenticating session...' : 'Loading your psychograph radar...'}
        </p>
      </div>
    )
  }

  const scores = testResults || {}

  // 1. Cognitive Speed Calculation
  const calculateCognitiveSpeed = () => {
    const latencies = []
    if (scores.stroopTest?.averageLatencyMs) latencies.push(scores.stroopTest.averageLatencyMs)
    if (scores.memoryCard?.averageLatencyMs) latencies.push(scores.memoryCard.averageLatencyMs)
    if (scores.reactionTest?.averageLatencyMs) latencies.push(scores.reactionTest.averageLatencyMs)

    if (latencies.length === 0) return 75
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length
    return Math.min(100, Math.max(20, Math.round(110 - avgLatency / 12)))
  }

  // 2. Attention Focus Calculation
  const calculateAttentionFocus = () => {
    const accuracies = []
    if (scores.stroopTest?.accuracy !== undefined) accuracies.push(scores.stroopTest.accuracy)
    if (scores.clickAccuracy?.overallAccuracy !== undefined) accuracies.push(scores.clickAccuracy.overallAccuracy)
    if (scores.memoryCard?.accuracy !== undefined) accuracies.push(scores.memoryCard.accuracy)

    if (accuracies.length === 0) return 80
    return Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length)
  }

  // 3. Memory Span Calculation
  const calculateMemorySpan = () => {
    const values = []
    if (scores.patternMemory?.maxSequenceLength) {
      values.push(Math.min(100, scores.patternMemory.maxSequenceLength * 12))
    }
    if (scores.memoryCard?.accuracy !== undefined) {
      values.push(scores.memoryCard.accuracy)
    }

    if (values.length === 0) return 85
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }

  // 4. Emotional Resilience Calculation
  const calculateEmotionalResilience = () => {
    if (scores.moodQuestionnaire?.stressLevel !== undefined) {
      return Math.round((6 - scores.moodQuestionnaire.stressLevel) * 20)
    }
    return 70
  }

  // 5. Sleep & Hydration Hygiene Calculation (READING FROM dailyLogs & moodQuestionnaire)
  const calculateSleepHygiene = () => {
    const factors = []

    // Check Sleep Hours from Daily Logs (ideal 7-9 hrs = 100)
    if (scores.dailyLogs?.sleepHours !== undefined) {
      const hours = scores.dailyLogs.sleepHours
      const sleepScore = Math.min(100, Math.max(10, Math.round((hours / 8) * 100)))
      factors.push(sleepScore)
    }

    // Check Hydration Intake from Daily Logs (ideal 2.5 - 3.0L = 100)
    if (scores.dailyLogs?.waterIntake !== undefined) {
      const water = scores.dailyLogs.waterIntake
      const waterScore = Math.min(100, Math.max(10, Math.round((water / 2.5) * 100)))
      factors.push(waterScore)
    }

    // Fallback/Supplement with Mood Questionnaire Energy Level
    if (scores.moodQuestionnaire?.energyLevel !== undefined) {
      factors.push(scores.moodQuestionnaire.energyLevel * 20)
    }

    if (factors.length === 0) return 80
    return Math.round(factors.reduce((a, b) => a + b, 0) / factors.length)
  }

  const metrics = [
    { label: 'Cognitive Speed', value: calculateCognitiveSpeed(), icon: Zap },
    { label: 'Attention Focus', value: calculateAttentionFocus(), icon: Target },
    { label: 'Memory Span', value: calculateMemorySpan(), icon: Brain },
    { label: 'Emotional Resilience', value: calculateEmotionalResilience(), icon: ShieldCheck },
    { label: 'Sleep Hygiene', value: calculateSleepHygiene(), icon: Moon },
  ]

  // Pure SVG Radar polygon math
  const size = 300
  const center = size / 2
  const radius = 100
  const totalAxes = metrics.length

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  const polygonPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.value)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          My Psychograph Radar
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Multi-dimensional mental mapping aggregating your Stroop, Reaction, Memory, and Lifestyle logs.
        </p>
        {session?.user?.name && (
          <p className="text-xs text-purple-500 mt-1 font-medium">
            Subject: {session.user.name} ({activeUserId})
          </p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-600 dark:text-amber-400 text-sm">
          Notice: {error} Displaying baseline metrics.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* SVG RADAR CHART */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative">
          <svg width={size} height={size} className="overflow-visible">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
              <polygon
                key={idx}
                points={metrics
                  .map((_, i) => {
                    const { x, y } = getCoordinates(i, level * 100)
                    return `${x},${y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-800"
                strokeWidth="1"
              />
            ))}

            {metrics.map((_, i) => {
              const { x, y } = getCoordinates(i, 100)
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800"
                  strokeWidth="1"
                />
              )
            })}

            <polygon
              points={polygonPoints}
              className="fill-purple-500/30 stroke-purple-600 dark:stroke-purple-400 transition-all duration-500"
              strokeWidth="2.5"
            />

            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(i, m.value)
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-pink-500 stroke-white dark:stroke-gray-900 transition-all duration-500"
                  strokeWidth="2"
                />
              )
            })}
          </svg>
        </div>

        {/* BREAKDOWN LIST */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Dimension Breakdown</h2>
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div key={m.label} className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{m.label}</p>
                    <p className="text-xs text-gray-500">Based on authenticated telemetry</p>
                  </div>
                </div>
                <span className="text-lg font-extrabold text-purple-600 dark:text-purple-400">
                  {m.value}/100
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}