"use client"

import { useState, useEffect } from "react"
import RangeSlider from "../../components/common/RangeSlider"
import influencersData from "../data/influencer-hub.influencers.json"

// Extract unique categories from the JSON data
const extractCategories = () => {
  const categoriesSet = new Set()
  influencersData.forEach((influencer) => {
    influencer.categories.forEach((category) => {
      categoriesSet.add(category)
    })
  })
  return Array.from(categoriesSet).sort()
}

// Extract unique locations from the JSON data
const extractLocations = () => {
  const locationsSet = new Set()
  influencersData.forEach((influencer) => {
    if (influencer.location && influencer.location.city) {
      locationsSet.add(influencer.location.city)
    }
  })
  return Array.from(locationsSet).sort()
}

// Extract unique platforms from the JSON data
const extractPlatforms = () => {
  const platformsSet = new Set()
  influencersData.forEach((influencer) => {
    influencer.socialMedia.forEach((platform) => {
      platformsSet.add(platform.platform)
    })
  })
  return Array.from(platformsSet).sort()
}

// Find max followers across all influencers
const findMaxFollowers = () => {
  let max = 0
  influencersData.forEach((influencer) => {
    influencer.socialMedia.forEach((platform) => {
      if (platform.followers > max) {
        max = platform.followers
      }
    })
  })
  // Round up to the nearest 100K for a cleaner UI
  return Math.ceil(max / 100000) * 100000
}

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [maxFollowersValue, setMaxFollowersValue] = useState(1000000)

  useEffect(() => {
    // Initialize data from the JSON file
    setCategories(extractCategories())
    setLocations(extractLocations())
    setPlatforms(extractPlatforms())
    setMaxFollowersValue(findMaxFollowers())
  }, [])

  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value })
  }

  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value })
  }

  const handlePlatformChange = (e) => {
    onFilterChange({ ...filters, platform: e.target.value })
  }

  const handleFollowersChange = (values) => {
    onFilterChange({
      ...filters,
      minFollowers: values[0],
      maxFollowers: values[1],
    })
  }

  const handleReset = () => {
    onFilterChange({
      category: "",
      location: "",
      minFollowers: 0,
      maxFollowers: maxFollowersValue,
      platform: "",
      sortBy: "popularity",
    })
  }

  // Format follower numbers for display
  const formatFollowerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          id="location"
          value={filters.location}
          onChange={handleLocationChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
          Platform
        </label>
        <select
          id="platform"
          value={filters.platform}
          onChange={handlePlatformChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Followers Range</label>
        <RangeSlider
          min={0}
          max={maxFollowersValue}
          step={10000}
          values={[filters.minFollowers, filters.maxFollowers]}
          onChange={handleFollowersChange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{formatFollowerCount(filters.minFollowers)}</span>
          <span>{formatFollowerCount(filters.maxFollowers)}</span>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="w-full py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300 mt-4"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterSidebar
