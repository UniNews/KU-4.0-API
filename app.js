const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { SERVER_PORT, MONGODB_URL } = require('./configs/environments')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URL)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

require('./models/Report')
require('./models/Notification')
require('./models/Comment')
require('./models/Article')
require('./models/User')
require('./configs/passport')
app.use(require('./routes'))

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        'error': {
            message: err.message,
        }
    })
})

var server = app.listen(SERVER_PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port)
})