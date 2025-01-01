const cron = require('node-cron');
const {processFollowUpCalls}=require('./follow_up_calls_task');
const account_performance=require('./accounts_performance_task');

cron.schedule('* * * * * *', () => {
    console.log('Running follow-up calls task...');
    processFollowUpCalls();
  });

  // Cron job to run on the 1st day of every month at midnight (00:00)
cron.schedule('0 0 1 * *', async () => {
   console.log('Cron job running on the 1st day of the month...');
   account_performance();
});