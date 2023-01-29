import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./AccountSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
