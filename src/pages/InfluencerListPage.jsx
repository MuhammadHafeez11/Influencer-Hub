"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import FilterSidebar from "../components/influencer/FilterSidebar"
import InfluencerCard from "../components/influencer/InfluencerCard"
import influencersData from "../components/data/influencer-hub.influencers.json"

const InfluencerListPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [influencers, setInfluencers] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minFollowers: 0,
    maxFollowers: 1000000,
    platform: "",
    sortBy: "popularity",
  })

  useEffect(() => {
    // Simulate loading
    setLoading(true)

    try {
      // Filter and sort the influencers based on the current filters
      let filteredInfluencers = [...influencersData]

      // Apply category filter
      if (filters.category) {
        filteredInfluencers = filteredInfluencers.filter((influencer) =>
          influencer.categories.includes(filters.category),
        )
      }

      // Apply location filter
      if (filters.location) {
        filteredInfluencers = filteredInfluencers.filter(
          (influencer) => influencer.location && influencer.location.city === filters.location,
        )
      }

      // Apply platform filter
      if (filters.platform) {
        filteredInfluencers = filteredInfluencers.filter((influencer) =>
          influencer.socialMedia.some((platform) => platform.platform.toLowerCase() === filters.platform.toLowerCase()),
        )
      }

      // Apply followers range filter
      filteredInfluencers = filteredInfluencers.filter((influencer) => {
        // Calculate total followers across all platforms
        const totalFollowers = influencer.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
        return totalFollowers >= filters.minFollowers && totalFollowers <= filters.maxFollowers
      })

      // Apply sorting
      filteredInfluencers.sort((a, b) => {
        switch (filters.sortBy) {
          case "followers_high":
            const aFollowers = a.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            const bFollowers = b.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            return bFollowers - aFollowers

          case "followers_low":
            const aFollowersLow = a.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            const bFollowersLow = b.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            return aFollowersLow - bFollowersLow

          case "rating_high":
            return b.rating - a.rating

          case "popularity":
          default:
            // For popularity, we'll use a combination of followers and rating
            const aPopularity = a.rating * a.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            const bPopularity = b.rating * b.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)
            return bPopularity - aPopularity
        }
      })

      setInfluencers(filteredInfluencers)
      setError(null)
    } catch (err) {
      setError("Failed to filter influencers: " + err.message)
    } finally {
      // Simulate network delay
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-800 rounded-2xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Top Influencers</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-6 max-w-2xl">
              Connect with Pakistan's most influential content creators across various niches and platforms. Find the
              perfect match for your brand and create impactful campaigns.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={toggleFilters}
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Mobile */}
          <div
            className={`lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
              showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleFilters}
          ></div>

          <div
            className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              showFilters ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto`}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Filters</h3>
              <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
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
            <div className="p-4">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-1/4 bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-6">Filters</h3>
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Influencer Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{influencers?.length || 0}</span> influencers
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-600">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="followers_high">Followers: High to Low</option>
                      <option value="followers_low">Followers: Low to High</option>
                      <option value="rating_high">Rating: High to Low</option>
                    </select>
                  </div>
                </div>

                {influencers?.length === 0 ? (
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
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">No influencers found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                    <button
                      onClick={() =>
                        handleFilterChange({
                          category: "",
                          location: "",
                          minFollowers: 0,
                          maxFollowers: 1000000,
                          platform: "",
                          sortBy: "popularity",
                        })
                      }
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {influencers?.map((influencer) => (
                      <motion.div
                        key={influencer._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <InfluencerCard influencer={influencer} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluencerListPage
