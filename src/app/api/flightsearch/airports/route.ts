import { executeQuery } from "../../database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // SQL query to fetch airport codes and names
    const airports = await executeQuery(`
      SELECT 
        a.code AS \`key\`, 
        CONCAT(a.name, ', ', l.name) AS \`label\`
      FROM airport a
      JOIN location l ON a.city_id = l.id
    `);

    return NextResponse.json(airports);
  } catch (error) {
    console.error("Error fetching airports:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
