import {
  AUTH_UPDATE,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_CHECK_STATUS,
  AUTH_LOGIN_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  position: "",
  company: "",
  contactNumber: "",
  linkedIn: "",
  message: "",
  status: "loggedout",
  token: "",
  loading: false,
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_UPDATE:
      return {
        ...state,
        [payload.prop]: payload,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        message: payload,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        message: "login successful",
        status: "loggedin",
        token: payload,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        message: "logout successful",
        status: "loggedout",
        token: null,
      };
    case AUTH_CHECK_STATUS:
      return {
        ...state,
        status: "loggedin",
        token: payload.token,
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        message: payload,
        status: "failed attempt",
        loading: false,
      };
    case AUTH_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
