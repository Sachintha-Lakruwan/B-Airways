"use client";

import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./Slices/FlightDetails/flight";
import authReducer from "./Slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    auth : authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
