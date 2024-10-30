"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import img from "@/public/pexels-hson-5071155.jpg";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeatSelection from "./SeatSelection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { setPaymentDetails } from "../GlobalRedux/Slices/FlightDetails/flight";
import CustomNumberInput from "./CustomNumberInput";
import CustomStringInput from "./CustomStringInput";

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
  name: "",
  age: 0,
  gender: "",
  passportNumber: "",
  nic: "",
  country_code: "",
  flight: 0,
  seat_number: "",
  baggage: 0,
};

const FillDetails = () => {
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [passportNumber, setPassportNumber] = useState<string>("");
  const [nicNumber, setNicNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [baggage, setBaggage] = useState<number>(0);
  const [detailsWarning, setDetailsWarning] = useState<boolean>(false);
  // const [detailsWarning, setDetailsWarning] = useState<boolean>(false);

  const userToken = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const flightId = Number(searchParams.get("flight"));
  const passengerClass = searchParams.get("class");

  const [error, setError] = useState<boolean>(false);
  const [successfull, setSuccessfull] = useState<boolean>(false);

  const router = useRouter();

  if (!flightId || !passengerClass) {
    router.push("/");
  }

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
      if (response) {
        const priceTemp = await response.json();
        dispatch(setPaymentDetails(priceTemp));
      }
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
    details.flight = flightId;

    details.name = fullName;
    details.age = age;
    details.baggage = baggage;
    details.country_code = country;
    details.gender = gender;
    details.nic = nicNumber;
    details.passportNumber = passportNumber;

    if (isAuthenticated && userToken) {
      details.token = userToken;
    }

    if (
      details.name == "" ||
      details.age == 0 ||
      details.gender == "" ||
      details.passportNumber == "" ||
      details.nic == "" ||
      details.country_code == "" ||
      details.baggage == 0
    ) {
      setDetailsWarning(true);
      return;
    }
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
            <CustomStringInput
              label="Full Name"
              value={fullName}
              setValue={setFullName}
            />

            <div className=" flex flex-row gap-3">
              <CustomNumberInput label="Age" value={age} setValue={setAge} />
              <Select
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                selectedKeys={[gender]}
              >
                {gendersList.map((g) => (
                  <SelectItem key={g.key}>{g.label}</SelectItem>
                ))}
              </Select>
            </div>
            <CustomStringInput
              label="Passport Number"
              value={passportNumber}
              setValue={setPassportNumber}
            />
            <CustomStringInput
              label="NIC"
              value={nicNumber}
              setValue={setNicNumber}
            />
            <div className=" grid grid-cols-[1fr_1fr] gap-3">
              {loadingCountries ? (
                <div className=" aspect-square h-14 animate-pulse bg-zinc-100 rounded-xl opacity-20 w-full"></div>
              ) : (
                <Select
                  label="Country"
                  selectedKeys={[country]}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((g) => (
                    <SelectItem key={g.key}>{g.label}</SelectItem>
                  ))}
                </Select>
              )}
              <CustomNumberInput
                label="Baggage"
                value={baggage}
                setValue={setBaggage}
              />
              {isAuthenticated && (
                <div className=" text-sm italic justify-center items-center flex gap-2 text-zinc-800 col-span-2">
                  <span>Use the details from your previous booking</span>
                </div>
              )}
            </div>

            <Button
              className=" bg-sky-900 text-sky-100 p-6"
              variant="solid"
              onClick={handlePickSeatButton}
            >
              Pick a Seat
            </Button>
            {detailsWarning && (
              <div className=" w-[calc(100%-3.3em)] absolute mt-1 text-center text-red-800 italic text-sm bottom-0">
                Please fill all the fields
              </div>
            )}
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
