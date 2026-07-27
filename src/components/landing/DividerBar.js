export default function DividerBar() {
  return (
    <div className="w-full border-y border-purple-200 dark:border-purple-800/50 bg-purple-50/30 dark:bg-purple-950/30 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase whitespace-nowrap overflow-x-auto no-scrollbar gap-8">
        <span>Bypasses direct self-report biases</span>
        <span className="w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full shadow-md shadow-purple-500/20" />
        <span>Passive telemetry processing</span>
        <span className="w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full shadow-md shadow-purple-500/20" />
        <span>Cross-referenced inputs</span>
        <span className="w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full shadow-md shadow-purple-500/20" />
        <span>Six indices of cognitive friction</span>
      </div>
    </div>
  )
}
