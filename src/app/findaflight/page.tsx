"use client";

import React from "react";
import FlightRaw from "./FlightRaw";
import img from "@/public/hero-image.jpg";
import Image from "next/image";

const departure_flights = [
  {
    date: "2024-10-14T18:30:00.000Z",
    delay: "00:00:00",
    distance: 4647,
    duration: "07:00:00",
    departure_airport: "CGK",
    arrival_airport: "BOM",
    arrival_country: "Indonesia",
    departure_country: "India",
    cost: 350,
    model: "Boeing 777",
  },
  {
    date: "2024-10-16T09:45:00.000Z",
    delay: "00:15:00",
    distance: 5000,
    duration: "06:45:00",
    departure_airport: "LHR",
    arrival_airport: "JFK",
    arrival_country: "United States",
    departure_country: "United Kingdom",
    cost: 450,
    model: "Airbus A380",
  },
  {
    date: "2024-10-18T21:20:00.000Z",
    delay: "00:30:00",
    distance: 3780,
    duration: "05:30:00",
    departure_airport: "SIN",
    arrival_airport: "SYD",
    arrival_country: "Australia",
    departure_country: "Singapore",
    cost: 300,
    model: "Boeing 787 Dreamliner",
  },
  {
    date: "2024-10-20T14:10:00.000Z",
    delay: "00:00:00",
    distance: 800,
    duration: "02:00:00",
    departure_airport: "CDG",
    arrival_airport: "FCO",
    arrival_country: "Italy",
    departure_country: "France",
    cost: 150,
    model: "Airbus A320",
  },
];

export default function SelectFlight() {
  //   const [isLoading, setIsLoading] = useState<boolean>(true);
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
      <div className=" w-full h-full  p-20 pt-28">
        <div className=" w-full rounded-lg bg-sky-100 drop-shadow-lg mb-3 p-10 glass1">
          <p className=" text-center text-5xl font-extrabold text-sky-900 capitalize tracking-wide">
            Flight from {departure_flights[0].departure_country} to{" "}
            {departure_flights[0].arrival_country}
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
          {departure_flights.map((flight) => (
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
    </div>
  );
}
