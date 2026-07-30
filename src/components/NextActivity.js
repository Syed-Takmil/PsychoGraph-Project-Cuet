'use client'
import Link from 'next/link'
import { getNextActivity } from '@/lib/activityOrder'
import { ArrowRight, LayoutDashboard } from 'lucide-react'

export default function NextActivity({ currentPath }) {
  const next = getNextActivity(currentPath)

  if (next) {
    return (
      <Link
        href={next.path}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        Next: {next.label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    )
  }

  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
    >
      View Complete Analysis
      <LayoutDashboard className="w-4 h-4" />
    </Link>
  )
}
