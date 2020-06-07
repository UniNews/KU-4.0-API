var jwt = require('express-jwt')
const { ACCESS_TOKEN_SECRET } = require('../configs/environments')

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1]
    return null
}

const auth = {
    required: jwt({
        secret: ACCESS_TOKEN_SECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret: ACCESS_TOKEN_SECRET,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth
