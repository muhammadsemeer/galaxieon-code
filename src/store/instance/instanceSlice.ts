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
    updateOneInstance: (state, { payload }: PayloadAction<Instance>) => {
      let index = state.findIndex(({ id }) => id === payload.id);
      if (index !== -1) {
        let newState = [...state];
        newState[index] = payload;
        return newState;
      }
    },
    removeAllInstances: (state) => {
      return [];
    },
  },
});

export const {
  addInstances,
  addOneInstance,
  removeOneInstance,
  updateOneInstance,
  removeAllInstances,
} = instanceSlice.actions;

export default instanceSlice.reducer;
