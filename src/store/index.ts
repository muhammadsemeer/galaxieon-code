import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import collapsed from "./menu/collapsedSlice";
import responsive from "./menu/responsiveSlice";
import instance from "./instance/instanceSlice";

const store = configureStore({
  reducer: {
    auth,
    collapsed,
    instance,
    responsive,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
