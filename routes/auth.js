const express = require('express');
const router = express.Router();

const User  = require('../controller/auth'); 
const {obtainToken} = require('../service/oauth2/oauth2-adapter');

router.post('/register', User.Register);
router.post('/login', obtainToken);

module.exports = router;