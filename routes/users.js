const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const filter = require('../middlewares/filter')
const { check, validationResult } = require('express-validator')

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
        check('displayName').optional().isLength({ min: 3, max: 20 }).withMessage('displayName must be between 3 and 20 chars long.'),
        check('avatarURL').optional().isURL().withMessage('avatarURL must be an URL.'),
        check('bio').optional(),
        check('email').optional().isEmail().withMessage('invalid email.'),
        check('firstName').optional(),
        check('lastName').optional(),
        check('mobilePhone').optional().isNumeric().withMessage('mobilePhone must be number only.'),
        check('tags').optional().isArray().withMessage('tags must be an array.'),
        check('contacts').optional(),
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
                user.displayName = displayName || user.displayName
                user.avatarURL = avatarURL || user.avatarURL
                user.bio = bio || user.bio
                // if the role is store or admin, update additional fields...
                if (user.role != 'user') {
                    const email = req.body.email
                    const firstName = req.body.firstName
                    const lastName = req.body.lastName
                    const mobilePhone = req.body.mobilePhone
                    const tags = req.body.tags
                    const contacts = req.body.contacts
                    user.email = email || user.email
                    user.firstName = firstName || user.firstName
                    user.lastName = lastName || user.lastName
                    user.mobilePhone = mobilePhone || user.mobilePhone
                    user.tags = tags || user.tags
                    user.contacts = contacts || user.contacts
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