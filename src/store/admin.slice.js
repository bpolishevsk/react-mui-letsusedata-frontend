// import _ from "lodash";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "../libs";
import { getRequestLogin, apiGetCourseList } from "../apis/admin";

export const readRequestLogin = createAsyncThunk("app/request/login", async (data, thunkAPI) => {
  return await getRequestLogin();
});

export const getCourseList = createAsyncThunk("admin/course/get", async (data, thunkAPI) => {
  return await apiGetCourseList();
});

const initialState = {
  requestLoginList: [],
  courses: null,
};

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {},
  extraReducers: {
    [readRequestLogin.fulfilled]: (state, action) => {
      state.requestLoginList = action.payload;
    },
    [readRequestLogin.rejected]: (state, action) => {
      console.log(action.error);
      state.requestLoginList = [];
      toast.error("An unknown error occured");
    },
    [getCourseList.fulfilled]: (state, action) => {
      state.courses = action.payload;
    },
    [getCourseList.rejected]: (state, action) => {
      console.log(action.error);
      state.courses = [];
      toast.error("An unknown error occured");
    },
  },
});

export default adminSlice.reducer;
