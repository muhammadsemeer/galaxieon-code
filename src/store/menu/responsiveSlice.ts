import { createSlice } from "@reduxjs/toolkit";

const responsiveSlice = createSlice({
  name: "responsive",
  initialState: false,
  reducers: {
    toggle: (state) => {
      return !state;
    },
  },
});

export const { toggle } = responsiveSlice.actions;

export default responsiveSlice.reducer;
