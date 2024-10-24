"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import img from "@/public/payment.jpg";

export default function page() {
  function handleConfirmPayment() {}
  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col">
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
      <div className=" w-full max-w-96 p-6 glass3 mt-10 rounded-2xl mb-3 flex flex-col gap-6">
        <div>
          <h2 className=" text-xl font-bold text-center text-sky-900">
            Enter the OTP to Confirm the Payment
          </h2>
          <p className=" text-center text-sm italic text-green-700">
            OTP: 23546
          </p>
        </div>
        <Input type="name" label="OTP" />
        <div className=" flex flex-col items-center">
          <Button
            className=" bg-sky-900 text-sky-100 p-6 w-full"
            variant="solid"
            onClick={handleConfirmPayment}
          >
            Pay Now
          </Button>
          {/* {pickSeatWarning && (
            <div className=" absolute mt-1 text-center text-red-800 italic text-sm bottom-0">
              Please pick a Seat
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
