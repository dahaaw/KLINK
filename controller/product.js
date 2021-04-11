const runModel = require('../models');
const { product } = runModel();

exports.create = (req, res) => {
    product
    .create(req.body)
    .then((data) =>{
        res.json({
            success: true,
            data
        })
    })
    .catch((err) => {
        res.json({
            success: false,
            message: err
        })
    })
}