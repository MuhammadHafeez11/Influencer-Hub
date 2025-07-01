import axios from "axios";
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

// BUSINESS submits
export const submitBusinessVerification = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUSINESS_VERIFICATION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/business-verification", formData, config);

    dispatch({ type: BUSINESS_VERIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BUSINESS_VERIFICATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// BUSINESS status
export const getBusinessVerificationStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BUSINESS_VERIFICATION_STATUS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get("/api/users/business-verification", config);

    dispatch({ type: BUSINESS_VERIFICATION_STATUS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: BUSINESS_VERIFICATION_STATUS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ADMIN: get all requests
export const getAllVerificationRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFICATION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get("/api/users/business-verification/all", config);

    dispatch({ type: VERIFICATION_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: VERIFICATION_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ADMIN: approve/reject
export const updateVerificationStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFICATION_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/business-verification/${id}/status`, { status }, config);

    dispatch({ type: VERIFICATION_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFICATION_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
