'use client'

import { useState, useEffect } from 'react'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'
import { saveActivityResult } from '@/lib/activityResults'
import { authClient } from '@/lib/auth-client'

const COLORS = [
  { name: 'RED', hex: '#e74c3c', key: 'red' },
  { name: 'BLUE', hex: '#3498db', key: 'blue' },
  { name: 'GREEN', hex: '#2ecc71', key: 'green' },
  { name: 'YELLOW', hex: '#f1c40f', key: 'yellow' },
]

const TOTAL_ROUNDS = 10

function pickRandom() {
  const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)]
  let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  if (randomWord.key === randomColor.key) {
    const filtered = COLORS.filter((c) => c.key !== randomWord.key)
    randomColor = filtered[Math.floor(Math.random() * filtered.length)]
  }
  return { randomWord, randomColor }
}

export default function EmotionStroopTest() {
  const { data: session } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || 'guest_user'

  const [gameState, setGameState] = useState('start')
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState(0)
  const [responseTimes, setResponseTimes] = useState([])
  const [stimulusWord, setStimulusWord] = useState(COLORS[0])
  const [stimulusColor, setStimulusColor] = useState(COLORS[1])
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    if (gameState === 'results') {
      const currentPath = '/activities/stroopTest'
      markCompleted(currentPath)

      const avg =
        responseTimes.length > 0
          ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
          : 0

      const accuracy = Math.round((score / TOTAL_ROUNDS) * 100)

      // Save locally (preserving existing functionality)
      saveActivityResult(currentPath, { score, avgTime: avg, responseTimes })

      // Dispatch telemetry directly to Express backend using activeUserId
      fetch('http://localhost:5000/api/psychograph/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          gameName: 'stroopTest',
          metrics: {
            score,
            totalRounds: TOTAL_ROUNDS,
            accuracy,
            averageLatencyMs: avg,
            errors: TOTAL_ROUNDS - score,
            responseTimes,
            completedAt: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.error('Failed to dispatch Stroop metrics:', err))
    }
  }, [gameState, score, responseTimes, activeUserId])

  const startTest = () => {
    setGameState('playing')
    setCurrentRound(1)
    setScore(0)
    setResponseTimes([])
    const { randomWord, randomColor } = pickRandom()
    setStimulusWord(randomWord)
    setStimulusColor(randomColor)
    setStartTime(performance.now())
  }

  const handleAnswer = (selectedKey) => {
    // eslint-disable-next-line react-hooks/purity
    const reactionTime = performance.now() - startTime
    setResponseTimes((prev) => [...prev, reactionTime])

    if (selectedKey === stimulusColor.key) {
      setScore((prev) => prev + 1)
    }

    if (currentRound >= TOTAL_ROUNDS) {
      setGameState('results')
    } else {
      setCurrentRound((prev) => prev + 1)
      const { randomWord, randomColor } = pickRandom()
      setStimulusWord(randomWord)
      setStimulusColor(randomColor)
      // eslint-disable-next-line react-hooks/purity
      setStartTime(performance.now())
    }
  }

  const avgTime =
    responseTimes.length > 0
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
      : 0

  const progressPercentage = ((currentRound - 1) / TOTAL_ROUNDS) * 100

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-xl bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50 dark:border-gray-700/50 text-center">

        {gameState === 'playing' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Activity 2: Emotion Stroop Test</h2>
            <div className="w-full bg-gray-200/60 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Round: {currentRound} / {TOTAL_ROUNDS}</p>
          </div>
        )}

        {gameState === 'start' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Activity 2: Emotion Stroop Test</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed my-6">
              Match the <strong className="text-gray-700 dark:text-gray-200">COLOR of the ink</strong>, not the word itself!<br />
              Ignore what the text reads and click the correct color button as fast as you can.
            </p>
            <button
              onClick={startTest}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Start Test
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div
              className="text-5xl font-bold tracking-wider my-8 drop-shadow-lg select-none"
              style={{ color: stimulusColor.hex }}
            >
              {stimulusWord.name}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {COLORS.map((color) => (
                <button
                  key={color.key}
                  className="rounded-xl p-4 font-semibold text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleAnswer(color.key)}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'results' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Test Complete! 🎉</h3>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-5 text-left space-y-2 mb-6">
              <p className="text-gray-700 dark:text-gray-200"><strong>Total Score:</strong> {score} / {TOTAL_ROUNDS}</p>
              <p className="text-gray-700 dark:text-gray-200"><strong>Average Response Time:</strong> {avgTime} ms</p>
            </div>
            <button
              onClick={startTest}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Try Again
            </button>
            <div className="mt-4">
              <NextActivity currentPath="/activities/stroopTest" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}