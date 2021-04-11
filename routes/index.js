const auth = require('./auth');
const cart = require('./cart');
const product = require('./product');
const payment = require('./payment');
const transaction = require('./transaction');

const {authenticate} = require('../service/oauth2/oauth2-adapter');

const Routes = (app) => {
    app.use('/auth',auth);
    app.use('/cart',authenticate, cart);
    app.use('/product', authenticate, product);
    app.use('/transaction', authenticate, transaction);
    app.use('/payment', authenticate, payment);
}
module.exports = Routes;