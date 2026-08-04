'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Droplets, 
  Smile, 
  BarChart3, 
  FileText, 
  User, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  Brain,
  Home,
  BrainCircuit
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
      },
    })
  }

  const sidebarLinks = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Daily Logs', href: '/dashboard/daily-logs', icon: Droplets },
    { label: 'Mood Check-in', href: '/dashboard/mood', icon: Smile },
    { label: 'Psychograph Score', href: '/dashboard/psychograph', icon: BarChart3 },
    { label: 'Download Reports', href: '/dashboard/reports', icon: FileText },
    { label: 'AI Suggestions', href: '/dashboard/suggestions', icon: BrainCircuit },
    { label: 'Update Profile', href: '/dashboard/profile', icon: User },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      
      {/* MOBILE TOP BAR (Visible only on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            PsychoGraph
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* BACKDROP FOR MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR (Desktop Fixed + Mobile Off-Canvas Drawer) */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/80 dark:border-white/10 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Sidebar Header & Brand Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg block leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                  PsychoGraph
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  Dashboard
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {sidebarLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 font-semibold' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-75" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-gray-100 dark:border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full pt-16 lg:pt-0 min-h-screen">

{children}
        
      </main>

    </div>
  )
}