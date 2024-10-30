import React from "react";
import { BookingInfoProps } from "./page";
import Image from "next/image";
import img from "@/public/journey.jpg";
import { MdDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

export default function BookingInfo({
  details,
}: {
  details: BookingInfoProps;
}) {
  console.log(details);
  return (
    <div className=" w-full h-full bg-zinc-100 rounded-2xl flex items-center justify-center flex-col">
      <div className=" mt-4 text-zinc-900 ml-3 font-bold grid grid-cols-[1fr_1fr] gap-3 items-center">
        <div className=" flex items-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3">
          <MdDateRange />
          {details.date.slice(0, 10)}
        </div>
        <div className=" flex items-center justify-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3">
          <FaRegClock />
          {details.departure_time}
        </div>
      </div>
      <div className=" w-[calc(100%-6rem)] grid grid-cols-[1fr_2fr_1fr] items-center m-3 rounded-2xl bg-white drop-shadow-xl ">
        <p className=" w-full text-center font-extrabold text-2xl text-red-700">
          {details.departure}
        </p>
        <div className=" relative aspect-video w-full">
          <Image
            fill
            src={img}
            alt="journey"
            sizes="100vw"
            objectFit="cover"
          ></Image>
        </div>
        <p className=" w-full text-center font-extrabold text-2xl text-red-700">
          {details.arrival}
        </p>
      </div>
      <div className=" grid grid-cols-2 font-bold gap-1 text-zinc-700 w-[60%] mt-3">
        <div className=" text-zinc-400 ml-3">Airplane Number</div>
        <div className=" text-right mr-3">{details.airplane_number}</div>
        <div className=" text-zinc-400 ml-3">Seat ID</div>
        <div className=" text-right mr-3">{details.seat_id}</div>
        <div className=" w-full col-span-2 grid grid-cols-[2fr_1fr] bg-red-100 p-3 py-2 rounded-xl">
          <div>Delay</div>
          <div className=" text-right">{details.delay}</div>
        </div>
        <div className=" text-zinc-400 ml-3">Passenger Name</div>
        <div className=" text-right mr-3">{details.name}</div>
        <div className=" text-zinc-400 ml-3">Passport Number</div>
        <div className=" text-right mr-3">{details.passport_number}</div>
        <div className=" w-full col-span-2 grid grid-cols-[2fr_1fr] bg-green-100 p-3 py-2 rounded-xl">
          <div>Ticket Price</div>
          <div className=" text-right">{details.price}</div>
        </div>
      </div>
    </div>
  );
}
