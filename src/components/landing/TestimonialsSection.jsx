"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const testimonials = [
  {
    id: 1,
    content:
      "Influencer Hub transformed our marketing strategy. We found the perfect influencers for our brand and saw a 300% increase in engagement. The verification process gave us confidence in our partnerships.",
    author: "Sarah Ahmed",
    position: "Marketing Director",
    company: "StylePk Fashion",
    image: "/brand4.png?height=100&width=100",
  },
  {
    id: 2,
    content:
      "As an influencer, this platform has connected me with amazing brands that align with my values. The booking system is seamless, and I love how the platform protects both parties throughout the collaboration.",
    author: "Hamza Khan",
    position: "Travel Influencer",
    company: "@hamza_travels",
    image: "/hasan-ali.jpg?height=100&width=100",
  },
  {
    id: 3,
    content:
      "Finding the right influencers used to be a nightmare. Influencer Hub's search filters and verification system made it incredibly easy to find authentic creators who truly resonated with our audience.",
    author: "Ayesha Malik",
    position: "CEO",
    company: "BeautyBox Pakistan",
    image: "/brand6.png?height=100&width=100",
  },
  {
    id: 4,
    content:
      "The real-time chat feature made communication effortless. We could quickly discuss campaign details, negotiate terms, and share content drafts all in one place. Highly recommended!",
    author: "Usman Ali",
    position: "Brand Manager",
    company: "TechZone",
    image: "/brand2.png?height=100&width=100",
  },
]

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-violet-500">Users Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Hear from businesses and influencers who have found success on our platform.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Large Quote Icon */}
            <div className="absolute -top-10 -left-10 text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 20,
                    position: activeIndex === index ? "relative" : "absolute",
                    zIndex: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <p className="text-xl md:text-2xl text-gray-700 italic mb-8">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-4 border-pink-100"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-bold">{testimonial.author}</h4>
                      <p className="text-gray-600">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                    activeIndex === index ? "bg-gradient-to-r from-pink-500 to-violet-500 w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
