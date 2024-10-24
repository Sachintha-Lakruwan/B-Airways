"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import img from "@/public/pexels-hson-5071155.jpg";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeatSelection from "./SeatSelection";

const gendersList = [
  {
    key: "male",
    label: "Male",
  },
  {
    key: "female",
    label: "Female",
  },
  {
    key: "other",
    label: "Other",
  },
];

interface Seat {
  [key: string]: boolean;
}

type SeatRow = Seat[];

const seats: SeatRow[] = [
  [
    { "44A": true },
    { "44B": false },
    { "44C": true },
    { "44D": false },
    { "44F": true },
    { "44G": false },
    { "44H": true },
  ],
  [
    { "45A": true },
    { "45B": false },
    { "45C": true },
    { "45D": false },
    { "45F": true },
    { "45G": false },
    { "45H": true },
  ],
  [
    { "46A": false },
    { "46B": true },
    { "46C": false },
    { "46D": true },
    { "46F": false },
    { "46G": true },
    { "46H": false },
  ],
  [
    { "47A": true },
    { "47B": false },
    { "47C": true },
    { "47D": false },
    { "47F": true },
    { "47G": false },
    { "47H": true },
  ],
  [
    { "48A": false },
    { "48B": true },
    { "48C": false },
    { "48D": true },
    { "48F": false },
    { "48G": true },
    { "48H": false },
  ],
];

const FillDetails = () => {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight");
  // const passengerClass = searchParams.get("class");

  // funtion to fetch seat details using flight and class

  const [isPickingSeat, setIsPickingSeat] = useState<boolean>(false);
  const [pickedSeat, setPickedSeat] = useState<string>("");
  const [pickSeatWarning, setPickSeatWarning] = useState<boolean>(false);

  function handlePickSeatButton() {
    // check if the all the fields are filled
    setIsPickingSeat(true);
  }

  const router = useRouter();

  function handleConfirmPayment() {
    // send passenger details, booking id, seat number, flight id to the backend
    if (pickedSeat != "") {
      setPickSeatWarning(false);
      router.push(`/payment?flight=${flight}&seat=${pickedSeat}`);
    } else {
      setPickSeatWarning(true);
    }
  }

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
      <div className=" min-w-96 p-6 glass3 mt-10 rounded-2xl mb-3">
        {!isPickingSeat ? (
          <div className=" flex flex-col gap-6">
            <div>
              <h2 className=" text-xl font-bold text-center text-sky-900">
                Fill your details
              </h2>
            </div>
            <Input type="name" label="Name" />
            <div className=" flex flex-row gap-3">
              <Input type="" label="Age" />
              <Select label="Gender">
                {gendersList.map((g) => (
                  <SelectItem key={g.key}>{g.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Input type="email" label="Passport Number" />
            <Input type="email" label="NIC" />
            <Select label="Gender">
              {gendersList.map((g) => (
                <SelectItem key={g.key}>{g.label}</SelectItem>
              ))}
            </Select>
            <Button
              className=" bg-sky-900 text-sky-100 p-6"
              variant="solid"
              onClick={handlePickSeatButton}
            >
              Pick a Seat
            </Button>
          </div>
        ) : (
          <div className=" flex flex-col">
            <SeatSelection
              seats={seats}
              setPickedSeat={setPickedSeat}
              pickedSeat={pickedSeat}
            />
            <div className=" flex flex-col items-center">
              <Button
                className=" bg-sky-900 text-sky-100 p-6 w-full"
                variant="solid"
                onClick={handleConfirmPayment}
              >
                Go to Checkout
              </Button>
              {pickSeatWarning && (
                <div className=" absolute mt-1 text-center text-red-800 italic text-sm bottom-0">
                  Please pick a Seat
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillDetails;
