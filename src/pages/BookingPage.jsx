"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { listBookings, updateBookingStatus } from "../redux/actions/bookingActions"
import Loader from "../components/common/Loader"
import Message from "../components/common/Message"

const BookingPage = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("all")

  // SAFE SELECTORS WITH FALLBACK
  const userLogin = useSelector((state) => state.userLogin) || {}
  const { userInfo } = userLogin

  const bookingList = useSelector((state) => state.bookingList) || {}
  const { loading = false, error = null, bookings = [] } = bookingList

  const bookingUpdate = useSelector((state) => state.bookingUpdate) || {}
  const { loading: loadingUpdate = false, success: successUpdate = false } = bookingUpdate

  useEffect(() => {
    dispatch(listBookings())
  }, [dispatch, successUpdate])

  const handleStatusChange = (id, status) => {
    if (window.confirm(`Are you sure you want to mark this booking as ${status}?`)) {
      dispatch(updateBookingStatus(id, status))
    }
  }

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">
              Manage your {userInfo?.role === "influencer" ? "campaign requests" : "influencer bookings"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex overflow-x-auto">
            {["all", "pending", "accepted", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "text-pink-600 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              {activeTab === "all" ? "You don't have any bookings yet." : `You don't have any ${activeTab} bookings.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img
                        src={
                          userInfo?.role === "influencer"
                            ? booking.business?.avatar
                              ? `/api/uploads/${booking.business.avatar}`
                              : "/placeholder.svg?height=50&width=50"
                            : booking.influencer?.avatar
                            ? `/api/uploads/${booking.influencer.avatar}`
                            : "/placeholder.svg?height=50&width=50"
                        }
                        alt={userInfo?.role === "influencer" ? booking.business?.name : booking.influencer?.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=50&width=50"
                        }}
                      />
                      <div>
                        <h3 className="text-xl font-bold">
                          {userInfo?.role === "influencer" ? booking.business?.name : booking.influencer?.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Booking ID: {booking._id?.substring(booking._id.length - 8)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(booking.status)}`}
                      >
                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                      </span>
                      <span className="text-gray-500 text-sm mt-1">Created on {formatDate(booking.createdAt)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Platform</h4>
                      <p className="font-medium capitalize">{booking.platform}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Content Type</h4>
                      <p className="font-medium capitalize">{booking.contentType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Price</h4>
                      <p className="font-bold text-lg">{formatPrice(booking.price)}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Campaign Description</h4>
                    <p className="text-gray-700">{booking.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Start Date</h4>
                      <p className="font-medium">{formatDate(booking.startDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">End Date</h4>
                      <p className="font-medium">{formatDate(booking.endDate)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {userInfo?.role === "influencer" && booking.status === "pending" && (
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => handleStatusChange(booking._id, "cancelled")}
                        disabled={loadingUpdate}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking._id, "accepted")}
                        disabled={loadingUpdate}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                      >
                        Accept
                      </button>
                    </div>
                  )}

                  {userInfo?.role === "influencer" && booking.status === "accepted" && (
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => handleStatusChange(booking._id, "completed")}
                        disabled={loadingUpdate}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}

                  {userInfo?.role === "business" && booking.status === "pending" && (
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => handleStatusChange(booking._id, "cancelled")}
                        disabled={loadingUpdate}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPage
