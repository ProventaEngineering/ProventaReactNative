import client from "./client";

export const get = () => {
  const hasToken = !!client.defaults.headers.Authorization;
  const endpoint = hasToken ? "/meetings" : "/anonymous/meetings";
  return client.get(endpoint);
};
