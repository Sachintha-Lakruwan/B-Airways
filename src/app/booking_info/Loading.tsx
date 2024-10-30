import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" w-full h-full bg-zinc-100 rounded-2xl flex items-center justify-center flex-col">
      <div className=" mt-4 text-zinc-900 ml-3 font-bold grid grid-cols-[1fr_1fr] gap-3 items-center">
        <Skeleton className="h-7 w-28 flex items-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3"></Skeleton>
        <Skeleton className="h-7 w-28 flex items-center justify-center gap-2 bg-white drop-shadow-xl p-1 rounded-full px-3"></Skeleton>
      </div>
      <Skeleton className=" w-[calc(100%-6rem)] grid grid-cols-[1fr_2fr_1fr] items-center m-3 rounded-2xl bg-white drop-shadow-xl ">
        <p className=" w-full text-center font-extrabold text-2xl text-red-700"></p>
        <div className=" relative aspect-video w-full"></div>
        <p className=" w-full text-center font-extrabold text-2xl text-red-700"></p>
      </Skeleton>
      <div className=" grid grid-cols-2 font-bold gap-1 text-zinc-700 w-[60%] mt-3">
        <Skeleton className=" h-9 w-full col-span-2 grid grid-cols-[2fr_1fr] bg-zinc-200 p-3 py-2 rounded-xl"></Skeleton>
        <Skeleton className=" h-9 w-full col-span-2 grid grid-cols-[2fr_1fr] bg-zinc-200 p-3 py-2 rounded-xl"></Skeleton>
        <Skeleton className=" h-9 w-full col-span-2 grid grid-cols-[2fr_1fr] bg-red-100 p-3 py-2 rounded-xl"></Skeleton>
        <Skeleton className=" h-9 w-full col-span-2 grid grid-cols-[2fr_1fr] bg-zinc-200 p-3 py-2 rounded-xl"></Skeleton>
        <Skeleton className=" h-9 w-full col-span-2 grid grid-cols-[2fr_1fr] bg-green-100 p-3 py-2 rounded-xl"></Skeleton>
      </div>
    </div>
  );
}
