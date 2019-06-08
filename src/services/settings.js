import client from "./client";

export const getCalendar = () => client.get("/settings");
export const updateCalendar = data => client.patch("/settings", data);
