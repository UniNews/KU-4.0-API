const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { body, validationResult } = require('express-validator')
const { MAX_BIO, MAX_DISPLAYNAME_LENGTH, MIN_DISPLAYNAME_LENGTH } = require('./../configs/validationConstants')

router.use(async function (req, res, next) {
    const user = await User.findById(req.payload.id)
    if (!user)
        return res.sendStatus(401)
    req.user = user
    next()
})

router.get('/', async function (req, res, next) {
    try {
        return res.json(req.user)
    }
    catch (err) {
        return next(err)
    }
})

// router.get('/articles', async function (req, res, next) {
//     try {
//         const user = await req.user.populate({
//             path: 'articles',
//             populate: {
//                 path: 'author'
//             }
//         }).execPopulate()
//         res.status(200).json(user.articles.map(function (article) {
//             return article.toJSONFor(req.user)
//         }))
//     } catch (err) {
//         return next(err)
//     }
// })

// router.get('/followings', async function (req, res) {
//     try {
//         res.status(200).json(req.user.followings)
//     } catch (err) {
//         return next(err)
//     }
// })

// router.get('/followers', async function (req, res) {
//     try {
//         res.status(200).json(req.user.followers)
//     } catch (err) {
//         return next(err)
//     }
// })

router.put('/',
    [
        body('displayName').optional().isLength({ min: MIN_DISPLAYNAME_LENGTH, max: MAX_DISPLAYNAME_LENGTH }).withMessage('displayName must be between 3 and 20 chars long.'),
        body('avatarURL').optional().isURL().withMessage('avatarURL must be an URL.'),
        body('bio').optional().isLength({ max: MAX_BIO }),
        body('email').optional().isEmail().withMessage('invalid email.'),
        body('firstName').optional(),
        body('lastName').optional(),
        body('mobilePhone').optional().isNumeric().withMessage('mobilePhone must be number only.'),
        body('tags').optional().isArray().withMessage('tags must be an array.'),
        body('contacts').optional(),
    ],
    async function (req, res, next) {
        try {
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
        catch (err) {
            return next(err)
        }
    })

module.exports = router 