const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../configs/environments');

const checkToken = (req, res, next) => {
    try {
        const authorizationHeader = req.get("Authorization")
        const accessToken = authorizationHeader.substr("Bearer ".length)
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, function (error, payload) {
            if (error)
                throw error
            else {
                req.userId = payload.userId
                next()
            }
        })
    } catch (error) {
        res.status(401).end()
    }
};

module.exports = checkToken
