"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface FlightState {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: number;
  arrivalDate: number;
  passengerCount: number;
  isStageOneCompleted: boolean;
}

const initialState: FlightState = {
  departureAirport: "",
  arrivalAirport: "",
  departureDate: 0,
  arrivalDate: 0,
  passengerCount: 0,
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
        state.arrivalDate == 0 ||
        state.departureDate == 0 ||
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
    setArrivalDate: (state, action) => {
      state.arrivalDate = action.payload;
    },
    setPassengerCount: (state, action) => {
      state.passengerCount = action.payload;
    },
  },
});

export const {
  setDepartureAirport,
  setArrivalAirport,
  setDepartureDate,
  setArrivalDate,
  setPassengerCount,
  checkFirstStage,
} = flightSlice.actions;

export default flightSlice.reducer;
