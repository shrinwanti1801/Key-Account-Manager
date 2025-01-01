const express = require('express');
const restRoute = require('./restaurant-routes');
const pocRoute = require('./pocs-routes');
const ordRoute = require('./orders-routes');
const interRoute=require('./interactions-routes');
const followUpCallsRoute=require('./Follow_up_calls-routes');
const accountPerformanceRoute=require('./account_performance-routes');
const authRoute=require('./auth-routes');
const router = express.Router();

router.use('/res', restRoute);
router.use('/pocs',pocRoute);
router.use('/orders',ordRoute);
router.use('/interactions',interRoute);
router.use('/followupcalls',followUpCallsRoute);
router.use('/accountperformance',accountPerformanceRoute);
router.use('/auth',authRoute);

module.exports = router;