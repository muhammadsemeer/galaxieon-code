import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Instance } from "../../types/templateAndInstance";

const initialState: Instance[] = [];

const instanceSlice = createSlice({
  name: "instance",
  initialState,
  reducers: {
    addInstances: (state, { payload }: PayloadAction<Instance[]>) => {
      return [...state, ...payload];
    },
    addOneInstance: (state, { payload }: PayloadAction<Instance>) => {
      return [...state, payload];
    },
    removeOneInstance: (state, { payload }: PayloadAction<String>) => {
      return state.filter((instance) => instance.id !== payload);
    },
  },
});

export const { addInstances, addOneInstance, removeOneInstance } =
  instanceSlice.actions;

export default instanceSlice.reducer;
