"use client"

import { useState, useEffect, useRef } from "react"

const RangeSlider = ({ min, max, step, values, onChange }) => {
  const [localValues, setLocalValues] = useState(values)
  const [isDragging, setIsDragging] = useState(null)
  const rangeRef = useRef(null)

  useEffect(() => {
    setLocalValues(values)
  }, [values])

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging !== null) {
        setIsDragging(null)
        onChange(localValues)
      }
    }

    const handleTouchEnd = () => {
      if (isDragging !== null) {
        setIsDragging(null)
        onChange(localValues)
      }
    }

    const handleMouseMove = (e) => {
      if (isDragging !== null && rangeRef.current) {
        const rect = rangeRef.current.getBoundingClientRect()
        const width = rect.width
        const offsetX = e.clientX - rect.left
        const percentage = Math.min(Math.max(offsetX / width, 0), 1)
        const value = Math.round((percentage * (max - min) + min) / step) * step

        const newValues = [...localValues]
        newValues[isDragging] = value

        // Ensure min thumb doesn't go past max thumb and vice versa
        if (isDragging === 0 && value > newValues[1]) {
          newValues[0] = newValues[1]
        } else if (isDragging === 1 && value < newValues[0]) {
          newValues[1] = newValues[0]
        } else {
          newValues[isDragging] = value
        }

        setLocalValues(newValues)
      }
    }

    const handleTouchMove = (e) => {
      if (isDragging !== null && rangeRef.current && e.touches && e.touches[0]) {
        const rect = rangeRef.current.getBoundingClientRect()
        const width = rect.width
        const offsetX = e.touches[0].clientX - rect.left
        const percentage = Math.min(Math.max(offsetX / width, 0), 1)
        const value = Math.round((percentage * (max - min) + min) / step) * step

        const newValues = [...localValues]
        newValues[isDragging] = value

        // Ensure min thumb doesn't go past max thumb and vice versa
        if (isDragging === 0 && value > newValues[1]) {
          newValues[0] = newValues[1]
        } else if (isDragging === 1 && value < newValues[0]) {
          newValues[1] = newValues[0]
        } else {
          newValues[isDragging] = value
        }

        setLocalValues(newValues)
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("touchend", handleTouchEnd)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchend", handleTouchEnd)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isDragging, localValues, max, min, onChange, step])

  const getLeftPosition = (index) => {
    return ((localValues[index] - min) / (max - min)) * 100
  }

  const handleThumbMouseDown = (index, e) => {
    e.preventDefault()
    setIsDragging(index)
  }

  const handleThumbTouchStart = (index, e) => {
    setIsDragging(index)
  }

  const handleTrackClick = (e) => {
    if (rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect()
      const width = rect.width
      const offsetX = e.clientX - rect.left
      const percentage = offsetX / width
      const value = Math.round((percentage * (max - min) + min) / step) * step

      // Determine which thumb to move based on proximity
      const distToMin = Math.abs(value - localValues[0])
      const distToMax = Math.abs(value - localValues[1])

      const newValues = [...localValues]
      if (distToMin <= distToMax) {
        newValues[0] = value
      } else {
        newValues[1] = value
      }

      // Ensure min thumb doesn't go past max thumb and vice versa
      if (newValues[0] > newValues[1]) {
        if (distToMin <= distToMax) {
          newValues[0] = newValues[1]
        } else {
          newValues[1] = newValues[0]
        }
      }

      setLocalValues(newValues)
      onChange(newValues)
    }
  }

  return (
    <div className="relative h-6 w-full" ref={rangeRef} onClick={handleTrackClick}>
      {/* Track background */}
      <div className="absolute h-2 w-full bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"></div>

      {/* Active track */}
      <div
        className="absolute h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full top-1/2 transform -translate-y-1/2"
        style={{
          left: `${getLeftPosition(0)}%`,
          width: `${getLeftPosition(1) - getLeftPosition(0)}%`,
        }}
      ></div>

      {/* Min thumb */}
      <div
        className="absolute w-6 h-6 bg-white border-2 border-pink-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform"
        style={{ left: `${getLeftPosition(0)}%` }}
        onMouseDown={(e) => handleThumbMouseDown(0, e)}
        onTouchStart={(e) => handleThumbTouchStart(0, e)}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={localValues[1]}
        aria-valuenow={localValues[0]}
        tabIndex={0}
      ></div>

      {/* Max thumb */}
      <div
        className="absolute w-6 h-6 bg-white border-2 border-violet-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform"
        style={{ left: `${getLeftPosition(1)}%` }}
        onMouseDown={(e) => handleThumbMouseDown(1, e)}
        onTouchStart={(e) => handleThumbTouchStart(1, e)}
        role="slider"
        aria-valuemin={localValues[0]}
        aria-valuemax={max}
        aria-valuenow={localValues[1]}
        tabIndex={0}
      ></div>
    </div>
  )
}

export default RangeSlider
