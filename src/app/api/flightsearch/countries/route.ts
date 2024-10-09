import { NextResponse } from "next/server";

export const countries = [
  { key: "CA", label: "Canada" },
  { key: "GB", label: "United Kingdom" },
  { key: "AU", label: "Australia" },
  { key: "IN", label: "India" },
  { key: "DE", label: "Germany" },
  { key: "FR", label: "France" },
  { key: "IT", label: "Italy" },
  { key: "JP", label: "Japan" },
  { key: "CN", label: "China" },
  { key: "BR", label: "Brazil" },
  { key: "ZA", label: "South Africa" },
  { key: "RU", label: "Russia" },
  { key: "MX", label: "Mexico" },
  { key: "KR", label: "South Korea" },
  { key: "ES", label: "Spain" },
  { key: "AR", label: "Argentina" },
  { key: "NG", label: "Nigeria" },
  { key: "EG", label: "Egypt" },
  { key: "SA", label: "Saudi Arabia" },
];

export async function GET() {
  return NextResponse.json(countries);
}
