import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

type SeatMap = {
    [rowNumber: number]: string[];
};

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const seat_class = searchParams.get("seat_class");
    const schedule_id = searchParams.get("schedule_id");

    if (typeof seat_class !== 'string' || typeof schedule_id !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }
    try {
        const res  = await executeQuery(`
            SELECT * FROM seat 
            LEFT JOIN seat_class ON seat.seat_class_id=seat_class.id 
            WHERE seat.airplane_number=(SELECT airplane_number FROM schedule WHERE id = ?) 
            AND seat_class.name = ?;
            `, [schedule_id, seat_class]);
        
        const seatMap : SeatMap = {};
        
        res.forEach(seat => {
            const rowNumber = parseInt(seat.seat_number.match(/\d+/)[0], 10); 
            const columnLetter = seat.seat_number.match(/[A-Za-z]/)[0];
            if (!seatMap[rowNumber]) {
                seatMap[rowNumber] = []; 
            }
            seatMap[rowNumber].push(columnLetter);
        });
        return NextResponse.json(seatMap);
    } catch (err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}