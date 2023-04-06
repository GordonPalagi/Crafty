import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import messageSlice from "./messageSlice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    message: messageSlice.reducer,
    ui: uiSlice.reducer,
  },
  devTools: true,
});
export default store;
