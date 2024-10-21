import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../database/database";

type FlightSearchResult = {
    date: Date;
    delay: string;
    distance: string;
    duration: string;
    departure_airport: string;
    arrival_airport: string;
    departure_country: string;
    arrival_country: string;
}

type FlightSearchResultResponse = {
    departure_flights: FlightSearchResult[],
    arrival_flights: FlightSearchResult[],
}

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const departure_airport = searchParams.get("departure_airport");
    const arrival_airport = searchParams.get("arrival_airport");
    const departure_date = searchParams.get("departure_date");
    const arrival_date = searchParams.get("arrival_date");

    const flights : FlightSearchResultResponse = {
        departure_flights: [],
        arrival_flights: []
    };

    if (typeof departure_airport !== 'string' || typeof arrival_airport !== 'string' || typeof departure_date !== 'string' || typeof arrival_date !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }

    try {
        const dep_flights : FlightSearchResult[] = await executeQuery("CALL `reservation_flightSearch`(?, ?, ?)",[departure_airport, arrival_airport, departure_date]);
        const arr_flights : FlightSearchResult[] = await executeQuery("CALL `reservation_flightSearch`(?, ?, ?)",[arrival_airport, departure_airport, arrival_date]);

        flights.departure_flights = dep_flights;
        flights.arrival_flights = arr_flights;

        return NextResponse.json(flights);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}