'use client'

import { useState, useEffect } from 'react'
import { Moon, Droplets, Save, CheckCircle, Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const GUEST_FALLBACK_ID = 'guest_user'

export default function DailyLogsPage() {
  const { data: session, isPending } = authClient.useSession()
  const activeUserId = session?.user?.id || session?.session?.userId || GUEST_FALLBACK_ID

  const [sleepHours, setSleepHours] = useState(7.5)
  const [sleepQuality, setSleepQuality] = useState('Restful')
  const [waterIntake, setWaterIntake] = useState(2.25)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // 1. FETCH PREVIOUSLY SAVED DATA FROM MONGO ON MOUNT/REFRESH
  useEffect(() => {
    if (isPending) return

    async function loadSavedLogs() {
      try {
        setFetching(true)
        const res = await fetch(`http://localhost:5000/api/psychograph/results/${activeUserId}`)
        const result = await res.json()

        if (result.success && result.data?.dailyLogs) {
          const logs = result.data.dailyLogs
          if (logs.sleepHours !== undefined) setSleepHours(logs.sleepHours)
          if (logs.sleepQuality !== undefined) setSleepQuality(logs.sleepQuality)
          if (logs.waterIntake !== undefined) setWaterIntake(logs.waterIntake)
        }
      } catch (err) {
        console.error('Failed to load saved daily logs:', err)
      } finally {
        setFetching(false)
      }
    }

    loadSavedLogs()
  }, [activeUserId, isPending])

  // 2. SAVE DATA TO MONGO
  const handleSave = async () => {
    setLoading(true)

    const dailyData = {
      sleepHours,
      sleepQuality,
      waterIntake,
      completedAt: new Date().toISOString()
    }

    try {
      await fetch('http://localhost:5000/api/psychograph/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          gameName: 'dailyLogs',
          metrics: dailyData,
        }),
      })

      fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          forceRefresh: true,
        }),
      }).catch((err) => console.error('Failed to trigger background Gemini synthesis:', err))

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to dispatch Daily Logs telemetry:', err)
    } finally {
      setLoading(false)
    }
  }

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(5, Math.max(0, +(prev + amount).toFixed(2))))
  }

  if (fetching || isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <p className="text-sm font-medium text-gray-500">Retrieving your saved logs...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          Daily Lifestyle Logs
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Log your rest and hydration daily. These baseline metrics directly influence your cognitive focus scores.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Daily logs updated successfully! Your Psychograph score has been refreshed.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SLEEP TRACKER CARD */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Sleep Tracker</h2>
                <p className="text-xs text-gray-500">Log last night's rest</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-indigo-500">{sleepHours} hrs</span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Duration (Hours)
            </label>
            <input 
              type="range" 
              min="0" 
              max="14" 
              step="0.5" 
              value={sleepHours} 
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0h</span>
              <span>7-8h (Ideal)</span>
              <span>14h</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sleep Quality
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Restless', 'Restful', 'Deep & Rejuvenating'].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSleepQuality(q)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    sleepQuality === q 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WATER TRACKER CARD */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-2xl">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Hydration Tracker</h2>
                <p className="text-xs text-gray-500">Track fluid intake</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-500">{waterIntake} L</span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Liters
            </label>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.25" 
              value={waterIntake} 
              onChange={(e) => setWaterIntake(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 L</span>
              <span>2.5 L - 3.0 L Goal</span>
              <span>5 L</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quick Add
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.25, 0.5, 1.0].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => addWater(amt)}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium border border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 transition-all text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  +{amt} L
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving Entry...' : 'Save Daily Entry'}
        </button>
      </div>
    </div>
  )
}