'use client'

import { Shield, Sparkles, FileText, Lock, Scale, Activity, Eye, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 dark:text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Animated Glows Matching the Signature Theme */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 dark:bg-pink-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse delay-1000" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Scale className="w-3.5 h-3.5" />
            Legal Agreement & Privacy Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400">Privacy Policy</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Your privacy is important to us. This policy outlines how Psychograph collects, uses, and protects your personal and cognitive telemetry information.
          </p>
          <p className="text-xs text-gray-500">Last updated: July 2026</p>
        </div>

        {/* Content Box */}
        <div className="p-8 md:p-12 rounded-3xl bg-gray-50/80 dark:bg-gray-950/80 border border-gray-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl space-y-8 transition-colors duration-300">
          
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              We collect information you provide during registration, including name, email address, age range, and optional demographic data. We also collect behavioral interaction data generated during platform activities, such as response times, click patterns, and visual preferences.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              Your data is used to generate personalized assessment insights, improve platform functionality, and conduct anonymized research. We do not sell your personal information to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              3. Data Storage &amp; Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              We implement industry-standard encryption and access controls to protect your data. Your information is stored securely and retained only as long as necessary to provide our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              4. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              You may request access to, correction of, or deletion of your personal data at any time. You can also withdraw consent for data processing by contacting us.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              5. Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              We use essential cookies for authentication and platform functionality. Analytics cookies may be used to improve user experience; you can opt out through your browser settings.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              6. Contact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-7">
              For privacy-related inquiries, please contact our data protection team through the platform.
            </p>
          </div>

        </div>

        {/* Footer Navigation Back */}
        <div className="text-center pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </div>
  )
}