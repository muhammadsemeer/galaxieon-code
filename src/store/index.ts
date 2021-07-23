import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import collapsed from "./menu/collapsedSlice";

const store = configureStore({
  reducer: {
    auth,
    collapsed,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
