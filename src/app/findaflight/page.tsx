"use client";

import React, { useEffect, useState } from "react";
import FlightRaw from "./FlightRaw";
import img from "@/public/pexels-hson-5071155.jpg";
import Image from "next/image";

interface Flight {
  key: string;
  date: string;
  duration: string;
  departure_airport: string;
  arrival_airport: string;
  departure_country: string;
  arrival_country: string;
  cost: number;
  model: string;
}

export default function SelectFlight() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>([]);

  const fetchFlights = async () => {
    try {
      setIsLoading(true);
      const flightsResponse = await fetch("/api/findaflight");
      if (flightsResponse) {
        const countriesTemp = await flightsResponse.json();
        setFlights(countriesTemp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

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
      ) : (
        <div className=" w-full h-full p-20 pt-28">
          <div className=" w-full rounded-lg bg-sky-100 drop-shadow-lg mb-3 p-10 glass1">
            <p className=" text-center text-5xl font-extrabold text-sky-900 capitalize tracking-wide">
              Flight from {flights[0].departure_country} to{" "}
              {flights[0].arrival_country}
            </p>
            <p className=" text-center font-extralight tracking-tighter text-sky-900 capitalize mt-2 italic">
              Select a Flight to continue...
            </p>
          </div>
          <div className=" w-full h-14 rounded-lg bg-sky-900 drop-shadow-lg mb-3 grid grid-cols-7 px-8 items-center text-sky-100 font-bold glass2 text-center">
            <div>Date</div>
            <div>Time</div>
            <div>Departure Airport</div>
            <div>Arrival Airport</div>
            <div>Duration</div>
            <div>Cost</div>
            <div>Model</div>
          </div>
          <div className=" max-h-[70%] overflow-scroll hide-scroll text-center">
            {flights.map((flight: Flight) => (
              <FlightRaw
                key={crypto.randomUUID()}
                DateTime={flight.date}
                Duration={flight.duration}
                DepartureAirport={flight.departure_airport}
                ArrivalAirport={flight.arrival_airport}
                Cost={flight.cost}
                Model={flight.model}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
