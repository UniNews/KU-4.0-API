const express = require('express')
const router = express.Router()
const seeds = require('../seeds/')

router.get('/', async function (req, res, next) {
    try {
        await seeds()
        return res.sendStatus(200)
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router