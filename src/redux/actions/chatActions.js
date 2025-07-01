import axios from "axios"
import {
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
} from "../constants/chatConstants"

// Get list of chats
export const getChatList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/chats", config)

    dispatch({
      type: CHAT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Get chat details with messages
export const getChatDetails = (chatId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/chats/${chatId}`, config)

    dispatch({
      type: CHAT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHAT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

// Send a message
export const sendMessage = (chatId, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_SEND_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/chats/${chatId}/messages`, { content }, config)

    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
