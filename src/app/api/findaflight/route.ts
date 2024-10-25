import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../database/database";

interface Flight {
  key: string;
  date: string; // will concatenate the two date and time fields
  departure_time : string;
  duration: string;
  departure_airport: string;
  arrival_airport: string;
  departure_country: string;
  arrival_country: string;
  cost: number;
  model: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const departure_airport = searchParams.get("departure_airport");
  const arrival_airport = searchParams.get("arrival_airport");
  const departure_date = searchParams.get("departure_date");
  const seat_class = searchParams.get("seat_class");

  if (
    typeof departure_airport !== "string" ||
    typeof arrival_airport !== "string" ||
    typeof departure_date !== "string" ||
    typeof seat_class !== "string"
  ) {
    return new Response("Invalid form data", { status: 400 });
  }

  try {
    const res = await executeQuery(
      "CALL `reservation_flightSearch`(?, ?, ?, ?)",
      [departure_airport, arrival_airport, departure_date, seat_class]
    );
    const flights: Flight[] = res[0] as Flight[];

    flights.map((flight) => {
      flight.date = new Date(flight.date).toLocaleDateString('en-CA');
      flight.date += " " + flight.departure_time;
    })

    return NextResponse.json(flights);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// FRontend format
// interface Flight {
//   key: string;
//   date: string;
//   duration: string;
//   departure_airport: string;
//   arrival_airport: string;
//   departure_country: string;
//   arrival_country: string;
//   cost: number;
//   model: string;
// }
