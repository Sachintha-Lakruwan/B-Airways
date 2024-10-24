import { NextResponse } from "next/server";

export async function GET() {
  const classes = [
    { key: "F", label: "First Class" },
    { key: "J", label: "Business Class" },
    // { key: "W", label: "Premium Economy" },
    { key: "Y", label: "Economy Class" },
  ];
  return NextResponse.json(classes);
}
