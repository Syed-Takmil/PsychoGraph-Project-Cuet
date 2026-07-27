'use client'
import Link from 'next/link'
import { Hexagon, ArrowLeft, Brain, Activity, BarChart3, Shield, Lightbulb, Heart } from 'lucide-react'

const features = [
  { icon: Brain, title: 'Cognitive Assessments', desc: 'Scientifically designed activities to evaluate attention, memory, reaction time, and visual processing.' },
  { icon: Activity, title: 'Emotion Analysis', desc: 'Pattern recognition across exercises to identify emotional and cognitive markers.' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Detailed metrics and visualizations to monitor changes over time.' },
  { icon: Shield, title: 'Privacy First', desc: 'Your data remains secure and confidential. Anonymous processing ensures complete privacy.' },
  { icon: Lightbulb, title: 'Early Detection', desc: 'Subtle patterns in cognitive performance can indicate early signs of mental health concerns.' },
  { icon: Heart, title: 'Holistic Approach', desc: 'Combining multiple assessment dimensions for a comprehensive psychological profile.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
            <Hexagon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">About Psychograph</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A psychological mental health early detection platform that combines interactive activities,
            emotion analysis, and personalized recommendations.
          </p>
        </div>

        <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Mission</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            Mental health challenges often go undetected until they reach a critical stage. Psychograph aims to
            bridge this gap by providing accessible, engaging cognitive assessments that can reveal early indicators
            of psychological distress. Through gamified activities and intelligent analysis, we empower individuals
            to understand their mental wellbeing and seek help when needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <f.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{f.title}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ready to Begin?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try our cognitive activities and discover insights about your mental wellbeing.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
