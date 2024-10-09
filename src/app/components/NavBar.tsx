import React from "react";
import logo from "@/public/B Airways.png";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className=" w-full h-[10%] bg-zinc-700 absolute z-10 glass px-20">
      {/* <div className=" absolute left-20 top-0 h-32 aspect-[3/4] bg-sky-600 rounded-b-md drop-shadow-xl">
        <div className=" m-2 absolute w-full aspect-square bg-slate-500 bottom-0"></div>
      </div> */}
      <div className=" w-full h-full flex flex-row justify-between items-center text-xl font-bold text-white">
        <div className=" flex flex-row gap-6">
          <div className=" h-20 aspect-square p-2 relative">
            <Image src={logo} alt="B Airways Logo" fill sizes="100vw"></Image>
          </div>
          <div className=" flex items-center">
            <p>BOOK</p>
          </div>
          <div className=" flex items-center">
            <p>LOYALTY</p>
          </div>
          <div className=" flex items-center">
            <p>HELP</p>
          </div>
        </div>
        <div>
          <div>LOGIN</div>
        </div>
      </div>
    </div>
  );
}
