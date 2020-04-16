const mongoose = require('mongoose')
const router = require('express').Router()
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

router.use(async function (req, res, next) {
    const user = await User.findById(req.payload.id)
    if (!user)
        return res.sendStatus(401)
    req.user = user
    next()
})

// preload comment objects on routes with ':comment'
router.param('comment', async function (req, res, next, id) {
    try {
        const comment = await Comment.findById(id).sort({ createdAt: 'desc' })
        if (!comment)
            return res.sendStatus(404)
        req.comment = comment
        return next()
    }
    catch (err) {
        return next(err)
    }
})

router.get('/:comment', async function (req, res, next) {
    try {
        const comment = await req.comment.populate([{
            path: 'author',
        },
        {
            path: 'article',
            populate: {
                path: 'author'
            }
        }]).execPopulate()
        return res.json(comment.toJSONFor(req.user))
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:comment', async function (req, res, next) {
    try {
        if (req.user.role === 'admin' || req.comment.author._id.toString() === req.payload.id.toString()) {
            await req.comment.remove()
            res.sendStatus(204)
        } else
            res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

router.post('/:comment/like', async function (req, res, next) {
    try {
        const comment = req.comment
        if (comment.likes.indexOf(req.user._id) === -1) {
            comment.likes.push(req.user)
            await comment.save()
        }
        return res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:comment/like', async function (req, res, next) {
    try {
        const comment = req.comment
        if (comment.likes.indexOf(req.user._id) > -1) {
            comment.likes.remove(req.user)
            await comment.save()
        }
        return res.sendStatus(204)

    }
    catch (err) {
        next(err)
    }
})

module.exports = router 
