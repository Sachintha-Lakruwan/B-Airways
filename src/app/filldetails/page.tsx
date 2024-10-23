"use client";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import img from "@/public/pexels-hson-5071155.jpg";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

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

const FillDetails = () => {
  // const searchParams = useSearchParams();
  // const flight = searchParams.get("flight"); // Get the 'flight' query parameter

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
            Fill your details
          </h2>
          <p className=" text-center text-sm italic text-green-700">
            Passenger: 1
          </p>
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
        <Button className=" bg-sky-900 text-sky-100 p-6" variant="solid">
          Next
        </Button>
      </div>
    </div>
  );
};

export default FillDetails;
