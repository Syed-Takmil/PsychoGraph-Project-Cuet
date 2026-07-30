'use client'

import { useState, useRef, useEffect } from 'react'
import RequireAuth from '@/components/RequireAuth'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'
import { saveActivityResult } from '@/lib/activityResults'

const TOTAL_ATTEMPTS = 5

function randomDelay() {
  return Math.floor(Math.random() * 3000) + 2500
}

export default function AdvancedReactionTest() {
  const [gameState, setGameState] = useState('start')
  const [currentAttempt, setCurrentAttempt] = useState(1)
  const [startTime, setStartTime] = useState(null)
  const [reactionTimes, setReactionTimes] = useState([])
  const [falseStarts, setFalseStarts] = useState(0)
  const [lastTime, setLastTime] = useState(null)

  useEffect(() => {
    if (gameState === 'complete') {
      markCompleted('/reactionTest')
      const a = reactionTimes.length > 0
        ? Math.round(reactionTimes.reduce((s, v) => s + v, 0) / reactionTimes.length)
        : 0
      const f = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0
      const v = reactionTimes.length > 1
        ? reactionTimes.reduce((sum, val) => sum + Math.pow(val - a, 2), 0) / reactionTimes.length
        : 0
      saveActivityResult('/reactionTest', { avgTime: a, fastestTime: f, consistencyScore: Math.round(Math.sqrt(v)), falseStarts, reactionTimes })
    }
  }, [gameState, falseStarts, reactionTimes])

  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const startAttempt = () => {
    setGameState('waiting')
    const delay = randomDelay()

    timeoutRef.current = setTimeout(() => {
      setGameState('ready')
      setStartTime(performance.now())
    }, delay)
  }

  const handleBoxInteraction = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current)
      setFalseStarts((prev) => prev + 1)
      setGameState('early')
    } else if (gameState === 'ready') {
      const endTime = performance.now()
      const duration = Math.round(endTime - startTime)

      setLastTime(duration)
      const updatedTimes = [...reactionTimes, duration]
      setReactionTimes(updatedTimes)

      if (currentAttempt >= TOTAL_ATTEMPTS) {
        setGameState('complete')
      } else {
        setGameState('result')
      }
    }
  }

  const proceedToNext = () => {
    setCurrentAttempt((prev) => prev + 1)
    startAttempt()
  }

  const avgTime =
    reactionTimes.length > 0
      ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 0

  const fastestTime = reactionTimes.length > 0 ? Math.min(...reactionTimes) : 0

  const variance =
    reactionTimes.length > 1
      ? reactionTimes.reduce((sum, val) => sum + Math.pow(val - avgTime, 2), 0) / reactionTimes.length
      : 0
  const consistencyScore = Math.round(Math.sqrt(variance))

  const getBoxStyle = () => {
    switch (gameState) {
      case 'waiting':
        return { backgroundColor: '#1b263b', borderColor: '#415a77', cursor: 'pointer' }
      case 'ready':
        return { backgroundColor: '#2ecc71', borderColor: '#27ae60', cursor: 'pointer', transform: 'scale(1.02)' }
      case 'early':
        return { backgroundColor: '#e74c3c', borderColor: '#c0392b', cursor: 'default' }
      default:
        return { backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', cursor: 'default' }
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-xl bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50 dark:border-gray-700/50 text-center">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Activity 3: Reaction Time Test</h2>
          {gameState !== 'start' && gameState !== 'complete' && (
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3 px-1">
              <span>Attempt: <strong className="text-gray-700 dark:text-gray-200">{currentAttempt} / {TOTAL_ATTEMPTS}</strong></span>
              <span>
                False Starts:{' '}
                <strong style={{ color: falseStarts > 0 ? '#e74c3c' : '#22c55e' }}>{falseStarts}</strong>
              </span>
            </div>
          )}
        </div>

        {gameState === 'start' && (
          <div>
            <p className="bg-purple-100/50 dark:bg-purple-900/30 rounded-xl p-4 text-left text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              This test measures your psychomotor speed and attentional impulsivity.
              <br /><br />
              Wait for the box to turn <strong className="text-gray-800 dark:text-gray-100">GREEN</strong>, then click immediately. Do not click while it is dark blue.
            </p>
            <button
              onClick={startAttempt}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
            >
              Begin Test Sequence
            </button>
          </div>
        )}

        {(gameState === 'waiting' || gameState === 'ready' || gameState === 'early' || gameState === 'result') && (
          <div
            className="h-56 rounded-xl flex flex-col justify-center items-center my-5 select-none relative overflow-hidden transition-all duration-150"
            style={getBoxStyle()}
            onClick={handleBoxInteraction}
          >
            {gameState === 'waiting' && (
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: '#38bdf8', boxShadow: '0 0 10px #38bdf8' }}
                />
                <h3 className="text-white text-lg font-semibold">Awaiting Stimulus...</h3>
                <p className="text-xs mt-1.5 text-gray-400">Stay focused. Do not anticipate.</p>
              </div>
            )}

            {gameState === 'ready' && (
              <h3 className="text-2xl tracking-wide text-white drop-shadow-lg font-bold">
                CLICK NOW! ⚡
              </h3>
            )}

            {gameState === 'early' && (
              <div>
                <h3 className="text-white text-lg font-bold">Impulse Detected! ⚠️</h3>
                <p className="text-xs mt-1.5 text-gray-400">Clicked before the stimulus appeared.</p>
                <button
                  onClick={(e) => { e.stopPropagation(); startAttempt() }}
                  className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  Resume Attempt
                </button>
              </div>
            )}

            {gameState === 'result' && (
              <div>
                <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">{lastTime} ms</h3>
                <p className="text-xs mt-1.5 text-gray-500 dark:text-gray-400">Recorded successfully</p>
                <button
                  onClick={(e) => { e.stopPropagation(); proceedToNext() }}
                  className="mt-4 px-4 py-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 rounded-lg text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors"
                >
                  {currentAttempt === TOTAL_ATTEMPTS ? 'View Final Report' : 'Next Trial ➔'}
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'complete' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Psychometric Evaluation Complete 📊</h3>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-5 text-left space-y-3 mb-6 border border-purple-200/50 dark:border-purple-800/50">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Mean Response Time:</span>
                <strong className="text-gray-800 dark:text-gray-100">{avgTime} ms</strong>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Peak Speed (Fastest):</span>
                <strong className="text-gray-800 dark:text-gray-100">{fastestTime} ms</strong>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Cognitive Consistency (SD):</span>
                <strong className="text-gray-800 dark:text-gray-100">± {consistencyScore} ms</strong>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Impulsive Errors:</span>
                <strong style={{ color: falseStarts > 0 ? '#e74c3c' : 'inherit' }}>{falseStarts}</strong>
              </div>
            </div>
            <button
              onClick={() => {
                setCurrentAttempt(1)
                setReactionTimes([])
                setFalseStarts(0)
                startAttempt()
              }}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
            >
              Retest Activity
            </button>
            <div className="mt-4">
              <NextActivity currentPath="/reactionTest" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

