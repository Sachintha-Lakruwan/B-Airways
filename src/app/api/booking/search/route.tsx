import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";
import { decodeFlightInfo } from "./util";

interface Refernce {
    scheduleId : number,
    seatNumber : string
}

// OKKOMA ewanawa one tika ganna
// interface BookingDetails {
    
// }

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const ref = searchParams.get("ref");

    if (typeof ref !== 'string') {
        return new Response('Invalid form data', { status: 400 });
    }

    const dec = decodeFlightInfo(ref) as Refernce;
    try {
        const res = await executeQuery("CALL `reservation_referenceSearch`(?, ?)",[dec.scheduleId, dec.seatNumber])
        return NextResponse.json(res[0][0])
    } catch (err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}