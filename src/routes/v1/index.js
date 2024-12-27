const express = require('express');
const restRoute = require('./restaurant-routes');
const router = express.Router();

// Mount restaurant routes under `/res`
router.use('/res', restRoute);

module.exports = router;