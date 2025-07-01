"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const HeroSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
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
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 z-0"></div>

      {/* Animated Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-24 pb-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Connect with{" "}
              <span className="text-gradient bg-gradient-to-r from-pink-400 to-violet-400">Top Influencers</span> in
              Pakistan
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-xl text-gray-300 max-w-lg">
              Elevate your brand with authentic partnerships. Find the perfect influencer match for your business and
              create impactful campaigns.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link to="/influencers" className="btn-primary">
                Find Influencers
              </Link>
              <Link to="/register" className="btn-secondary">
                Join as Influencer
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="ml-4">
                <div className="text-amber-400 flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-sm">
                  Trusted by <span className="font-bold">500+</span> businesses
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src="/placeholder.png?height=600&width=600"
                alt="Influencer Hub Platform"
                className="w-full h-auto"
              />

              {/* Floating Stats Cards */}
              {/* <div className="absolute -left-10 top-10 bg-white rounded-lg shadow-xl p-4 animate-float">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-xs">Total Influencers</p>
                    <p className="font-bold text-xl">1,500+</p>
                  </div>
                </div>
              </div> */}

              {/* <div
                className="absolute -right-10 bottom-20 bg-white rounded-lg shadow-xl p-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-xs">Completed Campaigns</p>
                    <p className="font-bold text-xl">3,200+</p>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full opacity-50 blur-2xl"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-24"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
