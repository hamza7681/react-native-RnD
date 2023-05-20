import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";

export const store = configureStore({
  reducer: { AuthReducer },
  devTools: true,
});
