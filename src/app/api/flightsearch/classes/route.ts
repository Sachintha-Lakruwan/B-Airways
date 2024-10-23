import { executeQuery } from "../../database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const seatClasses = await executeQuery(
      "SELECT 'id' as 'key', 'name' as 'label' FROM seat_class;"
    );
    return NextResponse.json(seatClasses);
  } catch (error) {
    console.error("Error fetching seat classes:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}