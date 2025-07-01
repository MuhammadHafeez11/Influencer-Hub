"use client"

import { motion } from "framer-motion"

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loader
