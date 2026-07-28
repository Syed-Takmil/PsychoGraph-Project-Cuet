'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Activity, 
  Brain, 
  Droplets, 
  Moon, 
  Smile, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { getCompletedActivities } from '@/lib/activityProgress'

export default function DashboardPage() {
  const [completedActivities, setCompletedActivities] = useState([])
  const [sleepHours, setSleepHours] = useState(7)
  const [waterIntake, setWaterIntake] = useState(2.5) // Liters
  const [currentMood, setCurrentMood] = useState('Neutral')

  useEffect(() => {
    setCompletedActivities(getCompletedActivities())
  }, [])

  // Dummy calculated score metrics for the spider graph / overall rating
  const totalActivities = 7
  const progressPercent = Math.round((completedActivities.length / totalActivities) * 100)

  // Radar / Spider chart mock values based on progress
  const scores = {
    focus: completedActivities.length > 3 ? 82 : 60,
    reaction: completedActivities.length > 2 ? 78 : 55,
    emotionalResilience: completedActivities.length > 4 ? 85 : 50,
    stressControl: completedActivities.length > 1 ? 70 : 45,
    sleepHygiene: sleepHours >= 7 ? 88 : 50,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 p-6 md:p-10 transition-colors">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-purple-900/20 via-purple-600/10 to-pink-500/10 p-6 rounded-3xl border border-purple-500/20 backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Welcome back to PsychoGraph
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track your cognitive performance, lifestyle metrics, and overall mental wellbeing.
          </p>
        </div>
        <Link 
          href="/dashboard/reports" 
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <FileText className="w-4 h-4" />
          Download PDF Report
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER COLUMN (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Progress Card */}
            <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Battery Progress</span>
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{progressPercent}%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {completedActivities.length} of {totalActivities} tests completed
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Sleep Log */}
            <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-indigo-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Sleep Hours</span>
                <Moon className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{sleepHours} hrs</span>
                <span className="text-xs text-green-500 font-medium">Optimal</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="0.5" 
                value={sleepHours} 
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full mt-3 accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Water Log */}
            <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-blue-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Water Intake</span>
                <Droplets className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{waterIntake} L</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Target: 3.0 L</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.25" 
                value={waterIntake} 
                onChange={(e) => setWaterIntake(Number(e.target.value))}
                className="w-full mt-3 accent-blue-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Spider Graph / Results Summary Card */}
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Psychograph Mental Profile</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Multidimensional cognitive score based on your activity runs.
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs text-green-500 font-semibold bg-green-500/10 px-3 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" /> Stable Baseline
              </span>
            </div>

            {/* Visual Scores Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                <span className="text-xs text-gray-500">Focus & Attention</span>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">{scores.focus}/100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                <span className="text-xs text-gray-500">Reaction Time</span>
                <p className="text-xl font-bold text-pink-500 mt-1">{scores.reaction}/100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                <span className="text-xs text-gray-500">Emotional Balance</span>
                <p className="text-xl font-bold text-blue-500 mt-1">{scores.emotionalResilience}/100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                <span className="text-xs text-gray-500">Stress Control</span>
                <p className="text-xl font-bold text-indigo-500 mt-1">{scores.stressControl}/100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl">
                <span className="text-xs text-gray-500">Sleep Hygiene</span>
                <p className="text-xl font-bold text-teal-500 mt-1">{scores.sleepHygiene}/100</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl flex flex-col justify-center items-center">
                <Link href="/dashboard/psychograph" className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1">
                  Full Radar Chart <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* AI Insights & Recommendations */}
            <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-500/20 rounded-2xl">
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2 mb-1">
                <Brain className="w-4 h-4" /> Personal Suggestions
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 pl-6 list-disc">
                <li>Your attention response in the Stroop test indicates high cognitive agility.</li>
                <li>Slightly increasing daily water intake toward 3.0L may boost processing speeds during afternoon fatigue.</li>
                <li>Complete the remaining <strong>Situation Alchemist</strong> scenarios to finalize emotional resilience metrics.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3 width) - Activities Checklist */}
        <div className="flex flex-col gap-6">
          
          {/* Mood Check-in */}
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
              <Smile className="w-4 h-4 text-pink-500" /> Today's Mood Check-in
            </h2>
            <div className="grid grid-cols-5 gap-2 text-center">
              {['😔', '😐', '😊', '😃', '🔥'].map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMood(emoji)}
                  className={`p-3 text-2xl rounded-2xl border transition-all hover:scale-110 ${
                    currentMood === emoji 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md' 
                      : 'border-gray-200 dark:border-white/5'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Battery Status */}
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-bold">Diagnostic Battery</h2>
              <span className="text-xs text-gray-500">{completedActivities.length}/7 Completed</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Stroop Test', href: '/stroopTest' },
                { label: 'Reaction Test', href: '/reactionTest' },
                { label: 'Mood Questionnaire', href: '/moodQuestionnaire' },
                { label: 'Visual Preference', href: '/visualPreference' },
                { label: 'Click Accuracy', href: '/clickAccuracy' },
                { label: 'Memory Card', href: '/memoryCard' },
                { label: 'Pattern Memory', href: '/patternMemory' },
              ].map((activity) => {
                const isDone = completedActivities.includes(activity.href)
                return (
                  <div key={activity.href} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-white/5">
                    <span className="text-sm font-medium">{activity.label}</span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
                        <CheckCircle className="w-4 h-4" /> Done
                      </span>
                    ) : (
                      <Link 
                        href={activity.href}
                        className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        Start <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Academic / Diagnostic Disclaimer */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-xs text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              <strong>Academic Disclaimer:</strong> PsychoGraph scores are designed for wellness tracking and cognitive self-assessment, not formal medical diagnosis.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}