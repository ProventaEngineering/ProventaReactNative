import {
  AUTH_UPDATE,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  SERVER_ADDRESS,
  AUTH_CHECK_STATUS,
} from "./types";
import { AuthAPI } from "../services";
import { fetchProfileAndMeetings } from "./UserActions";

// Update emailAddress and password field
export const updateAuth = ({ prop, value }) => {
  return {
    type: AUTH_UPDATE,
    payload: { prop, value },
  };
};

export const signUp = data => async dispatch => {
  try {
    const request = await AuthAPI.signUp({
      ...data,
      firstName: "GUEST",
      lastName: "GUEST",
    });

    dispatch({
      type: AUTH_SIGNUP_SUCCESS,
      payload: "Sign Up Successful",
    });
    //Sign Up Success
    if (request.result === "SUCCESS") {
      dispatch({
        type: AUTH_SIGNUP_SUCCESS,
        payload: "Sign Up Successful",
      });
    } else {
      dispatch({
        type: AUTH_SIGNUP_FAIL,
        payload: "Sign Up Failed",
      });
    }

    //This is called after the POST function is done
    // For UI trigger
    // callback();
  } catch (error) {
    error;
  }
};
export const loginAndFetchData = data => async dispatch => {
  dispatch(login(data)).then(token => dispatch(fetchProfileAndMeetings(token)));
};

export const login = (data, callback) => async dispatch => {
  try {
    const request = await AuthAPI.login(data);
    //Login Success
    if (request.data.auth_token.length > 0) {
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: request.data.auth_token,
      });
    } else {
      dispatch({
        type: AUTH_LOGIN_FAIL,
        payload: "Login Failed",
      });
    }
    //This is called after the POST function is done
    // For UI trigger
    callback();
    // return request.data.auth_token;
  } catch (error) {
    error;
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOGOUT,
      payload: null,
    });
  } catch (error) {
    error;
  }
};

export const updateStatus = (token, callback) => async dispatch => {
  console.log("update", token);
  try {
    dispatch({
      type: AUTH_CHECK_STATUS,
      payload: {
        status: "loggedin",
        token,
      },
    });
    callback();
  } catch (error) {
    error;
  }
};
