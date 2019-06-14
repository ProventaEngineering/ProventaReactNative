import * as AuthAPI from "./auth";
import * as SettingsAPI from "./settings";
import * as HistoryAPI from "./history";
import * as MeetingsAPI from "./meetings";
import * as UserAPI from "./user";

export const getErrorMessage = error => {
  let errorMessage = "";
  if (error.response) {
    const {
      response: {
        data: { message },
      },
    } = error;
    errorMessage = message;
  } else if (error.text) {
    errorMessage = error.text;
  } else {
    errorMessage = error.message || error || "Something went wrong!";
  }
  return errorMessage;
};

export { AuthAPI, SettingsAPI, HistoryAPI, MeetingsAPI, UserAPI };
