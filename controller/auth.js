const sha1 = require('sha1');
const runModel = require('../models');
const { user } = runModel();

exports.Register = (req, res) => {
    req.body.password = sha1(req.body.password);
    user
    .create(req.body)
    .then((data)=>{
        res
        .status(200)
        .json({
            success: true,
            data
        })
    })
    .catch((err)=>{
        res
        .status(500)
        .json({
            success: false,
            message: err
        })
    })
}

exports.login = (req, res) => {
    
}