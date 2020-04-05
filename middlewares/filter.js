// embed limit, offset or tag query parameter into req to filter results
const filter = function (req, res, next) {
    req.limit = req.query.limit || 20
    req.offset = req.query.offset || 0
    req.query = req.query.tag ? { tags: { '$in': [req.query.tag] } } : {}
    next()
}

module.exports = filter
