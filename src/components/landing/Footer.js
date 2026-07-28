import { Hexagon, Sparkles, ArrowUpRight, ShieldCheck, Activity, Cpu } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-b from-white/40 via-purple-50/20 to-white/60 dark:from-gray-950/40 dark:via-purple-950/10 dark:to-gray-950/80 backdrop-blur-2xl">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 dark:bg-pink-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-200/60 dark:border-white/10">
          
          {/* Brand & Mission (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-500/30 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <Hexagon className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:rotate-95 transition-transform duration-500" />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-gray-600 dark:from-white dark:via-purple-200 dark:to-gray-400">
                Psychograph Telemetry
              </span>
            </Link>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Advanced implicit behavioral mapping and cognitive analytics platform. Decoding human patterns through high-precision telemetry and interactive psychological testing.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Systems Operational
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/20 text-xs font-medium text-purple-600 dark:text-purple-400 shadow-sm">
                <Cpu className="w-3 h-3" />
                v2.6 Live
              </div>
            </div>
          </div>

          {/* Quick Links (Col 6-8) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Navigation</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-purple-500" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 group">
                  <span>About Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-purple-500" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 group">
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-purple-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security (Col 9-12) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Governance & Trust</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 group">
                  <span>Terms & Conditions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-purple-500" />
                </Link>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span>End-to-end encrypted telemetry data handling & strict data privacy compliance.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p className="uppercase tracking-widest font-medium">
            &copy; 2026 &middot; Implicit Behavioral Mapping Platform
          </p>
          
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Deep Insights</span>
          </div>
        </div>

      </div>
    </footer>
  )
}