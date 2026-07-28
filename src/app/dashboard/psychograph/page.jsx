'use client'

import { BarChart3, ShieldCheck, Brain, Zap, Target, Moon } from 'lucide-react'

export default function PsychographPage() {
  // Dimension scores (0 to 100)
  const metrics = [
    { label: 'Cognitive Speed', value: 82, icon: Zap },
    { label: 'Attention Focus', value: 75, icon: Target },
    { label: 'Memory Span', value: 88, icon: Brain },
    { label: 'Emotional Resilience', value: 70, icon: ShieldCheck },
    { label: 'Sleep Hygiene', value: 80, icon: Moon },
  ]

  // Pure SVG Radar polygon math calculations
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* SVG RADAR / SPIDER CHART */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background Web Rings */}
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

            {/* Axis Lines */}
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

            {/* Filled User Data Polygon */}
            <polygon
              points={polygonPoints}
              className="fill-purple-500/30 stroke-purple-600 dark:stroke-purple-400"
              strokeWidth="2.5"
            />

            {/* Data Point Dots */}
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(i, m.value)
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-pink-500 stroke-white dark:stroke-gray-900"
                  strokeWidth="2"
                />
              )
            })}
          </svg>
        </div>

        {/* METRICS BREAKDOWN LIST */}
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
                    <p className="text-xs text-gray-500">Based on recent tests</p>
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