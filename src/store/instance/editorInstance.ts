import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Instance } from "../../types/templateAndInstance";

let initialState: Instance= {} as Instance;

const editorInstance = createSlice({
  name: "instance",
  initialState,
  reducers: {
    addInstance: (state, { payload }: PayloadAction<Instance>) => {
      return payload;
    },
    removeInstance: (state, { payload }: PayloadAction<Instance>) => {
      return undefined;
    },
    updateInstance: (state, { payload }: PayloadAction<Instance>) => {
      return { ...state, ...payload };
    },
  },
});

export const { addInstance, removeInstance, updateInstance } =
  editorInstance.actions;

export default editorInstance.reducer;
