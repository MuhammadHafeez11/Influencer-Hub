"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"
import { NEW_MESSAGE_RECEIVED } from "../redux/constants/chatConstants"

const useSocket = () => {
  const socketRef = useRef(null)
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    // Only connect if user is logged in
    if (userInfo && userInfo._id) {
      // Connect to socket server
      socketRef.current = io("", {
        query: {
          userId: userInfo._id,
        },
      })

      // Listen for new messages
      socketRef.current.on("newMessage", (message) => {
        dispatch({
          type: NEW_MESSAGE_RECEIVED,
          payload: message,
        })
      })

      // Clean up on unmount
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect()
        }
      }
    }
  }, [userInfo, dispatch])

  // Function to send a message via socket
  const sendMessage = (chatId, content) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        chatId,
        content,
      })
    }
  }

  return { socket: socketRef.current, sendMessage }
}

export default useSocket
