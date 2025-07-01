"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const InfluencerCard = ({ influencer }) => {
  // Calculate total followers across all platforms
  const totalFollowers = influencer.socialMedia.reduce((sum, platform) => sum + platform.followers, 0)

  // Format followers count
  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count
  }

  // Get the primary social media platform (highest followers)
  const primaryPlatform = influencer.socialMedia.reduce(
    (max, platform) => (platform.followers > max.followers ? platform : max),
    influencer.socialMedia[0],
  )

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

  // Handle view profile click
  const handleViewProfile = () => {
    // This would normally navigate to the profile page
    // For now, we'll just log to console
    

    console.log(`Viewing profile for ${influencer.name}`)
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
    >
      <div className="relative">
        <img src="/placeholder.png?height=300&width=300" alt={influencer?.name} className="w-full h-64 object-cover" />
        {influencer.socialMedia.some((platform) => platform.verified) && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {influencer.socialMedia.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
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
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{influencer.name}</h3>
            <p className="text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              {influencer.location?.city}, {influencer.location?.country}
            </p>
          </div>
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

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              <p className="text-sm text-gray-500">Total Followers</p>
              <p className="font-bold">{formatFollowers(totalFollowers)}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white mr-2">
              {getPlatformIcon(primaryPlatform.platform)}
            </div>
            <div>
              <p className="text-sm text-gray-500">Main Platform</p>
              <p className="font-bold">
                {primaryPlatform.platform.charAt(0).toUpperCase() + primaryPlatform.platform.slice(1)}{" "}
                <span className="font-normal text-sm text-gray-500">
                  ({formatFollowers(primaryPlatform.followers)})
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{influencer.bio}</p>

        <div className="mt-auto">
          <Link
            to={`/influencer/${influencer.id}`}
            className="block w-full text-center py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default InfluencerCard
