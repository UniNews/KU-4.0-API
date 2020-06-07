const router = require('express').Router()
const auth = require('../middlewares/auth')
const mongoose = require('mongoose')

router.use('/', require('./auth'))
router.use('/profile', auth.required, require('./profile'))
router.use('/notifications', auth.required, require('./notifications'))
router.use('/users', auth.required, require('./users'))
router.use('/articles', auth.required, require('./articles'))
router.use('/reports', auth.required, require('./report'))
router.use('/comments', auth.required, require('./comments'))
router.use('/images', require('./images'))
// router.use('/seeds', require('./seeds'))

router.use(function (err, req, res, next) {
    if (err instanceof mongoose.Error.CastError)
        return res.sendStatus(404)
    return next(err)
})

module.exports = router