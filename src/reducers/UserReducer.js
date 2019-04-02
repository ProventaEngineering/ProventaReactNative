import {
  USER_UPDATE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESPONSE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  user: {
    profile: {},
    hasProfileLoaded: false,
    hasProfileUpdated: false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload };
    case FETCH_PROFILE_REQUEST:
      console.log(">>>>>>>>>>>>>>>>>>>>>FETCH_PROFILE_REQUEST");
      return { ...state, user: { profile: {}, hasProfileLoaded: false } };
    case FETCH_PROFILE_RESPONSE:
      console.log(">>>>>>>>>>>>>>>>>>>>>FETCH_PROFILE_RESPONSE");
      return { ...state, user: { profile: action.payload, hasProfileLoaded: true } };
    case PROFILE_UPDATE_SUCCESS:
      console.log(">>>>>>>>>>>>>>>>>>>>>PROFILE_UPDATE_SUCCESS");
      return { ...state, user: { profile: action.payload, hasProfileUpdated: true } };
    case PROFILE_UPDATE_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}