import mysql from "mysql2/promise";
import { parsePhoneNumberFromString } from "libphonenumber-js";


// Database configurations for different countries (dynamic)
const dbConfig = {
  IN: {
    host: "mysql-service-in",
    user: "india_user",
    password: "india_password",
    database: "india_db",
  },
  GB: {
    host: "mysql-service-uk",
    user: "uk_user",
    password: "uk_password",
    database: "uk_db",
  },
  // Add more countries and their configurations dynamically here
};

const dbConfigMain = {
    host: "mysql-service-main",
    user: "lookup_user",
    password: "lookup_password",
    database: "lookup_main",
};

const validateTokenAndBalance = async (token) => {
    if (!token) {
      return { error: "Missing token", status: 401 };
    }
  
    try {
      const connection = await mysql.createConnection(dbConfigMain);
  
      // Query to find the user by authKey and ensure balance > 0
      const [rows] = await connection.execute(
        "SELECT authKey, balance, currency, lookup_counter, createdAt, updatedAt FROM users WHERE authKey = ?",
        [token]
      );
  
      await connection.end();
  
      if (rows.length === 0) {
        return { error: "Unauthorized: Invalid token", status: 401 };
      }
  
      const user = rows[0];
  
      if (user.balance <= 0) {
        return { error: "Insufficient balance", status: 403 };
      }
  
      return { user, status: 200 }; // Return user data if valid
    } catch (error) {
      console.error("Database error:", error);
      return { error: "Internal server error", status: 500 };
    }
};
const deductBalance = async (token, amount) => {
    try {
      const connection = await mysql.createConnection(dbConfigMain);
      const [result] = await connection.execute(
        "UPDATE users SET balance = balance - ? WHERE authKey = ? AND balance >= ?",
        [amount, token, amount]
      );
      await connection.end();
  
      return result.affectedRows > 0; // Returns true if balance was deducted
    } catch (error) {
      console.error("Error updating balance:", error);
      return false;
    }
};

const determineCountry = (number) => {
  const phoneNumber = parsePhoneNumberFromString(`+${number}`); // Automatically detect the country code
  if (!phoneNumber || !phoneNumber.isValid()) return null;
  return phoneNumber.country; // Returns country code like "IN", "GB", etc.
};

// Function to get the database configuration based on the country
const getDatabaseConfig = (country) => dbConfig[country] || null;


export async function POST(request) {
  try {
        const token = request.headers.get("Authorization")?.replace("Bearer ", ""); // Extract token
        const authResult = await validateTokenAndBalance(token);

        if (authResult.error) {
            return new Response(JSON.stringify({ error: authResult.error }), { status: authResult.status });
        }
        const body = await request.json();
        const { type, number } = body;

        if (!type || !number) {
            return new Response(
                JSON.stringify({
                    error: "Missing required fields: action, type, or number",
                }),
                { status: 400 }
            );
        }
        const country = determineCountry(number);
        if (!country) {
            return new Response(
                JSON.stringify({ error: "Invalid phone number format" }),
                { status: 400 }
            );
        }
        // Get the database configuration based on the provided country code
        const dbConfig = getDatabaseConfig(country);
        if (!dbConfig) {
            return new Response(
                JSON.stringify({
                error: `No database pod available for country code: ${country}`,
                }),
                { status: 400 }
            );
        }

        // Create a connection to the appropriate database based on the country code
        const connection = await mysql.createConnection(dbConfig);
        let query;
        switch (type) {
            case "hlr":
                // For HLR type, fetch all columns but exclude is_dncr in the response
                query = `SELECT msisdn, connectivity_status, mccmnc, mcc, mnc, imsi, msin, 
                        msc, original_network_name, original_country_name, original_country_code, 
                        original_country_prefix, is_ported, ported_network_name, ported_country_name, 
                        ported_country_code, ported_country_prefix, is_roaming, roaming_network_name, 
                        roaming_country_name, roaming_country_code, roaming_country_prefix, cost, 
                        timestamp, storage, route, processing_status, error_code, data_source 
                        FROM lookup_data WHERE msisdn = ? AND is_dncr = 0`;
                break;
            case "dncr":
                // For DNCR type, fetch msisdn and dncr status
                query = `SELECT msisdn, is_dncr FROM lookup_data WHERE msisdn = ?`;
                break;
            default:
                return new Response(
                    JSON.stringify({ error: `Invalid type: ${type}` }),
                    { status: 400 }
                );
        }

        const [rows] = await connection.execute(query, [number]);
        await connection.end();

        // Handle response based on the query type
        if (type === "dncr") {
            const result = rows.length > 0 ? { msisdn: rows[0].msisdn, dncr: rows[0].is_dncr === 1 } : null;
            await deductBalance(token, 0.05);
            return new Response(JSON.stringify({ country, data: result }), { status: 200 });
        }

        // For HLR type, exclude is_dncr in the response
        const result = rows.map(row => {
            const { is_dncr, ...rest } = row; // Exclude the is_dncr column
            return rest;
        });
        if (result.length === 0) {
            return new Response(
                JSON.stringify({ msisdn: number, msg: "Sorry no records found" }),
                { status: 200 }
            );
        }

        // Deduct 0.05 after successful lookup
        await deductBalance(token, 0.05);

        return new Response(JSON.stringify({ country, data: result }), { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing the request" }),
      { status: 500 }
    );
  }
}