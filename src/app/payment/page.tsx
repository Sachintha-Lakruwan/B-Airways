"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
// import img from "@/public/pexels-punttim-175656.jpg";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import check from "@/public/check.png";
import { motion } from "framer-motion";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { setPaymentDetails } from "../GlobalRedux/Slices/FlightDetails/flight";

interface Details {
  flight: number;
  seat_number: string;
  token: string | null;
}

const details: Details = {
  flight: 1,
  seat_number: "",
  token: null,
};

export default function Page() {
  const [loadingPayNowButton, setLoadingPayNowButton] =
    useState<boolean>(false);
  const [loadingHomeButton, setLoadingHomeButton] = useState<boolean>(false);
  const dispatch = useDispatch();
  const paymentDetails = useSelector(
    (state: RootState) => state.flight.paymentDetails
  );

  const userToken = useSelector((state: RootState) => state.auth.token);
  const isAutheticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const searchParams = useSearchParams();
  const flightId = Number(searchParams.get("flight"));
  const seatNumber = searchParams.get("seat");
  const [error, setError] = useState<boolean>(false);
  const [isSuccessful, setSuccessful] = useState<boolean>(false);
  const [reference, setReference] = useState<string>("");
  const [clipBoardEnable, setClipBoardEnable] = useState<boolean>(true);

  const router = useRouter();

  if (!paymentDetails) {
    router.push("/");
  }

  const handleSubmit = async () => {
    details.flight = flightId;
    if (isAutheticated && userToken) {
      details.token = userToken;
    }
    if (seatNumber) {
      details.seat_number = seatNumber;
    } else {
      setLoadingPayNowButton(false);
      return;
    }
    const response = await fetch("/api/booking/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    if (response.status !== 200) {
      setError(true);
      console.log("error");
      setTimeout(() => {
        router.push("/");
        setLoadingPayNowButton(false);
      }, 1000);
    } else {
      setReference("loading...");
      const data = await response.json();
      setReference(data.reference);
      setSuccessful(true);
      setLoadingPayNowButton(false);
    }
  };

  function handleConfirmPayment() {
    setLoadingPayNowButton(true);
    handleSubmit();
  }
  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col bg-zinc-100">
      {/* <div className=" bg-sky-400 w-full h-full absolute">
        <Image
          src={img}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority={true}
          alt="hero image"
        ></Image>
      </div> */}
      <div className=" w-full max-w-96 p-6 glass3 mt-10 rounded-2xl mb-3 flex flex-col gap-6 bg-white">
        <div>
          <h2 className=" text-2xl font-bold text-center text-sky-900">
            Confirm the Payment
          </h2>
        </div>
        <div className=" grid grid-cols-[2fr_1fr] font-bold gap-1 text-zinc-700">
          <div className=" text-zinc-400 ml-3">Flight Cost</div>
          <div className=" text-right mr-3">
            {paymentDetails?.flight_cost.toFixed(2)} $
          </div>
          <div className=" text-zinc-400 ml-3">Baggage Cost Cost</div>
          <div className=" text-right mr-3">
            {paymentDetails?.baggage_cost.toFixed(2)} $
          </div>
          <div className=" text-zinc-400 ml-3">Discount Percentage</div>
          <div className=" text-right mr-3">
            {paymentDetails?.discount_percentage}
          </div>
          <div className=" text-zinc-400 ml-3">Discount Cost</div>
          <div className=" text-right mr-3">
            {paymentDetails?.discount_cost.toFixed(2)} $
          </div>
          <div className=" w-full col-span-2 grid grid-cols-[2fr_1fr] bg-green-100 p-3 rounded-xl">
            <div>Total Cost</div>
            <div className=" text-right">
              {paymentDetails?.total_cost.toFixed(2)} $
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center">
          <Button
            className=" bg-sky-900 text-sky-100 p-6 w-full text-md font-bold"
            variant="solid"
            isLoading={loadingPayNowButton}
            onClick={handleConfirmPayment}
          >
            Pay Now
          </Button>
          {error && (
            <div className=" absolute mt-1 text-center text-red-800 italic text-sm bottom-0">
              Something went wrong! Please try again later..
            </div>
          )}
          <Button
            className=" bg-zinc-200 text-zinc-700 p-6 w-full text-md font-bold mt-4"
            variant="solid"
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      {isSuccessful && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 100, scale: 1 }}
          className=" absolute w-full h-full glass2 flex items-center flex-col justify-around py-[8%]"
        >
          <h1 className=" text-5xl font-extrabold text-sky-100">
            Payement Successful!{" "}
          </h1>
          <div className=" relative w-[20%] aspect-square">
            <Image
              src={check}
              fill
              sizes="100vw"
              alt="transaction successful"
              objectFit="cover"
            ></Image>
          </div>
          <div className=" text-sky-50 font-bold itali glass3 rounded-full flex gap-2 items-center">
            <p className=" py-2 pl-4">Your reference number is</p>{" "}
            <p>{reference}</p>
            <span className=" h-full aspect-square rounded-full bg-white flex items-center justify-center drop-shadow-2xl">
              {clipBoardEnable ? (
                <FaClipboard
                  size="1.3em"
                  className=" cursor-pointer text-sky-900"
                  onClick={() => {
                    setClipBoardEnable(false);
                    navigator.clipboard.writeText(reference);
                    setTimeout(() => {
                      setClipBoardEnable(true);
                    }, 2500);
                  }}
                />
              ) : (
                <FaClipboardCheck size="1.2em" className=" text-green-700" />
              )}
            </span>
          </div>
          <Button
            className="h-14 w-48 bg-sky-100 drop-shadow-2xl opacity-75 rounded-full"
            isLoading={loadingHomeButton}
            variant="solid"
            color="primary"
            onClick={() => {
              setLoadingHomeButton(true);
              dispatch(setPaymentDetails(null));
              router.push("/");
              setLoadingHomeButton(false);
            }}
          >
            <p className="font-bold text-lg text-sky-900">Home</p>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
