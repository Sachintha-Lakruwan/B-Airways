"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";
import FlightRaw from "./FlightRaw";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import {
  checkFirstStage,
  setPassengerClass,
} from "../GlobalRedux/Slices/FlightDetails/flight";
import { motion } from "framer-motion";

interface Schedule {
  key: number;
  date: string;
  departure_time: string;
  duration: string;
  departure_airport: string;
  arrival_airport: string;
  model: string;
  departure_country: string;
  arrival_country: string;
}

const classesList = [
  { key: "economy", label: "Economy" },
  { key: "business", label: "Business" },
  { key: "platinum", label: "Platinum" },
];

// const flights: Schedule[] = [
//     {
//         key: 3,
//         date: "2024-10-14T18:30:00.000Z",
//         departure_time: "08:00:00",
//         duration: "07:00:00",
//         departure_airport: "CGK",
//         arrival_airport: "BOM",
//         model: "Airbus A380",
//         departure_country: "Indonesia ",
//         arrival_country: "India "
//     },
//     {
//         key: 4,
//         date: "2024-10-14T18:30:00.000Z",
//         departure_time: "08:00:00",
//         duration: "03:30:00",
//         departure_airport: "BKK",
//         arrival_airport: "CMB",
//         model: "Boeing 737-800",
//         departure_country: "Thailand ",
//         arrival_country: "Sri Lanka "
//     },
//     {
//         key: 5,
//         date: "2024-10-14T18:30:00.000Z",
//         departure_time: "15:30:00",
//         duration: "02:00:00",
//         departure_airport: "CMB",
//         arrival_airport: "BOM",
//         model: "Boeing 737-800",
//         departure_country: "Sri Lanka ",
//         arrival_country: "India "
//     },
// ];

const FlightListing: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Schedule[]>([]);
  const [chooseClass, setChooseClass] = useState<boolean>(false);
  const [flightID, setFlightID] = useState<string>("");
  const [classError, setClassError] = useState<boolean>(false);

  const fetchFlights = async () => {
    try {
      setIsLoading(true);
      const flightsResponse = await fetch(`/api/flightsearch/daily`);
      if (flightsResponse) {
        const countriesTemp = await flightsResponse.json();
        setFlights(countriesTemp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      console.log(flights);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();
  const passengerClass = useSelector(
    (state: RootState) => state.flight.passengerClass
  );

  return (
    <div className=" w-full h-screen">
      <div className=" bg-sky-400 w-full h-full absolute">
        <Image
          src={img}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority={true}
          alt="hero image"
        ></Image>
      </div>
      {isLoading ? (
        <div className=" w-full h-full p-20 pt-28 absolute z-10 grid grid-rows-7 gap-6">
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20 row-span-2"></div>
          <div className=" w-full h-full animate-pulse bg-sky-500 rounded-lg opacity-20 "></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
          <div className=" w-full h-full animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
        </div>
      ) : flights[0] ? (
        <div className=" w-full h-full p-20 pt-28">
          <div className=" w-full rounded-lg bg-sky-100 drop-shadow-lg mb-3 p-10 glass1">
            <p className=" text-center text-5xl font-extrabold text-sky-900 capitalize tracking-wide">
              Schedule For Today
            </p>
            <p className=" text-center  tracking-tighter text-sky-900 capitalize mt-2">
              {`${flights[0].date.slice(0, 10)}`}
            </p>
          </div>
          <div className=" w-full h-14 rounded-lg bg-sky-900 drop-shadow-lg mb-3 grid grid-cols-5 px-8 items-center text-sky-100 font-bold glass2 text-center">
            <div>Departure Time</div>
            <div>Duration</div>
            <div>Departure Airport</div>
            <div>Arrival Airport</div>
            <div>Model</div>
          </div>
          <div className=" max-h-[60%] overflow-scroll hide-scroll text-center">
            {flights.map((flight: Schedule) => (
              <FlightRaw
                flightID="3"
                setFlightID={setFlightID}
                setChooseClass={setChooseClass}
                key={crypto.randomUUID()}
                id={flight.key}
                DateTime={flight.departure_time}
                Duration={flight.duration}
                Cost={0}
                Model={flight.model}
                Arrival={flight.arrival_airport}
                Departure={flight.departure_airport}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className=" w-full h-full p-20 pt-28 absolute z-10 flex items-center justify-center">
          <div className=" w-full h-full glass3 rounded-lg row-span-2 flex items-center justify-center flex-col">
            <p className=" text-5xl font-extrabold text-sky-900">
              No Flights are Available
            </p>
            <Button
              className=" mt-9 h-14 w-48 bg-sky-900"
              variant="solid"
              color="primary"
              onClick={() => router.push("/")}
            >
              <p className="🛫 font-bold text-lg">Home</p>
            </Button>
          </div>
        </div>
      )}
      {chooseClass && (
        <div className=" absolute top-0 h-screen w-full z-10  flex items-center justify-center glass">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ opacity: 100, scale: 1 }}
            className=" glass3 px-10 py-8 rounded-xl drop-shadow-xl"
          >
            {/* <p className=" py-2 font-bold">
              Please select your preferred class to continue booking.
            </p> */}
            <div className=" w-64 h-20">
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
            <div className=" w-full h-20 relative">
              <Button
                className=" w-full h-[calc(100%-1rem)] bg-sky-900"
                variant="solid"
                color="primary"
                onClick={() => {
                  if (passengerClass == "") {
                    setClassError(true);
                  } else {
                    router.push(
                      `/filldetails?flight=${flightID}&class=${passengerClass}`
                    );
                  }
                }}
              >
                <p className="🛫 font-bold text-lg">Continue Booking</p>
              </Button>
              {classError && (
                <div className=" absolute w-full mt-1 text-center text-red-800 italic text-sm">
                  Please select a Class
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FlightListing;
