import mysql from 'mysql2/promise';
import creds from "./database.config.json";

// Function to execute a query
export async function executeQuery(query: string, params: any[] = []): Promise<any[]> {
    try {
        const connection = await mysql.createConnection(creds);
        const [results] = await connection.execute<any[]>(query, params);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}