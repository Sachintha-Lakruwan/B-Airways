import { hash } from "bcrypt";
import { executeQuery } from "../../database/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestBody = await request.json(); // Parse JSON body
    const username = requestBody.username; // Access username from JSON
    const password = requestBody.password; // Access password from JSON
    const email = requestBody.email; // Access email from JSON
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof email !== "string"
    ) {
        return NextResponse.json({message : "Invalid form data"}, { status: 400 });
    }

    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        return NextResponse.json({message : "Invalid email"}, { status: 400 });
    }

    try {
        const existingUser = await executeQuery(
            "SELECT `username` FROM `registered_user` WHERE `username`=?",
            [username]
        );

        if (existingUser.length > 0) {
            return NextResponse.json({message : "Username already exists"}, { status: 400 });
        }
        
        const hashed_password = await hash(password, 10);

        await executeQuery(
            "INSERT INTO `registered_user` (`username`,`password`,`email`,`loyalty_type_id`,`role_id`,`passenger_id`) VALUES (?,?,?,?,?,?)",
            [username, hashed_password, email, 1, 1, null]
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({message : "Something went wrong."}, { status: 500 });
    }
    return NextResponse.json({message : "User registered"}, { status: 200 });
}
