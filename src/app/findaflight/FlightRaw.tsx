import React from "react";

interface FlightRawProps {
  id: string;
  DateTime: string;
  Duration: string;
  Cost: number;
  Model: string;
  DepartureAirport: string;
  ArrivalAirport: string;
  handleClick: (id: string) => void;
}

export default function FlightRaw({
  id,
  DateTime,
  Duration,
  Cost,
  Model,
  DepartureAirport,
  ArrivalAirport,
  handleClick,
}: FlightRawProps) {
  return (
    <div
      onClick={() => handleClick(id)}
      className=" w-full h-14 rounded-lg bg-sky-100 drop-shadow-lg mb-3 grid grid-cols-7 px-8 items-center text-sky-900 font-semibold glass3 transition ease-in-out duration-300 hover:bg-green-400 cursor-pointer "
    >
      <div>{DateTime.slice(0, 10)}</div>
      <div>{DateTime.slice(11, 19)}</div>
      <div>{DepartureAirport}</div>
      <div>{ArrivalAirport}</div>
      <div>{Duration}</div>
      <div>{Cost}</div>
      <div>{Model}</div>
    </div>
  );
}
