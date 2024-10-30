"use client";

import { createSlice } from "@reduxjs/toolkit";

interface PayementDetails {
  baggage_cost: number;
  discount_cost: number;
  discount_percentage: number;
  flight_cost: number;
  total_cost: number;
}

export interface FlightState {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  dateRange: number;
  passengerClass: string;
  isStageOneCompleted: boolean;
  paymentDetails: PayementDetails | null;
}

const initialState: FlightState = {
  departureAirport: "",
  arrivalAirport: "",
  departureDate: "",
  dateRange: 0,
  passengerClass: "",
  isStageOneCompleted: false,
  paymentDetails: null,
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
        state.dateRange == 0
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
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setPassengerClass: (state, action) => {
      state.passengerClass = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
  },
});

export const {
  setDepartureAirport,
  setArrivalAirport,
  setDepartureDate,
  setPassengerClass,
  setDateRange,
  checkFirstStage,
  setPaymentDetails,
} = flightSlice.actions;

export default flightSlice.reducer;
