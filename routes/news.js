const express = require('express')
const router = express.Router()
const News = require('../models/news')
const uniqid = require('uniqid')

//get all news
router.get('/', async (req, res) => {
    try {
        const news = await News.find()
        res.json(news)
    } catch (err) {
        res.status(500).json(
            { 
                message: err.message 
            }
        )
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
router.post('/', async (req,res) => {
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
router.get('/:id', async (req,res) => {
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
router.post('/:id/comments', async (req,res) => {
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
    }catch (err) {
        res.status(500).json(
            { 
                message: err.message 
            }
        )
    }
})

//delete comments
router.delete('/:id/comments/:cid', async (req,res) => {
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
    }catch (err) {
        res.status(500).json(
            { 
                message: err.message 
            }
        )
    }
})

module.exports = router 
