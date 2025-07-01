"use client"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { getChatList, getChatDetails, sendMessage } from "../redux/actions/chatActions"
import useSocket from "../hooks/useSocket"
import Loader from "../components/common/Loader"
import Message from "../components/common/Message"

const ChatPage = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [activeChat, setActiveChat] = useState(null)
  const messagesEndRef = useRef(null)
  const { socket, sendMessage: socketSendMessage } = useSocket()

  // Safe selectors with fallback
  const userLogin = useSelector((state) => state.userLogin) || {}
  const { userInfo } = userLogin

  const chatList = useSelector((state) => state.chatList) || {}
  const { loading = false, error = null, chats = [] } = chatList

  const chatDetails = useSelector((state) => state.chatDetails) || {}
  const {
    loading: loadingChat = false,
    error: errorChat = null,
    chat = null,
    messages = [],
  } = chatDetails

  const messageSend = useSelector((state) => state.messageSend) || {}
  const { loading: loadingSend = false } = messageSend

  useEffect(() => {
    dispatch(getChatList())
  }, [dispatch])

  useEffect(() => {
    if (activeChat) {
      dispatch(getChatDetails(activeChat))
    }
  }, [dispatch, activeChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && activeChat) {
      dispatch(sendMessage(activeChat, message))
      socketSendMessage(activeChat, message)
      setMessage("")
    }
  }

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatChatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    return date.toDateString() === now.toDateString()
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString()
  }

  // Placeholder image to avoid 404
  const placeholderImg = "https://via.placeholder.com/50"

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Messages</h2>
              </div>

              {loading ? (
                <div className="flex-grow flex items-center justify-center">
                  <Loader />
                </div>
              ) : error ? (
                <div className="p-4">
                  <Message variant="error">{error}</Message>
                </div>
              ) : chats.length === 0 ? (
                <div className="flex-grow flex items-center justify-center p-4 text-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                    <p className="text-gray-500">Your conversations will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto">
                  {chats.map((chat) => (
                    <motion.div
                      key={chat._id}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                      onClick={() => setActiveChat(chat._id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer ${
                        activeChat === chat._id ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            userInfo?.role === "influencer"
                              ? chat.business?.avatar
                                ? `/api/uploads/${chat.business.avatar}`
                                : placeholderImg
                              : chat.influencer?.avatar
                              ? `/api/uploads/${chat.influencer.avatar}`
                              : placeholderImg
                          }
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover mr-4"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = placeholderImg
                          }}
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">
                              {userInfo?.role === "influencer" ? chat.business?.name : chat.influencer?.name}
                            </h3>
                            <span className="text-xs text-gray-500">{formatChatDate(chat.updatedAt)}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage || "No messages yet"}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div className="hidden md:flex md:w-2/3 flex-col h-full">
              {!activeChat ? (
                <div className="flex-grow flex items-center justify-center p-4 text-center bg-gray-50">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              ) : loadingChat ? (
                <div className="flex-grow flex items-center justify-center">
                  <Loader />
                </div>
              ) : errorChat ? (
                <div className="p-4">
                  <Message variant="error">{errorChat}</Message>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <img
                      src={
                        userInfo?.role === "influencer"
                          ? chat?.business?.avatar
                            ? `/api/uploads/${chat.business.avatar}`
                            : placeholderImg
                          : chat?.influencer?.avatar
                          ? `/api/uploads/${chat.influencer.avatar}`
                          : placeholderImg
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = placeholderImg
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">
                        {userInfo?.role === "influencer" ? chat?.business?.name : chat?.influencer?.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {userInfo?.role === "influencer" ? "Business" : "Influencer"}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-center">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                          <p className="text-gray-500">Start the conversation by sending a message</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg._id}
                            className={`flex ${msg.sender === userInfo?._id ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                                msg.sender === userInfo?._id
                                  ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <p>{msg.content}</p>
                              <p
                                className={`text-xs mt-1 text-right ${
                                  msg.sender === userInfo?._id ? "text-pink-100" : "text-gray-500"
                                }`}
                              >
                                {formatMessageTime(msg.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <button
                        type="submit"
                        disabled={loadingSend || !message.trim()}
                        className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
