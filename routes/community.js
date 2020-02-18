const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Community = require('../models/community')
const Comment = require('../models/comments')
const Report = require('../models/report')
const mongoose = require('mongoose')

//get all communities
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
                const comunities = await Community.find().populate(
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
                res.status(200).json(comunities)
            }
        })
    }
    catch (err) {
        res.status(500).end()
    }
})

//modify Community
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
            if (!user)
                res.status(401).end()
            else {
                const oldComunities = await Community.findOne({
                    _id: req.params.id 
                })
                if(user.accessType==='admin') {
                    const communities = await Community.updateOne(
                        { 
                            _id: req.params.id 
                        },
                        { 
                            $set: {
                                description: req.body.description || oldComunities.description,
                            }
                        }
                    )
                    res.json(communities)
                } else {
                    if(oldComunities.user._id.toString() === userId) {
                        const communities = await Community.updateOne(
                            { 
                                _id: req.params.id 
                            },
                            { 
                                $set: {
                                    description: req.body.description || oldComunities.description,
                                }
                            }
                        )
                        res.json(communities)
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

//delete communities by id
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
            if (!user)
                res.status(401).end()
            else {
                if(user.accessType==='admin') {
                    const communities = await Community.deleteOne(
                        {
                            '_id': req.params.id
                        }
                    )
                    res.json(communities)
                } else {
                    const communities = await Community.findOne(
                        {
                            '_id': req.params.id
                        }
                    )
                    if(communities.user._id.toString() === userId) {
                        const deleteComunities = await Community.deleteOne(
                            {
                                '_id': req.params.id
                            }
                        )
                        res.json(deleteComunities)
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

//post community
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
            if (!user)
                res.status(401).end()
            else {
                if(req.body.description) {
                    let data = {
                        description: req.body.description,
                        user: mongoose.Types.ObjectId(userId)
                    }
                    const communities = new Community(data)
                    communities.save()
                    res.json(communities)
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

//get by Community id
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
                const communities = await Community.findOne(
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
                res.json(communities)
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
                    await Community.updateOne(
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
                    await Community.updateOne(
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
                    const communities = await Community.findOne({_id: req.params.id}).populate(
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
                    const postMatch = communities.comments.find(comment => comment.user._id.toString()===userId)
                    if(postMatch) {
                        await Community.updateOne(
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
                console.log('s')
                let data = {
                    user: mongoose.Types.ObjectId(userId),
                    comment: mongoose.Types.ObjectId(req.params.cid),
                    community: mongoose.Types.ObjectId(req.params.id),
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

//like-community
router.post('/:id/like-community' ,async (req, res) => {
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
                const cmValid = await Community.findOne(
                    {
                        '_id': req.params.id
                    }
                )
                const checkUser = await Community.findOne(
                    {
                        '_id': req.params.id,
                        "like": userId 
                    }
                )
                if( cmValid !== null )
                    if( checkUser === null ) {
                        await Community.updateOne(
                            {
                                '_id': req.params.id,
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
                        await Community.updateOne(
                            {
                                '_id': req.params.id,
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

module.exports = router 