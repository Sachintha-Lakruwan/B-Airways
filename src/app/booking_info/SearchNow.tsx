import Image from "next/image";
import React from "react";
import img from "@/public/search.jpg";

export default function SearchNow() {
  return (
    <div className=" relative h-[95%] aspect-square">
      <Image
        src={img}
        fill
        sizes="100vw"
        alt="businessman with magnifier"
      ></Image>
    </div>
  );
}
