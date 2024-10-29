import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { executeQuery } from "../../database/database";

interface AutofillDetails {
    name : string, 
    age : number,
    gender : ["male","female","other"],
    NIC : string,
    passport_number : string
}

export async function GET(request : NextRequest) {
    const { searchParams } = new URL(request.url);

    const token = searchParams.get("token");
    let decode : { userId : number | null, role : string ,iat : number, exp : number } | null = null;

    try {
        if (token !== null) {
            decode = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as { userId : number, role : string ,iat : number, exp : number };
            const res = await executeQuery("SELECT passenger.name, passenger.age, passenger.gender, passenger.NIC, passenger.passport_number FROM `registered_user` LEFT JOIN `passenger` ON registered_user.passenger_id = passenger.id WHERE registered_user.id = ?", [decode.userId]) as AutofillDetails[];
            // console.log(res);
            return NextResponse.json(res[0]);
        }
        return NextResponse.json({ message: 'Token not provided' , status: 400 });
    } catch(err) {
        console.error(err)
        return NextResponse.json({ message: 'Could Not verify token' , status: 401 });
    }
}