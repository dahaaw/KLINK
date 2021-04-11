const client = require('redis').createClient();
const runModel = require('../models');
const { 
    product,
    transaction,
    transaction_detail
 } = runModel();

exports.create = async (req, res) => {
    const detail = []; 
    client.get(res.locals.user.id, async (err, data) => {
        const myCart = JSON.parse(data);
        if(!myCart){
            res.status(400).json({
                success:false,
                message: 'no data in cart'
            })
            return;
        }

        let total = 0;
        const det = myCart.map( async (v) => {
            const prdct = await product.findByPk(v.idProduct);
            v.name = prdct.name;
            v.desc = prdct.desc;
            v.price = prdct.price;
            v.subtotal = parseInt(prdct.price) * parseInt(v.qty);
            total += v.subtotal;
            detail.push(v);
        })
        await Promise.all(det);
        
        // const total = detail.reduce((sum, {subtotal}) => sum + subtotal,0);
        const newTransaction = await transaction.create({
            idUser: res.locals.user.id,
            total
        });
        const result = JSON.parse(JSON.stringify(newTransaction));

        detail.map((v,i) => {
            detail[i].idTransaction = newTransaction.id;
        });

        const detailTransaction = await transaction_detail.bulkCreate(detail);

        result.detailTransaction = detailTransaction;

        client.del(res.locals.user.id);
        res.json({
            data : result
        });
    });
}