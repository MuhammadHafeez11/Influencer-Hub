import axios from "axios"
import {
  INFLUENCER_LIST_REQUEST,
  INFLUENCER_LIST_SUCCESS,
  INFLUENCER_LIST_FAIL,
  INFLUENCER_DETAILS_REQUEST,
  INFLUENCER_DETAILS_SUCCESS,
  INFLUENCER_DETAILS_FAIL,
  INFLUENCER_FILTER_UPDATE,
} from "../constants/influencerConstants"

// List influencers with optional filters
export const listInfluencers =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: INFLUENCER_LIST_REQUEST })

      // Build query string from filters
      const queryParams = new URLSearchParams()

      if (filters.keyword) queryParams.append("keyword", filters.keyword)
      if (filters.category) queryParams.append("category", filters.category)
      if (filters.location) queryParams.append("location", filters.location)
      if (filters.minFollowers) queryParams.append("minFollowers", filters.minFollowers)
      if (filters.maxFollowers) queryParams.append("maxFollowers", filters.maxFollowers)
      if (filters.platform) queryParams.append("platform", filters.platform)
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy)
      if (filters.page) queryParams.append("page", filters.page)

      const queryString = queryParams.toString()
      const url = `/api/influencers${queryString ? `?${queryString}` : ""}`

      const { data } = await axios.get(url)

      dispatch({
        type: INFLUENCER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: INFLUENCER_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }

// Get influencer details by ID
export const getInfluencerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INFLUENCER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/influencers/${id}`)

    dispatch({
      type: INFLUENCER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INFLUENCER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Update influencer filters
export const updateFilters = (filters) => (dispatch) => {
  dispatch({
    type: INFLUENCER_FILTER_UPDATE,
    payload: filters,
  })
}
