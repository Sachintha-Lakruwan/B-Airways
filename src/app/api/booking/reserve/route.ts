import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

interface Details {
    name: string;
    age: number;
    gender: string;
    passportNumber: string;
    nic: string;
    country_code: string;
    flight: string; // schedule_id
    seat_number: string;
}

export async function POST(request: NextRequest) {
    const reqBody: Details = await request.json();
    console.log(reqBody);

    if (
        reqBody.flight === undefined ||
        reqBody.seat_number === undefined ||
        reqBody.name === undefined ||
        reqBody.age === undefined ||
        reqBody.gender === undefined ||
        reqBody.passportNumber === undefined ||
        reqBody.country_code === undefined
    ) {
        return new NextResponse("Invalid form data", { status: 400 });
    }

    try {
        // CALL `reservation_createPendingBooking`('himathbro', '22', 'male', '2222222222', '1111111111', 'ABW', '4', '30A')
        await executeQuery(
            "CALL `reservation_createPendingBooking`(? , ? , ? , ? , ? , ? , ?, ?);",
            [
                reqBody.name,
                reqBody.age,
                reqBody.gender,
                reqBody.passportNumber,
                reqBody.nic,
                reqBody.country_code,
                reqBody.flight,
                reqBody.seat_number,
            ]
        );
    } catch (err) {
        console.error(err);
        return new NextResponse("Error executing query", { status: 500 });
    }

    return NextResponse.json({});
}
