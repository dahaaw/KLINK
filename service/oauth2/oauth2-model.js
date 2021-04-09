require('dotenv').config();
const sha1 = require('sha1');
const JWT = require("jsonwebtoken");
const oAuth2Config = require("./oauth2-config");
const { UnauthorizedRequestError } = require("oauth2-server");

const runModel = require('../../models');
const db = runModel();

const generateToken = (client, user, type) => {
    let secret;
    const exp = new Date();

    if (type === "accessToken") {
        secret = process.env.AUTH_ACCESS_TOKEN_SECRET;
        exp.setSeconds(exp.getSeconds() + client.accessTokenLifetime);
    } else {
        secret = process.env.AUTH_REFRESH_TOKEN_SECRET;
        exp.setSeconds(exp.getSeconds() + client.refreshTokenLifetime);
    }
    const payload = {
        id: user.id, 
        role: user.role,
        exp: exp.getTime(),
    };

    return JWT.sign(payload, secret);
};

const generateAccessToken = (client, user) => generateToken(client, user, "accessToken");
const generateRefreshToken = (client, user) => generateToken(client, user, "refreshToken");

const getAccessToken = (bearerToken) => {
    return JWT.verify(bearerToken, process.env.AUTH_ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            throw new UnauthorizedRequestError(err);
        }

        return {
            accessTokenExpiresAt: new Date(decoded.exp),
            user: decoded.user,
        };
    });
};

const getRefreshToken = (bearerToken) => {
    return JWT.verify(bearerToken, process.env.AUTH_REFRESH_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            throw new UnauthorizedRequestError(err);
        }

        return {
            refreshTokenExpiresAt: new Date(decoded.exp),
            user: decoded.user,
            client: decoded.client,
        };
    });
};

const getClient = (clientId, clientSecret) =>
    oAuth2Config.clients.find((client) => client.clientId === clientId && client.clientSecret === clientSecret);

const getUserFromClient = (client) =>
    oAuth2Config.clients.find(
        (savedClient) => savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret
    );

const saveToken = (token, client, user) => {
    return { ...token, client: { id: client.clientId }, user: { id: user.id, role: user.role } };
};

const getUser = async (username, pwd) => {
        const password = sha1(pwd);
        const data = await db.user.findOne({ where:{username, password} });
        const ret = {id: data.id, role:data.role};
        return ret;
        
};

const revokeToken = () => true;

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    getAccessToken,
    getRefreshToken,
    getUserFromClient,
    getClient,
    saveToken,
    getUser,
    revokeToken,
};
