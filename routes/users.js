const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

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

router.get('/:user', async function (req, res, next) {
    try {
        return res.json(req.user)
    }
    catch (err) {
        return next(err)
    }
})

router.get('/:user/followings', async function (req, res, next) {
    try {
        const user = await req.user.populate('followings').execPopulate()
        res.status(200).json(user.followings)
    } catch (err) {
        return next(err)
    }
})

router.get('/:user/followers', async function (req, res, next) {
    try {
        const user = await req.user.populate('followers').execPopulate()
        res.status(200).json(user.followers)
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