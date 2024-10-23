import { NextResponse } from "next/server";

export async function GET() {
  const airports = [
    {
      key: "CGK",
      label: "Soekarno-Hatta International Airport",
    },
    {
      key: "BOM",
      label: "Chhatrapati Shivaji Maharaj International Airport",
    },
    {
      key: "LHR",
      label: "London Heathrow Airport",
    },
    {
      key: "JFK",
      label: "John F. Kennedy International Airport",
    },
    {
      key: "SIN",
      label: "Singapore Changi Airport",
    },
    {
      key: "SYD",
      label: "Sydney Kingsford Smith Airport",
    },
    {
      key: "CDG",
      label: "Charles de Gaulle Airport",
    },
    {
      key: "FCO",
      label: "Leonardo da Vinci International Airport",
    },
  ];

  return NextResponse.json(airports);
}
