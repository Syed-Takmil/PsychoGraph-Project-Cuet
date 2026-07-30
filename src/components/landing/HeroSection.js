'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'
import RadarChart from '@/components/RadarChart'
import { fadeUp, staggerContainer } from './animations'

export default function HeroSection() {
  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
        <motion.p variants={fadeUp} className="text-purple-600 dark:text-purple-400 text-xs tracking-[0.2em] font-semibold mb-6 uppercase">
          An Implicit Behavioral Mirror
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif leading-[1.1] text-gray-800 dark:text-gray-100 mb-6">
          See the <span className="text-purple-600 dark:text-purple-400 italic">topology</span><br /> of your distress.
        </motion.h1>
        <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
          Psychograph bypasses biased, direct self-reporting questions. By tracking micro-journaling cadence, visual resonance, and real-time interaction biometrics, it reveals your subconscious shape.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <Link href='/clickAccuracy'><Button>Begin assessment pipeline</Button></Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex justify-center"
      >
        <RadarChart />
      </motion.div>
    </section>
  )
}
