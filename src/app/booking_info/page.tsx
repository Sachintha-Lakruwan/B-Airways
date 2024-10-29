"use client";

import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Loyalty() {
  const [reference, setReference] = useState<string>("");
  return (
    <div className=" w-full h-screen bg-black">
      <div className="bg-sky-400 w-full h-full absolute z-0">
        <Image
          src={img}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority={true}
          alt="hero image"
        ></Image>
      </div>
      <div className=" mt-[8%] absolute h-[80%] w-full flex items-center justify-center">
        <div className=" h-full aspect-square glass3 rounded-2xl p-8">
          <h1 className=" text-center mb-6 text-xl font-bold text-sky-900 tracking-wide">
            Find your booking details here
          </h1>
          <div className=" w-full grid grid-cols-[4fr_1fr] gap-4">
            <Input />
            <Button className=" bg-sky-900 text-sky-50 font-bold">
              Search
            </Button>
          </div>
          <div className=" w-full h-[calc(100%-7rem)] bg-zinc-50 rounded-2xl mt-6"></div>
        </div>
      </div>
    </div>
  );
}
