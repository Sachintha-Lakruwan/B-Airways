"use client";
import { useSearchParams } from "next/navigation";

const FillDetails = () => {
  const searchParams = useSearchParams();
  const flight = searchParams.get("flight"); // Get the 'flight' query parameter

  return (
    <div className=" pt-28">
      <h1>Flight Details</h1>
      <p>Flight: {flight}</p>
    </div>
  );
};

export default FillDetails;
