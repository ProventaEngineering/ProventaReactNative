import {
  FETCH_MEETINGS_REQUEST,
  FETCH_MEETINGS_RESPONSE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESPONSE,
  FETCH_MEETING,
  FETCH_MAIN_VENUE,
  FETCH_MAIN_EXPECTATIONS,
  FETCH_MAIN_FACILITATORS,
  FETCH_MAIN_PARTICIPANTS,
  FETCH_MAIN_SPONSORS,
  FETCH_MAIN_FLOORPLANS,
  FETCH_MAIN_DISCUSSIONS,
  FETCH_MAIN_TALKS,
  FETCH_INBOX,
  FETCH_FILTERED_MEETINGS,
  MESSAGE_UPDATE,
  MESSAGE_UPDATE_SUCCESS,
  MESSAGE_UPDATE_FAIL,
  SERVER_ADDRESS,
  FETCH_MEETINGS_FAILED,
} from "./types";

import { AsyncStorage } from "react-native";
import { UserActions } from "../actions";
import { MeetingsAPI } from "../services";
//Retrieve meetings
export const fetchMeetings = token => async dispatch => {
  dispatch({ type: FETCH_MEETINGS_REQUEST });
  try {
    const request = await MeetingsAPI.get();
    const meetings = request.data;
    dispatch({ type: FETCH_MEETINGS_RESPONSE, payload: meetings.data });
    // callback();
  } catch (e) {
    dispatch({ type: FETCH_MEETINGS_FAILED, payload: { message: e.toString() }, error: true });
  }
};
