'use client'

export default function Dialog({ open, onClose, onAccept, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[80vh] bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed p-6 overflow-y-auto">
          {children}
          <button
            onClick={() => { onAccept?.(); onClose?.() }}
            className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  )
}
