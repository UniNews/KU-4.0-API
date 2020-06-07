const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    MONGODB_URL: process.env.MONGODB_URL || 'localhost:7000',
    SERVER_PORT: process.env.PORT || 3000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ID_TOKEN_SECRET: process.env.ID_TOKEN_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}