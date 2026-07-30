'use client'
import { useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { fadeUp } from './animations'

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function FooterCTA() {
  const { isAuthenticated } = useAuth()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  return (
    <section className="py-40 px-6 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-gray-800 dark:text-gray-100 mb-6">
          Initialize telemetry <br /><span className="text-purple-600 dark:text-purple-400 italic">mapping pipeline</span>.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">No account required to extract initial balance parameters.<br />Save generated models locally or persist to a decentralized baseline map.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={mounted && isAuthenticated ? '/clickAccuracy' : '/signup'}><Button>Begin parsing sequences</Button></Link>
        </div>
      </motion.div>
    </section>
  )
}
