"use client"

import { useEffect } from "react"

// Components
import HeroSection from "../components/landing/HeroSection"
import FeaturesSection from "../components/landing/FeaturesSection"
import HowItWorksSection from "../components/landing/HowItWorksSection"
import TopInfluencersSection from "../components/landing/TopInfluencersSection"
import TestimonialsSection from "../components/landing/TestimonialsSection"
import StatsSection from "../components/landing/StatsSection"
import CategoriesSection from "../components/landing/CategoriesSection"
import CTASection from "../components/landing/CTASection"
import BlogSection from "../components/landing/BlogSection"
import PartnersSection from "../components/landing/PartnersSection"

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TopInfluencersSection />
      <StatsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <BlogSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}

export default HomePage
