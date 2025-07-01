"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { getInfluencerReviews, createReview } from "../../redux/actions/reviewActions"
import Loader from "../common/Loader"
import Message from "../common/Message"
import StarRating from "../common/StarRating"

const ReviewSection = ({ influencerId }) => {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [showForm, setShowForm] = useState(false)

  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, reviews } = useSelector((state) => state.reviewList)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.reviewCreate)

  useEffect(() => {
    dispatch(getInfluencerReviews(influencerId))
  }, [dispatch, influencerId])

  useEffect(() => {
    if (successCreate) {
      setRating(5)
      setComment("")
      setShowForm(false)
      dispatch(getInfluencerReviews(influencerId))
    }
  }, [successCreate, dispatch, influencerId])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createReview(influencerId, {
        rating,
        comment,
      }),
    )
  }

  const toggleForm = () => {
    if (!userInfo) {
      // Redirect to login or show login message
      return
    }
    setShowForm(!showForm)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Reviews</h3>
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Write a Review
        </button>
      </div>

      {!userInfo && showForm && (
        <Message variant="info" dismissible>
          Please{" "}
          <a href="/login" className="text-blue-600 font-medium">
            login
          </a>{" "}
          to write a review.
        </Message>
      )}

      {showForm && userInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          {errorCreate && <Message variant="error">{errorCreate}</Message>}
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <StarRating rating={rating} setRating={setRating} editable />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadingCreate}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center"
              >
                {loadingCreate ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : reviews?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">Be the first to review this influencer!</p>
          {!showForm && (
            <button
              onClick={toggleForm}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src={`/api/uploads/${review.user.avatar}` || "/placeholder.svg?height=50&width=50"}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=50&width=50"
                    }}
                  />
                  <div>
                    <h4 className="font-semibold">{review.user.name}</h4>
                    <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewSection
