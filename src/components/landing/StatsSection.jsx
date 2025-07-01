"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const stats = [
  {
    value: 1500,
    label: "Influencers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    value: 500,
    label: "Businesses",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    value: 3200,
    label: "Campaigns",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    value: 25,
    suffix: "M+",
    label: "Audience Reach",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
]

const StatsSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    if (inView) {
      controls.start("visible")

      // Animate counters
      stats.forEach((stat, index) => {
        const target = stat.value
        const duration = 2000 // 2 seconds
        const frameDuration = 1000 / 60 // 60fps
        const totalFrames = Math.round(duration / frameDuration)
        const increment = target / totalFrames

        let currentCount = 0
        const counter = setInterval(() => {
          currentCount += increment
          if (currentCount >= target) {
            clearInterval(counter)
            setCounters((prev) => {
              const newCounters = [...prev]
              newCounters[index] = target
              return newCounters
            })
          } else {
            setCounters((prev) => {
              const newCounters = [...prev]
              newCounters[index] = Math.floor(currentCount)
              return newCounters
            })
          }
        }, frameDuration)
      })
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="text-gradient bg-gradient-to-r from-pink-300 to-violet-300">Impact</span> in Numbers
          </h2>
          <p className="text-lg text-gray-300">
            Influencer Hub has become Pakistan's leading platform for influencer marketing, connecting businesses with
            top content creators.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white mb-6 mx-auto">
                {stat.icon}
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">
                  {counters[index].toLocaleString()}
                  {stat.suffix || ""}
                </h3>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
