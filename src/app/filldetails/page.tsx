"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import img from "@/public/pexels-hson-5071155.jpg";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeatSelection from "./SeatSelection";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

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

interface Country {
  key: string;
  label: string;
}

interface Seat {
  [key: string]: boolean;
}

type SeatRow = Seat[];

// const seats: SeatRow[] = [
//   [
//     { "44A": true },
//     { "44B": false },
//     { "44C": true },
//     { "44D": false },
//     { "44F": true },
//     { "44G": false },
//     { "44H": true },
//   ],
//   [
//     { "45A": true },
//     { "45B": false },
//     { "45C": true },
//     { "45D": false },
//     { "45F": true },
//     { "45G": false },
//     { "45H": true },
//   ],
//   [
//     { "46A": false },
//     { "46B": true },
//     { "46C": false },
//     { "46D": true },
//     { "46F": false },
//     { "46G": true },
//     { "46H": false },
//   ],
//   [
//     { "47A": true },
//     { "47B": false },
//     { "47C": true },
//     { "47D": false },
//     { "47F": true },
//     { "47G": false },
//     { "47H": true },
//   ],
//   [
//     { "48A": false },
//     { "48B": true },
//     { "48C": false },
//     { "48D": true },
//     { "48F": false },
//     { "48G": true },
//     { "48H": false },
//   ],
// ];

interface Details {
  token: string | null;
  name: string;
  age: number;
  gender: string;
  passportNumber: string;
  nic: string;
  country_code: string;
  flight: number;
  seat_number: string;
  baggage: number;
}

const details: Details = {
  token: null,
  name: "Kavindu",
  age: 18,
  gender: "male",
  passportNumber: "A12345623",
  nic: "200034456532",
  country_code: "LKA",
  flight: 3,
  seat_number: "44A",
  baggage: 40,
};

const FillDetails = () => {
  const userToken = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const searchParams = useSearchParams();
  const flightId = Number(searchParams.get("flight"));
  const passengerClass = searchParams.get("class");

  const [error, setError] = useState<boolean>(false);
  const [successfull, setSuccessfull] = useState<boolean>(false);

  const router = useRouter();

  if (!flightId || !passengerClass) {
    router.push("/");
  }

  // funtion to fetch seat details using flight and class
  const [loadingSeats, setLoadingSeats] = useState(true);
  const [seats, setSeats] = useState<SeatRow[]>([]);

  const fetchSeats = async () => {
    try {
      setLoadingSeats(true);
      const seatsResponse = await fetch(
        `/api/booking/seats?seat_class=${passengerClass}&schedule_id=${flightId}`
      );
      if (seatsResponse) {
        const seatsTemp = await seatsResponse.json();
        setSeats(seatsTemp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSeats(false);
    }
  };

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const countriesResponse = await fetch(`/api/flightsearch/countries`);
      if (countriesResponse) {
        const countriesTemp = await countriesResponse.json();
        setCountries(countriesTemp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCountries(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = async () => {
    details.seat_number = pickedSeat;
    details.flight = flightId;
    if (isAuthenticated && userToken) {
      details.token = userToken;
    }
    const response = await fetch("/api/booking/reserve", {
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
      }, 1000);
    } else {
      setSuccessfull(true);
      setTimeout(() => {
        router.push(`/payment?flight=${flightId}&seat=${pickedSeat}`);
      }, 1000);
    }
  };

  const [isPickingSeat, setIsPickingSeat] = useState<boolean>(false);
  const [pickedSeat, setPickedSeat] = useState<string>("");
  const [pickSeatWarning, setPickSeatWarning] = useState<boolean>(false);

  function handlePickSeatButton() {
    // check if the all the fields are filled
    setIsPickingSeat(true);
    fetchSeats();
  }

  function handleConfirmPayment() {
    // send passenger details, booking id, seat number, flight id to the backend
    if (pickedSeat != "") {
      setPickSeatWarning(false);
      handleSubmit();
    } else {
      setPickSeatWarning(true);
    }
  }

  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col">
      <div className="bg-sky-400 w-full h-full absolute">
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
            <Input type="text" label="Name" placeholder=" " />
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
            {loadingCountries ? (
              <div className=" aspect-square h-14 animate-pulse bg-zinc-100 rounded-xl opacity-20"></div>
            ) : (
              <Select label="Country">
                {countries.map((g) => (
                  <SelectItem key={g.key}>{g.label}</SelectItem>
                ))}
              </Select>
            )}
            <Button
              className=" bg-sky-900 text-sky-100 p-6"
              variant="solid"
              onClick={handlePickSeatButton}
            >
              Pick a Seat
            </Button>
          </div>
        ) : loadingSeats ? (
          <div className=" w-full p-6 grid grid-cols-6 gap-6">
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" aspect-square h-12 animate-pulse bg-zinc-100 rounded-lg opacity-20"></div>
            <div className=" w-full h-12 animate-pulse bg-sky-500 rounded-lg opacity-20 col-span-6"></div>
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
              {error && (
                <div className=" absolute mt-1 text-center text-red-800 italic text-sm bottom-0">
                  Sorry, an error occurred. Redirecting to the homepage...
                </div>
              )}
              {successfull && (
                <div className=" absolute mt-1 text-center text-green-800 italic text-sm bottom-0">
                  Redirecting to the payment page...
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
