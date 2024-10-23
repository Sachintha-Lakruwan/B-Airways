"use client";

import React, { useEffect, useState } from "react";
import FlightRaw from "./FlightRaw";
import img from "@/public/pexels-hson-5071155.jpg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const departure_airport = searchParams.get("dep");
  const arrival_airport = searchParams.get("arr");
  const passenger_count = searchParams.get("passenger");
  const passenger_class = searchParams.get("class");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>([]);

  const fetchFlights = async () => {
    try {
      setIsLoading(true);

      //Change the API endpoint to dynamically include query parameters
      console.log(departure_airport, arrival_airport, passenger_count, passenger_class);

      // Dynamically constructing the API endpoint with search parameters
      const flightsResponse = await fetch(
        `/api/findaflight?departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&passenger_count=${passenger_count}&passenger_class=${passenger_class}`
      );

      if (flightsResponse.ok) {
        const flightData = await flightsResponse.json();
        setFlights(flightData);  // Update state with the fetched flights data
      } else {
        console.error("Error fetching flights: ", flightsResponse.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
};

  useEffect(() => {
    fetchFlights();
  }, []);

  const router = useRouter();

  function handleSelect(id: string) {
    router.push(`/filldetails?flight=${id}`);
  }

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
          <div className=" w-full h-14 rounded-lg bg-sky-900 drop-shadow-lg mb-3 grid grid-cols-5 px-8 items-center text-sky-100 font-bold glass2 text-center">
            <div>Date</div>
            <div>Time</div>
            <div>Duration</div>
            <div>Cost</div>
            <div>Model</div>
          </div>
          <div className=" max-h-[70%] overflow-scroll hide-scroll text-center">
            {flights.map((flight: Flight) => (
              <FlightRaw
                key={crypto.randomUUID()}
                id={flight.key}
                DateTime={flight.date}
                Duration={flight.duration}
                Cost={flight.cost}
                Model={flight.model}
                handleClick={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
