require('dotenv').config();

const dbConnect = () => {
    try {
        const Sequelize = require("sequelize")
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            operatorAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        return sequelize;
    } catch (err) {
        console.log(err)
    }
}
module.exports = dbConnect;