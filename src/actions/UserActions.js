import {
  USER_UPDATE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESPONSE,
  FETCH_PROFILE_FAILED,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  SERVER_ADDRESS,
  FETCH_MEETING,
  FETCH_MEETINGS_FAILED,
} from "./types";
import { UserAPI } from "../services";
import { fetchMeetings } from "./MeetingActions";
import { AsyncStorage } from "react-native";

//Update emailAddress and password field
export const updateUser = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value },
  };
};

//Retrieve user profile
export const fetchProfileAndMeetings = token => async dispatch => {
  try {
    return dispatch(fetchProfile(token)).then(() => dispatch(fetchMeetings(token)));
  } catch (e) {
    failedFetchProfileAndMeeting(e);
  }
};

export const failedFetchProfileAndMeeting = e => async dispatch => {
  dispatch({ type: FETCH_PROFILE_FAILED, payload: { message: e.toString() }, error: true });
  dispatch({ type: FETCH_MEETINGS_FAILED, payload: { message: e.toString() }, error: true });
};

export const fetchProfile = (token, callback) => async dispatch => {
  try {
    const request = await UserAPI.getProfile();
    //Login Success
    dispatch({
      type: FETCH_PROFILE_RESPONSE,
      payload: { ...request.data.data.attributes, ...{ token: token } },
    });
    callback();
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_PROFILE_FAILED, payload: { message: error.toString() }, error: true });
  }
};

export const updateProfile = (payload, token) => async dispatch => {
  try {
    const request = await UserAPI.updateProfile(payload);
    const profile = request.data;
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: { ...profile.data.attributes },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: { message: error.toString() }, error: true });
  }
};
