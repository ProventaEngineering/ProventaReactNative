import client from "./client";

export const get = userId => client.get(`/${userId}/history`);

export const create = ({ userId, meetingId, date }) => {
  return client.post("/history", { userId, meetingId, date });
};

export const update = ({ userId, meetingId, date }) => {
  return client.put(`/${userId}/history`, { meetingId, date });
};
