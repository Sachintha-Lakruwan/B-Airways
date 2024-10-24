"use client";

import React, { useEffect, useState } from "react";
import FlightRaw from "./FlightRaw";
import img from "@/public/pexels-hson-5071155.jpg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

interface Flight {
  key: number;
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
  const passenger_class = searchParams.get("class");
  const date = searchParams.get("date");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flights, setFlights] = useState<Flight[]>([]);

  const fetchFlights = async () => {
    try {
      setIsLoading(true);

      const flightsResponse = await fetch(
        `/api/findaflight?departure_airport=${departure_airport}&arrival_airport=${arrival_airport}&departure_date=${date}&seat_class=${passenger_class}`
      );
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

  function handleSelect(id: number) {
    router.push(`/filldetails?flight=${id}&class=${passenger_class}`);
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
      ) : flights[0] ? (
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
      ) : (
        <div className=" w-full h-full p-20 pt-28 absolute z-10 flex items-center justify-center">
          <div className=" w-full h-full glass3 rounded-lg row-span-2 flex items-center justify-center flex-col">
            <p className=" text-5xl font-extrabold tracking-tighter text-sky-900">
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
    </div>
  );
}
