function convertToUTC2(dateString) {
    const localDate = new Date(dateString);
    
    // Get the local timezone offset in minutes (negative for UTC ahead, positive for UTC behind)
    const offset = localDate.getTimezoneOffset(); // Offset in minutes
    
    // Create a new date object for UTC by subtracting the offset
    localDate.setMinutes(localDate.getMinutes() - offset);
    
    // Return the UTC date in ISO format
    return localDate.toISOString(); // e.g., "2024-12-31T18:30:00.000Z"
}

module.exports = convertToUTC2;
