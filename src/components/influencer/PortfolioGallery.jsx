"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const PortfolioGallery = ({ portfolio = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  if (portfolio.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-xl font-bold mb-2">No portfolio items yet</h3>
        <p className="text-gray-600">This influencer hasn't added any portfolio items.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => openModal(item)}
          >
            <div className="relative h-48">
              <img
                src={`/api/uploads/${item.url}` || "/placeholder.svg?height=300&width=300"}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg?height=300&width=300"
                }}
              />
              {item.mediaType === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">{item.mediaType}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-xl">{selectedItem.title}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-auto flex-grow">
                <div className="relative">
                  {selectedItem.mediaType === "video" ? (
                    <video
                      src={`/api/uploads/${selectedItem.url}`}
                      controls
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  ) : (
                    <img
                      src={`/api/uploads/${selectedItem.url}` || "/placeholder.svg?height=600&width=800"}
                      alt={selectedItem.title}
                      className="w-full h-auto max-h-[60vh] object-contain"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.svg?height=600&width=800"
                      }}
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Created: {new Date(selectedItem.createdAt).toLocaleDateString()}</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full capitalize">{selectedItem.mediaType}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioGallery
