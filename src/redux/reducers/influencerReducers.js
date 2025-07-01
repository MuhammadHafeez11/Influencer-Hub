import {
  INFLUENCER_LIST_REQUEST,
  INFLUENCER_LIST_SUCCESS,
  INFLUENCER_LIST_FAIL,
  INFLUENCER_DETAILS_REQUEST,
  INFLUENCER_DETAILS_SUCCESS,
  INFLUENCER_DETAILS_FAIL,
  INFLUENCER_FILTER_UPDATE,
} from "../constants/influencerConstants"

export const influencerListReducer = (state = { influencers: [] }, action) => {
  switch (action.type) {
    case INFLUENCER_LIST_REQUEST:
      return { loading: true, influencers: [] }
    case INFLUENCER_LIST_SUCCESS:
      return {
        loading: false,
        influencers: action.payload.influencers,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case INFLUENCER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const influencerDetailsReducer = (state = { influencer: { reviews: [] } }, action) => {
  switch (action.type) {
    case INFLUENCER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case INFLUENCER_DETAILS_SUCCESS:
      return { loading: false, influencer: action.payload }
    case INFLUENCER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const influencerFilterReducer = (
  state = {
    category: "",
    location: "",
    minFollowers: 0,
    maxFollowers: 1000000,
    platform: "",
    sortBy: "popularity",
  },
  action,
) => {
  switch (action.type) {
    case INFLUENCER_FILTER_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
