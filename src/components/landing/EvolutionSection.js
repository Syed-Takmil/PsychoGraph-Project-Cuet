'use client'
import { motion } from 'framer-motion'
import RadarChart from '@/components/RadarChart'
import { fadeUp, staggerContainer } from './animations'

export default function EvolutionSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-purple-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-purple-950/30 dark:to-gray-900">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeUp} className="text-purple-600 dark:text-purple-400 text-xs tracking-[0.2em] mb-4 uppercase">Subconscious Tracking</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-gray-800 dark:text-gray-100 mb-6 leading-tight">
            Monitor the variance, session by session.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
            Every subsequent test overlays a fresh geometric index over historical profiles. The variance between states surfaces genuine trends, isolating temporary noise from cyclical emotional loads.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-8 border-t border-purple-200 dark:border-purple-800/50 pt-8">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-3xl font-serif mb-1">+14%</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Agitation Delta</p>
            </div>
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-3xl font-serif mb-1">-22%</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Lethargy Trend</p>
            </div>
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-3xl font-serif mb-1">Quiet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Feedback Loop Mode</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <RadarChart layered />
        </motion.div>
      </div>
    </section>
  )
}
