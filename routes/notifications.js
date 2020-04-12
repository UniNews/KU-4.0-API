const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Notification = mongoose.model('Notification')
const { check, validationResult } = require('express-validator')
const { newsFilter } = require('../middlewares/filter')

// preload notification objects on routes with ':notification'
router.param('notification', async function (req, res, next, id) {
    try {
        const notification = await Notification.findById(id)
        if (!notification)
            return res.sendStatus(404)
        req.notification = notification
        return next()
    }
    catch (err) {
        return next(err)
    }
})

router.post('/token', check('token').not().isEmpty().withMessage('token is required.'), async function (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array().map(error => error.msg) })
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        user.tokenNotification = req.body.token
        await user.save()
        return res.sendStatus(204)
    } catch (err) {
        return next(err)
    }
})

router.get('/', newsFilter, async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        const limit = req.limit
        const offset = req.offset
        const notifications = await Notification.find({ receivers: { '$in': [user._id] } })
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('sender')
        const notificationsCount = await Notification.count({ receivers: { '$in': [user._id] } })
        res.status(200).json({
            notifications: notifications.map(function (notification) {
                return notification.toJSONFor(user)
            }),
            notificationsCount
        })
    } catch (err) {
        return next(err)
    }
})

router.post('/:notification/view', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        const notification = req.notification
        if (user.notifications.indexOf(notification._id) > -1) {
            notification.reads.push(user._id)
            await notification.save()
            res.sendStatus(204)
        }
        else
            res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router