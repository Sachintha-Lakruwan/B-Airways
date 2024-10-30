import mysql from "mysql2/promise";

const creds = {
  host : process.env.DB_HOST,
  port : parseInt(process.env.DB_PORT!),
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
}

// Function to execute a query
export async function executeQuery(
  query: string,
  params: unknown[] = []
): Promise<mysql.RowDataPacket[]> {
  let connection;

  try {
    connection = await mysql.createConnection(creds);
    const [results] = await connection.execute<mysql.RowDataPacket[]>(
      query,
      params
    ); // Only destructure results
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end(); // Ensure the connection is closed
    }
  }
}
