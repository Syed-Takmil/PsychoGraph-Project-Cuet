


'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'
import { saveActivityResult } from '@/lib/activityResults'

const TILE_COUNT = 9
const FLASH_DURATION = 400
const PAUSE_DURATION = 250
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => ({
  id: i,
  hue: 250 + Math.floor(i * 15),
}))



// Added 'export default' here:
export default function PatternMemoryGame() {
  const [gameState, setGameState] = useState('start')
  const [round, setRound] = useState(1)

  useEffect(() => {
    if (gameState === 'complete') {
      markCompleted('/patternMemory')
      saveActivityResult('/patternMemory', { roundsCompleted: round - 1 })
    }
  }, [gameState, round])

  const [activeTile, setActiveTile] = useState(null)
  const [highScore, setHighScore] = useState(0)
  const [message, setMessage] = useState('')

  const sequenceRef = useRef([])
  const inputIdxRef = useRef(0)
  const timerRef = useRef(null)

  const clearTimers = () => {
    if (timerRef.current) {
      timerRef.current.forEach(clearTimeout)
      timerRef.current = null
    }
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  const playSequence = useCallback((seq) => {
    setGameState('watching')
    setActiveTile(null)
    inputIdxRef.current = 0
    const timers = []
    let delay = 400

    seq.forEach((tileId) => {
      timers.push(setTimeout(() => {
        setActiveTile(tileId)
      }, delay))
      delay += FLASH_DURATION
      timers.push(setTimeout(() => {
        setActiveTile(null)
      }, delay))
      delay += PAUSE_DURATION
    })

    timers.push(setTimeout(() => {
      setActiveTile(null)
      setGameState('input')
      setMessage(`Round ${round} — repeat the pattern`)
    }, delay))

    timerRef.current = timers
  }, [round])

  const startRound = useCallback(() => {
    const next = Math.floor(Math.random() * TILE_COUNT)
    sequenceRef.current = [...sequenceRef.current, next]
    playSequence(sequenceRef.current)
  }, [playSequence])

  const handleStart = () => {
    setRound(1)
    setHighScore(0)
    sequenceRef.current = []
    inputIdxRef.current = 0
    setMessage('')
    startRound()
  }

  const handleTileClick = useCallback((tileId) => {
    if (gameState !== 'input') return

    const expected = sequenceRef.current[inputIdxRef.current]
    if (tileId !== expected) {
      clearTimers()
      const score = round - 1
      if (score > highScore) setHighScore(score)
      setActiveTile(null)
      setGameState('complete')
      return
    }

    inputIdxRef.current += 1

    if (inputIdxRef.current >= sequenceRef.current.length) {
      setActiveTile(null)
      setMessage('Correct!')
      setRound((prev) => prev + 1)
      setTimeout(() => startRound(), 800)
    }
  }, [gameState, round, highScore, startRound])

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-lg bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Activity 5: Pattern Memory</h2>

        {gameState === 'start' && (
          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Watch the tiles light up in sequence, then repeat the pattern from memory.
              Each round adds one more step.
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Game
            </button>
          </div>
        )}

        {(gameState === 'watching' || gameState === 'input') && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>Round <strong className="text-gray-800 dark:text-gray-100">{round}</strong></span>
              {highScore > 0 && <span>Best: <strong className="text-gray-800 dark:text-gray-100">{highScore}</strong></span>}
              {gameState === 'watching' && <span className="text-purple-600 dark:text-purple-400 font-medium">Watch...</span>}
            </div>

            {message && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{message}</p>
            )}

            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {TILES.map((tile) => {
                const isActive = activeTile === tile.id
                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    disabled={gameState === 'watching'}
                    className={`aspect-square rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'scale-105 shadow-xl ring-4 ring-purple-400 dark:ring-purple-500'
                        : 'shadow-md hover:scale-[1.02]'
                    } ${
                      gameState === 'watching' ? 'pointer-events-none' : ''
                    }`}
                    style={{
                      background: isActive
                        ? `radial-gradient(circle at 35% 35%, hsl(${tile.hue + 30}, 90%, 75%), hsl(${tile.hue}, 80%, 55%))`
                        : `linear-gradient(135deg, hsl(${tile.hue}, 60%, 65%), hsl(${tile.hue + 20}, 55%, 50%))`,
                      boxShadow: isActive
                        ? `0 0 20px hsl(${tile.hue}, 80%, 60%, 0.6), inset 0 -2px 4px rgba(0,0,0,0.1)`
                        : `0 4px 6px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.1)`,
                    }}
                  />
                )
              })}
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Game Over</p>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">Round {round}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You completed <strong className="text-gray-800 dark:text-gray-100">{round - 1}</strong> round{round - 1 !== 1 ? 's' : ''}
              {highScore > 0 && <span> &middot; Best: {highScore}</span>}
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Play Again
            </button>
            <div className="mt-4">
              <NextActivity currentPath="/patternMemory" />
            </div>
          </div>
        )}
      </div>
    </div>
  )}
  