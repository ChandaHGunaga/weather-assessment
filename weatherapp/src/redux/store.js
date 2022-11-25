import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./apiSlice";
import favSlice from "./weatherSlice";
const store = configureStore({
  reducer: {
    weatherReducer,
    weatherlist: favSlice,
  },
});

export default store;
