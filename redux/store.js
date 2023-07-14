import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterSlice } from "./counter/counterSlice";
import { authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  // dashbord,
  [counterSlice.name]: counterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
