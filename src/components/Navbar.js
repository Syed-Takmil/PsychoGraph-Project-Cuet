'use client'
import { useEffect, useState, useRef, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Hexagon, ChevronDown, LogOut, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getCompletedActivities } from '@/lib/activityProgress'

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const [completed, setCompleted] = useState(() => getCompletedActivities())
  const dropdownRef = useRef(null)

  useEffect(() => {
    const t = localStorage.getItem('theme')
    if (t === 'dark' || !t) document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const btn = document.getElementById('theme-toggle')
    if (!btn) return
    const handler = () => {
      const isDark = document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }
    btn.addEventListener('click', handler)
    return () => btn.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActivitiesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activityLinks = [
    { label: 'Click Accuracy', href: '/clickAccuracy' },
    { label: 'Memory Card', href: '/memoryCard' },
    { label: 'Pattern Memory', href: '/patternMemory' },
    { label: 'Mood Questionnaire', href: '/moodQuestionnaire' },
    { label: 'Stroop Test', href: '/stroopTest' },
    { label: 'Reaction Test', href: '/reactionTest' },
    { label: 'Visual Preference', href: '/visualPreference' },
  ]

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium">
          <Hexagon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span>Psychograph</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setCompleted(getCompletedActivities())
                setActivitiesOpen((prev) => !prev)
              }}
              className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
            >
              Activities
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activitiesOpen ? 'rotate-180' : ''}`} />
            </button>
            {activitiesOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-200 dark:border-purple-800 py-2 overflow-hidden">
                {activityLinks.map((item) => {
                  const done = completed.includes(item.href)
                  if (done) {
                    return (
                      <span
                        key={item.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-red-400 dark:text-red-400 cursor-not-allowed"
                      >
                        {item.label}
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    )
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActivitiesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/about" className="hidden md:inline hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm text-gray-500 dark:text-gray-400">About</Link>
        {mounted && (isAuthenticated ? (
          <button
            onClick={() => { logout(); router.push('/') }}
            className="hidden md:inline-flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        ) : (
          <Link href="/signup" className="hidden md:inline hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm text-gray-500 dark:text-gray-400">Sign Up</Link>
        ))}
        <button
          id="theme-toggle"
          className="shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg leading-none"
          aria-label="Toggle theme"
        >
          <span className="inline dark:hidden">🌙</span>
          <span className="hidden dark:inline">☀️</span>
        </button>
      </div>
    </nav>
  )
}
