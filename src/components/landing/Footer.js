import { Hexagon } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-purple-200 dark:border-purple-800/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
          <Hexagon className="w-4 h-4" />
          <span>Psychograph Telemetry</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
          <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase tracking-widest">About</Link>
          <span className="uppercase tracking-widest">&copy; 2026 &middot; Implicit Behavioral Mapping Platform</span>
        </div>
      </div>
    </footer>
  )
}
