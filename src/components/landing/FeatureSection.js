'use client'
import { motion } from 'framer-motion'
import RadarChart from '@/components/RadarChart'
import { fadeUp, staggerContainer } from './animations'

export default function FeatureSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-indigo-50/50 to-purple-50/30 dark:from-gray-900 dark:via-purple-950/50 dark:to-gray-900">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-start"
        >
          <RadarChart />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeUp} className="text-purple-600 dark:text-purple-400 text-xs tracking-[0.2em] mb-4 uppercase">The Shadow Matrix</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-gray-800 dark:text-gray-100 mb-6 leading-tight">
            One geometry. Six axes of tension.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
            Instead of a static label, your interactive polygon stretches and contracts based on psychological load parameters—offering objective visualization of systemic vulnerabilities.
          </motion.p>
          <motion.ul variants={staggerContainer} className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            {['Isolates behavioral noise from actual systemic fatigue.', 'Maps interaction asymmetry to emotional weight distributions.', 'Tracks dynamic shifts away from calibrated baseline structures.'].map((item, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
