"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import influencersData from "../components/data/influencer-hub.influencers.json"
import axios from 'axios'

const InfluencerProfilePage = () => {
  const { id } = useParams()
  const [influencer, setInfluencer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    platform: "",
    contentType: "",
    campaignDetails: "",
    budget: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  })

  useEffect(() => {
    console.log(id)
    setLoading(true)
    setTimeout(() => {
      const foundInfluencer = influencersData.find((inf) => inf.id == id)
      console.log(foundInfluencer)
      setInfluencer(foundInfluencer)
      setLoading(false)
    }, 500)
  }, [id])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Format followers count
  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        )
      case "youtube":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        )
      case "tiktok":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        )
      case "facebook":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case "twitter":
      case "x":
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 12c0-3.037-1.232-5.789-3.222-7.778S15.037 1 12 1 6.211 2.232 4.222 4.222 1 8.963 1 12s1.232 5.789 3.222 7.778S8.963 23 12 23s5.789-1.232 7.778-3.222S23 15.037 23 12zm-2.142 0c0 4.89-3.968 8.858-8.858 8.858S3.142 16.89 3.142 12 7.11 3.142 12 3.142 20.858 7.11 20.858 12zM12 6.713c-1.791 0-3.243 1.452-3.243 3.243 0 1.791 1.452 3.243 3.243 3.243 1.791 0 3.243-1.452 3.243-3.243 0-1.791-1.452-3.243-3.243-3.243zm0 8.486c-3.041 0-5.512 1.52-5.512 3.395v.392c1.576 1.317 3.5 2.014 5.512 2.014s3.936-.697 5.512-2.014v-.392c0-1.875-2.47-3.395-5.512-3.395z" />
          </svg>
        )
    }
  }

  // Handle form submission
  const handleSubmitRequest = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Validate required fields
    if (
      !formData.platform ||
      !formData.contentType ||
      !formData.campaignDetails ||
      !formData.budget ||
      !formData.clientName ||
      !formData.clientEmail
    ) {
      setSubmitError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.clientEmail)) {
      setSubmitError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    // Validate budget
    if (formData.budget < 1000) {
      setSubmitError("Budget must be at least PKR 1,000")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/api/bookings", 
        {
          influencerId: id,
          influencerName: influencer.name,
          platform: formData.platform,
          contentType: formData.contentType,
          campaignDetails: formData.campaignDetails,
          budget: (formData.budget),
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          notes: formData.notes,
        },
      )

      const data = await response.data

      if (data.success) {
        // Close the booking modal
        setShowBookingModal(false)
        // Reset form
        setFormData({
          platform: "",
          contentType: "",
          campaignDetails: "",
          budget: "",
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          notes: "",
        })
        // Show success popup
        setShowSuccessPopup(true)
        // Hide success popup after 4 seconds
        setTimeout(() => {
          setShowSuccessPopup(false)
        }, 4000)
      } else {
        setSubmitError(data.message || "Failed to submit booking request")
      }
    } catch (error) {
      console.error("Error submitting booking request:", error)
      setSubmitError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Influencer Not Found</h3>
          <p className="text-gray-600 mb-6">The influencer you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            Back to Influencers
          </Link>
        </div>
      </div>
    )
  }

  // Calculate total followers across all platforms
  const totalFollowers = influencer.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)

  // Get the primary social media platform (highest followers)
  const primaryPlatform = influencer.socialMedia.reduce(
    (max, platform) => (platform.followers > max.followers ? platform : max),
    influencer.socialMedia[0],
  )

  // Calculate average engagement rate
  const avgEngagementRate =
    influencer.socialMedia.reduce((sum, platform) => sum + (platform.engagement || 0), 0) /
    influencer.socialMedia.length

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Influencers
          </Link>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
        >
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-900 to-pink-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <img
                  src="/placeholder.png?height=300&width=300"
                  alt={influencer.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {influencer.socialMedia.some((platform) => platform.verified) && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="absolute bottom-4 right-8 flex space-x-2">
              {influencer.socialMedia.map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    platform.platform.toLowerCase() === "instagram"
                      ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
                      : platform.platform.toLowerCase() === "youtube"
                        ? "bg-red-600"
                        : platform.platform.toLowerCase() === "tiktok"
                          ? "bg-black"
                          : platform.platform.toLowerCase() === "facebook"
                            ? "bg-blue-600"
                            : platform.platform.toLowerCase() === "twitter" || platform.platform.toLowerCase() === "x"
                              ? "bg-black"
                              : "bg-gray-700"
                  }`}
                >
                  {getPlatformIcon(platform.platform)}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-20 pb-8 px-8 md:px-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl font-bold mr-3">{influencer.name}</h1>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{influencer.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {influencer.location?.city}, {influencer.location?.country}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {influencer.categories?.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Now
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Stats & Info</h3>
              <div className="space-y-6">
                {/* Total Followers */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Total Followers</h4>
                    <p className="text-2xl font-bold">{formatFollowers(totalFollowers)}</p>
                  </div>
                </div>

                {/* Social Media Platforms */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Social Media</h4>
                  {influencer.socialMedia.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
                            platform.platform.toLowerCase() === "instagram"
                              ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
                              : platform.platform.toLowerCase() === "youtube"
                                ? "bg-red-600"
                                : platform.platform.toLowerCase() === "tiktok"
                                  ? "bg-black"
                                  : platform.platform.toLowerCase() === "facebook"
                                    ? "bg-blue-600"
                                    : platform.platform.toLowerCase() === "twitter" ||
                                        platform.platform.toLowerCase() === "x"
                                      ? "bg-black"
                                      : "bg-gray-700"
                          }`}
                        >
                          {getPlatformIcon(platform.platform)}
                        </div>
                        <span className="font-medium capitalize">{platform.platform}</span>
                      </div>
                      <span className="font-bold">{formatFollowers(platform.followers)}</span>
                    </div>
                  ))}
                </div>

                {/* Engagement Rate */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Avg. Engagement Rate</h4>
                    <p className="text-2xl font-bold">{avgEngagementRate.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Languages</h4>
                    <p className="font-medium">{influencer.languages?.join(", ")}</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Experience</h4>
                    <p className="font-medium">3 years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Pricing</h3>
              {influencer.pricing && Object.keys(influencer.pricing).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(influencer.pricing).map(([platform, rates]) => (
                    <div key={platform} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
                            platform.toLowerCase() === "instagram"
                              ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
                              : platform.toLowerCase() === "youtube"
                                ? "bg-red-600"
                                : platform.toLowerCase() === "tiktok"
                                  ? "bg-black"
                                  : platform.toLowerCase() === "facebook"
                                    ? "bg-blue-600"
                                    : platform.toLowerCase() === "twitter" || platform.toLowerCase() === "x"
                                      ? "bg-black"
                                      : "bg-gray-700"
                          }`}
                        >
                          {getPlatformIcon(platform)}
                        </div>
                        <h4 className="font-semibold capitalize">{platform}</h4>
                      </div>
                      <div className="space-y-2 pl-11">
                        {Object.entries(rates).map(([contentType, price]) => (
                          <div key={contentType} className="flex justify-between">
                            <span className="text-gray-700 capitalize">{contentType}</span>
                            <span className="font-bold">{formatPrice(price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-600">No pricing information available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Content Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "about"
                      ? "text-pink-600 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "portfolio"
                      ? "text-pink-600 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "reviews"
                      ? "text-pink-600 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4">About {influencer.name}</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-6">{influencer.bio}</p>
                      <p className="text-gray-700 mb-4">
                        With 3 years of experience in content creation, {influencer.name} has established a strong
                        presence across multiple social media platforms, specializing in{" "}
                        {influencer.categories?.join(", ")}.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Known for authentic and engaging content, {influencer.name} has successfully collaborated with
                        numerous brands to create impactful campaigns that resonate with their audience.
                      </p>
                      <p className="text-gray-700">
                        Based in {influencer.location?.city}, {influencer.location?.country}, {influencer.name} is
                        fluent in {influencer.languages?.join(", ")} and brings a unique perspective to every project.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "portfolio" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Portfolio</h3>
                    {influencer.portfolio && influencer.portfolio.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {influencer.portfolio.map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                              <img
                                src="/placeholder.svg?height=300&width=500"
                                alt={item.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400 mb-4"
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
                        <p className="text-gray-600 mb-2">No portfolio items available yet</p>
                        <p className="text-gray-500 text-sm">Check back soon for updates!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-medium">{influencer.rating}</span>
                        </div>
                        <span className="text-gray-500">({influencer.totalReviews} reviews)</span>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-medium">Client {index + 1}</h4>
                                <div className="flex text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-gray-500 text-sm">2 months ago</span>
                          </div>
                          <p className="text-gray-700">
                            {index === 0 &&
                              "Working with " +
                                influencer.name +
                                " was an absolute pleasure! Their creativity and professionalism exceeded our expectations. The content they created for our brand was engaging and perfectly aligned with our vision."}
                            {index === 1 &&
                              "Excellent communication throughout the project. " +
                                influencer.name +
                                " delivered high-quality content on time and was very responsive to feedback. Would definitely work with them again!"}
                            {index === 2 &&
                              "The campaign with " +
                                influencer.name +
                                " drove significant engagement and helped us reach our target audience effectively. Their authentic approach to content creation really resonated with viewers."}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmitRequest}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Book {influencer.name}</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Fill out the form below to book a collaboration with {influencer.name}. We'll get back to you
                          within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{submitError}</div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="clientName"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="clientEmail"
                          name="clientEmail"
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="clientPhone"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="+92 300 1234567"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
                          Platform *
                        </label>
                        <select
                          id="platform"
                          name="platform"
                          value={formData.platform}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Select Platform</option>
                          {influencer.socialMedia.map((platform, index) => (
                            <option key={index} value={platform.platform.toLowerCase()}>
                              {platform.platform}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                          Content Type *
                        </label>
                        <select
                          id="contentType"
                          name="contentType"
                          value={formData.contentType}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Select Content Type</option>
                          <option value="post">Post</option>
                          <option value="story">Story</option>
                          <option value="reel">Reel</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                        Budget (PKR) *
                      </label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        min="1000"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your budget (minimum PKR 1,000)"
                      />
                    </div>

                    <div>
                      <label htmlFor="campaignDetails" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Details *
                      </label>
                      <textarea
                        id="campaignDetails"
                        name="campaignDetails"
                        value={formData.campaignDetails}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Describe your campaign, requirements, timeline, and any specific instructions..."
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Any additional information or special requests..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    disabled={isSubmitting}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
          >
            <div className="mt-6 bg-white rounded-lg shadow-xl border-l-4 border-green-500 overflow-hidden max-w-md w-full mx-4">
              <div className="p-4 flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Booking Request Sent!</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your booking request for {influencer.name} has been sent successfully. We'll get back to you within
                    24-48 hours.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowSuccessPopup(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InfluencerProfilePage

// "use client"

// import { useState, useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import influencersData from "../components/data/influencer-hub.influencers.json"

// const InfluencerProfilePage = () => {
//   const { id } = useParams()
//   const [influencer, setInfluencer] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("about")
//   const [showBookingModal, setShowBookingModal] = useState(false)
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false)

//   useEffect(() => {
//     console.log(id)

//     // Simulate API call with a small delay
//     setLoading(true)
//     setTimeout(() => {
//       const foundInfluencer = influencersData.find((inf) => inf.id == id)
//       console.log(foundInfluencer)

//       setInfluencer(foundInfluencer)
//       setLoading(false)
//     }, 500)
//   }, [id])

//   // Format followers count
//   const formatFollowers = (count) => {
//     if (count >= 1000000) {
//       return (count / 1000000).toFixed(1) + "M"
//     } else if (count >= 1000) {
//       return (count / 1000).toFixed(1) + "K"
//     }
//     return count
//   }

//   // Format price
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-PK", {
//       style: "currency",
//       currency: "PKR",
//       minimumFractionDigits: 0,
//     }).format(price)
//   }

//   // Get platform icon
//   const getPlatformIcon = (platform) => {
//     switch (platform.toLowerCase()) {
//       case "instagram":
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//           </svg>
//         )
//       case "youtube":
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//           </svg>
//         )
//       case "tiktok":
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
//           </svg>
//         )
//       case "facebook":
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//           </svg>
//         )
//       case "twitter":
//       case "x":
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//           </svg>
//         )
//       default:
//         return (
//           <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M23 12c0-3.037-1.232-5.789-3.222-7.778S15.037 1 12 1 6.211 2.232 4.222 4.222 1 8.963 1 12s1.232 5.789 3.222 7.778S8.963 23 12 23s5.789-1.232 7.778-3.222S23 15.037 23 12zm-2.142 0c0 4.89-3.968 8.858-8.858 8.858S3.142 16.89 3.142 12 7.11 3.142 12 3.142 20.858 7.11 20.858 12zM12 6.713c-1.791 0-3.243 1.452-3.243 3.243 0 1.791 1.452 3.243 3.243 3.243 1.791 0 3.243-1.452 3.243-3.243 0-1.791-1.452-3.243-3.243-3.243zm0 8.486c-3.041 0-5.512 1.52-5.512 3.395v.392c1.576 1.317 3.5 2.014 5.512 2.014s3.936-.697 5.512-2.014v-.392c0-1.875-2.47-3.395-5.512-3.395z" />
//           </svg>
//         )
//     }
//   }

//   const handleSubmitRequest = () => {
//     // Close the booking modal
//     setShowBookingModal(false)
//     // Show the success popup
//     setShowSuccessPopup(true)
//     // Hide the success popup after 4 seconds
//     setTimeout(() => {
//       setShowSuccessPopup(false)
//     }, 4000)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
//       </div>
//     )
//   }

//   if (!influencer) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 mx-auto text-gray-400 mb-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="text-xl font-bold mb-2">Influencer Not Found</h3>
//           <p className="text-gray-600 mb-6">The influencer you're looking for doesn't exist or has been removed.</p>
//           <Link
//             to="/"
//             className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
//           >
//             Back to Influencers
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Calculate total followers across all platforms
//   const totalFollowers = influencer.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)

//   // Get the primary social media platform (highest followers)
//   const primaryPlatform = influencer.socialMedia.reduce(
//     (max, platform) => (platform.followers > max.followers ? platform : max),
//     influencer.socialMedia[0],
//   )

//   // Calculate average engagement rate
//   const avgEngagementRate =
//     influencer.socialMedia.reduce((sum, platform) => sum + (platform.engagement || 0), 0) /
//     influencer.socialMedia.length

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-16">
//       <div className="container mx-auto px-4">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link to="/" className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Influencers
//           </Link>
//         </div>

//         {/* Profile Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
//         >
//           <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-900 to-pink-800">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
//               <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
//             </div>

//             {/* Profile Image */}
//             <div className="absolute -bottom-16 left-8 md:left-12">
//               <div className="relative">
//                 <img
//                   src="/placeholder.png?height=300&width=300"
//                   alt={influencer.name}
//                   className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
//                 />
//                 {influencer.socialMedia.some((platform) => platform.verified) && (
//                   <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path
//                         fillRule="evenodd"
//                         d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Social Media Links */}
//             <div className="absolute bottom-4 right-8 flex space-x-2">
//               {influencer.socialMedia.map((platform, index) => (
//                 <a
//                   key={index}
//                   href={platform.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
//                     platform.platform.toLowerCase() === "instagram"
//                       ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
//                       : platform.platform.toLowerCase() === "youtube"
//                         ? "bg-red-600"
//                         : platform.platform.toLowerCase() === "tiktok"
//                           ? "bg-black"
//                           : platform.platform.toLowerCase() === "facebook"
//                             ? "bg-blue-600"
//                             : platform.platform.toLowerCase() === "twitter" || platform.platform.toLowerCase() === "x"
//                               ? "bg-black"
//                               : "bg-gray-700"
//                   }`}
//                 >
//                   {getPlatformIcon(platform.platform)}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="pt-20 pb-8 px-8 md:px-12">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-end">
//               <div>
//                 <div className="flex items-center mb-2">
//                   <h1 className="text-3xl font-bold mr-3">{influencer.name}</h1>
//                   <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-yellow-500 mr-1"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span className="font-medium">{influencer.rating}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <span>
//                     {influencer.location?.city}, {influencer.location?.country}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {influencer.categories?.map((category, index) => (
//                     <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowBookingModal(true)}
//                 className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-2"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Stats & Info */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//               <h3 className="text-xl font-bold mb-6">Stats & Info</h3>

//               <div className="space-y-6">
//                 {/* Total Followers */}
//                 <div className="flex items-start">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-700">Total Followers</h4>
//                     <p className="text-2xl font-bold">{formatFollowers(totalFollowers)}</p>
//                   </div>
//                 </div>

//                 {/* Social Media Platforms */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-700">Social Media</h4>
//                   {influencer.socialMedia.map((platform, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
//                             platform.platform.toLowerCase() === "instagram"
//                               ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
//                               : platform.platform.toLowerCase() === "youtube"
//                                 ? "bg-red-600"
//                                 : platform.platform.toLowerCase() === "tiktok"
//                                   ? "bg-black"
//                                   : platform.platform.toLowerCase() === "facebook"
//                                     ? "bg-blue-600"
//                                     : platform.platform.toLowerCase() === "twitter" ||
//                                         platform.platform.toLowerCase() === "x"
//                                       ? "bg-black"
//                                       : "bg-gray-700"
//                           }`}
//                         >
//                           {getPlatformIcon(platform.platform)}
//                         </div>
//                         <span className="font-medium capitalize">{platform.platform}</span>
//                       </div>
//                       <span className="font-bold">{formatFollowers(platform.followers)}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Engagement Rate */}
//                 <div className="flex items-start">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-700">Avg. Engagement Rate</h4>
//                     <p className="text-2xl font-bold">{avgEngagementRate.toFixed(1)}%</p>
//                   </div>
//                 </div>

//                 {/* Languages */}
//                 <div className="flex items-start">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-700">Languages</h4>
//                     <p className="font-medium">{influencer.languages?.join(", ")}</p>
//                   </div>
//                 </div>

//                 {/* Experience */}
//                 <div className="flex items-start">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-4">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-700">Experience</h4>
//                     <p className="font-medium">3 years</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-6">Pricing</h3>

//               {influencer.pricing && Object.keys(influencer.pricing).length > 0 ? (
//                 <div className="space-y-6">
//                   {Object.entries(influencer.pricing).map(([platform, rates]) => (
//                     <div key={platform} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
//                       <div className="flex items-center mb-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
//                             platform.toLowerCase() === "instagram"
//                               ? "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500"
//                               : platform.toLowerCase() === "youtube"
//                                 ? "bg-red-600"
//                                 : platform.toLowerCase() === "tiktok"
//                                   ? "bg-black"
//                                   : platform.toLowerCase() === "facebook"
//                                     ? "bg-blue-600"
//                                     : platform.toLowerCase() === "twitter" || platform.toLowerCase() === "x"
//                                       ? "bg-black"
//                                       : "bg-gray-700"
//                           }`}
//                         >
//                           {getPlatformIcon(platform)}
//                         </div>
//                         <h4 className="font-semibold capitalize">{platform}</h4>
//                       </div>

//                       <div className="space-y-2 pl-11">
//                         {Object.entries(rates).map(([contentType, price]) => (
//                           <div key={contentType} className="flex justify-between">
//                             <span className="text-gray-700 capitalize">{contentType}</span>
//                             <span className="font-bold">{formatPrice(price)}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}

//                   <div className="mt-6">
//                     <button
//                       onClick={() => setShowBookingModal(true)}
//                       className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-12 w-12 mx-auto text-gray-400 mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <p className="text-gray-600">No pricing information available</p>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Right Column - Content Tabs */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               {/* Tabs */}
//               <div className="flex border-b border-gray-200">
//                 <button
//                   onClick={() => setActiveTab("about")}
//                   className={`flex-1 py-4 px-6 text-center font-medium ${
//                     activeTab === "about"
//                       ? "text-pink-600 border-b-2 border-pink-500"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   About
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("portfolio")}
//                   className={`flex-1 py-4 px-6 text-center font-medium ${
//                     activeTab === "portfolio"
//                       ? "text-pink-600 border-b-2 border-pink-500"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   Portfolio
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("reviews")}
//                   className={`flex-1 py-4 px-6 text-center font-medium ${
//                     activeTab === "reviews"
//                       ? "text-pink-600 border-b-2 border-pink-500"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   Reviews
//                 </button>
//               </div>

//               {/* Tab Content */}
//               <div className="p-6">
//                 {activeTab === "about" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <h3 className="text-xl font-bold mb-4">About {influencer.name}</h3>
//                     <div className="prose max-w-none">
//                       <p className="text-gray-700 mb-6">{influencer.bio}</p>

//                       <p className="text-gray-700 mb-4">
//                         With 3 years of experience in content creation, {influencer.name} has established a strong
//                         presence across multiple social media platforms, specializing in{" "}
//                         {influencer.categories?.join(", ")}.
//                       </p>
//                       <p className="text-gray-700 mb-4">
//                         Known for authentic and engaging content, {influencer.name} has successfully collaborated with
//                         numerous brands to create impactful campaigns that resonate with their audience.
//                       </p>
//                       <p className="text-gray-700">
//                         Based in {influencer.location?.city}, {influencer.location?.country}, {influencer.name} is
//                         fluent in {influencer.languages?.join(", ")} and brings a unique perspective to every project.
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {activeTab === "portfolio" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <h3 className="text-xl font-bold mb-6">Portfolio</h3>

//                     {influencer.portfolio && influencer.portfolio.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {influencer.portfolio.map((item, index) => (
//                           <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
//                             <div className="aspect-w-16 aspect-h-9 bg-gray-200">
//                               <img
//                                 src="/placeholder.svg?height=300&width=500"
//                                 alt={item.title}
//                                 className="object-cover w-full h-full"
//                               />
//                             </div>
//                             <div className="p-4">
//                               <h4 className="font-bold text-lg mb-1">{item.title}</h4>
//                               <p className="text-gray-600 text-sm">{item.description}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-12 w-12 mx-auto text-gray-400 mb-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         <p className="text-gray-600 mb-2">No portfolio items available yet</p>
//                         <p className="text-gray-500 text-sm">Check back soon for updates!</p>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 {activeTab === "reviews" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="flex justify-between items-center mb-6">
//                       <h3 className="text-xl font-bold">Reviews</h3>
//                       <div className="flex items-center">
//                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full mr-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-yellow-500 mr-1"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <span className="font-medium">{influencer.rating}</span>
//                         </div>
//                         <span className="text-gray-500">({influencer.totalReviews} reviews)</span>
//                       </div>
//                     </div>

//                     {/* Sample Reviews */}
//                     <div className="space-y-6">
//                       {[...Array(3)].map((_, index) => (
//                         <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
//                           <div className="flex justify-between mb-2">
//                             <div className="flex items-center">
//                               <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500">
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   className="h-6 w-6"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                                   />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <h4 className="font-medium">Client {index + 1}</h4>
//                                 <div className="flex text-yellow-500">
//                                   {[...Array(5)].map((_, i) => (
//                                     <svg
//                                       key={i}
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       className="h-4 w-4"
//                                       viewBox="0 0 20 20"
//                                       fill="currentColor"
//                                     >
//                                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                     </svg>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                             <span className="text-gray-500 text-sm">2 months ago</span>
//                           </div>
//                           <p className="text-gray-700">
//                             {index === 0 &&
//                               "Working with " +
//                                 influencer.name +
//                                 " was an absolute pleasure! Their creativity and professionalism exceeded our expectations. The content they created for our brand was engaging and perfectly aligned with our vision."}
//                             {index === 1 &&
//                               "Excellent communication throughout the project. " +
//                                 influencer.name +
//                                 " delivered high-quality content on time and was very responsive to feedback. Would definitely work with them again!"}
//                             {index === 2 &&
//                               "The campaign with " +
//                                 influencer.name +
//                                 " drove significant engagement and helped us reach our target audience effectively. Their authentic approach to content creation really resonated with viewers."}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {showBookingModal && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//               &#8203;
//             </span>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-pink-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900">Book {influencer.name}</h3>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">
//                         Fill out the form below to book a collaboration with {influencer.name}. We'll get back to you
//                         within 24-48 hours.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 space-y-4">
//                   <div>
//                     <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
//                       Platform
//                     </label>
//                     <select
//                       id="platform"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                     >
//                       <option value="">Select Platform</option>
//                       {influencer.socialMedia.map((platform, index) => (
//                         <option key={index} value={platform.platform}>
//                           {platform.platform}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-1">
//                       Content Type
//                     </label>
//                     <select
//                       id="content-type"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                     >
//                       <option value="">Select Content Type</option>
//                       <option value="post">Post</option>
//                       <option value="story">Story</option>
//                       <option value="reel">Reel</option>
//                       <option value="video">Video</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label htmlFor="campaign-details" className="block text-sm font-medium text-gray-700 mb-1">
//                       Campaign Details
//                     </label>
//                     <textarea
//                       id="campaign-details"
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                       placeholder="Describe your campaign and requirements..."
//                     ></textarea>
//                   </div>
//                   <div>
//                     <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
//                       Budget (PKR)
//                     </label>
//                     <input
//                       type="number"
//                       id="budget"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                       placeholder="Enter your budget"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={handleSubmitRequest}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Submit Request
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowBookingModal(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Popup */}
//       <AnimatePresence>
//         {showSuccessPopup && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-0 left-0 right-0 z-50 flex justify-center"
//           >
//             <div className="mt-6 bg-white rounded-lg shadow-xl border-l-4 border-green-500 overflow-hidden max-w-md w-full mx-4">
//               <div className="p-4 flex items-start">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-6 w-6 text-green-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-3 w-0 flex-1">
//                   <h3 className="text-lg font-medium text-gray-900">Booking Request Sent!</h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Your booking request for {influencer.name} has been sent successfully. We'll get back to you within
//                     24-48 hours.
//                   </p>
//                 </div>
//                 <div className="ml-4 flex-shrink-0 flex">
//                   <button
//                     className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
//                     onClick={() => setShowSuccessPopup(false)}
//                   >
//                     <span className="sr-only">Close</span>
//                     <svg
//                       className="h-5 w-5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default InfluencerProfilePage