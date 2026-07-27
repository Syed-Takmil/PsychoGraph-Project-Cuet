'use client'

export default function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-400'
  const variants = {
    default: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    outline: 'border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:scale-105 active:scale-95',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
