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
  VERIFICATION_UPDATE_RESET,
} from "../constants/adminConstants"

export const adminStatsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_STATS_REQUEST:
      return { loading: true }
    case ADMIN_STATS_SUCCESS:
      return { loading: false, stats: action.payload }
    case ADMIN_STATS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminInfluencersReducer = (state = { influencers: [] }, action) => {
  switch (action.type) {
    case ADMIN_INFLUENCERS_REQUEST:
      return { loading: true, influencers: [] }
    case ADMIN_INFLUENCERS_SUCCESS:
      return { loading: false, influencers: action.payload }
    case ADMIN_INFLUENCERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminBusinessesReducer = (state = { businesses: [] }, action) => {
  switch (action.type) {
    case ADMIN_BUSINESSES_REQUEST:
      return { loading: true, businesses: [] }
    case ADMIN_BUSINESSES_SUCCESS:
      return { loading: false, businesses: action.payload }
    case ADMIN_BUSINESSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const verificationRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case VERIFICATION_REQUESTS_REQUEST:
      return { loading: true, requests: [] }
    case VERIFICATION_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload }
    case VERIFICATION_REQUESTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const verificationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFICATION_UPDATE_REQUEST:
      return { loading: true }
    case VERIFICATION_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case VERIFICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case VERIFICATION_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
