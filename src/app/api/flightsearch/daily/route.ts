import { NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

interface Schedule {
    key: number;
    date: string;
    departure_time: string;
    duration: string;
    departure_airport: string;
    arrival_airport: string;
    model: string;
    departure_country: string;
    arrival_country: string;
}

// Change date to get current time
export async function GET() {
    const flights = await executeQuery(
        "SELECT schedule.`id` AS `key`, schedule.`date`, route.departure_time, route.duration, route.departure AS `departure_airport`, route.arrival AS `arrival_airport`, airplane_model.name AS `model`, SUBSTRING_INDEX(departure_location.Full_Hierarchy, '>', 1) AS 'departure_country', SUBSTRING_INDEX(arrival_location.Full_Hierarchy, '>', 1) AS 'arrival_country' FROM schedule LEFT JOIN route ON schedule.flight_code=route.flight_code LEFT JOIN locationhierarchy AS arrival_location ON route.arrival = arrival_location.code LEFT JOIN locationhierarchy AS departure_location ON route.departure = departure_location.code LEFT JOIN airplane ON schedule.airplane_number=airplane.tail_number LEFT JOIN airplane_model ON airplane.model_id=airplane_model.id WHERE schedule.date=CURRENT_DATE;",
        []
    ) as Schedule[];
    flights.map((flight) => {
        flight.date = new Date(flight.date).toLocaleDateString('en-CA')
    })
    return NextResponse.json(flights);
}
