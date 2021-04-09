require('dotenv').config()

module.exports = {
    clients: [
        {
            name: 'KLINK',
            id: process.env.APP_CLIENT_ID,
            clientId: process.env.APP_CLIENT_ID,
            clientSecret: process.env.APP_CLIENT_SECRET,
            grants: ["password", "refresh_token", "client_credentials"],
            accessTokenLifetime: process.env.ACCESS_TOKEN_LIFE_TIME,
            refreshTokenLifetime: process.env.ACCESS_TOKEN_LIFE_TIME,
        }
    ],
};
