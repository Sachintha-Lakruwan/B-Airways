import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { executeQuery } from "../../database/database";
import { encodeFlightInfo } from "../search/util";

export interface BookingDetails {
    schedule_id : number,
    departure_date : string, 
    status : string,
    departure : string,
    arrival : string,
    departure_time : string,
    seat_number : string,
    seat_class : string,
    ref : string
}

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");
    let decode : { userId : number | null, role : string ,iat : number, exp : number } | null = null;

    try {
        if (token !== null) {
            decode = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as { userId : number, role : string ,iat : number, exp : number };
            const res = await executeQuery(`
                SELECT
                    schedule.id AS schedule_id,
                    schedule.date AS 'departure_date',
                    CASE 
                       WHEN delay > 0 THEN 'Delayed'
                       ELSE 'On Time'
                    END AS status,
                    route.departure,
                    route.arrival,
                    SEC_TO_TIME(
                       TIME_TO_SEC(route.departure_time) + TIME_TO_SEC(schedule.delay)
                    ) AS departure_time,
                    seat.seat_number,
                    (SELECT name FROM seat_class WHERE seat_class.id = seat.seat_class_id) AS seat_class
                FROM registered_user 
                INNER JOIN booking ON registered_user.id = booking.registered_user_id 
                LEFT JOIN schedule ON schedule.id = booking.schedule_id
                LEFT JOIN route ON schedule.flight_code = route.flight_code
                LEFT JOIN seat ON booking.seat_id = seat.id
                WHERE registered_user.id = ? 
                ORDER BY booking.date
                LIMIT 3;
                `, [decode.userId]) as BookingDetails[];
            // console.log(res);

            res.map(booking => {
                booking.departure_date = new Date(booking.departure_date).toLocaleDateString('en-CA');
                booking.ref = encodeFlightInfo(booking.schedule_id, booking.seat_number);
            })

            return NextResponse.json(res);
        }
        return NextResponse.json({ message: 'Token not provided' , status: 400 });
    } catch(err) {
        console.error(err)
        return NextResponse.json({ message: 'Could Not verify token' , status: 401 });
    }
}