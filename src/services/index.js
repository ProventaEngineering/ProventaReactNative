export { default as AuthAPI } from "./auth";
export { default as SettingsAPI } from "./settings";
export { default as HistoryAPI } from "./history";
export { default as MeetingsAPI } from "./meetings";
export { default as UserAPI } from "./user";

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
