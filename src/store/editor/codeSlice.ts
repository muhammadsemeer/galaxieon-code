import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CodeState {
  [index: string]: string;
}

const codeSlice = createSlice({
  name: "code",
  initialState: {} as CodeState,
  reducers: {
    setCode: (
      state,
      { payload }: PayloadAction<{ code: string; name: string }>
    ) => ({
      ...state,
      [payload.name]: payload.code,
    }),
  },
});

export const { setCode } = codeSlice.actions;

export default codeSlice.reducer;
