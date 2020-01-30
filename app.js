const express = require('express')
const app = express()
const newsRouter = require('./routes/news')
const usersRouter = require('./routes/users')
const bodyParser = require('body-parser')
const { SERVER_PORT, ACCESS_TOKEN_SECRET, ID_TOKEN_SECRET } = require('./configs/environments')
const User = require('./models/user')
const jwt = require("jsonwebtoken")
const checkToken = require('./middlewares/checkToken')

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
    if (req.header("Access-Control-Request-Headers"))
        res.setHeader("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"))
    res.setHeader("Access-Control-Expose-Headers", "Location")
    next()
})

app.post("/token", function (req, res) {
    const grant_type = req.body.grant_type
    const username = req.body.username
    const password = req.body.password
    if (!grant_type || !username || !password) {
        res.status(400).json({ error: "invalid_request" })
        return
    }
    if (grant_type != "password") {
        res.status(400).json({ error: "unsupported_grant_type" })
        return
    }
    try {
        User.findOne({ username }, function (err, user) {
            if (err)
                throw err
            if (!user)
                res.status(400).json({ error: "invalid_client" })
            else
                user.comparePassword(password, function (err, isMatch) {
                    if (err)
                        throw err
                    if (isMatch) {
                        const accessToken = jwt.sign({
                            userId: user._id
                        }, ACCESS_TOKEN_SECRET)
                        const idToken = jwt.sign({
                            sub: user._id,
                            name: user.username,
                            preferred_username: user.displayName
                        }, ID_TOKEN_SECRET)
                        res.status(200).json({
                            token_type: "Bearer",
                            access_token: accessToken,
                            id_token: idToken
                        })
                    }
                    else
                        res.status(400).json({ error: "invalid_client" })
                })
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

app.post("/admin-token", function (req, res) {
    const grant_type = req.body.grant_type
    const username = req.body.username
    const password = req.body.password
    if (!grant_type || !username || !password) {
        res.status(400).json({ error: "invalid_request" })
        return
    }
    if (grant_type != "password") {
        res.status(400).json({ error: "unsupported_grant_type" })
        return
    }
    try {
        User.findOne({ username }, function (err, user) {
            if (err)
                throw err
            if (!user || !user.accessType)
                res.status(400).json({ error: "invalid_client" })
            else
                user.comparePassword(password, function (err, isMatch) {
                    if (err)
                        throw err
                    if (isMatch) {
                        const accessToken = jwt.sign({
                            userId: user._id
                        }, ACCESS_TOKEN_SECRET)
                        const idToken = jwt.sign({
                            sub: user._id,
                            name: user.username,
                            preferred_username: user.displayName
                        }, ID_TOKEN_SECRET)
                        res.status(200).json({
                            token_type: "Bearer",
                            access_token: accessToken,
                            id_token: idToken
                        })
                    }
                    else{
                        console.log('paul')
                        res.status(400).json({ error: "invalid_client" })
                    }
                })
        })
    }
    catch (err) {
        res.status(500).end()
    }
})
console.log(SERVER_PORT)
app.use('/news',checkToken ,newsRouter)
app.use('/users',checkToken,usersRouter)
app.listen(SERVER_PORT)