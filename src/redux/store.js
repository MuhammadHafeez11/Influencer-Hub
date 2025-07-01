import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// User reducers
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

// Influencer reducers
import {
  influencerListReducer,
  influencerDetailsReducer,
  influencerFilterReducer,
} from "./reducers/influencerReducers";

// Booking reducers
import {
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingListReducer,
} from "./reducers/bookingReducers";

// Chat reducers
import {
  chatListReducer,
  chatDetailsReducer,
} from "./reducers/chatReducers";

// Category reducers
import { categoryListReducer } from "./reducers/categoryReducers";

// Review reducers
import {
  reviewCreateReducer,
  reviewListReducer,
} from "./reducers/reviewReducers";

// Business verification reducers
import {
  businessVerificationReducer,
  businessVerificationStatusReducer,
  verificationListReducer,
  verificationUpdateReducer,
} from "./reducers/verificationReducers";


// ✅ COMBINED REDUCER
const reducer = combineReducers({
  // User
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  // Business Verification
  businessVerification: businessVerificationReducer,
  businessVerificationStatus: businessVerificationStatusReducer,
  verificationList: verificationListReducer,            // ✅ Admin: list of requests
  verificationUpdate: verificationUpdateReducer,        // ✅ Admin: approve/reject

  // Influencers
  influencerList: influencerListReducer,
  influencerFilter: influencerFilterReducer,
  influencerDetails: influencerDetailsReducer,

  // Bookings
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingListMy: bookingListReducer,

  // Chat
  chatList: chatListReducer,
  chatDetails: chatDetailsReducer,

  // Categories
  categoryList: categoryListReducer,

  // Reviews
  reviewCreate: reviewCreateReducer,
  reviewList: reviewListReducer,
});

// ✅ Get user info from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
