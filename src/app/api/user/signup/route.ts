import { hash } from "bcrypt";
import { executeQuery } from "../../database/database";

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
        return new Response("Invalid form data", { status: 400 });
    }

    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        return new Response("Invalid email", { status: 400 });
    }

    try {
        const existingUser = await executeQuery(
            "SELECT `username` FROM `registered_user` WHERE `username`=?",
            [username]
        );

        if (existingUser.length > 0) {
            return new Response("Username already exists", { status: 400 });
        }
        
        const hashed_password = await hash(password, 10);

        await executeQuery(
            "INSERT INTO `registered_user` (`username`,`password`,`email`,`loyalty_type_id`,`role_id`,`passenger_id`) VALUES (?,?,?,?,?,?)",
            [username, hashed_password, email, 1, 1, null]
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return new Response("Something went wrong.", { status: 500 });
    }
    return new Response("User registered", { status: 200 });
}
