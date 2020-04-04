const mongoose = require('mongoose')
const { check, oneOf, validationResult } = require('express-validator')
const router = require('express').Router()
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

// preload article objects on routes with ':article'
router.param('article', async function (req, res, next, id) {
    try {
        const article = await Article.findById(id).populate('author')
        if (!article)
            return res.sendStatus(404)
        req.article = article
        return next()
    }
    catch (err) {
        return next(err)
    }
})

// preload comment objects on routes with ':comment'
router.param('comment', async function (req, res, next, id) {
    try {
        const comment = await Comment.findById(id)
        if (!comment)
            return res.sendStatus(404)
        req.comment = comment
        return next()
    }
    catch (err) {
        return next(err)
    }
})

// embed limit, offset or tag query parameter into req to filter results
const filter = function (req, res, next) {
    req.limit = req.query.limit || 20
    req.offset = req.query.offset || 0
    req.query = req.query.tag ? { tags: { '$in': [req.query.tag] } } : {}
    next()
}

router.get('/', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/communities', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'community'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/communities/trending', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'community'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ likes: -1 })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/university', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        query.newsType = 'university'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/club', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        query.newsType = 'club'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/lost-found', filter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        query.newsType = 'lost-found'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles,
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/recommendations', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        const tags = await Article.aggregate([{ $match: { likes: { $in: [user._id] } } }, { $unwind: '$tags' }, { $sortByCount: '$tags' }, { $limit: 2 }])
        const preferenceTags = tags.map(function (tag) {
            return tag._id
        })
        const results = await Promise.all([
            Article.find({ tags: { $in: preferenceTags } })
                .sort({ likes: -1 })
                .populate('author'),
            Article.find({ author: { $in: user.followings } })
                .sort({ createdAt: 'desc' })
                .populate('author')
        ])
        const tagArticles = results[0]
        const followingUserArticles = results[1]
        return res.json([
            {
                type: 'feed',
                articles: followingUserArticles,
                articlesCount: followingUserArticles.length
            },
            {
                type: 'tags',
                tags: preferenceTags,
                articles: tagArticles,
                articlesCount: tagArticles.length
            },
        ])
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article', function (req, res, next) {
    try {
        const article = req.article
        return res.json(article)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:article', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        if (req.article.author._id.toString() === user._id.toString()) {
            // only update fields that were actually passed
            const description = req.body.description
            const tags = req.body.tags
            if (description)
                req.article.description = description
            if (tags)
                req.article.tags = tags
            if (req.article.articleType === 'news') {
                // if the article type is news, update additional fields...
                const title = req.body.title
                const imageURL = req.body.imageURL
                if (title)
                    req.article.title = title
                if (imageURL)
                    req.article.imageURL = imageURL
            }
            const updatedArticle = await req.article.save()
            return res.json(updatedArticle)
        }
        else
            return res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:article', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        if (req.article.author._id.toString() === user._id.toString()) {
            await req.article.remove()
            return res.sendStatus(204)
        }
        else
            return res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', [
    check('description').isLength({ min: 5, max: 1000 }).withMessage('description must be between 5 and 1000 chars long.'),
    check('tags').optional().isArray().withMessage('tags must be an array.'),
    check('articleType').isIn(['community', 'news']).withMessage('articleType must be news or community.'),
    oneOf([
        [
            check('articleType').equals('news'),
            check('title').isLength({ min: 5, max: 100 }).withMessage('title must be between 5 and 100 chars long.'),
            check('newsType').isIn(['club', 'promotion', 'lost-found', 'university']).withMessage('newsType must be club, promotion, lost-found or university.'),
            check('imageURL').isURL().withMessage('imageURL must be an URL.')
        ],
        [
            check('articleType').equals('community')
        ]
    ])
], async function (req, res, next) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array().map(error => error) })
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        const articleType = req.body.articleType
        const description = req.body.description
        const tags = req.body.tags
        const author = user
        let article
        if (articleType === 'news') {
            const newsType = req.body.newsType
            const title = req.body.title
            const imageURL = req.body.imageURL
            article = new Article({
                title,
                description,
                articleType,
                newsType,
                imageURL,
                author,
                tags
            })
        }
        else
            article = new Article({
                description,
                articleType,
                author,
                tags
            })
        const createdArticle = await article.save()
        return res.json(createdArticle)
    }
    catch (err) {
        next(err)
    }
})

router.post('/:article/like', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        await user.like(req.article)
        return res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:article/like', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        if (!user)
            return res.sendStatus(401)
        await user.unlike(req.article)
        return res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article/comments', async function (req, res, next) {
    try {
        const article = await req.article.populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).execPopulate()
        return res.json(article.comments)
    }
    catch (err) {
        next(err)
    }
})

router.post('/:article/comments',
    check('description').isLength({ min: 1, max: 200 }).withMessage('description must be between 1 and 200 chars long.'),
    async function (req, res, next) {
        try {
            const user = await User.findById(req.payload.id)
            if (!user)
                return res.sendStatus(401)
            const article = req.article
            const author = user
            const description = req.body.description
            const comment = new Comment({
                description,
                author,
                article
            })
            const createdComment = await comment.save()
            // update article
            article.comments.push(comment)
            await article.save()
            return res.json(createdComment)
        }
        catch (err) {
            next(err)
        }
    })


router.delete('/:article/comments/:comment', async function (req, res, next) {
    try {
        if (req.comment.author._id.toString() === req.payload.id.toString()) {
            req.article.comments.remove(req.comment._id)
            await req.article.save()
            await Comment.find({ _id: req.comment._id }).remove()
            res.sendStatus(204)
        } else
            res.sendStatus(403)
    }
    catch (err) {
        next(err)
    }
})

router.post('/:article/comments/:comment/like', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        const article = req.article
        const comment = req.comment
        if (!user)
            return res.sendStatus(401)
        if (user._id.toString() !== comment.author._id.toString())
            return res.sendStatus(403)
        if (comment.article._id.toString() === article._id.toString()) {
            if (comment.likes.indexOf(user._id) === -1) {
                comment.likes.push(user)
                await comment.save()
            }
            return res.sendStatus(204)
        }
        else
            return res.sendStatus(404)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:article/comments/:comment/like', async function (req, res, next) {
    try {
        const user = await User.findById(req.payload.id)
        const article = req.article
        const comment = req.comment
        if (!user)
            return res.sendStatus(401)
        if (user._id.toString() !== comment.author._id.toString())
            return res.sendStatus(403)
        if (comment.article._id.toString() === article._id.toString())
            if (comment.likes.indexOf(user._id) > -1) {
                comment.likes.remove(user)
                await comment.save()
                return res.sendStatus(204)
            }
        return res.sendStatus(404)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router 
