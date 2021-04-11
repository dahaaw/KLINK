const express = require('express');
const router = express.Router();

const Transaction  = require('../controller/transaction'); 

router.post('/', Transaction.create);

module.exports = router;