const express = require('express')
const app = express()
const newsRouter = require('./routes/news')
const usersRouter = require('./routes/users')
const communitiesRouter = require('./routes/community')
const bodyParser = require('body-parser')
const { SERVER_PORT, ACCESS_TOKEN_SECRET, ID_TOKEN_SECRET } = require('./configs/environments')
const User = require('./models/user')
const News = require('./models/news')
const Community = require('./models/community')
const jwt = require("jsonwebtoken")
const checkToken = require('./middlewares/checkToken')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())

app.get("/profile/me",checkToken , function(req,res) {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
                if (err)
                    throw err
                if (!user)
                    res.status(401).end()
                else {
                    const result = await User.findOne({
                        _id:userId
                    }).populate({
                        path:'following',
                        model: 'User',
                        select:'-password'
                    }).populate({
                        path:'follower',
                        model: 'User',
                        select:'-password'
                    })
                    const communities = await Community.find(
                        {
                            user: 
                            {
                                _id:userId
                            }
                        }
                    ).populate(
                        {
                            path: 'user',
                            model: 'User',
                            select:'-password'
                        }
                    ).populate(
                        {
                            path:'comments',
                            model: 'Comments'
                        }
                    )
                    res.status(200).json({result,communities})
                }
            })
    }catch (err) {
        res.status(500).end()
    }
})

app.get("/profile",checkToken , function(req,res) {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
                if (err)
                    throw err
                if (!user)
                    res.status(401).end()
                else {
                    const result = await User.findOne({
                        _id:userId
                    }).populate({
                        path:'following',
                        model: 'User',
                        select:'-password'
                    }).populate({
                        path:'follower',
                        model: 'User',
                        select:'-password'
                    })
                    const news = await News.find(
                        {
                            user: 
                            {
                                _id:userId
                            }
                        }
                    ).populate(
                        {
                            path: 'user',
                            model: 'User',
                            select:'-password'
                        }
                    ).populate(
                        {
                            path:'comments',
                            model: 'Comments'
                        }
                    )
                    res.status(200).json({result,news})
                }
            })
    }catch (err) {
        res.status(500).end()
    }
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
                    else {
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

app.post("/register", function(req, res) {
    try{
        const data = {
            displayName: req.body.displayName,
            email: req.body.email,
            follower: [],
            following: [],
            loginType: req.body.loginType
        }
        const newUser = new User(
            data
        )
        newUser.save()
        res.status(200).json(newUser)
    }catch (err) {
        res.status(500).end()
    }
})

app.post("/registerByEmail", function(req, res) {
    try{
        const data = {
            username:req.body.username,
            password:req.body.password,
            displayName: req.body.displayName,
            email: req.body.email,
            follower: [],
            following: [],
            loginType: 'email'
        }
        const newUser = new User(
            data
        )
        newUser.save()
        res.status(200).json(newUser)
    }catch (err) {
        res.status(500).end()
    }
})

console.log(SERVER_PORT)
app.use('/news', checkToken, newsRouter)
app.use('/users', checkToken, usersRouter)
app.use('/communities', checkToken, communitiesRouter)
app.listen(SERVER_PORT)