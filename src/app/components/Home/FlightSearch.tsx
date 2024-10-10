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
  setArrivalDate,
  setDepartureDate,
  setPassengerClass,
  setPassengerCount,
  checkFirstStage,
} from "@/app/GlobalRedux/Slices/FlightDetails/flight";
import { RootState } from "@/app/GlobalRedux/store";
import { useRouter } from "next/navigation";

const passengerCountsList = [
  { key: 1, label: "1" },
  { key: 2, label: "2" },
  { key: 3, label: "3" },
  { key: 4, label: "4" },
  { key: 5, label: "5" },
];

interface Country {
  key: string;
  label: string;
}

interface Class {
  key: string;
  label: string;
}

export default function FlightSearch() {
  const isStageOneCompleted = useSelector(
    (state: RootState) => state.flight.isStageOneCompleted
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [buttonWarning, setButtonWarning] = useState<boolean>(false);

  const fetchCountryNames = async () => {
    try {
      setLoading(true);
      const countriesResponse = await fetch("/api/flightsearch/countries");
      const classesResponse = await fetch("/api/flightsearch/classes");
      if (countriesResponse && classesResponse) {
        const countriesTemp = await countriesResponse.json();
        const classesTemp = await classesResponse.json();
        setCountries(countriesTemp);
        setClasses(classesTemp);
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
      router.push("/denkatakka");
    } else {
      setButtonWarning(true);
      setTimeout(() => {
        setButtonWarning(false);
      }, 1500);
    }
  }

  return (
    <div className=" w-full grid grid-cols-6 gap-6 grid-rows-3">
      <div className=" w-full h-20 col-span-6 flex items-center text-sky-950">
        <p className=" text-5xl font-extrabold tracking-tighter">
          FLIGHT SEARCH
        </p>
      </div>
      {!loading && (
        <>
          <div className=" w-full h-20 col-span-4 flex flex-row items-start">
            <div className=" w-full">
              <Select
                label={<p className="font-bold text-lg">Departure Airport</p>}
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
            <div className=" text-xl m-1 mt-5">
              <IoMdSwap />
            </div>
            <div className=" w-full">
              <Select
                items={countries}
                label={<p className="🛫 font-bold text-lg">Arrival Airport</p>}
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
          <div className=" w-full h-20">
            <DatePicker
              label="Departing"
              className="w-full"
              size="lg"
              variant="underlined"
              onChange={(e) => {
                dispatch(
                  setDepartureDate(10000 * e.year + 100 * e.month + e.day)
                );
                dispatch(checkFirstStage());
              }}
            />
          </div>{" "}
          <div className=" w-full h-20">
            <DatePicker
              label="Arriving"
              className="w-full"
              size="lg"
              variant="underlined"
              onChange={(e) => {
                dispatch(
                  setArrivalDate(10000 * e.year + 100 * e.month + e.day)
                );
                dispatch(checkFirstStage());
              }}
            />
          </div>
          <div className=" w-full h-20 col-span-2">
            <Select
              items={passengerCountsList}
              label={<p className="font-bold text-lg">Passengers</p>}
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
            <Select
              items={countries}
              label={<p className="🛫 font-bold text-lg">Class</p>}
              placeholder="Select Class"
              size="lg"
              variant="underlined"
              className=" w-full h-full"
              onChange={(e) => {
                dispatch(setPassengerClass(e.target.value));
                dispatch(checkFirstStage());
              }}
            >
              {classes.map((i) => (
                <SelectItem key={i.key}>{i.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className=" w-full h-20 col-span-2">
            <Button
              className=" w-full h-[calc(100%-1rem)]"
              variant="solid"
              color={buttonWarning ? "warning" : "primary"}
              onClick={handleSubmit}
            >
              <p className="🛫 font-bold text-lg">Search Flights</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
