import axios from "axios"

// Create an instance of axios with default config
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo")

    if (userInfo) {
      const { token } = JSON.parse(userInfo)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config

    // Handle token expiration
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Logout user if token is expired
      localStorage.removeItem("userInfo")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

export default api
