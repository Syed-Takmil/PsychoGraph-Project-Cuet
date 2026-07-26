export default function Navbar() {
  const navItems = [
    { label: 'Sign Up', href: '#' },
    { label: 'Login', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Activities', href: '#' },
    { label: 'Emotion Analysis', href: '#' },
    { label: 'Recommendations', href: '#' },
    { label: 'Emotion History', href: '#' },
    { label: 'Logout', href: '#' },
  ]

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex gap-3 sm:gap-6 overflow-x-auto text-sm">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
          >
            {item.label}
          </a>
        ))}
      </div>
      <button
        id="theme-toggle"
        className="shrink-0 ml-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-lg leading-none"
        aria-label="Toggle theme"
      >
        <span className="inline dark:hidden">🌙</span>
        <span className="hidden dark:inline">☀️</span>
      </button>
    </nav>
  )
}
