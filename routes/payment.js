const express = require('express');
const router = express.Router();

const Payment  = require('../controller/payment'); 

router.post('/', Payment.confirm);

module.exports = router;