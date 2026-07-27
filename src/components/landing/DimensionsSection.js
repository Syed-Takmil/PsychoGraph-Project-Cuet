'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from './animations'

const dimensions = [
  { name: 'Neutral', desc: 'Balanced baseline metrics indicating regulated emotional processing.', level: 55 },
  { name: 'Happy', desc: 'Elevated positive affect markers and approach-oriented interaction patterns.', level: 65 },
  { name: 'Calm', desc: 'Low autonomic arousal indicators with measured response velocities.', level: 70 },
  { name: 'Sad', desc: 'Linguistic and behavioral markers of low-valence sentiment processing.', level: 45 },
  { name: 'Angry', desc: 'High-arousal negative affect signals with elevated friction indices.', level: 40 },
]

export default function DimensionsSection() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
        <p className="text-purple-600 dark:text-purple-400 text-xs tracking-[0.2em] mb-4 uppercase">Friction Vertices</p>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 dark:text-gray-100 max-w-lg leading-tight">
          Quantifiable mapping for hidden internal loads.
        </h2>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dimensions.map((dim) => (
          <motion.div key={dim.name} variants={fadeUp} className="p-6 bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 hover:shadow-purple-500/10 transition-shadow">
            <h3 className="text-gray-800 dark:text-gray-100 text-lg mb-2">{dim.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 min-h-[40px]">{dim.desc}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${dim.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 h-full rounded-full shadow-md shadow-purple-500/20"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
