
const moment = require('moment');
const {db} = require('../config/server-config'); // Assuming db is configured elsewhere in your project

// Function to get today's follow-up calls and update them based on frequency
async function processFollowUpCalls() {
    const today = new Date(); // Current date in local timezone
    const todayFormatted = today.toISOString().split('T')[0]; // Extract only the date part (YYYY-MM-DD)
    const todayUTC = moment(todayFormatted).utc().format('YYYY-MM-DD'); // Convert to UTC and format it as YYYY-MM-DD (only year, month, and day)

    try {
        // 1. Get today's pending follow-up calls
        const [rows] = await db.query(
            `SELECT id, call_frequency, scheduled_date, status 
             FROM follow_up_calls
             WHERE scheduled_date = ? AND status = 'Pending'`, [todayFormatted]  // Use formatted date for comparison
        );

        if (rows.length === 0) {
            console.log('No follow-up calls scheduled for today.');
            return;
        }

        console.log('Fetched follow-up calls for today:', rows);

        // 2. Process each call based on its frequency
        for (const row of rows) {
            let nextScheduledDate;

            if (row.status === 'Pending') {
                // Initialize with the current date
                nextScheduledDate = new Date(); // Get today's date (current date)

                // Update based on frequency
                switch (row.call_frequency) {
                    case 'Daily':
                        nextScheduledDate.setDate(nextScheduledDate.getDate() + 1); // Add 1 day for daily
                        break;
                    case 'Weekly':
                        nextScheduledDate.setDate(nextScheduledDate.getDate() + 7); // Add 7 days for weekly
                        break;
                    case 'Monthly':
                        nextScheduledDate.setMonth(nextScheduledDate.getMonth() + 1); // Add 1 month for monthly
                        break;
                    default:
                        // If no frequency, keep the same date
                        break;
                }

                // Format nextScheduledDate to YYYY-MM-DD format (ignoring time part)
                const formattedDate = nextScheduledDate.toISOString().split('T')[0];

                console.log("Updated next scheduled date ->", formattedDate);

                // Update the follow-up call with the new scheduled date
                // If nextScheduledDate is different, update the database
                if (row.scheduled_date !== formattedDate) {
                    const result = await db.query(
                        `UPDATE follow_up_calls 
                        SET scheduled_date = ?, status = 'Pending' 
                        WHERE id = ?`, 
                        [formattedDate, row.id]
                    );
                    console.log('Update result:', result);
                } else {
                    console.log('No update required, dates are the same.');
                }
            }
        }
        console.log('Follow-up calls processed successfully!');
    } catch (error) {
        console.error('Error processing follow-up calls:', error);
    }
}

// Export function
module.exports = {
    processFollowUpCalls
}
