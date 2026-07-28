'use client'

import { useRef } from 'react'
import { FileText, Download, CheckCircle, Brain, Calendar, ShieldAlert } from 'lucide-react'

export default function ReportsPage() {
  const reportRef = useRef(null)

  const handleDownloadPDF = () => {
    window.print()
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Psychograph Diagnostic Summary
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Export a comprehensive summary of your recent cognitive tests and lifestyle baselines.
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-5 h-5" />
          Download / Print PDF
        </button>
      </div>

      {/* PRINTABLE REPORT CONTAINER */}
      <div 
        ref={reportRef}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-xl space-y-8 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black"
      >
        {/* Report Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6 print:border-gray-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 text-white rounded-2xl">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">PsychoGraph Report</h2>
              <p className="text-xs text-gray-500 print:text-gray-600">Cognitive & Lifestyle Assessment Battery</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 print:text-gray-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 print:text-purple-700 block mt-1">
              Status: Verified Session
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-700">
            Executive Summary
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed print:text-black">
            The candidate completed <strong>7 out of 7</strong> diagnostic activities in the current evaluation session.
            Processing speed and cognitive inhibition metrics derived from the Stroop Test indicate optimal cognitive control.
            Hydration levels and sleep consistency were factored into the composite baseline score.
          </p>
        </div>

        {/* Test Outcomes Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-700">
            Activity Breakdown & Ratings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 print:border-gray-300">
                  <th className="py-2.5 font-semibold">Test / Module</th>
                  <th className="py-2.5 font-semibold">Measured Metric</th>
                  <th className="py-2.5 font-semibold text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5 print:divide-gray-200">
                <tr>
                  <td className="py-3 font-medium">Stroop Test</td>
                  <td className="py-3 text-gray-500 print:text-gray-700">Selective Attention & Delay</td>
                  <td className="py-3 text-right font-bold text-green-600">88/100</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Reaction Test</td>
                  <td className="py-3 text-gray-500 print:text-gray-700">Visual-Motor Latency</td>
                  <td className="py-3 text-right font-bold text-green-600">82/100</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Mood Questionnaire</td>
                  <td className="py-3 text-gray-500 print:text-gray-700">Affective State Baseline</td>
                  <td className="py-3 text-right font-bold text-purple-600">75/100</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Situation Alchemist</td>
                  <td className="py-3 text-gray-500 print:text-gray-700">Stress Coping Decision Tree</td>
                  <td className="py-3 text-right font-bold text-purple-600">80/100</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Daily Logs</td>
                  <td className="py-3 text-gray-500 print:text-gray-700">Sleep (7.5h) & Hydration (2.5L)</td>
                  <td className="py-3 text-right font-bold text-blue-600">85/100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-500/20 space-y-2 print:bg-gray-50 print:border-gray-200">
          <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300 print:text-black flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-600" /> Recommendations
          </h4>
          <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-disc pl-5 print:text-black">
            <li>Maintain fluid intake around 3.0L daily to reduce afternoon cognitive drop-offs.</li>
            <li>Re-test visual reaction times after heavy study sessions to measure physical fatigue.</li>
          </ul>
        </div>

        {/* Academic Disclaimer Footer */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 text-xs text-gray-400 print:text-gray-500 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <p>
            <strong>Disclaimer:</strong> This generated report is an educational university project prototype designed strictly for wellness self-assessment and mental health awareness. It is not a formal medical diagnosis.
          </p>
        </div>

      </div>
    </div>
  )
}