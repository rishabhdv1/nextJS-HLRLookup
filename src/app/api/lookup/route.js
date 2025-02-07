import mysql from "mysql2/promise";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import jwt from 'jsonwebtoken';
const JWT_SECRET = 'fgdhkeosk-3636shj-373jsjslsl-2535';
const validateToken = (token) => {
  if (!token) {
    return { error: "Missing token" };
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode the token
    return decoded; // Return decoded payload if valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return { error: "Unauthorized: Invalid or expired token" };
  }
};
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

// Function to determine the country from the phone number
const determineCountry = (number) => {
  const phoneNumber = parsePhoneNumberFromString(`+${number}`); // Automatically detect the country code
  if (!phoneNumber || !phoneNumber.isValid()) return null;
  return phoneNumber.country; // Returns country code like "IN", "GB", etc.
};

// Function to get the database configuration based on the country
const getDatabaseConfig = (country) => dbConfig[country] || null;


// Handler for the GET request
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const number = searchParams.get("number");
  const ipadd = searchParams.get("ipadd");
  const token = request.headers.get("Authorization");
  const user = validateToken(token?.replace("Bearer ", "")); 
  
  if (!user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Invalid or missing token" }),
      { status: 401 }
    );
  }
  // Validate query parameters
  if (!type || !number) {
    return new Response(
      JSON.stringify({ error: "Missing required query parameters: type and number" }),
      { status: 400 }
    );
  }
  // const phoneNumber = parsePhoneNumberFromString(number);
  // if (!phoneNumber || !phoneNumber.isValid()) {
  //   return new Response(
  //     JSON.stringify({ error: "Invalid phone number format" }),
  //     { status: 200 }
  //   );
  // }


  const connectionFist = await mysql.createConnection(dbConfigMain);
  const isBlocked = 1;
  const [rows] = await connectionFist.execute(
    "SELECT is_blocked FROM ip_tbl WHERE ip_addpress = ? AND is_blocked = ?",
    [ipadd, isBlocked]
  );

  if (rows.length > 0) {
    return new Response(
      JSON.stringify({
        message: `Plz register and buy HLR/DNCR product. Only 1 lookup query is avaiable for free for this IP ${ipadd} Thus as been blocked.`
      }),
      { status: 200 }
    );
  }

  // Ensure IP is unique & update if exists
  const query = `
    INSERT INTO ip_tbl (ip_addpress, is_blocked) 
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE is_blocked = ?;
  `;

  const [result] = await connectionFist.execute(query, [ipadd, isBlocked, isBlocked]);
  await connectionFist.end();



  try {
    const country = determineCountry(number);
    if (!country) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number format" }),
        { status: 400 }
      );
    }

    // Check if the country has a pod (database configuration)
    const dbConfig = getDatabaseConfig(country);
    if (!dbConfig) {
      return new Response(
        JSON.stringify({ msisdn: number, msg: `Sorry no pod is available for this country (${country})` }),
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);
    let query;

    // Adjust query based on type
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
      return new Response(JSON.stringify({ country, data: result }), { status: 200 });
    }

    // For HLR type, exclude is_dncr in the response
    const result = rows.map(row => {
      const { is_dncr, ...rest } = row;
      return rest;
    });
    if (result.length === 0) {
      return new Response(
        JSON.stringify({ msisdn: number, msg: "Sorry no records found" }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ country, data: result }), { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const token = request.headers.get("Authorization"); // Get the token from the header

    // Validate the token
    const user = validateToken(token?.replace("Bearer ", "")); // Extract token and validate
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid or missing token" }),
        { status: 401 }
      );
    }

    // Parse the incoming request body (JSON)
    const body = await request.json();
    // Debugging logs for incoming payload
    console.log("Incoming payload:", body);

    // Extract details from the body
    const { action, type, country, details } = body;

    // Validate required fields in the body
    if (!action || !type || !country || details.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: action, type, country, or details",
        }),
        { status: 400 }
      );
    }

    // Debugging logs
    console.log("Action:", action);
    console.log("Type:", type);
    console.log("Country:", country); // Use country here
    console.log("Details:", details);

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

    // Extract the first item from details array (assuming it's a single object)
    const {
      id = null,
      msisdn,
      connectivity_status = null,
      mccmnc = null,
      mcc = null,
      mnc = null,
      imsi = null,
      msin = null,
      msc = null,
      original_network_name = null,
      original_country_name = null,
      original_country_code = null,
      original_country_prefix = null,
      is_ported = null,
      ported_network_name = null,
      ported_country_name = null,
      ported_country_code = null,
      ported_country_prefix = null,
      is_roaming = null,
      roaming_network_name = null,
      roaming_country_name = null,
      roaming_country_code = null,
      roaming_country_prefix = null,
      cost = null,
      timestamp = null,
      storage = null,
      route = null,
      processing_status = null,
      error_code = null,
      data_source = null,
      is_dncr = null
    } = details[0];

    // Validate the msisdn field (which is mandatory)
    if (!msisdn) {
      return new Response(
        JSON.stringify({
          error: "Missing required field in details: msisdn",
        }),
        { status: 400 }
      );
    }

    // Insert query for the `lookup_data` table
    const query = `INSERT INTO lookup_data (id, msisdn, connectivity_status, mccmnc, mcc, mnc, imsi, msin, msc,
                                           original_network_name, original_country_name, original_country_code,
                                           original_country_prefix, is_ported, ported_network_name, ported_country_name,
                                           ported_country_code, ported_country_prefix, is_roaming, roaming_network_name,
                                           roaming_country_name, roaming_country_code, roaming_country_prefix, cost,
                                           timestamp, storage, route, processing_status, error_code, data_source, is_dncr)
                   VALUES (?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with values
    const [result] = await connection.execute(query, [
      id,                  // id
      msisdn,              // msisdn
      connectivity_status, // connectivity_status
      mccmnc,              // mccmnc
      mcc,                 // mcc
      mnc,                 // mnc
      imsi,                // imsi
      msin,                // msin
      msc,                 // msc
      original_network_name, // original_network_name
      original_country_name, // original_country_name
      original_country_code, // original_country_code
      original_country_prefix, // original_country_prefix
      is_ported,           // is_ported
      ported_network_name, // ported_network_name
      ported_country_name, // ported_country_name
      ported_country_code, // ported_country_code
      ported_country_prefix, // ported_country_prefix
      is_roaming,          // is_roaming
      roaming_network_name, // roaming_network_name
      roaming_country_name, // roaming_country_name
      roaming_country_code, // roaming_country_code
      roaming_country_prefix, // roaming_country_prefix
      cost,                // cost
      timestamp,           // timestamp
      storage,             // storage
      route,               // route
      processing_status,   // processing_status
      error_code,          // error_code
      data_source,         // data_source
      is_dncr              // is_dncr
    ]);

    const response = new Response(
      JSON.stringify({ message: "Record successfully inserted", status: "success" }),
      { status: 201 }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing the request" }),
      { status: 500 }
    );
  }
}