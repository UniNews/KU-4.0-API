const express = require('express')
const router = express.Router()
const News = require('../models/news')
const User = require('../models/user')
const Comment = require('../models/comments')
const Report = require('../models/report')
const mongoose = require('mongoose')

//get all news
router.get('/' ,(req, res) => {
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
                const news = await News.find().populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments'
                    }
                )
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//modify news
router.put('/:id' ,async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId } ,async function (err, user) {
            if (err)
                throw err
            if (!user || !user.accessType)
                res.status(401).end()
            else {
                const oldNews = await News.findOne({
                    _id: req.params.id 
                })
                if(user.accessType==='admin') {
                    const news = await News.updateOne(
                        { 
                            _id: req.params.id 
                        },
                        { 
                            $set: {
                                title: req.body.title || oldNews.title,
                                description: req.body.description || oldNews.description,
                                type: req.body.type || oldNews.type,
                                imageURL: req.body.imageURL || oldNews.imageURL,
                                tags: req.body.tags || oldNews.tags
                            }
                        }
                    )
                    res.json(news)
                } else {
                    if(oldNews.user._id.toString() === userId) {
                        const news = await News.updateOne(
                            { 
                                _id: req.params.id 
                            },
                            { 
                                $set: {
                                    title: req.body.title || oldNews.title,
                                    description: req.body.description || oldNews.description,
                                    type: req.body.type || oldNews.type,
                                    imageURL: req.body.imageURL || oldNews.imageURL,
                                    tags: req.body.tags || oldNews.tags
                                }
                            }
                        )
                        res.json(news)
                    } else {
                        res.status(401).end()
                    }
                }
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//delete news by id
router.delete('/:id' ,async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId } ,async function (err, user) {
            if (err)
                throw err
            if (!user || !user.accessType)
                res.status(401).end()
            else {
                if(user.accessType==='admin') {
                    const news = await News.deleteOne(
                        {
                            '_id': req.params.id
                        }
                    )
                    res.json(news)
                } else {
                    const news = await News.findOne(
                        {
                            '_id': req.params.id
                        }
                    )
                    if(news.user._id.toString() === userId) {
                        const deleteNews = await News.deleteOne(
                            {
                                '_id': req.params.id
                            }
                        )
                        res.json(deleteNews)
                    } else {
                        res.status(401).end()
                    }
                }
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//post news
router.post('/' ,async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            if (err)
                throw err
            if (!user || !user.accessType)
                res.status(401).end()
            else {
                if(req.body.title && req.body.description && req.body.type) {
                    let data = {
                        title: req.body.title,
                        description: req.body.description,
                        type: req.body.type,
                        views: 0,
                        imageURL: req.body.imageURL || [],
                        tags: req.body.tags || [],
                        user: mongoose.Types.ObjectId(userId)
                    }
                    const news = new News(data)
                    news.save()
                    res.json(news)
                } else {
                    res.json({
                        message:'field mismatch'
                    })
                }
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//get type club news
router.get('/club' ,async (req, res) => {
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
                const news = await News.find(
                    {
                        'type': 'club'
                    }
                ).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments'
                    }
                )
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type promotions news
router.get('/promotions' ,async (req, res) => {
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
                const news = await News.find(
                    {
                        'type': 'promotions'
                    }
                ).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments'
                    }
                )
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type losts-founds
router.get('/lost-founds' , async (req, res) => {
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
                const news = await News.find(
                    {
                        'type': 'lost-founds'
                    }
                ).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments'
                    }
                )
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type universities
router.get('/universities' , async (req, res) => {
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
                const news = await News.find(
                    {
                        'type': 'universities'
                    }
                ).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments'
                    }
                )
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get by news id
router.get('/:id' , async (req, res) => {
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
                ).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments',
                        populate: {
                            path: 'like',
                            model: 'User',
                            select:'-password'
                        }
                    }
                ).populate(
                    {
                        path:'comments',
                        model: 'Comments',
                        populate: {
                            path: 'user',
                            model: 'User',
                            select:'-password'
                        }
                    }
                )
                if(news.tags) {
                    news.tags.forEach(async element => {
                        if(user.tags) {
                            var foundIndex = Object.values(user.tags).findIndex( e => Object.keys(e)[0] === element )
                            var found = foundIndex > -1
                            var updateKey = `tags.${foundIndex}.${element}`
                            if(found){
                                await User.updateOne(
                                    {
                                        '_id':userId
                                    },
                                    {
                                        $inc: {
                                            [updateKey]: 1
                                        }
                                    }
                                )
                            }
                            else {
                                await User.updateOne(
                                    {
                                        '_id':userId
                                    },
                                    {
                                        $push: {
                                            tags: {
                                                [element]:1
                                            }
                                        }
                                    }
                                )
                            }
                        }
                        else 
                            await User.updateOne(
                                {
                                    '_id':userId
                                },
                                {
                                    $push: {
                                        tags: {
                                            [element]:1
                                        }
                                    }
                                }
                            )
                    });
                }
                res.json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//comment to post
router.post('/:id/comments' , async (req, res) => {
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
                const data = new Comment(
                    {
                        text: req.body.text,
                        user: mongoose.Types.ObjectId(userId),
                        like: []
                    }
                )
                await data.save(async function (err, comment) {
                    if (err) throw err;
                    const cid = mongoose.Types.ObjectId(comment._id)
                    await News.updateOne(
                        {
                            '_id': req.params.id
                        },
                        {
                            $push: {
                                'comments': cid
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
                })
            }
        })
    }
    catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//delete comments
router.delete('/:id/comments/:cid' ,async (req, res) => {
    const userId = req.userId
    const cid = mongoose.Types.ObjectId(req.params.cid)
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
                if(user.accessType === 'admin') {
                    await News.updateOne(
                        {
                            '_id': req.params.id
                        },
                        {
                            $pull: {
                                'comments': cid
                            }
                        }
                    )
                    await Comment.deleteOne(
                        {
                            '_id':cid
                        }
                    )
                    res.json(
                        {
                            message: 'delete comment success'
                        }
                    )
                } else {
                    const news = await News.findOne({_id: req.params.id}).populate(
                        {
                            path:'comments',
                            model: 'Comments',
                            populate: {
                                path: 'like',
                                model: 'User',
                                select:'-password'
                            }
                        }
                    )
                    const postMatch = news.comments.find(comment => comment.user._id.toString()===userId)
                    if(postMatch) {
                        await News.updateOne(
                            {
                                '_id': req.params.id
                            },
                            {
                                $pull: {
                                    'comments': cid
                                }
                            }
                        )
                        await Comment.deleteOne(
                            {
                                '_id':cid
                            }
                        )
                        res.json(
                            {
                                message: 'delete comment success'
                            }
                        )
                    } else {
                        res.status(401).end()
                    }
                }
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//like-comments
router.post('/:cid/like/' ,async (req, res) => {
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
                const cmValid = await Comment.findOne(
                    {
                        '_id': req.params.cid
                    }
                )
                const checkUser = await Comment.findOne(
                    {
                        '_id': req.params.cid,
                        "like": userId 
                    }
                )
                if( cmValid !== null )
                    if( checkUser === null ) {
                        await Comment.updateOne(
                            {
                                '_id': req.params.cid,
                            },
                            {
                                $push: {
                                    'like': userId
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
                        await Comment.updateOne(
                            {
                                '_id': req.params.cid,
                            },
                            {
                                $pull: {
                                    'like': userId
                                }
                            }
                        )
                        res.json(
                            {
                                message: 'unlike success'
                            }
                        )
                    }
                else
                    res.status(401).end()
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//report-comments
router.post('/:id/report/:cid' , async (req, res) => {
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
                let data = {
                    user: mongoose.Types.ObjectId(userId),
                    comment: mongoose.Types.ObjectId(req.params.cid),
                    news: mongoose.Types.ObjectId(req.params.id),
                    message: req.body.message
                }
                const report = new Report(data)
                report.save()
                res.json(report)
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})

//like-news
router.post('/:id/like-news' ,async (req, res) => {
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
                const cmValid = await News.findOne(
                    {
                        '_id': req.params.id
                    }
                )
                const checkUser = await News.findOne(
                    {
                        '_id': req.params.id,
                        "like": userId 
                    }
                )
                if( cmValid !== null )
                    if( checkUser === null ) {
                        await News.updateOne(
                            {
                                '_id': req.params.id,
                            },
                            {
                                $push: {
                                    'like': userId
                                }
                            }
                        )
                        await User.updateOne(
                            {
                                '_id': userId,
                            },
                            {
                                $push: {
                                    'likeNews': req.params.id
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
                            },
                            {
                                $pull: {
                                    'like': userId
                                }
                            }
                        )
                        await User.updateOne(
                            {
                                '_id': userId,
                            },
                            {
                                $pull: {
                                    'likeNews': req.params.id
                                }
                            }
                        )
                        res.json(
                            {
                                message: 'unlike success'
                            }
                        )
                    }
                else
                    res.status(401).end()
            }
        })
    } catch (err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
})
module.exports = router 
