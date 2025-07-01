import {
  BUSINESS_VERIFICATION_REQUEST,
  BUSINESS_VERIFICATION_SUCCESS,
  BUSINESS_VERIFICATION_FAIL,
  BUSINESS_VERIFICATION_STATUS_REQUEST,
  BUSINESS_VERIFICATION_STATUS_SUCCESS,
  BUSINESS_VERIFICATION_STATUS_FAIL,
  VERIFICATION_LIST_REQUEST,
  VERIFICATION_LIST_SUCCESS,
  VERIFICATION_LIST_FAIL,
  VERIFICATION_UPDATE_REQUEST,
  VERIFICATION_UPDATE_SUCCESS,
  VERIFICATION_UPDATE_FAIL,
} from "../constants/verificationConstants";

// BUSINESS submit reducer
export const businessVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_VERIFICATION_REQUEST:
      return { loading: true };
    case BUSINESS_VERIFICATION_SUCCESS:
      return { loading: false, success: true };
    case BUSINESS_VERIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// BUSINESS status reducer
export const businessVerificationStatusReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case BUSINESS_VERIFICATION_STATUS_REQUEST:
      return { loading: true };
    case BUSINESS_VERIFICATION_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case BUSINESS_VERIFICATION_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN list reducer
export const verificationListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case VERIFICATION_LIST_REQUEST:
      return { loading: true, requests: [] };
    case VERIFICATION_LIST_SUCCESS:
      return { loading: false, requests: action.payload };
    case VERIFICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN approve/reject reducer
export const verificationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFICATION_UPDATE_REQUEST:
      return { loading: true };
    case VERIFICATION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case VERIFICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
