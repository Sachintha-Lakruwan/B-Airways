import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const seat_class = searchParams.get("seat_class");
    const schedule_id = searchParams.get("schedule_id");

    if (typeof seat_class !== 'string' || typeof schedule_id !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }
    try {
        const bookedSeatNumbers : string[] = [];
        const bookedSeats = await executeQuery(`
            SELECT 
            seat.seat_number
            FROM booking
            LEFT JOIN seat ON seat.id = booking.seat_id
            WHERE schedule_id = 3
            UNION 
            SELECT 
            seat.seat_number 
            FROM pending_booking
            LEFT JOIN seat ON seat.id = pending_booking.seat_id
            WHERE schedule_id = 3;
        `,[schedule_id])

        const res  = await executeQuery(`
            SELECT * FROM seat 
            LEFT JOIN seat_class ON seat.seat_class_id=seat_class.id 
            WHERE seat.airplane_number=(SELECT airplane_number FROM schedule WHERE id = ?) 
            AND seat_class.name = ?;
            `, [schedule_id, seat_class,]);
        
        const seatMap: { [rowNumber: number]: { [column: string]: boolean }[] } = {};

        bookedSeats.forEach(seat => {
            bookedSeatNumbers.push(seat.seat_number);
        })

        res.forEach(seat => {
            const rowNumber = parseInt(seat.seat_number.match(/\d+/)[0], 10); 
            // const columnLetter = seat.seat_number.match(/[A-Za-z]/)[0];
            if (!seatMap[rowNumber]) {
                seatMap[rowNumber] = []; 
            }
            if (bookedSeatNumbers.includes(seat.seat_number)) {
                seatMap[rowNumber].push(
                    {[seat.seat_number] : false}
                );
            } else {
                seatMap[rowNumber].push(
                    {[seat.seat_number] : true}
                );
            }
        });
        
        // need only the arrays not the keys
        return NextResponse.json(Object.values(seatMap));
    } catch (err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}