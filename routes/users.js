const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const filter = require('../middlewares/filter')

// preload user objects on routes with ':id'
router.param('user', async function (req, res, next, id) {
    try {
        const user = await User.findById(id)
        if (!user)
            return res.sendStatus(404)
        req.user = user
        return next()
    }
    catch (err) {
        return next(err)
    }
})

router.get('/', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        const limit = req.limit
        const offset = req.offset
        const users = await User.find()
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
        const usersCount = await User.count()
        return res.json({
            users: users.map(function (user) {
                return user.toJSONFor(user)
            }),
            usersCount: usersCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/:user', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        return res.json(req.user.toJSONFor(user))
    }
    catch (err) {
        return next(err)
    }
})

router.get('/:user/articles', filter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const limit = req.limit
        const offset = req.offset
        const user = await req.user.populate({
            path: 'articles',
            populate: {
                path: 'author'
            }
        }).execPopulate()
        const articles = user.articles.slice(Number(offset)).slice(0, Number(limit))
        const articlesCount = user.articles.length
        res.status(200).json(
            {
                articles: articles.map(function (article) {
                    return article.toJSONFor(myUser)
                }),
                articlesCount
            }
        )
    } catch (err) {
        return next(err)
    }
})

router.get('/:user/followings', filter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const limit = req.limit
        const offset = req.offset
        const user = await req.user.populate('followings').execPopulate()
        const followings = user.followings.slice(Number(offset)).slice(0, Number(limit))
        const followingsCount = user.followings.length
        res.status(200).json({
            followings: followings.map(function (followings) {
                return followings.toJSONFor(myUser)
            }),
            followingsCount
        })
    } catch (err) {
        return next(err)
    }
})

router.get('/:user/followers', filter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const limit = req.limit
        const offset = req.offset
        const user = await req.user.populate('followers').execPopulate()
        const followers = user.followers.slice(Number(offset)).slice(0, Number(limit))
        const followersCount = user.followers.length
        res.status(200).json({
            followers: followers.map(function (followers) {
                return followers.toJSONFor(myUser)
            }),
            followersCount
        })
    } catch (err) {
        return next(err)
    }
})

router.post('/:user/follow', async function (req, res, next) {
    try {
        const targetUser = req.user
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        await myUser.follow(targetUser)
        return res.sendStatus(204)
    }
    catch (err) {
        return next(err)
    }
})

router.delete('/:user/follow', async function (req, res, next) {
    try {
        const targetUser = req.user
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        await myUser.unfollow(targetUser)
        return res.sendStatus(204)
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router 