'use client'

import { useState } from 'react'

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😰', label: 'Stressed' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😟', label: 'Anxious' },
  { emoji: '🤩', label: 'Excited' },
  { emoji: '😴', label: 'Tired' },
]

const hobbiesList = [
  'Reading', 'Gaming', 'Music', 'Sports',
  'Art', 'Cooking', 'Travel', 'Photography',
]

const initialForm = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  dob: '',
  age: '',
  gender: '',
  country: '',
  city: '',
  userType: '',
  institution: '',
  educationLevel: '',
  sleepHours: 7,
  exerciseFrequency: '',
  screenTime: 5,
  socialInteraction: 3,
  stressLevel: 5,
  mood: '',
  mentalHealthHistory: false,
  familyMentalHealthHistory: false,
  hobbies: [],
  favoriteActivity: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
  privacyAccepted: false,
}

export default function SignUpPage() {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setMessage({ text: '', type: '' })
  }

  const handleHobbyToggle = (hobby) => {
    setForm((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...prev.hobbies, hobby],
    }))
  }

  const totalFields = Object.keys(initialForm).length
  const filledCount = Object.entries(form).filter(([key, val]) => {
    if (key === 'hobbies') return val.length > 0
    if (typeof val === 'boolean') return val === true
    return val !== '' && val !== null && val !== undefined
  }).length
  const progress = Math.round((filledCount / totalFields) * 100)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' })
      return
    }
    if (form.username === 'admin' && form.password === 'admin') {
      setMessage({ text: 'Login successful! Redirecting to dashboard...', type: 'success' })
    } else {
      setMessage({ text: 'Invalid username or password. Try admin/admin.', type: 'error' })
    }
  }

  const inputClass = 'w-full p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400'
  const labelClass = 'block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="relative w-full max-w-4xl rounded-3xl p-[3px] overflow-hidden"
        style={{
          background: 'conic-gradient(from var(--border-angle), #a855f7, #ec4899, #a855f7, #ec4899, #a855f7, #ec4899, #a855f7)',
          animation: 'spin-border 3s linear infinite',
        }}
      >
        <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>Profile Completion</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200/60 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center tracking-tight">
            Create Your Profile
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Help us understand you better</p>

          <form onSubmit={handleSubmit} className="space-y-10">

            <section>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-sm text-purple-600 dark:text-purple-300">1</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username *" required className={inputClass} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange} className={inputClass} />
                </div>
                <input name="age" type="number" min="1" max="150" value={form.age} onChange={handleChange} placeholder="Age" className={inputClass} />
                <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
                <select name="country" value={form.country} onChange={handleChange} className={inputClass}>
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="BD">Bangladesh</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  <option value="Other">Other</option>
                </select>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass} />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-sm text-purple-600 dark:text-purple-300">2</span>
                Academic / Occupation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-6 items-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-purple-200 dark:border-purple-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="userType" value="student" checked={form.userType === 'student'} onChange={handleChange} className="accent-purple-500 w-4 h-4" />
                    <span className="text-gray-700 dark:text-gray-200">Student</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="userType" value="professional" checked={form.userType === 'professional'} onChange={handleChange} className="accent-purple-500 w-4 h-4" />
                    <span className="text-gray-700 dark:text-gray-200">Professional</span>
                  </label>
                </div>
                <input name="institution" value={form.institution} onChange={handleChange} placeholder="School / University / Workplace" className={inputClass} />
                <select name="educationLevel" value={form.educationLevel} onChange={handleChange} className={inputClass}>
                  <option value="">Education Level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor&apos;s</option>
                  <option value="master">Master&apos;s</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-sm text-purple-600 dark:text-purple-300">3</span>
                Mental Health & Lifestyle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Sleep Hours: <span className="text-purple-600 dark:text-purple-400 font-semibold">{form.sleepHours}h</span></label>
                  <input type="range" name="sleepHours" min="0" max="12" value={form.sleepHours} onChange={handleChange} className="w-full accent-purple-500" />
                </div>
                <div>
                  <label className={labelClass}>Screen Time: <span className="text-purple-600 dark:text-purple-400 font-semibold">{form.screenTime}h</span></label>
                  <input type="range" name="screenTime" min="0" max="16" value={form.screenTime} onChange={handleChange} className="w-full accent-purple-500" />
                </div>
                <div>
                  <label className={labelClass}>Daily Social Interaction: <span className="text-purple-600 dark:text-purple-400 font-semibold">{form.socialInteraction}/5</span></label>
                  <input type="range" name="socialInteraction" min="1" max="5" value={form.socialInteraction} onChange={handleChange} className="w-full accent-purple-500" />
                </div>
                <div>
                  <label className={labelClass}>Stress Level: <span className="text-purple-600 dark:text-purple-400 font-semibold">{form.stressLevel}/10</span></label>
                  <input type="range" name="stressLevel" min="1" max="10" value={form.stressLevel} onChange={handleChange} className="w-full accent-purple-500" />
                </div>
                <select name="exerciseFrequency" value={form.exerciseFrequency} onChange={handleChange} className={inputClass}>
                  <option value="">Exercise Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                <input name="favoriteActivity" value={form.favoriteActivity} onChange={handleChange} placeholder="Favorite Activity" className={inputClass} />
              </div>

              <div className="mt-6">
                <label className={labelClass}>Current Mood</label>
                <div className="flex gap-3 flex-wrap">
                  {moods.map(({ emoji, label }) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, mood: emoji }))}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                        form.mood === emoji
                          ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/50 shadow-md scale-105'
                          : 'border-transparent bg-white/60 dark:bg-gray-800/60 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-700'
                      }`}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className={labelClass}>Hobbies</label>
                <div className="flex gap-2 flex-wrap">
                  {hobbiesList.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHobbyToggle(h)}
                      className={`px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                        form.hobbies.includes(h)
                          ? 'bg-purple-500 text-white border-purple-500 shadow-md'
                          : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.mentalHealthHistory
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.mentalHealthHistory && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <input type="checkbox" name="mentalHealthHistory" checked={form.mentalHealthHistory} onChange={handleChange} className="hidden" />
                  <span className="text-gray-600 dark:text-gray-300">Existing Mental Health History</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.familyMentalHealthHistory
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.familyMentalHealthHistory && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <input type="checkbox" name="familyMentalHealthHistory" checked={form.familyMentalHealthHistory} onChange={handleChange} className="hidden" />
                  <span className="text-gray-600 dark:text-gray-300">Family Mental Health History</span>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-sm text-purple-600 dark:text-purple-300">4</span>
                Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password *"
                    required
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={inputClass}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
                    {showConfirm ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.termsAccepted
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.termsAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} className="hidden" />
                  <span className="text-gray-600 dark:text-gray-300">I agree to the <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Terms &amp; Conditions</span></span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.privacyAccepted
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.privacyAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <input type="checkbox" name="privacyAccepted" checked={form.privacyAccepted} onChange={handleChange} className="hidden" />
                  <span className="text-gray-600 dark:text-gray-300">I agree to the <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Privacy Policy</span></span>
                </label>
              </div>
            </section>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-12 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Create Account
              </button>
            </div>

            {message.text && (
              <div className={`text-center text-base font-medium p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
