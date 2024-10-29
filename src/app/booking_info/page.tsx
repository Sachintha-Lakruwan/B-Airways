"use client";

import Image from "next/image";
import img from "@/public/pexels-hson-5071155.jpg";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import SearchNow from "./SearchNow";
import Loading from "./Loading";
import Error from "./Error";
import BookingInfo from "./BookingInfo";

export interface BookingInfoProps {
  id: number;
  registered_user_id: number;
  baggage_kilo: number;
  date: string;
  price: string;
  schedule_id: number;
  seat_id: number;
  passenger_id: number;
  delay: string;
  airplane_number: string;
  flight_code: string;
  departure_time: string;
  duration: string;
  distance: number;
  departure: string;
  arrival: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  passport_number: string;
  NIC: string;
  country_code: string;
}

export default function Loyalty() {
  const [reference, setReference] = useState<string>("");
  const [bookingInfo, setBookingInfo] = useState<BookingInfoProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = async () => {
    if (reference === "") {
      // blank reference number
      return;
    }
    setLoading(true);
    setBookingInfo(null);
    setError(false);
    const response = await fetch("/api/booking/search?ref=" + reference);

    if (response.status !== 200) {
      setError(true);
    } else {
      if (response) {
        const detailsTemp = await response.json();
        setBookingInfo(detailsTemp);
      }
    }
    setLoading(false);
  };

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
            Find your booking details
          </h1>
          <form
            action={handleSearch}
            className=" w-full grid grid-cols-[4fr_1fr] gap-4"
          >
            <input
              className=" p-2 rounded-xl font-bold pl-4"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter your reference number"
            />
            <Button
              className=" bg-sky-900 text-sky-50 font-bold"
              onClick={handleSearch}
            >
              Search
            </Button>
          </form>
          <div className=" w-full h-[calc(100%-7rem)] bg-white rounded-2xl mt-6  flex items-center justify-center">
            {loading ? (
              <Loading />
            ) : bookingInfo ? (
              <BookingInfo details={bookingInfo} />
            ) : error ? (
              <Error />
            ) : (
              <SearchNow />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
