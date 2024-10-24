"use client";

import React, { useEffect, useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { IoMdSwap } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setArrivalAirport,
  setDepartureAirport,
  setPassengerClass,
  setDepartureDate,
  setPassengerCount,
  checkFirstStage,
} from "@/app/GlobalRedux/Slices/FlightDetails/flight";
import { RootState } from "@/app/GlobalRedux/store";
import { useRouter } from "next/navigation";
import { getLocalTimeZone, today } from "@internationalized/date";

const passengerCountsList = [
  { key: 1, label: "1" },
  { key: 2, label: "2" },
  { key: 3, label: "3" },
  { key: 4, label: "4" },
  { key: 5, label: "5" },
];

// make a class list for the select component

interface Country {
  key: string;
  label: string;
}

const classesList = [
  { key: "economy", label: "Economy" },
  { key: "business", label: "Business" },
  { key: "platinum", label: "Platinum" },
];

export default function FlightSearch() {
  const isStageOneCompleted = useSelector(
    (state: RootState) => state.flight.isStageOneCompleted
  );
  const departureAirport = useSelector(
    (state: RootState) => state.flight.departureAirport
  );
  const arrivalAirport = useSelector(
    (state: RootState) => state.flight.arrivalAirport
  );
  const passengerCount = useSelector(
    (state: RootState) => state.flight.passengerCount
  );
  const passengerClass = useSelector(
    (state: RootState) => state.flight.passengerClass
  );
  const departureDate = useSelector(
    (state: RootState) => state.flight.departureDate
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState<Country[]>([]);
  const [buttonWarning, setButtonWarning] = useState<boolean>(false);

  const fetchCountryNames = async () => {
    try {
      setLoading(true);
      const countriesResponse = await fetch("/api/flightsearch/airports");
      if (countriesResponse) {
        const countriesTemp = await countriesResponse.json();
        setCountries(countriesTemp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryNames();
  }, []);

  const router = useRouter();

  function handleSubmit() {
    if (isStageOneCompleted) {
      router.push(
        `/findaflight?dep=${departureAirport}&arr=${arrivalAirport}&passenger=${passengerCount}&date=${departureDate}&class=${passengerClass}`
      );
    } else {
      setButtonWarning(true);
      setTimeout(() => {
        setButtonWarning(false);
      }, 2000);
    }
  }

  // function handleSwap() {
  //   const temp = departureAirport;
  //   dispatch(setDepartureAirport(arrivalAirport));
  //   dispatch(setArrivalAirport(temp));
  // }

  return (
    <div className=" w-full grid grid-cols-6 gap-6 grid-rows-3">
      <div className=" w-full h-20 col-span-6 flex items-center text-sky-950">
        <p className=" text-5xl font-extrabold tracking-tighter">
          FLIGHT SEARCH
        </p>
      </div>
      {!loading ? (
        <>
          <div className=" w-full h-20 col-span-4 flex flex-row items-start">
            <div className=" w-full">
              <Select
                label={
                  <p className="font-bold text-lg text-zinc-900">
                    Departure Airport
                  </p>
                }
                placeholder="Select an option"
                size="lg"
                variant="underlined"
                className=" w-full h-full"
                onChange={(e) => {
                  dispatch(setDepartureAirport(e.target.value));
                  dispatch(checkFirstStage());
                }}
              >
                {countries.map((i) => (
                  <SelectItem key={i.key}>{i.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className=" text-xl m-1 mt-5 text-zinc-900 cursor-pointer opacity-0">
              <IoMdSwap />
            </div>
            <div className=" w-full">
              <Select
                items={countries}
                label={
                  <p className="🛫 font-bold text-lg text-zinc-900">
                    Arrival Airport
                  </p>
                }
                placeholder="Select an option"
                size="lg"
                variant="underlined"
                className=" w-full h-full"
                onChange={(e) => {
                  dispatch(setArrivalAirport(e.target.value));
                  dispatch(checkFirstStage());
                }}
              >
                {countries.map((i) => (
                  <SelectItem key={i.key}>{i.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className=" w-full h-20 col-span-2">
            <Select
              items={passengerCountsList}
              label={
                <p className="font-bold text-lg text-zinc-900">Passengers</p>
              }
              placeholder="Select Passengers"
              size="lg"
              variant="underlined"
              className=" w-full h-full"
              onChange={(e) => {
                dispatch(setPassengerCount(e.target.value));
                dispatch(checkFirstStage());
              }}
            >
              {passengerCountsList.map((num) => (
                <SelectItem key={num.key}>{num.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className=" w-full h-20 col-span-2">
            <DatePicker
              label="Departing"
              className="w-full text-zinc-900 font-bold text-lg"
              size="lg"
              variant="underlined"
              minValue={today(getLocalTimeZone())}
              onChange={(e) => {
                dispatch(
                  setDepartureDate(e.year + "/" + e.month + "/" + e.day)
                );
                dispatch(checkFirstStage());
              }}
            />
          </div>
          <div className=" w-full h-20 col-span-2">
            <Select
              items={classesList}
              label={
                <p className="🛫 font-bold text-lg text-zinc-900">Class</p>
              }
              placeholder="Select an option"
              size="lg"
              variant="underlined"
              className=" w-full h-full"
              onChange={(e) => {
                dispatch(setPassengerClass(e.target.value));
                dispatch(checkFirstStage());
              }}
            >
              {classesList.map((i) => (
                <SelectItem key={i.key}>{i.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className=" w-full h-20 col-span-2 relative">
            <Button
              className=" w-full h-[calc(100%-1rem)] bg-sky-900"
              variant="solid"
              color="primary"
              onClick={handleSubmit}
            >
              <p className="🛫 font-bold text-lg">Search Flights</p>
            </Button>
            {buttonWarning && (
              <div className=" absolute w-full mt-1 text-center text-red-800 italic text-sm">
                Please fill all the fields
              </div>
            )}
          </div>
        </>
      ) : (
        <div className=" w-full h-full grid grid-cols-3 col-span-6 row-span-2 gap-6">
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-sky-500 rounded-lg opacity-20"></div>
        </div>
      )}
    </div>
  );
}
