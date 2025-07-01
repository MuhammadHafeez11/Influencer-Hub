import axios from "axios"
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
} from "../constants/reviewConstants"
import { getInfluencerDetails } from "./influencerActions"

// Get reviews for an influencer
export const getInfluencerReviews = (influencerId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST })

    const { data } = await axios.get(`/api/influencers/${influencerId}/reviews`)

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Create a review for an influencer
export const createReview = (influencerId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/influencers/${influencerId}/reviews`, review, config)

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    })

    // Update influencer details to reflect new rating
    dispatch(getInfluencerDetails(influencerId))
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
