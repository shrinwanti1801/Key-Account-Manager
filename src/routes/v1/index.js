const express = require('express');
const restRoute = require('./restaurant-routes');
const pocRoute = require('./pocs-routes');
const ordRoute = require('./orders-routes');
const router = express.Router();

// Mount restaurant routes under `/res`
router.use('/res', restRoute);
router.use('/pocs',pocRoute);
router.use('/orders',ordRoute);


module.exports = router;