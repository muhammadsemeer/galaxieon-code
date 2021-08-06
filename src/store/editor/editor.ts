import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Code = {
  code: string;
  isSaved: boolean;
};
export interface EditorState {
  activeTabs: { name: string; key: string }[];
  code: {
    [index: string]: Code;
  };
}

const initialState: EditorState = {
  activeTabs: [],
  code: {},
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
    removeActiveTab: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        activeTabs: state.activeTabs.filter((tab) => tab.key !== payload),
      };
    },
    setCode: (
      state,
      {
        payload,
      }: PayloadAction<{ key: string; code: string; isSaved: boolean }>
    ) => {
      return {
        ...state,
        code: {
          ...state.code,
          [payload.key]: { code: payload.code, isSaved: payload.isSaved },
        },
      };
    },
  },
});

export const { setActiveTabs, removeActiveTab, setCode } = editorSlice.actions;

export default editorSlice.reducer;
