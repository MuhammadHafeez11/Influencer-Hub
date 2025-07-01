"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import influencersData from '../data/influencer-hub.influencers.json'

// Import the influencers data - make sure this path is correct
// const influencersData = [
//   // {
//   //   name: "Sana Khan",
//   //   email: "sana.khan@example.com",
//   //   phone: "+92 300 1234567",
//   //   avatar: "default-influencer.jpg",
//   //   bio: "Fashion and lifestyle influencer based in Lahore. I love sharing my style tips, travel adventures, and daily life with my followers.",
//   //   location: {
//   //     city: "Lahore",
//   //     province: "Punjab",
//   //     country: "Pakistan",
//   //   },
//   //   categories: ["fashion", "lifestyle"],
//   //   socialMedia: [
//   //     {
//   //       platform: "instagram",
//   //       handle: "@sanakhan",
//   //       url: "https://instagram.com/sanakhan",
//   //       followers: 450000,
//   //       engagement: 3.2,
//   //       verified: true,
//   //     },
//   //     {
//   //       platform: "tiktok",
//   //       handle: "@sanakhan",
//   //       url: "https://tiktok.com/@sanakhan",
//   //       followers: 320000,
//   //       engagement: 4.5,
//   //       verified: true,
//   //     },
//   //   ],
//   //   portfolio: [
//   //     {
//   //       title: "Summer Collection Showcase",
//   //       description: "Collaboration with local Pakistani designer for their summer collection",
//   //       mediaType: "image",
//   //       url: "default-portfolio.jpg",
//   //     },
//   //   ],
//   //   pricing: {
//   //     instagram: {
//   //       post: 50000,
//   //       story: 25000,
//   //       reel: 75000,
//   //     },
//   //     tiktok: {
//   //       video: 60000,
//   //     },
//   //   },
//   //   languages: ["Urdu", "English"],
//   //   rating: 4.8,
//   //   totalReviews: 24,
//   // },
//   {
//     name: "Ali Ahmed",
//     email: "ali.ahmed@example.com",
//     phone: "+92 321 9876543",
//     avatar: "ali-ahmad.jpeg",
//     bio: "Tech enthusiast and educator from Karachi. I create content about the latest technology trends, gadget reviews, and educational tutorials.",
//     location: {
//       city: "Karachi",
//       province: "Sindh",
//       country: "Pakistan",
//     },
//     categories: ["technology", "education"],
//     socialMedia: [
//       {
//         platform: "youtube",
//         handle: "@aliahmedtech",
//         url: "https://youtube.com/@aliahmedtech",
//         followers: 320000,
//         engagement: 4.5,
//         verified: true,
//       },
//       {
//         platform: "instagram",
//         handle: "@aliahmed",
//         url: "https://instagram.com/aliahmed",
//         followers: 180000,
//         engagement: 2.8,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Smartphone Review Series",
//         description: "In-depth reviews of the latest smartphones available in Pakistan",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       youtube: {
//         video: 100000,
//         shorts: 40000,
//       },
//       instagram: {
//         post: 30000,
//         story: 15000,
//         reel: 45000,
//       },
//     },
//     languages: ["Urdu", "English"],
//     rating: 4.7,
//     totalReviews: 32,
//   },
//   {
//     name: "Fatima Zahra",
//     email: "fatima.zahra@example.com",
//     phone: "+92 333 5556677",
//     avatar: "default-influencer.jpg",
//     bio: "Beauty and fashion influencer from Islamabad. I share makeup tutorials, skincare routines, and fashion hauls with my audience.",
//     location: {
//       city: "Islamabad",
//       province: "Islamabad",
//       country: "Pakistan",
//     },
//     categories: ["beauty", "fashion"],
//     socialMedia: [
//       {
//         platform: "instagram",
//         handle: "@fatima_z",
//         url: "https://instagram.com/fatima_z",
//         followers: 580000,
//         engagement: 2.8,
//         verified: true,
//       },
//       {
//         platform: "youtube",
//         handle: "@fatimaz",
//         url: "https://youtube.com/@fatimaz",
//         followers: 250000,
//         engagement: 3.5,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Eid Makeup Tutorial",
//         description: "Special Eid makeup tutorial featuring Pakistani beauty brands",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       instagram: {
//         post: 60000,
//         story: 30000,
//         reel: 90000,
//       },
//       youtube: {
//         video: 120000,
//         shorts: 50000,
//       },
//     },
//     languages: ["Urdu", "English"],
//     rating: 4.9,
//     totalReviews: 41,
//   },
//   {
//     name: "Hassan Ali",
//     email: "hassan.ali@example.com",
//     phone: "+92 345 1112233",
//     avatar: "default-influencer.jpg",
//     bio: "Entertainment and comedy content creator from Peshawar. I create funny skits, pranks, and vlogs to bring laughter to my audience.",
//     location: {
//       city: "Peshawar",
//       province: "Khyber Pakhtunkhwa",
//       country: "Pakistan",
//     },
//     categories: ["entertainment", "comedy"],
//     socialMedia: [
//       {
//         platform: "tiktok",
//         handle: "@hassanali",
//         url: "https://tiktok.com/@hassanali",
//         followers: 750000,
//         engagement: 5.1,
//         verified: true,
//       },
//       {
//         platform: "instagram",
//         handle: "@hassanali",
//         url: "https://instagram.com/hassanali",
//         followers: 420000,
//         engagement: 3.9,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Prank Series",
//         description: "Hilarious pranks on friends and family members",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       tiktok: {
//         video: 80000,
//       },
//       instagram: {
//         post: 50000,
//         story: 25000,
//         reel: 75000,
//       },
//     },
//     languages: ["Pashto", "Urdu", "English"],
//     rating: 4.6,
//     totalReviews: 38,
//   },
//   {
//     name: "Zainab Ali",
//     email: "zainab.ali@example.com",
//     phone: "+92 321 4445556",
//     avatar: "default-influencer.jpg",
//     bio: "Travel vlogger and photographer from Islamabad. I explore beautiful destinations in Pakistan and around the world.",
//     location: {
//       city: "Islamabad",
//       province: "Islamabad",
//       country: "Pakistan",
//     },
//     categories: ["travel", "lifestyle"],
//     socialMedia: [
//       {
//         platform: "instagram",
//         handle: "@zainabali",
//         url: "https://instagram.com/zainabali",
//         followers: 380000,
//         engagement: 3.8,
//         verified: true,
//       },
//       {
//         platform: "youtube",
//         handle: "@zainabtravels",
//         url: "https://youtube.com/@zainabtravels",
//         followers: 320000,
//         engagement: 4.0,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Northern Pakistan Series",
//         description: "Exploring the breathtaking landscapes of Northern Pakistan",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       instagram: {
//         post: 55000,
//         story: 28000,
//         reel: 80000,
//       },
//       youtube: {
//         video: 110000,
//         shorts: 45000,
//       },
//     },
//     languages: ["Urdu", "English"],
//     rating: 4.9,
//     totalReviews: 42,
//   },
//   {
//     name: "Usman Khan",
//     email: "usman.khan@example.com",
//     phone: "+92 345 6667778",
//     avatar: "default-influencer.jpg",
//     bio: "Tech reviewer and gaming enthusiast from Lahore. I review the latest gadgets, smartphones, and gaming setups.",
//     location: {
//       city: "Lahore",
//       province: "Punjab",
//       country: "Pakistan",
//     },
//     categories: ["technology", "gaming"],
//     socialMedia: [
//       {
//         platform: "youtube",
//         handle: "@usmankhantech",
//         url: "https://youtube.com/@usmankhantech",
//         followers: 480000,
//         engagement: 4.3,
//         verified: true,
//       },
//       {
//         platform: "instagram",
//         handle: "@usmankhan",
//         url: "https://instagram.com/usmankhan",
//         followers: 290000,
//         engagement: 3.2,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Budget Gaming PC Build",
//         description: "Building a gaming PC under 100,000 PKR",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       youtube: {
//         video: 95000,
//         shorts: 40000,
//       },
//       instagram: {
//         post: 45000,
//         story: 22000,
//         reel: 65000,
//       },
//     },
//     languages: ["Urdu", "English"],
//     rating: 4.7,
//     totalReviews: 36,
//   },

//   {
//     name: "Asad Ali",
//     email: "asad.ali@example.com",
//     phone: "+92 321 1112223",
//     avatar: "default-influencer.jpg",
//     bio: "Business coach and entrepreneur from Islamabad. I share business tips, success stories, and motivational content.",
//     location: {
//       city: "Islamabad",
//       province: "Islamabad",
//       country: "Pakistan",
//     },
//     categories: ["business", "education"],
//     socialMedia: [
//       {
//         platform: "linkedin",
//         handle: "@asadali",
//         url: "https://linkedin.com/in/asadali",
//         followers: 320000,
//         engagement: 3.5,
//         verified: true,
//       },
//       {
//         platform: "youtube",
//         handle: "@asadalibusiness",
//         url: "https://youtube.com/@asadalibusiness",
//         followers: 280000,
//         engagement: 4.0,
//         verified: true,
//       },
//     ],
//     portfolio: [
//       {
//         title: "Startup Success Series",
//         description: "Interviews with successful Pakistani entrepreneurs",
//         mediaType: "video",
//         url: "default-portfolio.jpg",
//       },
//     ],
//     pricing: {
//       linkedin: {
//         post: 60000,
//       },
//       youtube: {
//         video: 100000,
//         shorts: 40000,
//       },
//     },
//     languages: ["Urdu", "English"],
//     rating: 4.8,
//     totalReviews: 45,
//   },
// ]

// Format follower count (e.g., 1200000 -> 1.2M)
const formatFollowerCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M"
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K"
  }
  return count.toString()
}

// Extract all unique categories from influencers data
const extractUniqueCategories = (influencers) => {
  const categoriesSet = new Set()

  influencers.forEach((influencer) => {
    if (influencer.categories && Array.isArray(influencer.categories)) {
      influencer.categories.forEach((category) => {
        categoriesSet.add(category)
      })
    }
  })

  // Convert to array and sort alphabetically
  return Array.from(categoriesSet).sort()
}

// Format influencer data for display
const formatInfluencerData = (influencer) => {
  // Get the main social media account for follower count
  const mainSocialMedia = influencer.socialMedia[0]
  const formattedFollowers = formatFollowerCount(mainSocialMedia?.followers || 0)

  return {
    id: influencer.id, // Create a simple ID from name
    name: influencer.name,
    username: mainSocialMedia?.handle || "",
    category: influencer.categories[0]
      ? influencer.categories[0].charAt(0).toUpperCase() + influencer.categories[0].slice(1)
      : "",
    followers: formattedFollowers,
    image: influencer.avatar || "/placeholder.svg?height=300&width=300",
    verified: mainSocialMedia?.verified || false,
    categories: influencer.categories || [],
  }
}

const TopInfluencersSection = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredInfluencers, setFilteredInfluencers] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [formattedInfluencers, setFormattedInfluencers] = useState([])
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Initialize data on component mount
  useEffect(() => {
    // Format all influencers data once
    const formatted = influencersData.map(formatInfluencerData)
    setFormattedInfluencers(formatted)

    // Set initial filtered influencers to all influencers
    setFilteredInfluencers(formatted)

    // Extract unique categories from the data
    const uniqueCategories = extractUniqueCategories(influencersData)
    setCategories(["All", ...uniqueCategories])

    console.log("Component initialized with", formatted.length, "influencers")
  }, [])

  // Handle category change
  useEffect(() => {
    if (!formattedInfluencers.length) return

    console.log("Filtering by category:", activeCategory)

    if (activeCategory === "All") {
      setFilteredInfluencers(formattedInfluencers)
      console.log("Showing all influencers:", formattedInfluencers.length)
    } else {
      const filtered = formattedInfluencers.filter((influencer) =>
        influencer.categories.includes(activeCategory.toLowerCase()),
      )
      setFilteredInfluencers(filtered)
      console.log("Filtered influencers:", filtered.length, "for category:", activeCategory)
    }
  }, [activeCategory, formattedInfluencers])

  // Animation control
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  // Capitalize first letter of category for display
  const formatCategoryName = (category) => {
    return category === "All" ? category : category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Handle category button click
  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category)
    setActiveCategory(category)
  }

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-violet-500">Top Influencers</span>
          </h2>
          <p className="text-lg text-gray-600">
            Discover Pakistan's most influential content creators across various niches and platforms.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((influencer) => (
              <motion.div
                key={influencer.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover"
              >
                <div className="relative">
                  <img
                    src={ "/placeholder.png?height=300&width=300"}
                    alt={influencer.name}
                    className="w-full h-64 object-cover"
                  />
                  {influencer.verified && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{influencer.name}</h3>
                      <p className="text-gray-500">{influencer.username}</p>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {influencer.followers}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{influencer.category}</p>
                  <Link
                    to={`/influencer/${influencer.id}`}
                    className="block w-full text-center py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-lg text-gray-500">No influencers found for this category.</p>
            </div>
          )}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/influencers" className="btn-primary inline-flex items-center">
            View All Influencers
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopInfluencersSection



// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { motion, useAnimation } from "framer-motion"
// import { useInView } from "react-intersection-observer"

// const dummyInfluencers = [
//   {
//     id: 1,
//     name: "Ayesha Khan",
//     username: "@ayeshakhan",
//     category: "Fashion & Lifestyle",
//     followers: "1.2M",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Ali Hassan",
//     username: "@alihassan",
//     category: "Tech & Gaming",
//     followers: "850K",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Fatima Zahra",
//     username: "@fatima_z",
//     category: "Beauty & Makeup",
//     followers: "1.5M",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
//   {
//     id: 4,
//     name: "Usman Ahmed",
//     username: "@usman_vlogs",
//     category: "Travel & Adventure",
//     followers: "920K",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
//   {
//     id: 5,
//     name: "Zara Malik",
//     username: "@zaramalik",
//     category: "Food & Cooking",
//     followers: "750K",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
//   {
//     id: 6,
//     name: "Hassan Ali",
//     username: "@hassanali_official",
//     category: "Fitness & Health",
//     followers: "1.1M",
//     image: "/placeholder.svg?height=300&width=300",
//     verified: true,
//   },
// ]

// const TopInfluencersSection = () => {
//   const [activeCategory, setActiveCategory] = useState("All")
//   const controls = useAnimation()
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   })

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible")
//     }
//   }, [controls, inView])

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.4, 0, 0.2, 1],
//       },
//     },
//   }

//   const categories = ["All", "Fashion", "Beauty", "Tech", "Food", "Travel", "Fitness"]

//   return (
//     <section className="py-20 bg-white" ref={ref}>
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Meet Our <span className="text-gradient bg-gradient-to-r from-pink-500 to-violet-500">Top Influencers</span>
//           </h2>
//           <p className="text-lg text-gray-600">
//             Discover Pakistan's most influential content creators across various niches and platforms.
//           </p>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-2 rounded-full transition-all duration-300 ${
//                 activeCategory === category
//                   ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-md"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {dummyInfluencers.map((influencer) => (
//             <motion.div
//               key={influencer.id}
//               variants={itemVariants}
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover"
//             >
//               <div className="relative">
//                 <img
//                   src={influencer.image || "/placeholder.svg"}
//                   alt={influencer.name}
//                   className="w-full h-64 object-cover"
//                 />
//                 {influencer.verified && (
//                   <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Verified
//                   </div>
//                 )}
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold">{influencer.name}</h3>
//                     <p className="text-gray-500">{influencer.username}</p>
//                   </div>
//                   <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
//                     {influencer.followers}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-6">{influencer.category}</p>
//                 <Link
//                   to={`/influencer/${influencer.id}`}
//                   className="block w-full text-center py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
//                 >
//                   View Profile
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         <div className="text-center mt-12">
//           <Link to="/influencers" className="btn-primary inline-flex items-center">
//             View All Influencers
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TopInfluencersSection
