const express = require('express');
const restRoute = require('./restaurant-routes');
const pocRoute = require('./pocs-routes');
const router = express.Router();

// Mount restaurant routes under `/res`
router.use('/res', restRoute);
router.use('/pocs',pocRoute);

module.exports = router;