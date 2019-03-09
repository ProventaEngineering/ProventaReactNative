// SERVER ADDRESS
export const SERVER_ADDRESS = "https://proventa-meetings.herokuapp.com";

//============================ AUTH ACTIONS ============================//

// Global Form Update ( property , value )
// i.e ( "email" , "sampleemail@email.com" ) , ( "password" , "samplepassword" )
export const AUTH_UPDATE = "auth_update";

//Sign-up , Sign-up with Google , Sign-up with LinkedIn
export const AUTH_SIGNUP_SUCCESS = "auth_signup_success";
export const AUTH_SIGNUP_FAIL = "auth_signup_fail";

//Login, Login with Google, Login with LinkedIn
export const AUTH_LOGIN_SUCCESS = "auth_login_success";
export const AUTH_LOGIN_FAIL = "auth_login_fail";

//Logout
export const AUTH_LOGOUT = "auth_logout";

//Status
export const AUTH_CHECK_STATUS = "auth_check_status";

//============================ USER ACTIONS ============================//

// Global Form Update ( property , value )
// i.e ( "name" , "Mario" )
export const USER_UPDATE = "user_update";

// Getting User Information
export const FETCH_PROFILE = "fetch_profile";

// Updating User Information
export const PROFILE_UPDATE_SUCCESS = "profile_update_success";
export const PROFILE_UPDATE_FAIL = "profile_update_fail";

//============================ SETTINGS ACTIONS ============================//

// Global Form Update ( property , value )
// i.e ( "email_notifications" , true )
export const SETTINGS_UPDATE = "settings_update";

// Getting Current Calendar Settings
export const FETCH_CALENDAR_SETTINGS = "fetch_calendar_settings";
// Getting Current Notification Settings
export const FETCH_NOTIFICATION_SETTINGS = "fetch_notification_settings";

// Updating Settings
export const SETTINGS_CONFIG_SUCCESS = "settings_config_success";
export const SETTINGS_CONFIG_FAIL = "settings_config_fail";

//============================ MEETINGS ACTIONS ============================//

// Getting all meetings (anonymous/signed-in)
export const FETCH_MEETINGS = "FETCH_MEETINGS";

// Get main meeting
export const FETCH_MEETING = "fetch_meeting";
export const FETCH_MAIN_VENUE = "fetch_main_venue";
export const FETCH_MAIN_EXPECTATIONS = "fetch_main_expectations";
export const FETCH_MAIN_FACILITATORS = "fetch_main_facilitators";
export const FETCH_MAIN_PARTICIPANTS = "fetch_main_participants";
export const FETCH_MAIN_SPONSORS = "fetch_main_sponsors";
export const FETCH_MAIN_FLOORPLANS = "fetch_main_floorplans";
export const FETCH_MAIN_DISCUSSIONS = "fetch_main_discussions";
export const FETCH_MAIN_TALKS = "fetch_main_talks";

//Getting inbox messages
export const FETCH_INBOX = "FETCH_INBOX";

//Update message status ( unread to read )
export const MESSAGE_UPDATE = "message_update";
export const MESSAGE_UPDATE_SUCCESS = "message_update_success";
export const MESSAGE_UPDATE_FAIL = "message_update_fail";

//Searching meetings
export const FETCH_FILTERED_MEETINGS = "fetch_filtered_meetings";

//============================ HISTORY ACTIONS ============================//

//Getting list of history
export const FETCH_HISTORY = "fetch_history";

//Update current history
export const HISTORY_UPDATE = "history_update";
export const HISTORY_UPDATE_SUCCESS = "history_update_success";
export const HISTORY_UPDATE_FAIL = "history_update_fail";
