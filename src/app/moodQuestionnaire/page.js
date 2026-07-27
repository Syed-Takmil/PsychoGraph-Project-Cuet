'use client'
import { useState, useMemo, useEffect } from 'react'
import RequireAuth from '@/components/RequireAuth'
import NextActivity from '@/components/NextActivity'
import { markCompleted } from '@/lib/activityProgress'

const QUESTIONS = [
  { id: 0, text: 'I feel energetic and active throughout the day.', reverse: false },
  { id: 1, text: 'I have trouble falling or staying asleep at night.', reverse: true },
  { id: 2, text: 'I feel calm and at ease most of the time.', reverse: false },
  { id: 3, text: 'I find it hard to concentrate on tasks.', reverse: true },
  { id: 4, text: 'I enjoy spending time with others.', reverse: false },
  { id: 5, text: 'I feel overwhelmed by my daily responsibilities.', reverse: true },
  { id: 6, text: 'I am generally satisfied with my life right now.', reverse: false },
  { id: 7, text: 'I feel anxious or nervous without a clear reason.', reverse: true },
  { id: 8, text: 'I look forward to things with excitement.', reverse: false },
  { id: 9, text: 'I feel physically exhausted or drained.', reverse: true },
  { id: 10, text: 'I believe I can handle challenges that come my way.', reverse: false },
  { id: 11, text: 'I feel lonely even when I am around others.', reverse: true },
  { id: 12, text: 'I feel hopeful about my future.', reverse: false },
  { id: 13, text: 'I get irritated or frustrated easily.', reverse: true },
  { id: 14, text: 'I feel content with who I am.', reverse: false },
]

const LIKERT = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
]

function getTier(score) {
  if (score >= 60) return { label: 'Very Positive', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' }
  if (score >= 45) return { label: 'Good', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' }
  if (score >= 30) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' }
  return { label: 'Low', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' }
}

function getRecommendation(tier) {
  switch (tier) {
    case 'Very Positive':
      return 'Your responses indicate strong emotional wellbeing. Keep nurturing your mental health through continued self-care, meaningful connections, and activities that bring you joy.'
    case 'Good':
      return 'You are in a generally positive state. Consider maintaining your routine while adding small practices like gratitude journaling or regular exercise to further strengthen your resilience.'
    case 'Moderate':
      return 'Your responses suggest some areas that may need attention. Try incorporating relaxation techniques, setting aside time for hobbies, and reaching out to trusted friends or family for support.'
    case 'Low':
      return 'Your responses indicate significant distress. We strongly encourage you to speak with a mental health professional. You can also reach out to a crisis helpline in your area for immediate support.'
  }
}

function MoodQuestionnaire() {
  const [gameState, setGameState] = useState('start')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if (gameState === 'complete') markCompleted('/moodQuestionnaire')
  }, [gameState])

  const totalQuestions = QUESTIONS.length

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }))
    if (currentQ + 1 < totalQuestions) {
      setCurrentQ((prev) => prev + 1)
    } else {
      setGameState('complete')
    }
  }

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1)
  }

  const restart = () => {
    setCurrentQ(0)
    setAnswers({})
    setGameState('start')
  }

  const result = useMemo(() => {
    if (gameState !== 'complete') return null
    const raw = Object.entries(answers).reduce((sum, [id, val]) => {
      const q = QUESTIONS[Number(id)]
      return sum + (q.reverse ? 6 - val : val)
    }, 0)
    const tier = getTier(raw)
    return { score: raw, tier, recommendation: getRecommendation(tier.label) }
  }, [gameState, answers])

  const progress = gameState === 'start' ? 0 : Math.round(((currentQ + (gameState === 'complete' ? totalQuestions : 0)) / totalQuestions) * 100)

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="w-full max-w-xl bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8">

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-2">Activity 6: Mood Questionnaire</h2>

        {gameState === 'start' && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Answer {totalQuestions} quick questions about how you have been feeling recently.
              Select the option that best describes your experience over the past two weeks.
            </p>
            <button
              onClick={() => setGameState('answering')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Begin Questionnaire
            </button>
          </div>
        )}

        {gameState === 'answering' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200/60 dark:bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              Question {currentQ + 1} of {totalQuestions}
            </p>

            <p className="text-base font-medium text-gray-800 dark:text-gray-100 mb-6 min-h-[3rem]">
              {QUESTIONS[currentQ].text}
            </p>

            <div className="flex flex-col gap-2 mb-6">
              {LIKERT.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                    answers[currentQ] === opt.value
                      ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-300'
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700'
                  }`}
                >
                  {opt.value} &mdash; {opt.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQ === 0}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentQ === 0
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-700'
                }`}
              >
                Back
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-500 self-center">
                {currentQ + 1} / {totalQuestions}
              </span>
              <div />
            </div>
          </div>
        )}

        {gameState === 'complete' && result && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Your Results</p>
            <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-1">{result.score}</h3>
            <p className={`text-lg font-semibold ${result.tier.color} mb-6`}>{result.tier.label}</p>

            <div className={`rounded-xl p-5 border ${result.tier.bg} mb-6 text-left`}>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{result.recommendation}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={restart}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Retake
              </button>
              <NextActivity currentPath="/moodQuestionnaire" />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function MoodQuestionnairePage() {
  return <RequireAuth><MoodQuestionnaire /></RequireAuth>
}
