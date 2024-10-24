import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";



export async function POST(request : NextRequest) {
    const reqBody = await request.json();

    const seat_number = reqBody.seat_number;
    const schedule_id = reqBody.schedule_id;
    
    const registered_user_id = reqBody.registered_user_id;

    const name = reqBody.name;
    const age = reqBody.age;
    const gender = reqBody.gender;
    const passportNumber = reqBody.passportNumber;
    const countryCode = reqBody.countryCode;

    if (schedule_id === undefined || 
        registered_user_id === undefined || 
        seat_number === undefined || 
        name === undefined || 
        age === undefined || 
        gender === undefined || 
        passportNumber === undefined || 
        countryCode === undefined) 
    {
        return new NextResponse('Invalid form data', { status: 400 });
    }

    try {
        const isValid = await executeQuery(`SELECT * FROM registered_user WHERE id = ?`, [registered_user_id]);
        if (isValid.length === 0) {
            return new NextResponse('Invalid user id', { status: 400 });
        }

        let airplane_number = await executeQuery(`SELECT airplane_number FROM schedule WHERE id = ?`, [schedule_id]);
        airplane_number = airplane_number[0].airplane_number;

        let seat_id = await executeQuery(`SELECT id FROM seat WHERE seat_number = ? AND airplane_number = ?`, [seat_number, airplane_number]);
        if (seat_id.length === 0) {
            return new NextResponse('Invalid seat number', { status: 400 });
        }
        seat_id = seat_id[0].id;

        

    } catch(err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }

    console.log(seat_number)

    return NextResponse.json({seat_number});
}