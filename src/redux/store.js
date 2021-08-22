import { configureStore } from "@reduxjs/toolkit";
import appSlice from "src/redux/slices/app.slice";

const reducer = {
  app: appSlice,
};

const store = configureStore({
  reducer,
});

export default store;
