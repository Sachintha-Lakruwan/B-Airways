import { executeQuery } from "../../database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const flightClasses = await executeQuery(
      "SELECT `id` as `key`, `name` as `label` FROM `seat_class`;"
    );
    return NextResponse.json(flightClasses);
  } catch (error) {
    console.error("Error fetching flight classes:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
