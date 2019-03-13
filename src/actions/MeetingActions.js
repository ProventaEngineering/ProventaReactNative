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
  SERVER_ADDRESS, FETCH_MEETINGS_FAILED
} from "./types";

import { AsyncStorage } from "react-native";
import axios from "axios";
import { UserActions } from "../actions";

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

//Retrieve meetings
export const fetchMeetings = (token) => async dispatch => {
  dispatch({type: FETCH_MEETINGS_REQUEST});


  //get token then fetch meetings
  try {
    const url =
      token != null
        ? `${SERVER_ADDRESS}/meetings`
        : `${SERVER_ADDRESS}/anonymous/meetings`;
    const request = await axios.get(
      url, {
        "headers": {
          "Content-Type": "application/json",
          "Authorization": token
        }
      }
    );
    const meetings = await request.data;
    dispatch({ type: FETCH_MEETINGS_RESPONSE, payload: meetings.data });
  }catch (e) {
    dispatch({ type: FETCH_MEETINGS_FAILED, payload: {message: e.toString()}, error: true });
  }
};






// //Retrieve fitered meetings
// export const fetchFilteredMeetings = (query) => {
//   try {
//     const request = await axios.GET(`${SERVER_ADDRESS}/meetings/${query}`);
//     if (request.status === "SUCCESS") {
//       dispatch({
//         type: FETCH_FILTERED_MEETINGS,
//         payload: request.data
//       });
//     }
//   } catch (error) {
//     (error);
//   }
// };

// //Retrieve user inbox
// export const fetchInbox = userId => {
//   try {
//     const request = await axios.GET(`${SERVER_ADDRESS}/${userId}/inbox`);
//     if (request.status === "SUCCESS") {
//       dispatch({
//         type: FETCH_INBOX,
//         payload: request.data
//       });
//     }
//   } catch (error) {
//     (error);
//   }
// };

// //Update message status for view
// export const updateMessage = ({ prop, value }) => {
//   return {
//     type: MESSAGE_UPDATE,
//     payload: { prop, value }
//   };
// };

// //Update message status
// export const updateMessageStatus = (form, callback) => {
//   try {
//     const request = await axios.PATCH(
//       `${SERVER_ADDRESS}/message/${form.message.id}`,
//       {
//         status: "read"
//       }
//     );

//     if (request.status === "SUCCESS") {
//       dispatch({
//         type: MESSAGE_UPDATE_SUCCESS,
//         payload: "Message Update Successful"
//       });
//     } else {
//       dispatch({
//         type: MESSAGE_UPDATE_FAIL,
//         payload: "Message Update Failed"
//       });
//     }
//   } catch (error) {
//     (error);
//   }
