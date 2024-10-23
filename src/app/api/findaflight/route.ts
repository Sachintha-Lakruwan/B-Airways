import { NextResponse } from "next/server";
import { executeQuery } from "../database/database";

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

  try {
    // SQL query to fetch flight details with the correct format
    const flights: Flight[] = await executeQuery(`
      SELECT 
        CONCAT('flight', s.id) AS \`key\`,  -- Unique key for each flight
        s.date AS \`date\`,  -- Flight date
        r.duration AS \`duration\`,  -- Flight duration
        da.code AS \`departure_airport\`,  -- Departure airport code
        aa.code AS \`arrival_airport\`,  -- Arrival airport code
        dc.name AS \`departure_country\`,  -- Departure country
        ac.name AS \`arrival_country\`,  -- Arrival country
        r.distance * 0.1 AS \`cost\`,  -- Example cost calculation based on distance
        am.name AS \`model\`  -- Airplane model name
      FROM schedule s
      JOIN route r ON s.flight_code = r.flight_code
      JOIN airplane a ON s.airplane_number = a.tail_number
      JOIN airplane_model am ON a.model_id = am.id
      JOIN airport da ON r.departure = da.code
      JOIN airport aa ON r.arrival = aa.code
      -- For departure country
      JOIN location dl ON da.city_id = dl.id
      JOIN country dc ON dc.code = (SELECT c.code FROM location l JOIN country c ON l.parent_id = c.code WHERE l.id = dl.parent_id)
      -- For arrival country
      JOIN location al ON aa.city_id = al.id
      JOIN country ac ON ac.code = (SELECT c.code FROM location l JOIN country c ON l.parent_id = c.code WHERE l.id = al.parent_id)
    `);

    return NextResponse.json(flights);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
