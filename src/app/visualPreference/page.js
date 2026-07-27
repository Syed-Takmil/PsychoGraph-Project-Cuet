'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const EMOTION_DIMENSIONS = {
  HAPPY: { key: 'Happy', index: 0, color: 'rgba(255, 206, 86, 0.6)' },
  CALM: { key: 'Calm', index: 1, color: 'rgba(75, 192, 192, 0.6)' },
  SAD: { key: 'Sad', index: 2, color: 'rgba(54, 162, 235, 0.6)' },
  STRESSED: { key: 'Stressed', index: 3, color: 'rgba(255, 99, 132, 0.6)' },
  ANGRY: { key: 'Angry', index: 4, color: 'rgba(255, 159, 64, 0.6)' },
}

const LABELS = Object.values(EMOTION_DIMENSIONS).map((d) => d.key)
const BG_COLORS = Object.values(EMOTION_DIMENSIONS).map((d) => d.color)

const MAX_SELECTIONS = 9
const GRID_SIZE = 12

const EMOTION_TYPES = ['happy', 'calm', 'sad', 'stressed', 'angry']

const IMAGE_LIBRARY = EMOTION_TYPES.flatMap((emotion, ei) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: ei * 10 + i + 1,
    src: `/images/${emotion}-${i + 1}.jpg`,
    emotion: EMOTION_DIMENSIONS[emotion.toUpperCase()],
    alt: `${emotion} image ${i + 1}`,
  }))
)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function VisualPreferenceTest() {
  const [gameState, setGameState] = useState('start')
  const [emotionTally, setEmotionTally] = useState(
    Object.fromEntries(LABELS.map((key) => [key, 0]))
  )
  const [selectionsMade, setSelectionsMade] = useState(0)
  const [pool, setPool] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [poolIndex, setPoolIndex] = useState(0)
  const [flippingId, setFlippingId] = useState(null)
  const [replacementImg, setReplacementImg] = useState(null)
  const timerRef = useRef(null)

  const beginTest = () => {
    const s = shuffle(IMAGE_LIBRARY)
    setPool(s)
    setDisplayed(s.slice(0, GRID_SIZE))
    setPoolIndex(GRID_SIZE)
    setEmotionTally(Object.fromEntries(LABELS.map((key) => [key, 0])))
    setSelectionsMade(0)
    setFlippingId(null)
    setGameState('testing')
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleImageSelect = useCallback((img, idx) => {
    if (gameState !== 'testing' || flippingId) return

    setEmotionTally((prev) => ({
      ...prev,
      [img.emotion.key]: prev[img.emotion.key] + 1,
    }))

    setFlippingId(img.id)
    setReplacementImg(pool[poolIndex] || null)

    timerRef.current = setTimeout(() => {
      const next = selectionsMade + 1
      setSelectionsMade(next)

      if (next >= MAX_SELECTIONS) {
        setGameState('complete')
      } else if (poolIndex < pool.length) {
        setDisplayed((prev) => {
          const next = [...prev]
          next[idx] = pool[poolIndex]
          return next
        })
        setPoolIndex((p) => p + 1)
      }
      setFlippingId(null)
      setReplacementImg(null)
    }, 500)
  }, [gameState, flippingId, selectionsMade, poolIndex, pool])

  const chartData = useMemo(() => {
    const dataValues = LABELS.map((key) => emotionTally[key])
    return {
      labels: LABELS,
      datasets: [
        {
          label: 'Emotional Resonance Score',
          data: dataValues,
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          borderColor: '#a855f7',
          pointBackgroundColor: BG_COLORS,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#a855f7',
          borderWidth: 2,
          fill: true,
        },
      ],
    }
  }, [emotionTally])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(100, 116, 139, 0.3)' },
        grid: { color: 'rgba(100, 116, 139, 0.2)' },
        pointLabels: { color: '#64748b', font: { size: 12 } },
        suggestedMin: 0,
        suggestedMax: Math.max(3, selectionsMade + 1),
        ticks: { stepSize: 1, color: '#64748b', backdropColor: 'transparent' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Score: ${context.raw}`
          },
        },
      },
    },
  }), [selectionsMade])

  const resultsSummary = useMemo(() => {
    if (gameState !== 'complete') return null

    const entries = Object.entries(emotionTally)
    const dominant = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max, ['', 0]
    )

    const isNegative = ['Stressed', 'Angry', 'Sad'].includes(dominant[0])
    const score = dominant[1]

    let recommendation = 'Maintain your current positive habits.'
    if (score >= 3 && dominant[0] === 'Sad')
      recommendation = 'You selected several low-valence images. Consider engaging in an uplifting activity or connecting with a friend.'
    if (score >= 3 && dominant[0] === 'Stressed')
      recommendation = 'High stress indicators present. We recommend trying the guided breathing exercise.'

    return { dominant: dominant[0], score, recommendation, isNegative }
  }, [gameState, emotionTally])

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="flex w-full max-w-[96rem] mx-auto gap-8 flex-wrap-reverse">

        {(gameState === 'testing' || gameState === 'complete') && (
          <div className="flex-1 min-w-[280px] max-w-sm mx-auto flex flex-col gap-5">
            <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/50 dark:border-gray-700/50">
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 text-center mb-3">Emotional Profile</h3>
              <div className="h-72">
                <Radar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/50 dark:border-gray-700/50">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Selection Tally ({selectionsMade}/{MAX_SELECTIONS})
              </h4>
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {LABELS.map((key, i) => (
                  <div key={key} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ backgroundColor: BG_COLORS[i] }} />
                    {key}: <strong className="text-gray-800 dark:text-gray-100 ml-1">{emotionTally[key]}</strong>
                  </div>
                ))}
              </div>
            </div>

            {gameState === 'complete' && resultsSummary?.isNegative && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800">
                <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">Note on Results</h4>
                <p className="text-xs mt-1 text-red-500 dark:text-red-300 leading-relaxed">
                  Research suggests a preference for high-arousal negative imagery can correlate with current stress or low mood states.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex-[2] bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-gray-700/50 min-w-0">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Activity 7: Visual Preference</h2>

          {gameState === 'start' && (
            <div className="text-center mt-10">
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Select exactly <strong className="text-gray-800 dark:text-gray-100">{MAX_SELECTIONS} images</strong> that you find visually appealing or that resonate with you right now.
                <br /><br />
                A new image appears each time you pick one. There are no right or wrong answers.
              </p>
              <button
                onClick={beginTest}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Start Visual Test
              </button>
            </div>
          )}

          {gameState === 'testing' && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-5">
                Select image {selectionsMade + 1} of {MAX_SELECTIONS}:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayed.map((img, idx) => {
                  const isFlipping = flippingId === img.id
                  return (
                    <div
                      key={isFlipping ? `flip-${img.id}` : img.id}
                      onClick={() => handleImageSelect(img, idx)}
                      className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div
                        className="w-full"
                        style={{ perspective: '600px' }}
                      >
                        <div
                          className="relative transition-transform duration-500"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipping ? 'rotateX(180deg)' : 'rotateX(0deg)',
                          }}
                        >
                          <div
                            className="backface-hidden"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.src} alt={img.alt} className="w-full h-36 object-cover" loading="lazy" />
                            <div className="absolute inset-0 bg-purple-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold text-sm">
                              Select
                            </div>
                          </div>
                          <div
                            className="absolute inset-0"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={isFlipping && replacementImg ? replacementImg.src : img.src} alt={img.alt} className="w-full h-36 object-cover" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {gameState === 'complete' && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">Analysis Complete 🧠</h3>
              <div className="bg-purple-100/50 dark:bg-purple-900/30 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Based on your image selections, your primary emotional resonance appears to be:
                </p>
                <h2
                  className="text-4xl font-bold my-4"
                  style={{
                    color: EMOTION_DIMENSIONS[resultsSummary.dominant.toUpperCase()]?.color || '#a855f7',
                  }}
                >
                  {resultsSummary.dominant}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Score: <strong className="text-gray-800 dark:text-gray-100">{resultsSummary.score} / {MAX_SELECTIONS}</strong>
                </p>
                <div className="mt-5 bg-purple-100/60 dark:bg-purple-900/40 rounded-xl p-4 border border-purple-200/60 dark:border-purple-700/50">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Recommendation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{resultsSummary.recommendation}</p>
                </div>
              </div>
              <button
                onClick={beginTest}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Retake Test
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
