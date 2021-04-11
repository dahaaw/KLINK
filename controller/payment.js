const runModel = require('../models');
const {
    payment, 
    transaction 
} = runModel();

exports.confirm = async (req, res) => {
    const {idTransaction, amount} = req.body;
    const transactionData = await transaction.findOne({
        where: {
            id: idTransaction,
            total: amount
        }
    })

    if(!transactionData){
        res.status(400).json({
            success: false,
            message: 'no transaction found'
        })
        return;
    }

    const result = await payment.create(req.body);
    await transaction.update(
        {paid:true},
        {where: {
            id: idTransaction
        }}
    )

    res.json({
        success: true,
        data: result
    })
}