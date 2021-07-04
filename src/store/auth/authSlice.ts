import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../types/auth";

const initialState: Auth = JSON.parse(
  localStorage.getItem("auth") as string
) || {
  login: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<Auth>) => {
      localStorage.setItem("auth", JSON.stringify({ ...state, ...payload }));
      state = { ...state, ...payload };
    },
    logOut: (state, { payload }: PayloadAction<"user" | "admin">) => {
      switch (payload) {
        case "admin": {
          const { admin, ...rest } = state;
          return (state = rest);
        }
        case "user": {
          const { user, ...rest } = state;
          return (state = rest);
        }
      }
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
