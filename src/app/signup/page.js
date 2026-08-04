'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dialog from '@/components/Dialog'
import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

const moods = [
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
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
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    if (!message.text) return
    const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000)
    return () => clearTimeout(timer)
  }, [message.text])
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

  const signIn = async () => {
    setGoogleLoading(true)
    setMessage({ text: '', type: '' })
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      })
    } catch (err) {
      setMessage({ text: 'Google sign-up failed. Please try again.', type: 'error' })
      setGoogleLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' })
      return
    }
    if (!form.termsAccepted || !form.privacyAccepted) {
      setMessage({ text: 'You must accept the Terms & Conditions and Privacy Policy.', type: 'error' })
      return
    }
    login()
    setMessage({ text: 'Account created! Redirecting...', type: 'success' })
    setTimeout(() => router.push('/clickAccuracy'), 1000)
  }

  const inputClass = 'w-full p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400'
  const labelClass = 'block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'

  return (
    <>
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
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Help us understand you better</p>

          {/* Google Sign Up Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={signIn}
              disabled={googleLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-purple-200 dark:border-purple-800 text-gray-800 dark:text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer shadow-md"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.17 21.36 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.64 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-purple-200 dark:border-purple-800"></div>
              <span className="px-3 text-xs text-gray-400 uppercase tracking-widest font-semibold">Or fill details manually</span>
              <div className="flex-grow border-t border-purple-200 dark:border-purple-800"></div>
            </div>
          </div>

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
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowTerms(true)}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.termsAccepted
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.termsAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">I agree to the <span className="text-purple-600 dark:text-purple-400 hover:underline">Terms &amp; Conditions</span></span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowPrivacy(true)}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.privacyAccepted
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                  }`}>
                    {form.privacyAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">I agree to the <span className="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</span></span>
                </div>
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
              <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border text-base font-medium transition-all animate-[fadeIn_0.3s_ease-out] ${
                message.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/70 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
              }`}>
                <span className="flex-1">{message.text}</span>
                <button onClick={() => setMessage({ text: '', type: '' })} className="shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>

      <Dialog open={showTerms} onClose={() => setShowTerms(false)} onAccept={() => setForm((prev) => ({ ...prev, termsAccepted: true }))} title="Terms &amp; Conditions">
        <p>By accessing or using the Psychograph platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">1. Account Registration</h3>
        <p>You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">2. Use of Service</h3>
        <p>Psychograph provides behavioral assessment tools for informational and educational purposes only. Our assessments are not diagnostic instruments and should not replace professional medical or psychological advice.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">3. User Conduct</h3>
        <p>You agree not to misuse the platform, interfere with its operation, or attempt to access data. Any automated scraping, reverse engineering, or abusive usage is strictly prohibited.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">4. Intellectual Property</h3>
        <p>All content, trademarks, and proprietary technology within Psychograph are owned by or licensed to us. You may not reproduce, distribute, or create derivative works without explicit written consent.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">5. Limitation of Liability</h3>
        <p>Psychograph is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any damages arising from your use of the platform or reliance on assessment results.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">6. Changes</h3>
        <p>We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance of the revised terms.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">7. Contact</h3>
        <p>For questions regarding these terms, please reach out to our support team through the platform.</p>
      </Dialog>

      <Dialog open={showPrivacy} onClose={() => setShowPrivacy(false)} onAccept={() => setForm((prev) => ({ ...prev, privacyAccepted: true }))} title="Privacy Policy">
        <p>Your privacy is important to us. This policy outlines how Psychograph collects, uses, and protects your personal information.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">1. Information We Collect</h3>
        <p>We collect information you provide during registration, including name, email address, age range, and optional demographic data. We also collect behavioral interaction data generated during platform activities, such as response times, click patterns, and visual preferences.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">2. How We Use Your Information</h3>
        <p>Your data is used to generate personalized assessment insights, improve platform functionality, and conduct anonymized research. We do not sell your personal information to third parties.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">3. Data Storage &amp; Security</h3>
        <p>We implement industry-standard encryption and access controls to protect your data. Your information is stored securely and retained only as long as necessary to provide our services.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">4. Your Rights</h3>
        <p>You may request access to, correction of, or deletion of your personal data at any time. You can also withdraw consent for data processing by contacting us.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">5. Cookies</h3>
        <p>We use essential cookies for authentication and platform functionality. Analytics cookies may be used to improve user experience; you can opt out through your browser settings.</p>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 pt-2">6. Contact</h3>
        <p>For privacy-related inquiries, please contact our data protection team through the platform.</p>
      </Dialog>
    </>
  )
}