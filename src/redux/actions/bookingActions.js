import axios from "axios"
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
} from "../constants/bookingConstants"

// Create a new booking
export const createBooking = (bookingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/bookings", bookingData, config)

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get booking details
export const getBookingDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bookings/${id}`, config)

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get list of bookings (for user or influencer)
export const listBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/bookings", config)

    dispatch({
      type: BOOKING_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Update booking status
export const updateBookingStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/bookings/${id}/status`, { status }, config)

    dispatch({
      type: BOOKING_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
