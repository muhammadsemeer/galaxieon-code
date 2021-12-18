import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import Database from "../../Database";

type Code = {
  code: string;
  isSaved: boolean;
};

export interface Problem {
  file: string;
  problems: {
    start: number;
    end: number;
    message: string;
  }[];
}
export interface EditorState {
  activeTabs: { name: string; key: string }[];
  currentTab: string | null;
  code: {
    [index: string]: Code;
  };
  socket: Socket | null;
  database: Database;
  isReadOnly: boolean;
  problems: Problem[] | [];
}

const initialState: EditorState = {
  activeTabs: [],
  code: {},
  currentTab: null,
  socket: null,
  database: {} as Database,
  isReadOnly: true,
  problems: [],
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
    setActiveTab: (state, { payload }: PayloadAction<string | null>) => ({
      ...state,
      currentTab: payload,
    }),
    setProblem: (state, { payload }: PayloadAction<Problem>) => {
      const index = state.problems.findIndex(
        (problem) => problem.file === payload.file
      );

      if (index !== -1) {
        const newState = [...state.problems];
        newState[index] = payload;
        return { ...state, problems: newState };
      }

      return { ...state, problems: [...state.problems, payload] };
    },
    removeProblem: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        problems: state.problems.filter((problem) => problem.file !== payload),
      };
    },
  },
});

export const {
  setActiveTabs,
  removeActiveTab,
  setCode,
  setSocket,
  setDatabase,
  setReadOnly,
  setActiveTab,
  setProblem,
  removeProblem,
} = editorSlice.actions;

export default editorSlice.reducer;
