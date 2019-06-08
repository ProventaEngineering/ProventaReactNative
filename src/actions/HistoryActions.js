import { FETCH_HISTORY, HISTORY_UPDATE_SUCCESS, HISTORY_UPDATE_FAIL } from "./types";
import { HistoryAPI } from "../services";

//Retrieve list of history
export const fetchHistory = async userId => {
  try {
    const request = await HistoryAPI.get(userId);

    if (request.status === "SUCCESS") {
      dispatch({
        type: FETCH_HISTORY,
        payload: request.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Create History
export const createHistory = async (form, callback) => {
  try {
    const request = await HistoryAPI.create(form);
    if (request.status === "SUCCESS") {
      dispatch({
        type: HISTORY_UPDATE_SUCCESS,
        payload: "History Log Successful",
      });
    } else {
      dispatch({
        type: HISTORY_UPDATE_FAIL,
        payload: "History Log Failed",
      });
    }
  } catch (error) {
    error;
  }
};

//Update History
export const updateHistory = async (form, callback) => {
  try {
    const request = await HistoryAPI.update(form);

    if (request.status === "SUCCESS") {
      dispatch({
        type: HISTORY_UPDATE_SUCCESS,
        payload: "History Update Successful",
      });
    } else {
      dispatch({
        type: HISTORY_UPDATE_FAIL,
        payload: "History Update Failed",
      });
    }
  } catch (error) {
    error;
  }
};
