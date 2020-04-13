const mongoose = require('mongoose');
const User = mongoose.model('User')

// embed limit, offset or tag query parameter into req to filter results
const newsFilter = async function (req, res, next) {
    req.limit = req.query.limit || 20
    req.offset = req.query.offset || 0
    const query = {}
    if (req.query.tag)
        query.tags = { '$in': [req.query.tag] }
    if (req.query.author) {
        const author = await User.findOne({ displayName: req.query.author })
        query.author = author ? author._id : null
    }
    if (req.query.description)
        query.description = { $regex: req.query.description, $options: 'i' }
    req.query = query
    next()
}

const userFilter = async function (req, res, next) {
    req.limit = req.query.limit || 20
    req.offset = req.query.offset || 0
    const query = {}
    if (req.query.name)
        query.displayName = { $regex: req.query.name, $options: 'i' }
    req.query = query
    next()
}

module.exports = { newsFilter, userFilter }
