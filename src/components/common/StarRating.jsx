"use client"

import { useState } from "react"

const StarRating = ({ rating, setRating, editable = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseOver = (index) => {
    if (!editable) return
    setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (!editable) return
    setHoverRating(0)
  }

  const handleClick = (index) => {
    if (!editable) return
    setRating(index)
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          filled={(hoverRating || rating) >= index}
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          editable={editable}
        />
      ))}
    </div>
  )
}

const Star = ({ filled, onMouseOver, onMouseLeave, onClick, editable }) => {
  const cursorClass = editable ? "cursor-pointer" : ""

  return (
    <span className={`text-2xl ${cursorClass}`} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onClick={onClick}>
      {filled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  )
}

export default StarRating
