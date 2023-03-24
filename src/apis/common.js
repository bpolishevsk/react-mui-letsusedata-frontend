import axios from "../libs/axios";
import adminApi from "../libs/adminApi";

// Get Profile Info
export const getProfileInfo = () => {
  return axios.post(`ProfileInfo`);
};

//Update Profile Image
export const updateProfile = (data) => {
  return axios.post(`UpdateProfile`, data);
};

export const getCalendar = (CourseInstanceId) => {
  return axios.post(`Calendar`, { CourseInstanceId });
};

export const getSchools = () => {
  return adminApi.get(`Schools`);
};

export const getQuarters = () => {
  return adminApi.get(`Quarters`);
};
