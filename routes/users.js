const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { userFilter } = require('../middlewares/filter')
const { body, validationResult } = require('express-validator')
const Article = mongoose.model('Article')
const { MAX_DISPLAYNAME_LENGTH, MIN_DISPLAYNAME_LENGTH } = require('./../configs/validationConstants')

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

router.get('/', userFilter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        const users = await User.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
        const usersCount = await User.count(query)
        return res.json({
            users: users.map(function (user) {
                return user.toJSONFor(myUser)
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

router.get('/:user/articles', userFilter, async function (req, res, next) {
    try {
        const limit = req.limit
        const offset = req.offset
        const articles = await Article.find({ author: req.user._id })
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count({ author: req.user._id })
        res.status(200).json(
            {
                articles: articles.map(function (article) {
                    return article.toJSONFor(req.user)
                }),
                articlesCount
            }
        )
    } catch (err) {
        return next(err)
    }
})

router.get('/:user/followings', userFilter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const limit = Number(req.limit)
        const offset = Number(req.offset)
        const followingsCount = req.user.followings.length
        const user = await req.user.populate({
            path: 'followings',
            options: {
                limit: limit,
                skip: offset
            }
        }).execPopulate()
        res.status(200).json({
            followings: user.followings.map(function (followings) {
                return followings.toJSONFor(myUser)
            }),
            followingsCount
        })
    } catch (err) {
        return next(err)
    }
})

router.get('/:user/followers', userFilter, async function (req, res, next) {
    try {
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        const limit = Number(req.limit)
        const offset = Number(req.offset)
        const followersCount = req.user.followers.length
        const user = await req.user.populate({
            path: 'followers',
            options: {
                limit: limit,
                skip: offset
            }
        }).execPopulate()
        res.status(200).json({
            followers: user.followers.map(function (followers) {
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

/* for admin only */
router.post('/:user/ban', async function (req, res, next) {
    try {
        const targetUser = req.user
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        if (myUser.role === 'admin') {
            targetUser.active = false
            await targetUser.save()
            return res.sendStatus(204)
        }
        else
            return res.sendStatus(403)
    }
    catch (err) {
        return next(err)
    }
})

router.delete('/:user/ban', async function (req, res, next) {
    try {
        const targetUser = req.user
        const myUser = await User.findById(req.payload.id)
        if (!myUser)
            return res.sendStatus(401)
        if (myUser.role === 'admin') {
            targetUser.active = true
            await targetUser.save()
            return res.sendStatus(204)
        }
        else
            return res.sendStatus(403)
    }
    catch (err) {
        return next(err)
    }
})


router.put('/:user',
    [
        body('displayName').optional().isLength({ min: MIN_DISPLAYNAME_LENGTH, max: MAX_DISPLAYNAME_LENGTH }).withMessage('displayName must be between 3 and 20 chars long.'),
        body('avatarURL').optional().isURL().withMessage('avatarURL must be an URL.'),
        body('bio').optional(),
        body('email').optional().isEmail().withMessage('invalid email.'),
        body('firstName').optional(),
        body('lastName').optional(),
        body('mobilePhone').optional().isNumeric().withMessage('mobilePhone must be number only.'),
        body('tags').optional().isArray().withMessage('tags must be an array.'),
        body('contacts').optional(),
    ],
    async function (req, res, next) {
        try {
            const myUser = await User.findById(req.payload.id)
            if (!myUser)
                return res.sendStatus(401)
            if (myUser.role === 'admin') {
                const errors = validationResult(req)
                if (!errors.isEmpty())
                    return res.status(422).json({ errors: errors.array().map(error => error) })
                const user = req.user
                // only update fields that were actually passed
                const displayName = req.body.displayName
                const avatarURL = req.body.avatarURL
                const bio = req.body.bio
                if (typeof displayName !== 'undefined') // in case of empty strings
                    user.displayName = displayName
                if (typeof avatarURL !== 'undefined')
                    user.avatarURL = avatarURL
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
            else
                return res.sendStatus(403)
        }
        catch (err) {
            return next(err)
        }
    })

module.exports = router 