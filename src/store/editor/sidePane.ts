import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidePaneState {
  showPane: boolean;
  activePane: "info" | "explorer";
}

const initialState: SidePaneState = {
  showPane: true,
  activePane: "info",
};

const sidePaneSlice = createSlice({
  name: "sidePane",
  initialState,
  reducers: {
    togglePane: (state) => ({ ...state, showPane: !state.showPane }),
    setActivePane: (
      state,
      { payload }: PayloadAction<"info" | "explorer">
    ) => ({
      showPane: true,
      activePane: payload,
    }),
    clearSidePane: (state) => initialState,
  },
});

export const { togglePane, setActivePane, clearSidePane } =
  sidePaneSlice.actions;
export default sidePaneSlice.reducer;
