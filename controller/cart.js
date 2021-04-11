const client = require('redis').createClient();

client.on("error", function(error) {
    console.error(error);
});

exports.add = (req, res) => {
    const idUser = res.locals.user.id;
    // client.del(idUser);
    client.get(idUser, (err,data) => {
        const myCart = data ? JSON.parse(data) : [];
        const existIndex = myCart.findIndex( ({idProduct}) => idProduct === req.body.idProduct);
        if(existIndex !== -1){
            const newQty = myCart[existIndex].qty + req.body.qty; 
            myCart[existIndex].qty = newQty;
        }else{
            myCart.push(req.body);
        }
        client.set(idUser,JSON.stringify(myCart));
        res.json({myCart});
    });   
}