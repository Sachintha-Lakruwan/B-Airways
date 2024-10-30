"use client";

import Image from "next/image";
import img from "@/public/404page.png";

export default function error() {
  return (
    <div className=" w-full h-screen bg-white">
      <Image
        src={img}
        fill
        sizes="100vw"
        style={{ objectFit: "contain" }}
        alt="page not found"
        className=" scale-85"
      ></Image>
    </div>
  );
}
