import {
  SETTINGS_UPDATE,
  FETCH_CALENDAR_SETTINGS,
  FETCH_NOTIFICATION_SETTINGS,
  SETTINGS_CONFIG_SUCCESS,
  SETTINGS_CONFIG_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  calendar: {},
  notification: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETTINGS_UPDATE:
      return { ...state, [action.payload.prop]: action.payload };
    case FETCH_CALENDAR_SETTINGS:
      return {
        ...state,
        calendar: {
          calendarGoogle: action.payload.calendarGoogle,
          calendarIcalendar: action.payload.calendarIcalendar
        }
      };
    case FETCH_NOTIFICATION_SETTINGS:
      return {
        ...state,
        notification: {
          notificationPush: action.payload.notificationPush,
          notificationSms: action.payload.notificationSms,
          notificationEmail: action.payload.notificationEmail
        }
      };
    case SETTINGS_CONFIG_SUCCESS:
      return {
        ...state,
        calendar: {
          calendarGoogle: action.payload.type === 'google' ? action.payload.result.calendarGoogle : null,
          calendarIcalendar: action.payload.type === 'calendar' ? action.payload.result.calendarIcalendar : null,
        },
        notification: {
          notificationPush: action.payload.type === 'push' ? action.payload.result.notificationPush : null,
          notificationSms: action.payload.type === 'sms' ? action.payload.result.notificationSms : null,
          notificationsEmail: action.payload.type === 'email' ? action.payload.result.notificationsEmail : null
        }
      };
    case SETTINGS_CONFIG_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
