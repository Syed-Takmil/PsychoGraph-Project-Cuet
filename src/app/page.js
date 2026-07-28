'use client'
import HeroSection from '@/components/landing/HeroSection'
import DividerBar from '@/components/landing/DividerBar'
import StepsSection from '@/components/landing/StepsSection'
import FeatureSection from '@/components/landing/FeatureSection'
import DimensionsSection from '@/components/landing/DimensionsSection'
import EvolutionSection from '@/components/landing/EvolutionSection'
import FooterCTA from '@/components/landing/FooterCTA'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 text-gray-700 dark:text-gray-200 font-sans selection:bg-purple-400 selection:text-white overflow-hidden">
      <main>
        <HeroSection />
        <DividerBar />
        <StepsSection />
        <FeatureSection />
        <DimensionsSection />
        <EvolutionSection />
        <FooterCTA />
      </main>
    </div>
  )
}
