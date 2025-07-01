"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Successful Influencer Campaigns in Pakistan",
    excerpt: "Learn how to create effective influencer marketing campaigns that resonate with Pakistani audiences.",
    image: "/blog.png?height=50&width=50",
    date: "May 15, 2023",
    author: "Ayesha Khan",
    category: "Marketing",
  },
  {
    id: 2,
    title: "How to Grow Your Social Media Following in 2023",
    excerpt: "Discover proven strategies to increase your social media presence and engagement this year.",
    image: "/blog.png?height=300&width=500",
    date: "April 28, 2023",
    author: "Hassan Ali",
    category: "Growth",
  },
  {
    id: 3,
    title: "The Rise of Micro-Influencers in Pakistan",
    excerpt: "Why brands are increasingly turning to micro-influencers for authentic engagement and better ROI.",
    image: "/blog.png?height=300&width=500",
    date: "April 10, 2023",
    author: "Fatima Zahra",
    category: "Trends",
  },
]

const BlogSection = () => {
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
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Latest from Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-violet-500">Blog</span>
          </h2>
          <p className="text-lg text-gray-600">
            Insights, tips, and trends in influencer marketing to help you stay ahead of the curve.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative">
                <img src={post.image || "/blog.png"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-white text-xs font-bold px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-pink-500 font-medium hover:text-pink-600 transition-colors duration-300"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/blog" className="btn-secondary inline-flex items-center">
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
