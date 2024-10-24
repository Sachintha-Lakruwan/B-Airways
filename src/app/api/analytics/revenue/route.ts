import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const airplane_model = searchParams.get("airplane_model");

    if (typeof airplane_model !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }

    const revenue = await executeQuery("SELECT SUM(price) AS `total_revenue`FROM booking LEFT JOIN schedule ON booking.schedule_id=schedule.id LEFT JOIN airplane ON airplane.tail_number=schedule.airplane_number LEFT JOIN airplane_model ON airplane.model_id=airplane_model.id WHERE airplane_model.id = ?;",[airplane_model]);
    return NextResponse.json(revenue);
}