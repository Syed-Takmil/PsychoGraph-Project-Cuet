'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from './animations'

const steps = [
  { num: '01', title: 'Micro-Journaling Text', desc: 'Write freely under structural linguistic frames. An NLP semantic engine analyzes emotional undertone and syntax distribution patterns.' },
  { num: '02', title: 'Behavioral Metaphor Tasks', desc: 'Short, interactive mini-games capture fine-motor biometrics. Speed, click inaccuracy, and jitter reveal system excitation limits.' },
  { num: '03', title: 'Sub-Surface Telemetry', desc: 'The platform subtly measures interface friction, parsing timing signals, click anomalies, and user attention distribution spikes.' },
  { num: '04', title: 'Dynamic Cross-Referencing', desc: 'Your metrics pass through an engine to cross-validate variables—separating simple fatigue from active baseline distress patterns.' },
]

export default function StepsSection() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="mb-16">
        <p className="text-purple-600 dark:text-purple-400 text-xs tracking-[0.2em] mb-4 uppercase">The Pipeline</p>
        <h2 className="text-3xl md:text-5xl font-serif text-gray-800 dark:text-gray-100 max-w-xl leading-tight">
          Four passive signals from interaction to insight.
        </h2>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="grid md:grid-cols-2 gap-x-12 gap-y-16"
      >
        {steps.map((step) => (
          <motion.div key={step.num} variants={fadeUp} className="relative pt-6 border-t border-purple-200 dark:border-purple-800/50">
            <span className="absolute top-[-14px] left-0 text-xs text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-gray-900/60 pr-2">{step.num}</span>
            <h3 className="text-xl text-gray-700 dark:text-gray-200 mb-3">{step.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
