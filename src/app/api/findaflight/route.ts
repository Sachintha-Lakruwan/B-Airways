import { NextResponse } from "next/server";

export async function GET() {
  interface Flight {
    key: string;
    date: string;
    duration: string;
    departure_airport: string;
    arrival_airport: string;
    departure_country: string;
    arrival_country: string;
    cost: number;
    model: string;
  }

  const departure_flights: Flight[] = [
    {
      key: "flight1",
      date: "2024-10-14T18:30:00.000Z",
      duration: "07:00:00",
      departure_airport: "CGK",
      arrival_airport: "BOM",
      departure_country: "Indonesia",
      arrival_country: "India",
      cost: 350,
      model: "Boeing 777",
    },
    {
      key: "flight2",
      date: "2024-10-16T09:45:00.000Z",
      duration: "06:45:00",
      departure_airport: "LHR",
      arrival_airport: "JFK",
      departure_country: "United Kingdom",
      arrival_country: "United States",
      cost: 450,
      model: "Airbus A380",
    },
    {
      key: "flight3",
      date: "2024-10-18T21:20:00.000Z",
      duration: "05:30:00",
      departure_airport: "SIN",
      arrival_airport: "SYD",
      departure_country: "Singapore",
      arrival_country: "Australia",
      cost: 300,
      model: "Boeing 787 Dreamliner",
    },
    {
      key: "flight4",
      date: "2024-10-20T14:10:00.000Z",
      duration: "02:00:00",
      departure_airport: "CDG",
      arrival_airport: "FCO",
      departure_country: "France",
      arrival_country: "Italy",
      cost: 150,
      model: "Airbus A320",
    },
  ];

  return NextResponse.json(departure_flights);
}
