import mysql from "mysql2/promise";

const dbConfigMain = {
    host: "mysql-service-main",
    user: "lookup_user",
    password: "lookup_password",
    database: "lookup_main",
};

export async function GET(request) {
    const connectionFirst = await mysql.createConnection(dbConfigMain);
    const [rows] = await connectionFirst.execute("SELECT * FROM lookup_pricing");

    await connectionFirst.end(); // Close the connection after fetching data

    if (rows.length === 0) {
        return new Response(
            JSON.stringify({
                message: `Plz register and buy HLR/DNCR product. Only 1 lookup query is available for free for this IP ${ipadd}. Thus, it has been blocked.`,
            }),
            { status: 200 }
        );
    }

    // Format the database response to match the expected output
    const res = rows.map(row => ({
        lowerBound: row.lower_bound.toString(),
        upperBound: row.upper_bound.toString(),
        hlrLookup: `${parseFloat(row.per_hlrlookup_charge).toFixed(3)} ${row.per_hrllookup_currency.toUpperCase()}`,
        dncrLookup: `${parseFloat(row.per_dncrlookup_charge).toFixed(4)} ${row.per_dncrlookup_currency.toUpperCase()}`
    }));

    return new Response(
        JSON.stringify({ res }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}