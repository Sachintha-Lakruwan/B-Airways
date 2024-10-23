"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface FlightState {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  passengerCount: number;
  passengerClass: string;
  isStageOneCompleted: boolean;
}

const initialState: FlightState = {
  departureAirport: "",
  arrivalAirport: "",
  departureDate: "",
  passengerCount: 0,
  passengerClass: "",
  isStageOneCompleted: false,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    checkFirstStage: (state) => {
      if (
        state.arrivalAirport == "" ||
        state.departureAirport == "" ||
        state.departureDate == "" ||
        state.passengerClass == "" ||
        state.passengerCount == 0
      ) {
        state.isStageOneCompleted = false;
      } else {
        state.isStageOneCompleted = true;
      }
    },
    setDepartureAirport: (state, action) => {
      state.departureAirport = action.payload;
    },
    setArrivalAirport: (state, action) => {
      state.arrivalAirport = action.payload;
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setPassengerCount: (state, action) => {
      state.passengerCount = action.payload;
    },
    setPassengerClass: (state, action) => {
      state.passengerClass = action.payload;
    },
  },
});

export const {
  setDepartureAirport,
  setArrivalAirport,
  setDepartureDate,
  setPassengerClass,
  setPassengerCount,
  checkFirstStage,
} = flightSlice.actions;

export default flightSlice.reducer;
