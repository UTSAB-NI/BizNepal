//this componet set the user currnet location in the redux store

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
};

const locationSlice = createSlice({
  name: "currentlocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
