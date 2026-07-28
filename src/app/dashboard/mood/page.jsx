'use client'

import { useState } from 'react'
import { Smile, Sparkles, HeartPulse, CheckCircle } from 'lucide-react'

export default function MoodPage() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊')
  const [energyLevel, setEnergyLevel] = useState(3)
  const [stressLevel, setStressLevel] = useState(2)
  const [submitted, setSubmitted] = useState(false)

  const emojis = [
    { symbol: '😭', label: 'Overwhelmed' },
    { symbol: '😔', label: 'Low / Sad' },
    { symbol: '😐', label: 'Neutral' },
    { symbol: '😊', label: 'Good' },
    { symbol: '🔥', label: 'Energized' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          Mood Check-in
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Assess your emotional state before completing your cognitive tests.
        </p>
      </div>

      {submitted && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Mood log captured! Linked to today's assessment run.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-8">
        
        {/* MOOD EMOJI SELECTOR */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-4">
            How are you feeling right now?
          </label>
          <div className="grid grid-cols-5 gap-3">
            {emojis.map((item) => (
              <button
                type="button"
                key={item.symbol}
                onClick={() => setSelectedEmoji(item.symbol)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  selectedEmoji === item.symbol 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md scale-105' 
                    : 'border-gray-200 dark:border-white/5 hover:border-purple-300'
                }`}
              >
                <span className="text-3xl md:text-4xl">{item.symbol}</span>
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ENERGY LEVEL */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Energy Level
            </label>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{energyLevel} / 5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setEnergyLevel(lvl)}
                className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                  energyLevel >= lvl 
                    ? 'bg-amber-500 text-white border-amber-500' 
                    : 'border-gray-200 dark:border-white/10 text-gray-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* STRESS LEVEL */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-pink-500" /> Stress Perception
            </label>
            <span className="text-sm font-bold text-pink-500">{stressLevel} / 5</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setStressLevel(lvl)}
                className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                  stressLevel >= lvl 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'border-gray-200 dark:border-white/10 text-gray-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer"
        >
          Submit Mood Log
        </button>

      </form>
    </div>
  )
}