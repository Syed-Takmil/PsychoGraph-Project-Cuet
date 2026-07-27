'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import RequireAuth from '@/components/RequireAuth'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'

const LEVELS = [
  { label: 'Easy', targetCount: 4, duration: 25, speed: { min: 0.4, max: 1.2 }, dangerAt: 0, shrinkAt: 18 },
  { label: 'Medium', targetCount: 5, duration: 25, speed: { min: 0.6, max: 2.0 }, dangerAt: 0, shrinkAt: 16 },
  { label: 'Hard', targetCount: 6, duration: 25, speed: { min: 1.0, max: 3.0 }, dangerAt: 0, shrinkAt: 14 },
]
const BASE_RADIUS = 28
const BAD_RADIUS = 32

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

function createTarget(id, areaW, areaH, radius, speed) {
  const r = radius || BASE_RADIUS
  return {
    id, x: randomRange(r, areaW - r), y: randomRange(r, areaH - r),
    vx: randomRange(speed.min, speed.max) * (Math.random() < 0.5 ? 1 : -1),
    vy: randomRange(speed.min, speed.max) * (Math.random() < 0.5 ? 1 : -1),
    radius: r, hue: Math.floor(randomRange(250, 330)),
  }
}

function createDanger(id, areaW, areaH) {
  const r = BAD_RADIUS
  return {
    id, x: randomRange(r, areaW - r), y: randomRange(r, areaH - r),
    vx: randomRange(0.3, 0.8) * (Math.random() < 0.5 ? 1 : -1),
    vy: randomRange(0.3, 0.8) * (Math.random() < 0.5 ? 1 : -1),
    radius: r,
  }
}

function ClickAccuracyGame() {
  const [gameState, setGameState] = useState('start')
  const [currentLevel, setCurrentLevel] = useState(0)
  const [targets, setTargets] = useState([])
  const [dangerBalls, setDangerBalls] = useState([])
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [penalties, setPenalties] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [levelResults, setLevelResults] = useState([])
  const [lastCompleted, setLastCompleted] = useState(null)
  const [areaSize, setAreaSize] = useState({ w: 500, h: 500 })

  useEffect(() => {
    if (gameState === 'complete') markCompleted('/clickAccuracy')
  }, [gameState])
  const areaRef = useRef(null)
  const targetsRef = useRef([])
  const dangerRef = useRef([])
  const animRef = useRef(null)
  const timerRef = useRef(null)
  const hitsRef = useRef(0)
  const missesRef = useRef(0)
  const penaltiesRef = useRef(0)
  const nextTargetId = useRef(0)
  const nextDangerId = useRef(0)
  const elapsedRef = useRef(0)
  const timeLeftRef = useRef(0)

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current)
      clearInterval(timerRef.current)
    }
  }, [])

  const stopAll = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null
    cancelAnimationFrame(animRef.current)
    animRef.current = null
  }, [])

  const finishGame = useCallback((results) => {
    stopAll()
    setLevelResults(results)
    setGameState('complete')
  }, [stopAll])

  const goToLevelIntro = useCallback(() => {
    setGameState('levelIntro')
  }, [])

  const handleStart = useCallback(() => {
    setCurrentLevel(0)
    setLevelResults([])
    setLastCompleted(null)
    stopAll()
    goToLevelIntro()
  }, [goToLevelIntro, stopAll])

  const handleGiveUp = useCallback(() => {
    finishGame(levelResults)
  }, [levelResults, finishGame])

  const handleBeginLevel = useCallback(() => {
    const level = LEVELS[currentLevel]
    const rect = areaRef.current?.getBoundingClientRect()
    const w = rect?.width || 500
    const h = rect?.height || 500
    setAreaSize({ w, h })

    const initial = Array.from(
      { length: level.targetCount },
      (_, i) => createTarget(i, w, h, BASE_RADIUS, level.speed)
    )
    setTargets(initial)
    targetsRef.current = initial
    setDangerBalls([])
    dangerRef.current = []
    setHits(0)
    setMisses(0)
    setPenalties(0)
    setTimeLeft(level.duration)
    timeLeftRef.current = level.duration
    hitsRef.current = 0
    missesRef.current = 0
    penaltiesRef.current = 0
    nextTargetId.current = level.targetCount
    nextDangerId.current = 0
    elapsedRef.current = 0
    setGameState('playing')

    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1
      timeLeftRef.current -= 1
      setTimeLeft(timeLeftRef.current)

      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current)
        timerRef.current = null
        cancelAnimationFrame(animRef.current)
        animRef.current = null

        const result = { level: currentLevel + 1, label: level.label, hits: hitsRef.current, misses: missesRef.current, penalties: penaltiesRef.current }
        const updated = [...levelResults, result]
        setLastCompleted(result)

        if (currentLevel + 1 >= LEVELS.length) {
          setLevelResults(updated)
          setGameState('complete')
        } else {
          setLevelResults(updated)
          setCurrentLevel((prev) => prev + 1)
          goToLevelIntro()
        }
      }
    }, 1000)

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 16.667, 3)
      last = now
      const e = elapsedRef.current
      const cfg = LEVELS[currentLevel]

      let scale = 1
      if (e > cfg.shrinkAt) {
        const p = (e - cfg.shrinkAt) / (cfg.duration - cfg.shrinkAt)
        scale = 1 - p * 0.7
      }
      const cr = BASE_RADIUS * scale

      targetsRef.current = targetsRef.current.map((t) => {
        let { x, y, vx, vy, hue, id } = t
        x += vx * dt
        y += vy * dt
        if (x - cr < 0) { x = cr; vx = -vx }
        if (x + cr > w) { x = w - cr; vx = -vx }
        if (y - cr < 0) { y = cr; vy = -vy }
        if (y + cr > h) { y = h - cr; vy = -vy }
        return { id, x, y, vx, vy, radius: cr, hue }
      })
      setTargets([...targetsRef.current])

      let danger = dangerRef.current
      if (e >= cfg.dangerAt && danger.length === 0) {
        danger = [createDanger(nextDangerId.current++, w, h)]
      }
      if (e >= cfg.dangerAt + 10 && danger.length === 1) {
        danger = [...danger, createDanger(nextDangerId.current++, w, h)]
      }

      danger = danger.map((b) => {
        let { x, y, vx, vy, id, radius } = b
        x += vx * dt
        y += vy * dt
        if (x - radius < 0) { x = radius; vx = -vx }
        if (x + radius > w) { x = w - radius; vx = -vx }
        if (y - radius < 0) { y = radius; vy = -vy }
        if (y + radius > h) { y = h - radius; vy = -vy }
        return { id, x, y, vx, vy, radius }
      })
      dangerRef.current = danger
      setDangerBalls([...danger])

      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
  }, [currentLevel, levelResults, goToLevelIntro])

  const handleAreaClick = useCallback((e) => {
    if (gameState !== 'playing') return
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    let hitDanger = false
    const updatedDanger = dangerRef.current.filter((b) => {
      const dx = clickX - b.x
      const dy = clickY - b.y
      if (Math.sqrt(dx * dx + dy * dy) <= b.radius) {
        hitDanger = true
        return false
      }
      return true
    })
    if (hitDanger) {
      penaltiesRef.current += 1
      setPenalties(penaltiesRef.current)
      const w = areaSize.w
      const hh = areaSize.h
      updatedDanger.push(createDanger(nextDangerId.current++, w, hh))
      dangerRef.current = updatedDanger
      setDangerBalls([...updatedDanger])
      return
    }

    let hitTarget = false
    const updated = targetsRef.current.filter((t) => {
      const dx = clickX - t.x
      const dy = clickY - t.y
      if (Math.sqrt(dx * dx + dy * dy) <= t.radius) {
        hitTarget = true
        return false
      }
      return true
    })

    if (hitTarget) {
      hitsRef.current += 1
      setHits(hitsRef.current)
      const w = areaSize.w
      const hh = areaSize.h
      const scale = targetsRef.current.length > 0 ? targetsRef.current[0].radius / BASE_RADIUS : 1
      const speed = LEVELS[currentLevel].speed
      updated.push(createTarget(nextTargetId.current++, w, hh, BASE_RADIUS * scale, speed))
      targetsRef.current = updated
      setTargets([...updated])
    } else {
      missesRef.current += 1
      setMisses(missesRef.current)
    }
  }, [gameState, areaSize, currentLevel])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const totalClicks = hits + misses + penalties
  const accuracy = totalClicks > 0 ? Math.round((hits / totalClicks) * 100) : 0

  const levelName = LEVELS[currentLevel]?.label || ''

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-2xl">

        {gameState === 'start' && (
          <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
              Click Accuracy Challenge
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
               Three levels of increasing difficulty. Hit targets, avoid red danger balls.
            </p>
            <button
              onClick={handleStart}
              className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Challenge
            </button>
          </div>
        )}

        {gameState === 'levelIntro' && (
          <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
            {lastCompleted && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {lastCompleted.label} &middot; {lastCompleted.hits}h / {lastCompleted.misses}m / {lastCompleted.penalties}p
              </p>
            )}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Level {currentLevel + 1}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-1 text-lg font-medium">
              {levelName}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">
              {LEVELS[currentLevel].duration}s &middot; {LEVELS[currentLevel].targetCount} targets
            </p>
            <button
              onClick={handleBeginLevel}
              className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Begin
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Level <strong className="text-gray-800 dark:text-gray-100">{currentLevel + 1}</strong></span>
                <span>Hits: <strong className="text-gray-800 dark:text-gray-100">{hits}</strong></span>
                <span>Misses: <strong className="text-gray-800 dark:text-gray-100">{misses}</strong></span>
                {penalties > 0 && <span>Penalties: <strong className="text-red-500">{penalties}</strong></span>}
              </div>
              <span className={`text-sm font-mono px-3 py-1 rounded-lg border ${
                timeLeft <= 5
                  ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 border-purple-200 dark:border-purple-800'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div
              ref={areaRef}
              onClick={handleAreaClick}
              className="relative w-full aspect-square rounded-3xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-sm border-2 border-purple-200/50 dark:border-purple-800/50 cursor-crosshair overflow-hidden select-none"
            >
              {targets.map((t) => (
                <div
                  key={t.id}
                  className="absolute rounded-full"
                  style={{
                    left: t.x - t.radius,
                    top: t.y - t.radius,
                    width: t.radius * 2,
                    height: t.radius * 2,
                    background: `radial-gradient(circle at 35% 35%, hsl(${t.hue}, 80%, 75%), hsl(${t.hue}, 70%, 50%))`,
                    boxShadow: `0 0 10px hsl(${t.hue}, 70%, 60%, 0.5), inset 0 -2px 4px rgba(0,0,0,0.15)`,
                  }}
                />
              ))}
              {dangerBalls.map((b) => (
                <div
                  key={b.id}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    left: b.x - b.radius,
                    top: b.y - b.radius,
                    width: b.radius * 2,
                    height: b.radius * 2,
                    background: 'radial-gradient(circle at 35% 35%, #ff6666, #cc0000)',
                    boxShadow: '0 0 16px rgba(255,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-3">
              {timeLeft <= (LEVELS[currentLevel].duration - LEVELS[currentLevel].shrinkAt) && (
                <p className="text-xs text-orange-500 dark:text-orange-400">Targets are shrinking!</p>
              )}
              <div className="flex-1" />
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Challenge Complete</h2>

            <div className="space-y-2 max-w-sm mx-auto mb-8">
              {levelResults.map((r, i) => {
                const c = r.hits + r.misses + r.penalties
                const a = c > 0 ? Math.round((r.hits / c) * 100) : 0
                return (
                  <div key={i} className="flex items-center justify-between bg-purple-100/50 dark:bg-purple-900/30 rounded-xl px-5 py-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{r.label}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {a}% &middot; {r.hits}h / {r.misses}m / {r.penalties}p
                    </span>
                  </div>
                )
              })}
            </div>

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
              <NextActivity currentPath="/clickAccuracy" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function ClickAccuracyPage() {
  return <RequireAuth><ClickAccuracyGame /></RequireAuth>
}
