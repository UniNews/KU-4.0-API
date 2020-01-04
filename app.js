require('dotenv').config();

const express = require('express')
const app = express()
const newsRouter = require('./routes/news')

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
    if (req.header("Access-Control-Request-Headers"))
        res.setHeader("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"))
    res.setHeader("Access-Control-Expose-Headers", "Location")
    next()
})

app.use('/news', newsRouter)
app.listen(process.env.PORT || 3000)