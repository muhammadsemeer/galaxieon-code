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
      return (state = { ...state, ...payload });
    },
    logOut: (state, { payload }: PayloadAction<"user" | "admin">) => {
      switch (payload) {
        case "admin": {
          const { admin, login, ...rest } = state;
          localStorage.setItem(
            "auth",
            JSON.stringify({ login: rest.user ? true : false, ...rest })
          );
          return (state = { login: rest.user ? true : false, ...rest });
        }
        case "user": {
          const { user, login, ...rest } = state;
          localStorage.setItem(
            "auth",
            JSON.stringify({ login: rest.admin ? true : false, ...rest })
          );
          return (state = { login: rest.admin ? true : false, ...rest });
        }
      }
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
