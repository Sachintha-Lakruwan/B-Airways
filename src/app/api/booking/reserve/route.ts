import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";
import jwt, { } from "jsonwebtoken";

interface Details {
  token: string | null;
  name: string;
  age: number;
  gender: string;
  passportNumber: string;
  nic: string;
  country_code: string;
  flight: string; // schedule_id
  seat_number: string;
  baggage : number;
}

interface PriceDetails {
  flight_cost: number,
  baggage_cost: number,
  discount_percentage: number,
  discount_cost: number,
  total_cost: number
}

export async function POST(request: NextRequest) {
  const reqBody: Details = await request.json();
  let decoded : { userId : number | null, role : string ,iat : number, exp : number } | null = null;
  if (reqBody.token !== null) {
    try {
      decoded = jwt.verify(reqBody.token, process.env.JWT_SECRET || "your_jwt_secret") as { userId : number, role : string ,iat : number, exp : number };    
    } catch(err) {
      console.error(err);
      return new NextResponse("Error validating token", { status: 401 });
    }
  };

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
    // CALL `reservation_createPendingBooking`('himathbro', '22', 'male', '2222222222', '1111111111', 'ABW', '4', '30A', 24 kgggggg)
    await executeQuery(
      "CALL `reservation_createPendingBooking`(? , ? , ? , ? , ? , ? , ? , ? , ? );",
      [
        reqBody.name,
        reqBody.age,
        reqBody.gender,
        reqBody.passportNumber, 
        reqBody.nic,
        reqBody.country_code,
        reqBody.flight,
        reqBody.seat_number,
        reqBody.baggage,
      ]
    );
    // console.log("user token is : ", decoded ? decoded.userId : null);
    const price_details = await executeQuery("CALL `reservation_priceTally`(?, ?, ?, ?)", [reqBody.flight,reqBody.seat_number, decoded ? decoded.userId : null, reqBody.baggage]) as PriceDetails[][];
    
    // console.log("Price Details are : ",price_details[0][0])

    return NextResponse.json(price_details[0][0], { status: 200 });

  } catch (err) {
    console.error(err);
    return new NextResponse("Error executing query", { status: 500 });
  }
}
