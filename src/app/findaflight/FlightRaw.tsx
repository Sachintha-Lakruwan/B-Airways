import React from "react";

interface FlightRawProps {
  DateTime: string;
  Duration: string;
  Cost: number;
  Model: string;
}

export default function FlightRaw({
  DateTime,
  Duration,
  Cost,
  Model,
}: FlightRawProps) {
  return (
    <div className=" w-full h-14 rounded-lg bg-sky-100 drop-shadow-lg mb-3 grid grid-cols-5 px-8 items-center text-sky-900 font-semibold glass3 transition ease-in-out duration-300 hover:bg-green-400 cursor-pointer ">
      <div>{DateTime.slice(0, 10)}</div>
      <div>{DateTime.slice(11, 19)}</div>
      <div>{Duration}</div>
      <div>{Cost}</div>
      <div>{Model}</div>
    </div>
  );
}
