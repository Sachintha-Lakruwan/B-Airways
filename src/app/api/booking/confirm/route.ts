import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";
import { encodeFlightInfo } from "../search/util";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    const reqBody: {
        flight: number;
        seat_number: string;
        token: string | null;
    } = await request.json();
    console.log(reqBody);

    let decoded: {
        userId: number | null;
        role: string;
        iat: number;
        exp: number;
    } | null = null;

    if (reqBody.flight === undefined || reqBody.seat_number === undefined) {
        return new NextResponse("Invalid form data", { status: 400 });
    }

    if (reqBody.token !== null) {
        try {
            decoded = jwt.verify(
                reqBody.token,
                process.env.JWT_SECRET || "your_jwt_secret"
            ) as { userId: number; role: string; iat: number; exp: number };
        } catch (err) {
            console.error(err);
            return new NextResponse("Error validating token", { status: 401 });
        }
    }

    try {
        const userID = decoded ? decoded.userId : null;
        await executeQuery("CALL `reservation_confirmBooking`(? , ? , ? );", [
            userID,
            reqBody.flight,
            reqBody.seat_number,
        ]);

        
    } catch (err) {
        console.error(err);
        return new NextResponse("Error executing query", { status: 500 });
    }

    return NextResponse.json({
        reference : encodeFlightInfo(reqBody.flight, reqBody.seat_number)
    });
}
