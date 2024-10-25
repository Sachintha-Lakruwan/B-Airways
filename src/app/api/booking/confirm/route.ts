import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";


export async function POST(request: NextRequest) {
    const reqBody: { flight : string , seat_number : string, userId : number} = await request.json();
    console.log(reqBody);

    if (reqBody.flight === undefined || reqBody.seat_number === undefined) {
        return new NextResponse("Invalid form data", { status: 400 });
    }

    try {
        await executeQuery(
            "CALL `reservation_confirmBooking`(? , ? , ? );",
            [
                reqBody.userId,
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
