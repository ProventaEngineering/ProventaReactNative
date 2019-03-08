import {
  USER_UPDATE,
  FETCH_PROFILE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  SERVER_ADDRESS
} from "./types"
  ;
import axios from "axios";

//Update emailAddress and password field
export const updateUser = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

//Retrieve user profile
export const fetchProfile = (token, callback) => async dispatch => {
  console.log("in fetchProfile");
  try {
    const request = axios.get(
      `${SERVER_ADDRESS}/users/43`,
      { "headers": { "Content-Type": "application/json", "Authorization": token } }
    )
    console.log("in fetchProfile", request.data)
    dispatch({
      type: FETCH_PROFILE,
      payload: request.data.data.attributes
    });
    callback();
  } catch (error) {
    console.log(error);
  }
};

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
