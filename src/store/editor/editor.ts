import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import Database from "../../Database";

type Code = {
  code: string;
  isSaved: boolean;
};
export interface EditorState {
  activeTabs: { name: string; key: string }[];
  code: {
    [index: string]: Code;
  };
  socket: Socket | null;
  database: Database;
  isReadOnly: boolean;
}

const initialState: EditorState = {
  activeTabs: [],
  code: {},
  socket: null,
  database: {} as Database,
  isReadOnly: true,
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
    setSocket: (state, { payload }: PayloadAction<Socket>) => ({
      ...state,
      socket: payload,
    }),
    setDatabase: (state, { payload }: PayloadAction<Database>) => ({
      ...state,
      database: payload,
    }),
    setReadOnly: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      isReadOnly: payload,
    }),
  },
});

export const {
  setActiveTabs,
  removeActiveTab,
  setCode,
  setSocket,
  setDatabase,
  setReadOnly,
} = editorSlice.actions;

export default editorSlice.reducer;
