import {
  SETTINGS_UPDATE,
  FETCH_CALENDAR_SETTINGS,
  FETCH_NOTIFICATION_SETTINGS,
  SETTINGS_CONFIG_SUCCESS,
  SETTINGS_CONFIG_FAIL,
  SERVER_ADDRESS,
} from "./types";
import { SettingsAPI } from "../services";

//Retrieve calendar settings
export const fetchCalendarSettings = token => async dispatch => {
  const url = `${SERVER_ADDRESS}/settings`;
  try {
    const request = await SettingsAPI.getCalendar();
    const settings = request.data;
    dispatch({
      type: FETCH_CALENDAR_SETTINGS,
      payload: { ...settings.data.attributes },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SETTINGS_CONFIG_FAIL, payload: { message: e.toString() }, error: true });
  }
};

//Update calendar settings
export const updateCalendarSettings = (data, token) => async dispatch => {
  try {
    const request = await SettingsAPI.updateCalendar(data);
    const settings = request.data;
    dispatch({
      type: SETTINGS_CONFIG_SUCCESS,
      payload: { ...settings.data.attributes },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SETTINGS_CONFIG_FAIL, payload: { message: e.toString() }, error: true });
  }
};

// makoy same endpoint with get calendar settings
//Retrieve notification settings
export const fetchNotificationSettings = token => async dispatch => {
  try {
    const request = await axios.get(`${SERVER_ADDRESS}/settings`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const settings = await request.data;
    dispatch({
      type: FETCH_NOTIFICATION_SETTINGS,
      payload: { ...settings.data.attributes },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SETTINGS_CONFIG_FAIL, payload: { message: e.toString() }, error: true });
  }
};

// makoy same endpoint with patch calendar settings
//Update NotificationSettings
export const updateNotificationSettings = (data, token, type) => async dispatch => {
  try {
    const request = await axios.patch(`${SERVER_ADDRESS}/settings`, data, {
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const settings = await request.data;
    dispatch({
      type: SETTINGS_CONFIG_SUCCESS,
      payload: { ...settings.data.attributes, type },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SETTINGS_CONFIG_FAIL, payload: { message: e.toString() }, error: true });
  }
};
