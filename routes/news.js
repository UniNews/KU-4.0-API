const express = require('express')
const router = express.Router()
const News = require('../models/news')
const uniqid = require('uniqid')
const checkToken = require('../middlewares/checkToken')
const User = require('../models/user')
const Report = require('../models/report')

//get all news
router.get('/' , checkToken,(req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            let data = []
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find()
                        for (const eachNews of news) {
                            const uid = eachNews.uid
                            const newsPost =await User.findOne({'_id':uid})
                            data.push({
                                "_id": eachNews._id,
                                "title": eachNews.title,
                                "description": eachNews.description,
                                "type": eachNews.type,
                                "views": eachNews.views,
                                "imageURl": eachNews.imageURl,
                                "createAt": eachNews.createAt,
                                "username" : newsPost.username,
                                "displayName": newsPost.displayName,
                                "avatarURl": newsPost.avatarURl
                            })
                        }
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//delete news by id
router.delete('/:id',checkToken ,async (req, res) => {
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
                    if(news.uid === userId) {
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
router.post('/' ,checkToken ,async (req, res) => {
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
                let data = {
                    ...req.body,
                    uid: userId
                }
                const news = new News(data)
                news.save()
                res.json(news)
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
router.get('/club' ,checkToken ,async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            let data = []
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find(
                    {
                        'type': 'club'
                    }
                )
                for (const eachNews of news) {
                    const uid = eachNews.uid
                    const newsPost = await User.findOne({'_id':uid})
                    data.push({
                        "_id": eachNews._id,
                        "title": eachNews.title,
                        "description": eachNews.description,
                        "type": eachNews.type,
                        "views": eachNews.views,
                        "imageURl": eachNews.imageURl,
                        "createAt": eachNews.createAt,
                        "username" : newsPost.username,
                        "displayName": newsPost.displayName,
                        "avatarURl": newsPost.avatarURl
                    })
                }
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type promotions news
router.get('/promotions' ,checkToken ,async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            let data = []
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find(
                    {
                        'type': 'promotions'
                    }
                )
                for (const eachNews of news) {
                    const uid = eachNews.uid
                    const newsPost = await User.findOne({'_id':uid})
                    data.push({
                        "_id": eachNews._id,
                        "title": eachNews.title,
                        "description": eachNews.description,
                        "type": eachNews.type,
                        "views": eachNews.views,
                        "imageURl": eachNews.imageURl,
                        "createAt": eachNews.createAt,
                        "username" : newsPost.username,
                        "displayName": newsPost.displayName,
                        "avatarURl": newsPost.avatarURl
                    })
                }
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type losts-founds
router.get('/lost-founds' ,checkToken , async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            let data = []
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find(
                    {
                        'type': 'lost-founds'
                    }
                )
                for (const eachNews of news) {
                    const uid = eachNews.uid
                    const newsPost = await User.findOne({'_id':uid})
                    data.push({
                        "_id": eachNews._id,
                        "title": eachNews.title,
                        "description": eachNews.description,
                        "type": eachNews.type,
                        "views": eachNews.views,
                        "imageURl": eachNews.imageURl,
                        "createAt": eachNews.createAt,
                        "username" : newsPost.username,
                        "displayName": newsPost.displayName,
                        "avatarURl": newsPost.avatarURl
                    })
                }
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get type universities
router.get('/universities' ,checkToken , async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            let data = []
            if (err)
                throw err
            if (!user)
                res.status(401).end()
            else {
                const news = await News.find(
                    {
                        'type': 'universities'
                    }
                )
                for (const eachNews of news) {
                    const uid = eachNews.uid
                    const newsPost = await User.findOne({'_id':uid})
                    data.push({
                        "_id": eachNews._id,
                        "title": eachNews.title,
                        "description": eachNews.description,
                        "type": eachNews.type,
                        "views": eachNews.views,
                        "imageURl": eachNews.imageURl,
                        "createAt": eachNews.createAt,
                        "username" : newsPost.username,
                        "displayName": newsPost.displayName,
                        "avatarURl": newsPost.avatarURl
                    })
                }
                res.status(200).json(news)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//get by news id
router.get('/:id' ,checkToken , async (req, res) => {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        let data = []
        let result = {}
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
                )
                const userPost = await User.findOne( 
                    {
                        '_id': news.uid
                    }
                )
                for (const eachComment of news.comments) {
                    const userComment = await User.findOne({'_id':eachComment.uid})
                    data.push({
                        ...eachComment,
                        'username': userComment.username,
                        'displayName': userComment.displayName,
                        'avatarURl': userComment.avatarURl
                    }
                    )
                }
                result = {
                    "comments": data,
                    "_id": news._id,
                    "title": news.title,
                    "description": news.description,
                    "type": news.type,
                    "views": news.views,
                    "imageURl": news.imageURl,
                    "createAt": news.createAt,
                    "username" : userPost.username,
                    "displayName": userPost.displayName,
                    "avatarURl": userPost.avatarURl
                }
                res.json(result)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//comment to post
router.post('/:id/comments' ,checkToken , async (req, res) => {
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
                        $push: {
                            'comments': {
                                'id': uniqid(),
                                'uid': userId,
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
router.delete('/:id/comments/:cid' ,checkToken ,async (req, res) => {
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
                if(user.accessType === 'admin') {
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
                } else {
                    const news = await News.findOne({_id: req.params.id})
                    const postMatch = news.comments.find(comment => comment.uid===userId)
                    if(postMatch) {
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
router.post('/:id/like/:cid' ,checkToken ,async (req, res) => {
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
                const checkUser = await News.findOne({"comments.like": userId })
                if(checkUser===null) {
                    await News.updateOne(
                        {
                            '_id': req.params.id,
                            'comments.id':req.params.cid
                        },
                        {
                            $push: {
                                'comments.$.like': userId
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
                                'comments.$.like': userId
                            }
                        }
                    )
                    res.json(
                        {
                            message: 'unlike success'
                        }
                    )
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

//report-comments
router.post('/:id/report/:cid', checkToken, async (req, res) => {
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
                let data = []
                data.cid = req.params.cid
                data.newsid = req.params.id
                data.uid = userId
                data.message = req.body.message
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

module.exports = router 
