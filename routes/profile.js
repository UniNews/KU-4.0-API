const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        return res.json(user)
    }
    catch (err) {
        return next(err)
    }
})

router.get('/followings', async function (req, res) {
    try {
        const user = await User.findById(req.payload.id, { followings: 1 }).populate('followings')
        if (!user)
            return res.sendStatus(401)
        res.status(200).json(user)
    } catch (err) {
        return next(err)
    }
})

router.get('/followers', async function (req, res) {
    try {
        const user = await User.findById(req.payload.id, { followers: 1 }).populate('followers')
        if (!user)
            return res.sendStatus(401)
        res.status(200).json(user)
    } catch (err) {
        return next(err)
    }
})

router.put('/', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        // only update fields that were actually passed
        const displayName = req.body.displayName
        const avatarURL = req.body.avatarURL
        const bio = req.body.bio
        if (typeof displayName !== 'undefined')
            user.username = displayName
        if (typeof avatarURL !== 'undefined')
            user.email = avatarURL
        if (typeof bio !== 'undefined')
            user.bio = bio
        // if the role is store or admin, update additional fields...
        if (user.role != 'user') {
            const email = req.body.email
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const mobilePhone = req.body.mobilePhone
            const tags = req.body.tags
            const contacts = req.body.contacts
            if (typeof email !== 'undefined')
                user.email = email
            if (typeof firstName !== 'undefined')
                user.firstName = firstName
            if (typeof lastName !== 'undefined')
                user.lastName = lastName
            if (typeof mobilePhone !== 'undefined')
                user.mobilePhone = mobilePhone
            if (typeof tags !== 'undefined')
                user.tags = tags
            if (typeof contacts !== 'undefined')
                user.contacts = contacts
        }
        await user.save()
        return res.json(user)
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router 