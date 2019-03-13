import {
  USER_UPDATE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_RESPONSE,
  FETCH_PROFILE_FAILED,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  SERVER_ADDRESS, FETCH_MEETING, FETCH_MEETINGS_FAILED
} from "./types"
  ;
import axios from "axios";
import {AsyncStorage} from "react-native";

//Update emailAddress and password field
export const updateUser = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

//Retrieve user profile

export const fetchProfile = (token) => async dispatch => {
    dispatch({type: FETCH_PROFILE_REQUEST});
    const url = `${SERVER_ADDRESS}/profile`;
    try {
      const request = await axios.get(url, {
          "headers": {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });
      const profile = await request.data;
      dispatch({
          type: FETCH_PROFILE_RESPONSE,
          payload: {...profile.data.attributes, ...{"token": token}}
      });
    } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_PROFILE_FAILED, payload: {message: e.toString()}, error: true });
    }
};

// export const fetchProfile = (token) => async dispatch => {
//   const url = `${SERVER_ADDRESS}/profile`;
//   try {
//     const request = await axios.get(url, {
//         "headers": {
//             "Content-Type": "application/json",
//             "Authorization": token
//         }
//     });
//     dispatch({
//       type: FETCH_PROFILE,
//       payload: request.data.data
//     });
//     // callback();
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Create User Profile
// export const createProfile = (form, callback) => {
//   try {
//     const request = await axios.POST(`${SERVER_ADDRESS}/user`, {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       emailAddress: form.emailAddress,
//       position: form.position,
//       company: form.company,
//       contactNumber: form.contactNumber,
//       linkedIn: form.linkedIn
//     });

//     if (request.status === "SUCCESS") {
//       dispatch({
//         type: PROFILE_UPDATE_SUCCESS,
//         payload: "Profile Creation Successful"
//       });
//     } else {
//       dispatch({
//         type: PROFILE_UPDATE_FAIL,
//         payload: "Profile Creation Failed"
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Update User Profile
// export const updateProfile = (form, callback) => {
//   try {
//     const request = await axios.post(`${SERVER_ADDRESS}/user/${form.userId}`, {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       emailAddress: form.emailAddress,
//       position: form.position,
//       company: form.company,
//       contactNumber: form.contactNumber,
//       linkedIn: form.linkedIn
//     });

//     if (request.status === "SUCCESS") {
//       dispatch({
//         type: PROFILE_UPDATE_SUCCESS,
//         payload: "Profile Update Successful"
//       });
//     } else {
//       dispatch({
//         type: PROFILE_UPDATE_FAIL,
//         payload: "Profile Update Failed"
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
