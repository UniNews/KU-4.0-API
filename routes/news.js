const express = require('express')
const router = express.Router()
const News = require('../models/news')

router.get('/', async (req, res) => {
    try {
        const news = await News.find()
        res.json(news)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req,res) => {
    try {
        const news = new News(req.body)
        news.save()
        res.json(news)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/club', async (req, res) => {
    try {
        const news = await News.find({ type: 'club' })
        res.json(news)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/general', async (req, res) => {
    try {
        const news = await News.find({ type: 'general' })
        res.json(news)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router 
