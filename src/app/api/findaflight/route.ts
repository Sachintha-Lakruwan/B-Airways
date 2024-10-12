import { NextResponse } from "next/server";

export async function GET() {
  const flightDetails = [
    { key: "F", label: "First Class" },
    { key: "J", label: "Business Class" },
    { key: "W", label: "Premium Economy" },
    { key: "Y", label: "Economy Class" },
  ];

  return NextResponse.json(flightDetails);
}
