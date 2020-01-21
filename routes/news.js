const express = require('express')
const router = express.Router()
const News = require('../models/news')
const uniqid = require('uniqid')
const checkToken = require('../middlewares/checkToken')
const User = require('../models/user')

//get all news
router.get('/', async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find()
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//delete news by id
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.deleteOne(
            {
                '_id': req.params.id
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//post news
router.post('/', async (req, res) => {
    try {
        const news = new News(req.body)
        news.save()
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get type club
router.get('/club', async (req, res) => {
    try {
        const news = await News.find(
            {
                'type': 'club'
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get type promotions
router.get('/promotions', async (req, res) => {
    try {
        const news = await News.find(
            {
                'type': 'promotions'
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get type losts-founds
router.get('/lost-founds', async (req, res) => {
    try {
        const news = await News.find(
            {
                'type': 'lost-founds'
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get type universities
router.get('/universities', async (req, res) => {
    try {
        const news = await News.find(
            {
                'type': 'universities'
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get by news id
router.get('/:id', async (req, res) => {
    try {
        await News.updateOne(
            {
                '_id': req.params.id
            },
            {
                $inc: {
                    'views': 1
                }
            }
        )
        const news = await News.findOne(
            {
                '_id': req.params.id
            }
        )
        res.json(news)
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//comment to post
router.post('/:id/comments', async (req, res) => {
    try {
        await News.updateOne(
            {
                '_id': req.params.id
            },
            {
                $push: {
                    'comments': {
                        'id': uniqid(),
                        'name': req.body.name,
                        'text': req.body.text
                    }
                }
            },
            {
                upsert: true
            }
        )
        res.json(
            {
                message: 'add comment success'
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//delete comments
router.delete('/:id/comments/:cid', async (req, res) => {
    try {
        await News.updateOne(
            {
                '_id': req.params.id
            },
            {
                $pull: {
                    'comments': {
                        'id': req.params.cid,
                    }
                }
            }
        )
        res.json(
            {
                message: 'delete comment success'
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//like-comments
router.post('/:id/like/:cid', async (req, res) => {
        try {
            const checkUser = await News.findOne({"comments.like": req.body.username })
            if(checkUser===null) {
                await News.updateOne(
                    {
                        '_id': req.params.id,
                        'comments.id':req.params.cid
                    },
                    {
                        $push: {
                            'comments.$.like': req.body.username
                        }
                    }
                )
                res.json(
                    {
                        message: 'add like success'
                    }
                )
            }
            else {
                await News.updateOne(
                    {
                        '_id': req.params.id,
                        'comments.id':req.params.cid
                    },
                    {
                        $pull: {
                            'comments.$.like': req.body.username
                        }
                    }
                )
                res.json(
                    {
                        message: 'add like success'
                    }
                )
            }
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

module.exports = router 
