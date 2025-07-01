"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const partners = [
  { name: "Brand 1", logo: "/brand1.png?height=150&width=160" },
  { name: "Brand 2", logo: "/brand2.png?height=150&width=160" },
  { name: "Brand 3", logo: "/brand3.png?height=150&width=160" },
  { name: "Brand 4", logo: "/brand4.png?height=150&width=160" },
  { name: "Brand 5", logo: "/brand5.png?height=150&width=160" },
  { name: "Brand 6", logo: "/brand6.png?height=150&width=160" },
]

const PartnersSection = () => {
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
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Leading{" "}
            <span className="text-gradient bg-gradient-to-r from-pink-500 to-violet-500">Brands</span>
          </h2>
          <p className="text-gray-600">
            Join hundreds of businesses that have successfully partnered with influencers through our platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center justify-center p-4">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-16 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection
