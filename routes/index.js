const auth = require('./auth');

const Routes = (app) => {
    app.use('/auth',auth);
}
module.exports = Routes;