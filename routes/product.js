const express = require('express');
const router = express.Router();

const Product  = require('../controller/product'); 

router.post('/', Product.create);

module.exports = router;