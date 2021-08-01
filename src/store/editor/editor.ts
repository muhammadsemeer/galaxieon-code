import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
  activeTabs: { name: string; key: string }[];
}

const initialState: EditorState = {
  activeTabs: [],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setActiveTabs: (
      state,
      { payload }: PayloadAction<{ name: string; key: string }>
    ) => {
      let isTabExist = state.activeTabs.findIndex(
        (tab) => tab.key === payload.key
      );
      if (isTabExist === -1) {
        return { ...state, activeTabs: [...state.activeTabs, payload] };
      }
    },
  },
});

export const { setActiveTabs } = editorSlice.actions;

export default editorSlice.reducer;
