const express = require('express');
const router = express.Router();

const Cart  = require('../controller/cart'); 

router.post('/', Cart.add);

module.exports = router;