import mysql from "mysql2/promise";

const AuthToken = '5255sjskks-3636shj-373jsjslsl-2535';

// Database configurations
const dbConfig = {
  host: "mysql-service-main",
  user: "lookup_user",
  password: "lookup_password",
  database: "lookup_main",
};

// Handler for the GET request
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const ipadd = searchParams.get("ip");
  const token = searchParams.get("authToken");

  // Validate token
  if (AuthToken !== token) {
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 401 });
  }

  // Validate query parameters
  if (!action || !ipadd) {
    return new Response(
      JSON.stringify({ error: "Missing required query parameters: action and ip" }),
      { status: 400 }
    );
  }

  // Determine block status based on action
  const isBlocked = action === "block" ? 1 : 0;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT is_blocked FROM ip_tbl WHERE ip_addpress = ? AND is_blocked = ?",
      [ipadd, isBlocked]
    );

    if (rows.length > 0) {
      return new Response(
        JSON.stringify({
          message: `IP ${ipadd} is already ${isBlocked ? "blocked" : "allowed"}.`
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

    const [result] = await connection.execute(query, [ipadd, isBlocked, isBlocked]);

    await connection.end();

    return new Response(
      JSON.stringify({
        message: `IP ${ipadd} has been ${action === "block" ? "blocked" : "allowed"} successfully.`,
        affectedRows: result.affectedRows,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      { status: 500 }
    );
  }
}
