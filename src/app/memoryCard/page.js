'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import RequireAuth from '@/components/RequireAuth'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'

const EMOJI_POOL = [
  '🐶','🐱','🐼','🦊','🐸','🐨','🐯','🦁','🐰','🐮',
  '🍎','🍕','🍦','🍩','🍇','🍉','🍓','🍔','🌮','🍣',
  '🌈','🌻','🍄','🌊','🔥','🌺','🍁','⭐','🌙','☀️',
  '⚽','🎮','🎸','📚','🎨','🚀','🎯','💎','🎲','🎭',
]

const LEVELS = [
  { totalCards: 8,  pairs: 4,  cols: 'grid-cols-4' },
  { totalCards: 12, pairs: 6,  cols: 'grid-cols-3 md:grid-cols-4' },
  { totalCards: 16, pairs: 8,  cols: 'grid-cols-4' },
  { totalCards: 24, pairs: 12, cols: 'grid-cols-4 md:grid-cols-6' },
]

const TOTAL_PAIRS_ALL = LEVELS.reduce((s, l) => s + l.pairs, 0)

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
    { id: i * 2 + 1, emoji, pairId: i },
  ])
  return shuffle(paired)
}

const NOTO = { fontFamily: "'Noto Color Emoji', sans-serif" }

function MemoryCardGame() {
  const [gameState, setGameState] = useState('start')
  const [currentLevel, setCurrentLevel] = useState(0)

  useEffect(() => {
    if (gameState === 'complete') markCompleted('/memoryCard')
  }, [gameState])
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [levelResults, setLevelResults] = useState([])
  const [lastCompleted, setLastCompleted] = useState(null)

  const timerRef = useRef(null)
  const globalStartRef = useRef(null)
  const levelStartRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }, [])

  const startTimer = useCallback(() => {
    globalStartRef.current = Date.now()
    levelStartRef.current = Date.now()
    setElapsed(0)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - globalStartRef.current) / 1000))
    }, 1000)
  }, [])

  const goToLevelIntro = useCallback(() => {
    setGameState('levelIntro')
  }, [])

  const handleStart = useCallback(() => {
    setCurrentLevel(0)
    setLevelResults([])
    setLastCompleted(null)
    setElapsed(0)
    stopTimer()
    goToLevelIntro()
  }, [goToLevelIntro, stopTimer])

  const handleBeginLevel = useCallback(() => {
    setCards(buildCards(currentLevel))
    setFlipped([])
    setMatched(new Set())
    setMistakes(0)
    setIsChecking(false)
    setGameState('playing')
    levelStartRef.current = Date.now()
    if (!timerRef.current) startTimer()
  }, [currentLevel, startTimer])

  const finishGame = useCallback((results) => {
    stopTimer()
    setLevelResults(results)
    setGameState('complete')
  }, [stopTimer])

  const handleGiveUp = useCallback(() => {
    finishGame(levelResults)
  }, [levelResults, finishGame])

  const handleCardClick = useCallback((cardId) => {
    if (isChecking || gameState !== 'playing') return
    if (matched.has(cardId)) return
    if (flipped.includes(cardId)) return
    if (flipped.length === 2) return

    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [first, second] = newFlipped
      const cardA = cards.find((c) => c.id === first)
      const cardB = cards.find((c) => c.id === second)

      if (cardA.pairId === cardB.pairId) {
        const newMatched = new Set(matched)
        newMatched.add(first)
        newMatched.add(second)
        setMatched(newMatched)
        setFlipped([])
        setIsChecking(false)

        if (newMatched.size === cards.length) {
          const levelTime = Math.floor((Date.now() - levelStartRef.current) / 1000)
          const result = { level: currentLevel + 1, time: levelTime, mistakes }
          setLastCompleted(result)
          const updated = [...levelResults, result]

          if (currentLevel + 1 >= LEVELS.length) {
            finishGame(updated)
          } else {
            setLevelResults(updated)
            setTimeout(() => {
              setCurrentLevel((prev) => prev + 1)
              goToLevelIntro()
            }, 1500)
          }
        }
      } else {
        setMistakes((prev) => prev + 1)
        setTimeout(() => {
          setFlipped([])
          setIsChecking(false)
        }, 700)
      }
    }
  }, [gameState, isChecking, flipped, matched, cards, currentLevel, mistakes, levelResults, finishGame, goToLevelIntro])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const level = LEVELS[currentLevel]
  const levelNum = currentLevel + 1
  const matchedCount = matched.size / 2

  const totalMistakes = levelResults.reduce((s, r) => s + r.mistakes, 0)
  const completedPairs = levelResults.reduce((s, r) => s + LEVELS[r.level - 1].pairs, 0)
  const totalAttempts = completedPairs + totalMistakes
  const accuracy = totalAttempts > 0 ? Math.round((completedPairs / totalAttempts) * 100) : 0
  const totalTime = levelResults.reduce((s, r) => s + r.time, 0)

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-3xl">

        {gameState === 'start' && (
          <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
              Memory Card Game
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Flip cards and match all pairs across four levels of increasing difficulty.
            </p>
            <button
              onClick={handleStart}
              className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'levelIntro' && (
          <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
            {lastCompleted && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Level {lastCompleted.level} &middot; {formatTime(lastCompleted.time)} &middot; {lastCompleted.mistakes} mistake{lastCompleted.mistakes !== 1 ? 's' : ''}
              </p>
            )}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Level {levelNum}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {level.totalCards} cards &middot; {level.pairs} pairs
            </p>
            <button
              onClick={handleBeginLevel}
              className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Begin
            </button>
          </div>
        )}

        {(gameState === 'playing') && (
          <>
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Level <strong className="text-gray-800 dark:text-gray-100">{levelNum}</strong></span>
                <span>Matched: <strong className="text-gray-800 dark:text-gray-100">{matchedCount}/{level.pairs}</strong></span>
                <span>Mistakes: <strong className="text-gray-800 dark:text-gray-100">{mistakes}</strong></span>
              </div>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg border border-purple-200 dark:border-purple-800">
                {formatTime(elapsed)}
              </span>
            </div>

            <div className={`grid gap-3 md:gap-4 ${level.cols}`}>
              {cards.map((card) => {
                const isFlipped = flipped.includes(card.id) || matched.has(card.id)
                const isMatched = matched.has(card.id)
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={isMatched || isChecking}
                    className="aspect-square rounded-2xl transition-all duration-300 focus:outline-none"
                    style={{ perspective: '600px' }}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-400"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 shadow-lg border border-white/30 flex items-center justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <span className="text-2xl opacity-40">?</span>
                      </div>
                      <div
                        className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-lg border transition-colors ${
                          isMatched
                            ? 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700'
                            : 'bg-white/80 dark:bg-gray-800/80 border-purple-200 dark:border-purple-800'
                        }`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <span className="text-2xl md:text-3xl" style={NOTO}>{card.emoji}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleGiveUp}
                className="px-6 py-2 text-sm text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 rounded-xl transition-colors"
              >
                Give Up
              </button>
            </div>
          </>
        )}

        {gameState === 'complete' && (
          <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Game Over</h2>

            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-purple-100/50 dark:bg-purple-900/30 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{formatTime(totalTime)}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Total Time</p>
              </div>
              <div className="bg-purple-100/50 dark:bg-purple-900/30 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{accuracy}%</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Accuracy</p>
              </div>
              <div className="bg-purple-100/50 dark:bg-purple-900/30 rounded-xl px-6 py-4">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalMistakes}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Mistakes</p>
              </div>
            </div>

            {levelResults.length > 0 && (
              <div className="space-y-2 max-w-sm mx-auto mb-8">
                {levelResults.map((r, i) => (
                  <div key={i} className="flex justify-between items-center bg-purple-100/50 dark:bg-purple-900/30 rounded-xl px-5 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Level {r.level}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatTime(r.time)} &middot; {r.mistakes} mistake{r.mistakes !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {levelResults.length < LEVELS.length && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                Completed {levelResults.length} of {LEVELS.length} levels
              </p>
            )}

            <button
              onClick={handleStart}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Play Again
            </button>
            <div className="mt-4">
              <NextActivity currentPath="/memoryCard" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function MemoryCardPage() {
  return <RequireAuth><MemoryCardGame /></RequireAuth>
}
