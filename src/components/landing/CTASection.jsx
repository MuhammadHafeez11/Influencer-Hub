"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const CTASection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="text-gradient bg-gradient-to-r from-pink-300 to-violet-300">Influencer Marketing</span>?
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of businesses and influencers who are creating authentic partnerships and driving real
            results.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register?type=business"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Join as Business
            </Link>
            <Link
              to="/register?type=influencer"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Join as Influencer
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Free to join</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Verified profiles</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Secure payments</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
