"use client";

import Image from "next/image";
import React from "react";
import img from "@/public/pexels-hson-5071155.jpg";
import FlightSearch from "./FlightSearch";

export default function Hero() {
  return (
    <div className=" w-full min-h-screen relative flex justify-center">
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
      <div className=" w-full absolute bottom-0 h-3/5 bg-gradient-to-t from-zinc-300 opacity-80 to-transparent"></div>
      <div className=" glass-text pl-20 flex items-center absolute left-0 w-1/2 aspect-[4/1] top-[18%] to-transparent">
        <p className=" text-7xl font-bold italic text-white">
          Beyond your expectations
        </p>
      </div>
      <div className=" glass w-[calc(100%-10rem)] p-8 rounded-2xl absolute z-10 bottom-[5%]">
        <FlightSearch />
      </div>
    </div>
  );
}
