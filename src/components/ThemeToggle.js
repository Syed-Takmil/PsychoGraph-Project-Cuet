'use client'

import { useEffect } from 'react'

export default function ThemeToggle() {
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

  return null
}
