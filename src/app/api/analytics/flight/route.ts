import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const flight_code = searchParams.get("flight_code");

    if (typeof flight_code !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }
    try {
        const revenue = await executeQuery(`
            SELECT 
            *
            FROM booking
            LEFT JOIN passenger ON booking.passenger_id = passenger.id 
            LEFT JOIN schedule ON booking.schedule_id = schedule.id
            WHERE schedule_id=(
                SELECT id 
                FROM schedule 
                WHERE flight_code=? 
                ORDER BY id 
                DESC 
                LIMIT 1
            );`,[flight_code]
        );
        return NextResponse.json(revenue);
    } catch (err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}