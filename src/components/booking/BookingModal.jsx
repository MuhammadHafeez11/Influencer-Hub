"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { createBooking } from "../../redux/actions/bookingActions"
import { BOOKING_CREATE_RESET } from "../../redux/constants/bookingConstants"
import Message from "../common/Message"
import Loader from "../common/Loader"

const BookingModal = ({ isOpen, onClose, influencer }) => {
  const dispatch = useDispatch()
  const [platform, setPlatform] = useState("")
  const [contentType, setContentType] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [price, setPrice] = useState(0)

  const { loading, error, success } = useSelector((state) => state.bookingCreate)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: BOOKING_CREATE_RESET })
        onClose()
      }, 2000)
    }
  }, [success, dispatch, onClose])

  useEffect(() => {
    if (platform && contentType && influencer?.pricing) {
      const platformPricing = influencer.pricing[platform.toLowerCase()]
      if (platformPricing && platformPricing[contentType.toLowerCase()]) {
        setPrice(platformPricing[contentType.toLowerCase()])
      } else {
        setPrice(0)
      }
    } else {
      setPrice(0)
    }
  }, [platform, contentType, influencer])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createBooking({
        influencer: influencer._id,
        platform,
        contentType,
        description,
        startDate,
        endDate,
        price,
      }),
    )
  }

  const getContentTypeOptions = () => {
    if (!platform || !influencer?.pricing) return []

    const platformPricing = influencer.pricing[platform.toLowerCase()]
    if (!platformPricing) return []

    return Object.keys(platformPricing).map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      price: platformPricing[type],
    }))
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl overflow-hidden max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Book {influencer?.name}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
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
          </div>

          <div className="p-6">
            {error && <Message variant="error">{error}</Message>}
            {success && <Message variant="success">Booking created successfully!</Message>}

            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="platform" className="block text-gray-700 font-medium mb-2">
                    Platform
                  </label>
                  <select
                    id="platform"
                    value={platform}
                    onChange={(e) => {
                      setPlatform(e.target.value)
                      setContentType("")
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="">Select Platform</option>
                    {influencer?.pricing &&
                      Object.keys(influencer.pricing).map((platform) => (
                        <option key={platform} value={platform}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="contentType" className="block text-gray-700 font-medium mb-2">
                    Content Type
                  </label>
                  <select
                    id="contentType"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                    disabled={!platform}
                  >
                    <option value="">Select Content Type</option>
                    {getContentTypeOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {formatPrice(option.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                    Campaign Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Describe your campaign requirements, goals, and any specific instructions..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Price:</span>
                    <span className="text-xl font-bold">{formatPrice(price)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    By proceeding, you agree to our terms and conditions for booking influencers.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingModal
