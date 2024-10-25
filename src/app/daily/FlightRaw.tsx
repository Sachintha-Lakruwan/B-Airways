import React from "react";


// Changed for daily list
interface FlightRawProps {
  id: number;
  DateTime: string;
  Duration: string;
  Arrival: string;
  Departure: string;
  Cost: number;
  Model: string;
}

export default function FlightRaw({
  DateTime,
  Duration,
  Arrival,
  Departure,
  Model,
}: FlightRawProps) {
  return (
    <div
      className=" w-full h-14 rounded-lg bg-sky-100 drop-shadow-lg mb-3 grid grid-cols-5 px-8 items-center text-sky-900 font-semibold glass3 cursor-pointer "
    >
      {/* <div>{DateTime.slice(0, 10)}</div> */}
      <div>{DateTime}</div>
      <div>{Duration}</div>
      <div>{Departure}</div>
      <div>{Arrival}</div>
      <div>{Model}</div>
    </div>
  );
}
