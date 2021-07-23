import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const collapsedSlice = createSlice({
  name: "collapsed",
  initialState: window.innerWidth <= 980,
  reducers: {
    collapse: (state) => {
      return !state;
    },
    collapseWithPayload: (state, payload: PayloadAction<boolean>) => {
      return payload.payload;
    },
  },
});

export const { collapse, collapseWithPayload } = collapsedSlice.actions;

export default collapsedSlice.reducer;
