// Convert date to UTC before storing it in MySQL
function convertToUTC(dateString) {
    const date = new Date(dateString);
    // Set the time to midnight UTC (00:00:00)
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format (UTC)
}

module.exports = convertToUTC;