'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Game Configuration
const EMOJI_POOL = ['🐶', '🐱', '🐼', '🦊', '🐸', '🐨', '🍎', '🍕', '🚀', '🎯', '💎', '🎲']

const LEVELS = [
  { pairs: 4, cols: 'grid-cols-4' },
  { pairs: 6, cols: 'grid-cols-3 md:grid-cols-4' },
  { pairs: 8, cols: 'grid-cols-4' }
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(levelIndex) {
  const level = LEVELS[levelIndex]
  const picked = shuffle(EMOJI_POOL).slice(0, level.pairs)
  const paired = picked.flatMap((emoji, i) => [
    { id: i * 2, emoji, pairId: i },
    { id: i * 2 + 1, emoji, pairId: i }
  ])
  return shuffle(paired)
}

export default function MemoryGame() {
  const [gameState, setGameState] = useState('start') // 'start' | 'playing' | 'complete'
  const [currentLevel, setCurrentLevel] = useState(0)
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [report, setReport] = useState(null)

  // Telemetry & Tracking
  const telemetry = useRef({
    startTime: 0,
    clicks: [],
    mistakes: 0,
    matches: 0
  })

  // Start Level & Tracking
  const startLevel = useCallback((lvlIndex) => {
    setCurrentLevel(lvlIndex)
    setCards(buildCards(lvlIndex))
    setFlipped([])
    setMatched(new Set())
    
    // Reset Telemetry for this session
    telemetry.current = {
      startTime: Date.now(),
      clicks: [],
      mistakes: 0,
      matches: 0
    }
    
    setGameState('playing')
  }, [])

  // Analyze Telemetry & Predict Mood
  const generateReportAndMood = (data) => {
    const totalTimeSec = Math.round((Date.now() - data.startTime) / 1000)
    const latencies = data.clicks.map(c => c.latencyMs).filter(t => t > 0)
    const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0
    
    // Rapid mistakes (< 600ms latency)
    const rapidMistakes = data.clicks.filter(c => !c.isMatch && c.latencyMs > 0 && c.latencyMs < 600).length
    const accuracy = Math.round((data.matches / (data.matches + data.mistakes || 1)) * 100)

    // Rule-Based Mood Prediction
    let moodPrediction = { mood: 'Neutral', indicator: 'Steady standard gameplay.' }
    let suggestions = []

    if (rapidMistakes >= 2 || (accuracy < 50 && avgLatency < 800)) {
      moodPrediction = {
        mood: 'Frustrated / Rushing',
        indicator: 'Fast consecutive clicks after errors detected.'
      }
      suggestions = [
        'Take a quick 10-second breather before starting the next round.',
        'Focus on memorizing positions before clicking rather than guessing quickly.'
      ]
    } else if (accuracy >= 75 && avgLatency >= 600 && avgLatency <= 1600) {
      moodPrediction = {
        mood: 'Focused & Calm',
        indicator: 'Strong accuracy paired with steady, confident pacing.'
      }
      suggestions = [
        'Great focus! You are in peak memory state right now.',
        'Ready to tackle higher card grids.'
      ]
    } else if (avgLatency > 2000 || totalTimeSec > 60) {
      moodPrediction = {
        mood: 'Fatigued / Distracted',
        indicator: 'Long hesitations noticed between card flips.'
      }
      suggestions = [
        'Hydrate or step away for a quick break to recharge your focus.',
        'Try a shorter grid layout to rebuild momentum.'
      ]
    } else {
      suggestions = ['Keep practicing to sharpen your recall speed!']
    }

    return {
      timeSec: totalTimeSec,
      accuracy,
      mistakes: data.mistakes,
      avgSpeed: avgLatency,
      mood: moodPrediction,
      suggestions
    }
  }

  // Handle Card Clicks & Telemetry Extraction
  const handleCardClick = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.has(cardId)) return

    const now = Date.now()
    const lastClick = telemetry.current.clicks[telemetry.current.clicks.length - 1]
    const latency = lastClick ? now - lastClick.timestamp : 0

    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const cardA = cards.find(c => c.id === first)
      const cardB = cards.find(c => c.id === second)
      const isMatch = cardA.pairId === cardB.pairId

      // Log Click Telemetry
      telemetry.current.clicks.push({ timestamp: now, latencyMs: latency, isMatch })

      if (isMatch) {
        telemetry.current.matches += 1
        const newMatched = new Set(matched).add(first).add(second)
        setMatched(newMatched)
        setFlipped([])

        // Check level completion
        if (newMatched.size === cards.length) {
          setTimeout(() => {
            if (currentLevel + 1 < LEVELS.length) {
              startLevel(currentLevel + 1)
            } else {
              // Game Complete -> Analyze Data
              const finalReport = generateReportAndMood(telemetry.current)
              setReport(finalReport)
              setGameState('complete')
            }
          }, 800)
        }
      } else {
        telemetry.current.mistakes += 1
        setTimeout(() => setFlipped([]), 800)
      }
    } else {
      // First card flip of a pair
      telemetry.current.clicks.push({ timestamp: now, latencyMs: latency, isMatch: false })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-xl bg-gray-800/80 rounded-2xl p-6 border border-gray-700 shadow-xl text-center">
        
        {/* START SCREEN */}
        {gameState === 'start' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Memory & Cognitive Tracker</h1>
            <p className="text-gray-400 text-sm mb-6">
              Match pairs while our engine analyzes your speed and accuracy to generate a cognitive report.
            </p>
            <button
              onClick={() => startLevel(0)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition"
            >
              Start Playing
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && (
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Level {currentLevel + 1} of {LEVELS.length}</span>
              <span>Mistakes: {telemetry.current.mistakes}</span>
            </div>

            <div className={`grid ${LEVELS[currentLevel].cols} gap-3 my-4`}>
              {cards.map((card) => {
                const isFlipped = flipped.includes(card.id) || matched.has(card.id)
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
                      isFlipped ? 'bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    {isFlipped ? card.emoji : '❓'}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* REPORT & MOOD SUMMARY SCREEN */}
        {gameState === 'complete' && report && (
          <div className="text-left space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-400 mb-2">Cognitive & Mood Report</h2>

            {/* Mood Card */}
            <div className="p-4 bg-indigo-950/60 border border-indigo-700/50 rounded-xl">
              <span className="text-xs text-indigo-300 uppercase tracking-widest block mb-1">Predicted Mood</span>
              <div className="text-xl font-bold text-indigo-200">{report.mood.mood}</div>
              <p className="text-xs text-indigo-300/80 mt-1">{report.mood.indicator}</p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="text-gray-400 text-xs">Accuracy</div>
                <div className="font-bold text-base mt-1">{report.accuracy}%</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="text-gray-400 text-xs">Total Time</div>
                <div className="font-bold text-base mt-1">{report.timeSec}s</div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="text-gray-400 text-xs">Avg Move Speed</div>
                <div className="font-bold text-base mt-1">{report.avgSpeed}ms</div>
              </div>
            </div>

            {/* Actionable Suggestions */}
            <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-700">
              <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Suggestions for Player</span>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {report.suggestions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => startLevel(0)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold mt-4 transition"
            >
              Play Again
            </button>
          </div>
        )}

      </div>
    </div>
  )
}