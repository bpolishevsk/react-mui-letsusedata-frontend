import axios from "../libs/axios";
import adminApi from "../libs/adminApi";

// Get Request Login List
export const getRequestLogin = () => {
  return adminApi.get(`RequestLogin`);
};

export const apiGetCourseList = () => {
  return adminApi.get(`Course`);
};
