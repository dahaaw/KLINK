const initModels = require('./init-models');
var dbConnect = require('./../config/dbConnect');
const sequelize = dbConnect();
sequelize.sync().catch((err) => console.log(err));

const runModel = () => {
    return initModels(sequelize);
}

module.exports = runModel;