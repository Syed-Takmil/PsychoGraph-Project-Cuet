'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send, Sparkles, User, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }, 1200)
  }

  const inputClass = 'w-full p-4 rounded-2xl border border-purple-500/20 bg-gray-50/80 dark:bg-gray-950/80 text-gray-900 dark:text-gray-100 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-inner'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 dark:text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      
      {/* Background Animated Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 dark:bg-pink-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse delay-1000" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="rounded-3xl p-[2px] overflow-hidden shadow-2xl"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #a855f7, #ec4899, #3b82f6, #a855f7)',
            animation: 'spin-border 5s linear infinite',
          }}
        >
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-2xl space-y-8 transition-colors duration-300">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3 h-3" />
                Get in Touch
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Let’s Start a Conversation</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Have a question, feedback, or inquiry? Drop us a line below.</p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Message Received!</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Our team will review your note and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 mt-4 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"><User className="w-5 h-5" /></span>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} pl-12`}
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"><Mail className="w-5 h-5" /></span>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass} pl-12`}
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"><MessageSquare className="w-5 h-5" /></span>
                  <textarea
                    required
                    rows="4"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} pl-12 resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-semibold text-base rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    'Sending Message...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}