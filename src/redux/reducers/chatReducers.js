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
  MESSAGE_SEND_RESET,
  NEW_MESSAGE_RECEIVED,
} from "../constants/chatConstants"

export const chatListReducer = (state = { chats: [] }, action) => {
  switch (action.type) {
    case CHAT_LIST_REQUEST:
      return { loading: true, chats: [] }
    case CHAT_LIST_SUCCESS:
      return { loading: false, chats: action.payload }
    case CHAT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const chatDetailsReducer = (state = { loading: true, messages: [] }, action) => {
  switch (action.type) {
    case CHAT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chat: action.payload.chat, messages: action.payload.messages }
    case CHAT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case NEW_MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    default:
      return state
  }
}

export const messageSendReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_SEND_REQUEST:
      return { loading: true }
    case MESSAGE_SEND_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload }
    case MESSAGE_SEND_RESET:
      return {}
    default:
      return state
  }
}
