import { executeQuery } from "../../database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countries = await executeQuery(
      "SELECT `code` as `key`, `name` as `label` FROM `country`;"
    );
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
