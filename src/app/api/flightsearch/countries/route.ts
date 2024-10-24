import { NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET() {
  const countries = await executeQuery("SELECT `name` as `label`, `code` FROM country");
  return NextResponse.json(countries);
}
