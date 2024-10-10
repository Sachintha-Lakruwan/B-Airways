import { NextResponse } from "next/server";

export const flightDetails = [
  { key: "F", label: "First Class" },
  { key: "J", label: "Business Class" },
  { key: "W", label: "Premium Economy" },
  { key: "Y", label: "Economy Class" },
];

export async function GET() {
  return NextResponse.json(flightDetails);
}
