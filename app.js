const express = require('express')
const app = express()
const newsRouter = require('./routes/news')
const usersRouter = require('./routes/users')
const communitiesRouter = require('./routes/community')
const UploadRouter = require('./routes/uploads')
const bodyParser = require('body-parser')
const { SERVER_PORT, ACCESS_TOKEN_SECRET, ID_TOKEN_SECRET } = require('./configs/environments')
const User = require('./models/user')
const News = require('./models/news')
const Community = require('./models/community')
const jwt = require("jsonwebtoken")
const checkToken = require('./middlewares/checkToken')
const cors = require('cors')

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
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
    const email = req.body.email
    const password = req.body.password
    if (!grant_type || !email || !password) {
        res.status(400).json({ error: "invalid_request" })
        return
    }
    if (grant_type != "password") {
        res.status(400).json({ error: "unsupported_grant_type" })
        return
    }
    try {
        User.findOne({ email }, function (err, user) {
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
                            name: user.email,
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
    const email = req.body.email
    const password = req.body.password
    if (!grant_type || !email || !password) {
        res.status(400).json({ error: "invalid_request" })
        return
    }
    if (grant_type != "password") {
        res.status(400).json({ error: "unsupported_grant_type" })
        return
    }
    try {
        User.findOne({ email }, function (err, user) {
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
                            name: user.email,
                            preferred_username: user.displayName
                        }, ID_TOKEN_SECRET)
                        res.status(200).json({
                            token_type: "Bearer",
                            access_token: accessToken,
                            id_token: idToken
                        })
                    }
                    else {
                        res.status(400).json({ error: "invalid_client" })
                    }
                })
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

app.post("/register", async(req, res)=> {
    try{
        const validUser = await User.findOne({
            collectedId: req.body.collectedId
        })
        if(!validUser) {
            const data = {
                displayName: req.body.displayName,
                follower: [],
                following: [],
                loginType: req.body.loginType,
                collectedId: req.body.collectedId
            }
            const newUser = new User(
                data
            )
            newUser.save()
            const accessToken = jwt.sign({
                userId: newUser._id
            }, ACCESS_TOKEN_SECRET)
            res.status(200).json({
                token_type: "Bearer",
                access_token: accessToken
            })
        } else {
            if( validUser.loginType === "gmail" || validUser.loginType === "facebook" ){
                const accessToken = jwt.sign({
                    userId: validUser._id
                }, ACCESS_TOKEN_SECRET)
                res.status(200).json({
                    token_type: "Bearer",
                    access_token: accessToken
                })
            }else {
                res.status(204).json({message: 'not match type'})
            }
        }
    }catch (err) {
        res.status(500).end()
    }
})

app.post("/registerByEmail", async(req, res)=> {
    try{
        const validUserEmail = await User.findOne({
            email: req.body.email
        })
        if(!validUserEmail) {
            const data = {
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
            const accessToken = jwt.sign({
                userId: newUser._id
            }, ACCESS_TOKEN_SECRET)
            res.status(200).json({
                token_type: "Bearer",
                access_token: accessToken
            })
        }else {
            res.status(204).json({message: 'duplicate'})
        }
    }catch (err) {
        res.status(500).end()
    }
})

console.log(SERVER_PORT)
app.use('/news', checkToken, newsRouter)
app.use('/users', checkToken, usersRouter)
app.use('/communities', checkToken, communitiesRouter)
app.use('/uploads',checkToken,UploadRouter)
app.listen(SERVER_PORT)