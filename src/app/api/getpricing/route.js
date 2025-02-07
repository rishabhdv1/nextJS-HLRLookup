
export function GET(request) {
    const res = [
        { lowerBound: "1", upperBound: "1,000,000", hlrLookup: "0.010 EUR", dncrLookup: "0.0050 EUR" },
        { lowerBound: "1,000,001", upperBound: "2,500,000", hlrLookup: "0.009 EUR", dncrLookup: "0.0045 EUR" },
        { lowerBound: "2,500,001", upperBound: "5,000,000", hlrLookup: "0.008 EUR", dncrLookup: "0.0040 EUR" },
        { lowerBound: "5,000,001", upperBound: "7,500,000", hlrLookup: "0.007 EUR", dncrLookup: "0.0035 EUR" },
        { lowerBound: "7,500,001", upperBound: "10,000,000", hlrLookup: "0.006 EUR", dncrLookup: "0.0030 EUR" },
        { lowerBound: "10,000,001", upperBound: "or more", hlrLookup: "0.005 EUR", dncrLookup: "0.0025 EUR" },
    ];
    return Response.json({ res }, {
        status: 200,  // Use 201 (Created) or another valid status
        headers: { "Content-Type": "application/json" },
    });
}