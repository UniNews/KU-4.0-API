const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Report = mongoose.model('Report')
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const { validationResult, body } = require('express-validator')
const { MIN_REPORT_LENGTH, MAX_REPORT_LENGTH } = require('./../configs/validationConstants')

router.use(async function (req, res, next) {
    const user = await User.findById(req.payload.id)
    if (!user)
        return res.sendStatus(401)
    req.user = user
    next()
})

router.param('report', async function (req, res, next, id) {
    try {
        const report = await Report.findById(id).populate('author')
        if (!req.user)
            return res.sendStatus(404)
        req.report = report
        return next()
    }
    catch (err) {
        return next(err)
    }
})

router.get('/', async function (req, res, next) {
    try {
        const report = await Report.find()
            .populate('author')
            .sort({ createdAt: 'desc' })
        const reportCount = await Report.count()
        return res.json({
            reports: report.map(function (report) {
                return report.toJSONFor(req.user)
            }),
            reportCount: reportCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.post('/', [
    body('description').isLength({ min: MIN_REPORT_LENGTH, max: MAX_REPORT_LENGTH }).withMessage('description must be between 1 and 1000 chars long.'),
    body('type').isIn(['article', 'comment']).withMessage('type must be article or comment.'),
    body('destinationId').matches(/^[0-9a-fA-F]{24}$/)
], async function (req, res, next) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array().map(error => error) })
        const type = req.body.type
        const description = req.body.description
        const destinationId = req.body.destinationId
        const author = req.user
        let postDestination
        if (type === 'comment')
            postDestination = await Comment.findOne({ _id: destinationId })
        else if (type === 'article')
            postDestination = await Article.findOne({ _id: destinationId })
        if (!postDestination)
            return res.sendStatus(404)
        const report = new Report({
            description,
            type,
            author,
            postDestination,
        })
        const createdResponse = await report.save()
        return res.json(createdResponse.toJSONFor(req.user))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:report', async function (req, res, next) {
    try {
        const report = req.report.toJSONFor(req.user)
        return res.json({
            report
        })
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:report', async function (req, res, next) {
    try {
        if (req.user.role === 'admin') {
            await req.report.remove()
            return res.sendStatus(204)
        }
        else
            return res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router 