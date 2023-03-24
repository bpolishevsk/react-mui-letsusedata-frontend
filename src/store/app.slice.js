// import _ from "lodash";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuarters, getSchools } from "../apis/common";
import { toast } from "../libs";

export const readSchoolsList = createAsyncThunk("app/schools/list", async (thunkAPI) => {
  return await getSchools();
});

export const readQuartersList = createAsyncThunk("app/quarters/list", async (thunkAPI) => {
  return await getQuarters();
});

const initialState = {
  theme: {
    darkMode: false,
  },
  sidebar: {
    opened: true,
  },
  schoolList: [],
  quartersList: [],
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {},
  extraReducers: {
    [readSchoolsList.fulfilled]: (state, action) => {
      state.schoolList = action.payload;
    },
    [readSchoolsList.rejected]: (state, action) => {
      console.log(action.error);
      state.schoolList = [];
      toast.error("An unknown error occured");
    },
    [readQuartersList.fulfilled]: (state, action) => {
      state.quartersList = action.payload;
    },
    [readQuartersList.rejected]: (state, action) => {
      console.log(action.error);
      state.quartersList = [];
      toast.error("An unknown error occured");
    },
  },
});

export default appSlice.reducer;
