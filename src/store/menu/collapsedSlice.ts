import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const collapsedSlice = createSlice({
  name: "collapsed",
  initialState: false,
  reducers: {
    collapse: (state) => {
      return !state;
    },
  },
});

export const { collapse } = collapsedSlice.actions;

export default collapsedSlice.reducer;
