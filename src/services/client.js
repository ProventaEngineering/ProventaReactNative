import axios from "axios";
let instance = axios.create({
  baseURL: "https://proventa-meetings.herokuapp.com",
  responseType: "json",
});
instance.defaults.headers = {
  "Content-Type": "application/json",
};
export const setDefaultHeaders = headers => {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers[key] = headers[key];
  });
};

Object.freeze(instance); // for singleton
export default instance;
