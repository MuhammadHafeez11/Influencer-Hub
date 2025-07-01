import axios from "axios"
import {
  ADMIN_STATS_REQUEST,
  ADMIN_STATS_SUCCESS,
  ADMIN_STATS_FAIL,
  ADMIN_INFLUENCERS_REQUEST,
  ADMIN_INFLUENCERS_SUCCESS,
  ADMIN_INFLUENCERS_FAIL,
  ADMIN_BUSINESSES_REQUEST,
  ADMIN_BUSINESSES_SUCCESS,
  ADMIN_BUSINESSES_FAIL,
  VERIFICATION_REQUESTS_REQUEST,
  VERIFICATION_REQUESTS_SUCCESS,
  VERIFICATION_REQUESTS_FAIL,
  VERIFICATION_UPDATE_REQUEST,
  VERIFICATION_UPDATE_SUCCESS,
  VERIFICATION_UPDATE_FAIL,
} from "../constants/adminConstants"

// Get admin dashboard stats
export const getAdminStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_STATS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/admin/stats", config)

    dispatch({
      type: ADMIN_STATS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_STATS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get influencers list for admin
export const getInfluencersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_INFLUENCERS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/admin/influencers", config)

    dispatch({
      type: ADMIN_INFLUENCERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_INFLUENCERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get businesses list for admin
export const getBusinessesList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_BUSINESSES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/admin/businesses", config)

    dispatch({
      type: ADMIN_BUSINESSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_BUSINESSES_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get verification requests
export const getVerificationRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFICATION_REQUESTS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/admin/verifications", config)

    dispatch({
      type: VERIFICATION_REQUESTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VERIFICATION_REQUESTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Update verification status
export const updateVerificationStatus =
  (id, status, rejectionReason = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: VERIFICATION_UPDATE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(`/api/admin/verifications/${id}`, { status, rejectionReason }, config)

      dispatch({
        type: VERIFICATION_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: VERIFICATION_UPDATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }
