import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CodeState {
  code: string;
}

const initialState: CodeState = {
  code: "",
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      code: payload,
    }),
  },
});

export const { setCode } = codeSlice.actions;

export default codeSlice.reducer;
