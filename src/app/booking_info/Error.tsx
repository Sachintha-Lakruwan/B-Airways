import Image from "next/image";
import React from "react";
import img from "@/public/404.jpg";

export default function Error() {
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
