import {
  USER_UPDATE,
  FETCH_PROFILE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  position: "",
  company: "",
  contactNumber: "",
  linkedin: "",
  message: "",
  profile: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload };
    case FETCH_PROFILE:
      return {
        ...state,
        profile: {

        }
      };
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, message: action.payload };
    case PROFILE_UPDATE_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}