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
  SERVER_ADDRESS
} from "./types";

import { AsyncStorage } from "react-native";
import axios from "axios";
import { UserActions } from "../actions";

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

//Retrieve meetings
export const fetchMeetings = () => async dispatch => {
  dispatch({type: FETCH_MEETINGS_REQUEST});


  //get token then fetch meetings
  try {
    const token = await AsyncStorage.getItem('token');
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

  }

  // try {
  //
  //   const request = await axios.get(
  //     url, {
  //       "headers": {
  //         "Content-Type": "application/json",
  //         "Authorization": token
  //       }
  //     }
  //   );
  //
  //   const meetings = await request.data;
  //   console.log(">>>>>>>>>>>", meetings);
  //   dispatch({
  //     type: FETCH_MEETINGS_RESPONSE,
  //     payload: meetings.data
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

//Retrieve main meetings
export const fetchMeeting = () => async dispatch => {

  try{
    const token = await AsyncStorage.getItem('token');

  }catch(e){

  }
  // const url =
  //   status === "loggedin"
  //     ? `${SERVER_ADDRESS}/meetings/${id}`
  //     : `${SERVER_ADDRESS}/anonymous/meetings/${id}`;
  // console.log("======fetching id", id)
  // console.log("======fetching status", status)
  // console.log("======fetching token", token)
  // try {
  //   const request = await axios.get(url, {
  //     "headers": {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }
  //   });
  //   dispatch({
  //     type: FETCH_MEETING,
  //     payload: request.data.data.attributes
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

//Retrieve main venue
export const fetchMainVenue = (id, status, token) => async dispatch => {
  const url =
    status === "loggedin"
      ? `${SERVER_ADDRESS}/meetings/${id}`
      : `${SERVER_ADDRESS}/anonymous/meetings/${id}`;
  try {
    const request = await axios.get(url, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    dispatch({
      type: FETCH_MAIN_VENUE,
      payload: request.data.data.attributes.venues
    });
  } catch (error) {
    console.log(error);
  }
};



//Retrieve main expectations
export const fetchExpectations = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(
      url, { "headers": { "Content-Type": "application/json", "Authorization": token } }
    );
    dispatch({
      type: FETCH_MAIN_EXPECTATIONS,
      payload: request.data.data.attributes.expectations
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main facilitators
export const fetchFacilitators = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(
      url, { "headers": { "Content-Type": "application/json", "Authorization": token } }
    );
    dispatch({
      type: FETCH_MAIN_FACILITATORS,
      payload: request.data.data.attributes.facilitators
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main participants
export const fetchParticipants = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(url, { "headers": { "Content-Type": "application/json", "Authorization": token } });
    dispatch({
      type: FETCH_MAIN_PARTICIPANTS,
      payload: request.data.data.attributes.participants
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main sponsors
export const fetchSponsors = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(url, { "headers": { "Content-Type": "application/json", "Authorization": token } });
    dispatch({
      type: FETCH_MAIN_SPONSORS,
      payload: request.data.data.attributes.sponsors
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main floorplans
export const fetchFloorPlans = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(url, { "headers": { "Content-Type": "application/json", "Authorization": token } });
    dispatch({
      type: FETCH_MAIN_FLOORPLANS,
      payload: request.data.data.attributes.floorPlans
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main discussions
export const fetchDiscussions = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(url, { "headers": { "Content-Type": "application/json", "Authorization": token } });
    dispatch({
      type: FETCH_MAIN_DISCUSSIONS,
      payload: request.data.data.attributes.discussionsWithTalks.data
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrieve main talks
export const fetchTalks = (id, status, token) => async dispatch => {
  const url = status === "loggedin" ? `${SERVER_ADDRESS}/meetings/${id}` : `${SERVER_ADDRESS}/anonymous/meetings/${id}`
  try {
    const request = await axios.get(url, { "headers": { "Content-Type": "application/json", "Authorization": token } });
    dispatch({
      type: FETCH_MAIN_TALKS,
      payload: request.data.data.attributes.discussionsWithTalks
    });
  } catch (error) {
    console.log(error);
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
