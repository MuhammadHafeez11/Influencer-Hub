"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { register } from "../redux/actions/userActions"
import Loader from "../components/common/Loader"
import Message from "../components/common/Message"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    setErrorMessage(null)
    setLoading(true)

    try {
      await dispatch(register({ name, email, password, role: "user" }))
      setLoading(false)
      setSuccessMessage("User registered successfully! Please log in.")
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")

      // Remove success message after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (error) {
      setLoading(false)
      setErrorMessage("Error registering user. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">

        {/* Logo + Title Card */}
        <div className="bg-white rounded-lg shadow px-4 py-6 mb-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">IH</span>
            </div>
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="mb-4">
            <Message variant="error">{errorMessage}</Message>
          </div>
        )}
        {successMessage && (
          <div className="mb-4">
            <Message variant="success">{successMessage}</Message>
          </div>
        )}

        {/* Form */}
        {!successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  {loading ? <Loader /> : "Create Account"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
