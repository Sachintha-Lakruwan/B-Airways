import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { executeQuery } from "../../database/database";

interface ProfileDetails {
    username : string, 
    email : string,
    total_bookings : number,
    loyalty : string,
}

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");
    let decode : { userId : number | null, role : string ,iat : number, exp : number } | null = null;

    try {
        if (token !== null) {
            decode = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as { userId : number, role : string ,iat : number, exp : number };
            const res = await executeQuery("SELECT username, email, COUNT(booking.id) AS `total_bookings`, loyalty_type.`name` AS `loyalty` FROM registered_user LEFT JOIN booking ON registered_user.id = booking.registered_user_id LEFT JOIN loyalty_type ON loyalty_type.id = registered_user.loyalty_type_id WHERE registered_user.id = ? GROUP BY registered_user.id;", [decode.userId]) as ProfileDetails[];
            // console.log(res);
            return NextResponse.json(res[0]);
        }
        return NextResponse.json({ message: 'Token not provided' , status: 400 });
    } catch(err) {
        console.error(err)
        return NextResponse.json({ message: 'Could Not verify token' , status: 401 });
    }
}