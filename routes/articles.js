const mongoose = require('mongoose')
const { body, oneOf, validationResult } = require('express-validator')
const router = require('express').Router()
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const { newsFilter } = require('../middlewares/filter')
const { MAX_DESCRIPTION_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } = require('./../configs/validationConstants')

router.use(async function (req, res, next) {
    const user = await User.findById(req.payload.id)
    if (!user)
        return res.sendStatus(401)
    req.user = user
    next()
})

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

router.get('/', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/ads', newsFilter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        query.ads = true
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/trending', newsFilter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ likesCount: -1 })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/communities', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/communities/trending', newsFilter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'community'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ likesCount: -1 })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/university', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/promotion', newsFilter, async function (req, res, next) {
    try {
        const query = req.query
        const limit = req.limit
        const offset = req.offset
        query.articleType = 'news'
        query.newsType = 'promotion'
        const articles = await Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: 'desc' })
            .populate('author')
        const articlesCount = await Article.count(query)
        return res.json({
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/club', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/news/lost-found', newsFilter, async function (req, res, next) {
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
            articles: articles.map(function (article) {
                return article.toJSONFor(req.user)
            }),
            articlesCount: articlesCount
        })
    }
    catch (err) {
        next(err)
    }
})

router.get('/recommendations', async function (req, res, next) {
    try {
        const tags = await Article.aggregate([{ $match: { views: { $in: [req.user._id] } } }, { $unwind: '$tags' }, { $sortByCount: '$tags' }, { $limit: 2 }])
        const preferenceTags = tags.map(function (tag) {
            return tag._id
        })
        const results = await Promise.all([
            Article.find({ articleType: 'news', tags: { $in: preferenceTags } })
                .limit(Number(5))
                .sort({ likesCount: -1 })
                .populate('author'),
            Article.find({ articleType: 'news' })
                .limit(Number(5))
                .sort({ createdAt: 'desc' })
                .populate('author'),
            Article.find({ articleType: 'news' })
                .limit(Number(5))
                .sort({ likesCount: -1 })
                .populate('author'),
            Article.find({ articleType: 'news', ads: true })
                .limit(Number(5))
                .sort({ createdAt: 'desc' })
                .populate('author'),
        ])
        const tagArticles = results[0]
        const followingUserArticles = results[1]
        const popularArticles = results[2]
        const adsArticles = results[3]

        return res.json([
            {
                type: 'ads',
                articles: adsArticles.map(function (article) {
                    return article.toJSONFor(req.user)
                }),
            },
            {
                type: 'tags',
                tags: preferenceTags,
                articles: tagArticles.map(function (article) {
                    return article.toJSONFor(req.user)
                }),
            },
            {
                type: 'feed',
                articles: followingUserArticles.map(function (article) {
                    return article.toJSONFor(req.user)
                }),
            },
            {
                type: 'popular',
                articles: popularArticles.map(function (article) {
                    return article.toJSONFor(req.user)
                }),
            },
        ])
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article', async function (req, res, next) {
    try {
        const article = req.article
        if (article.views.indexOf(req.user._id) === -1) {
            article.views.push(req.user)
            await article.save()
        }
        return res.json(article.toJSONFor(req.user))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article/views', async function (req, res, next) {
    try {
        const articles = await req.article.populate({
            path: 'views',
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        }).execPopulate()
        const views = articles.views
        return res.status(200).json(
            views.map(function (view) {
                return view.toJSONFor(req.user)
            }),
        )
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article/likes', async function (req, res, next) {
    try {
        const articles = await req.article.populate({
            path: 'likes',
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        }).execPopulate()
        const likes = articles.likes
        return res.status(200).json(
            likes.map(function (like) {
                return like.toJSONFor(req.user)
            }),
        )
    }
    catch (err) {
        next(err)
    }
})

router.put('/:article',
    [
        body('description').optional().isLength({ min: MIN_DESCRIPTION_LENGTH, max: MAX_DESCRIPTION_LENGTH }).withMessage('description must be between 1 and 1000 chars long.'),
        body('tags').optional().isArray().withMessage('tags must be an array.'),
        body('title').optional().isLength({ min: MIN_TITLE_LENGTH, max: MAX_TITLE_LENGTH }).withMessage('title must be between 1 and 100 chars long.'),
        body('newsType').optional().isIn(['club', 'promotion', 'lost-found', 'university']).withMessage('newsType must be club, promotion, lost-found or university.'),
        body('imageURL').optional().isURL().withMessage('imageURL must be an URL.')
    ], async function (req, res, next) {
        try {
            if (req.user.role === 'admin' || req.article.author._id.toString() === req.user._id.toString()) {
                // only update fields that were actually passed
                const description = req.body.description
                const tags = req.body.tags
                if (typeof description !== 'undefined')
                    req.article.description = description
                if (typeof tags !== 'undefined')
                    req.article.tags = tags
                if (req.article.articleType === 'news') {
                    // if the article type is news, update additional fields...
                    const title = req.body.title
                    const imageURL = req.body.imageURL
                    const newsType = req.body.newsType
                    if (typeof newsType !== 'undefined')
                        req.article.newsType = newsType
                    if (typeof title !== 'undefined')
                        req.article.title = title
                    if (typeof imageURL !== 'undefined')
                        req.article.imageURL = imageURL
                }
                const updatedArticle = await req.article.save()
                return res.json(updatedArticle.toJSONFor(req.user))
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
        if (req.user.role === 'admin' || req.article.author._id.toString() === req.user._id.toString()) {
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
    body('description').isLength({ min: MIN_DESCRIPTION_LENGTH, max: MAX_DESCRIPTION_LENGTH }).withMessage('description must be between 1 and 1000 chars long.'),
    body('tags').optional().isArray().withMessage('tags must be an array.'),
    body('articleType').isIn(['community', 'news']).withMessage('articleType must be news or community.'),
    oneOf([
        [
            body('articleType').equals('news'),
            body('title').isLength({ min: MIN_TITLE_LENGTH, max: MAX_TITLE_LENGTH }).withMessage('title must be between 1 and 100 chars long.'),
            body('newsType').isIn(['club', 'promotion', 'lost-found', 'university']).withMessage('newsType must be club, promotion, lost-found or university.'),
            body('imageURL').isURL().withMessage('imageURL must be an URL.')
        ],
        [
            body('articleType').equals('community')
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
        return res.json(createdArticle.toJSONFor(req.user))
    }
    catch (err) {
        next(err)
    }
})

router.post('/:article/like', async function (req, res, next) {
    try {
        if (req.article.likes.indexOf(req.user._id) === -1) {
            req.article.likes.push(req.user)
            req.article.likesCount = req.article.likes.length
            await req.article.save()
        }
        return res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:article/like', async function (req, res, next) {
    try {
        if (req.article.likes.indexOf(req.user._id) > -1) {
            req.article.likes.remove(req.user)
            await req.article.save()
        }
        return res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:article/comments', async function (req, res, next) {
    try {
        const comments = await Comment.find({ article: req.article._id }).populate([{
            path: 'author',
        },
        {
            path: 'article',
            populate: {
                path: 'author'
            }
        }]).sort({ createdAt: 'asc' })
        if (!comments)
            return res.sendStatus(404)
        return res.json(comments.map(function (comment) {
            return comment.toJSONFor(req.user)
        }))
    }
    catch (err) {
        next(err)
    }
})

router.post('/:article/comments',
    body('description').isLength({ min: MIN_COMMENT_LENGTH, max: MAX_COMMENT_LENGTH }).withMessage('description must be between 1 and 200 chars long.'),
    async function (req, res, next) {
        try {
            const article = req.article
            const author = req.user
            const description = req.body.description
            const comment = new Comment({
                description,
                author,
                article
            })
            const createdComment = await comment.save()
            // update article
            article.comments.push(comment._id)
            await article.save()
            return res.json(createdComment.toJSONFor(req.user))
        }
        catch (err) {
            next(err)
        }
    })

module.exports = router 
