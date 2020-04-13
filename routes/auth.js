const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const { body, validationResult } = require('express-validator')

router.post('/signin', [
    body('username').isLength({ min: 5, max: 12 }).withMessage('username must be between 5 and 12 chars long.'),
    body('password').isLength({ min: 5, max: 12 }).withMessage('password must be between 5 and 12 chars long.'),
], function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array().map(error => error.msg) })
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err)
            return next(err)
        if (user) {
            return res.json({
                username: user.username,
                accessToken: user.generateJWT()
            })
        } else {
            return res.status(422).json(info)
        }
    })(req, res, next)
})

router.post('/signin/facebook', function (req, res, next) {
    const access_token = req.body.access_token
    if (!access_token)
        return res.status(422).json({ errors: `access_token can't be blank` })
    passport.authenticate('facebook-token', { session: false }, function (err, user, info) {
        if (err)
            return next(err)
        if (user) {
            return res.json({
                username: user.username,
                accessToken: user.generateJWT()
            })
        } else {
            return res.status(422).json(info)
        }
    })(req, res, next)
})

router.post('/signin/google', function (req, res, next) {
    const access_token = req.body.access_token
    if (!access_token)
        return res.status(422).json({ errors: `access_token can't be blank` })
    passport.authenticate('facebook-token', { session: false }, function (err, user, info) {
        if (err)
            return next(err)
        if (user) {
            return res.json({
                username: user.username,
                accessToken: user.generateJWT()
            })
        } else {
            return res.status(422).json(info)
        }
    })(req, res, next)
})

router.post('/signup', [
    body('username').isLength({ min: 5, max: 12 }).withMessage('username must be between 5 and 12 chars long.'),
    body('password').isLength({ min: 5, max: 12 }).withMessage('password must be between 5 and 12 chars long.'),
    body('displayName').isLength({ min: 3, max: 20 }).withMessage('displayName must be between 3 and 20 chars long.'),
], async function (req, res, next) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array().map(error => error.msg) })
        const username = req.body.username
        const password = req.body.password
        const displayName = req.body.displayName
        const user = new User({
            username: username,
            loginType: 'normal',
            displayName: displayName
        })
        await user.setPassword(password)
        const createdUser = await user.save()
        return res.json({
            username: createdUser.username,
            accessToken: createdUser.generateJWT()
        })
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router 