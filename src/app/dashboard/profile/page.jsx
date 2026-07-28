'use client'

import { useState } from 'react'
import { User, Mail, Lock, Save, CheckCircle, ShieldCheck, Heart } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function ProfilePage() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [age, setAge] = useState(21)
  const [targetSleep, setTargetSleep] = useState(8)
  const [targetWater, setTargetWater] = useState(3.0)
  const [saved, setSaved] = useState(false)

  const handleUpdate = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          Account Settings & Baseline
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Update your profile details and baseline metrics for personalized scoring.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Profile settings saved successfully!
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-8">
        
        {/* Personal Details Card */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
            <User className="w-5 h-5 text-purple-600" /> Personal Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/20 border border-gray-200 dark:border-white/5 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Health Baseline Card */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
            <Heart className="w-5 h-5 text-pink-500" /> Psychograph Baseline Targets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Target Sleep (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                value={targetSleep}
                onChange={(e) => setTargetSleep(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Target Water (Liters)
              </label>
              <input
                type="number"
                step="0.25"
                value={targetWater}
                onChange={(e) => setTargetWater(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-5 h-5" />
            Save Profile Changes
          </button>
        </div>

      </form>
    </div>
  )
}