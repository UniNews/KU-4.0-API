const express = require('express')
const router = express.Router()
const User = require('../models/user')
const News = require('../models/news')
const Community = require('../models/community')
const mongoose = require('mongoose')

router.get("/", function (req, res) {
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
                const data = await User.find({}, { password: 0 }).populate(
                    {
                        path: 'follower',
                        model: 'User',
                        select: '-password'
                    }
                ).populate(
                    {
                        path: 'following',
                        model: 'User',
                        select: '-password'
                    }
                )
                res.status(200).json(data)
            }
        })
    } catch (err) {
        res.status(500).end()
    }
})

router.get("/:id", function (req, res) {
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
                const data = await User.findOne({ _id: req.params.id }, { password: 0 }).populate(
                    {
                        path: 'follower',
                        model: 'User',
                        select: '-password'
                    }
                ).populate(
                    {
                        path: 'following',
                        model: 'User',
                        select: '-password'
                    }
                )
                const news = await News.find({ user: req.params.id }).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                )
                res.status(200).json({ data, news })
            }
        })
    } catch (err) {
        res.status(500).end()
    }
})

router.get("/:id/normal", function (req, res) {
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
                const data = await User.findOne({ _id: req.params.id }, { password: 0 }).populate(
                    {
                        path: 'follower',
                        model: 'User',
                        select: '-password'
                    }
                ).populate(
                    {
                        path: 'following',
                        model: 'User',
                        select: '-password'
                    }
                )
                const communities = await Community.find({ user: req.params.id }).populate(
                    {
                        path: 'user',
                        model: 'User',
                        select:'-password'
                    }
                )
                res.status(200).json({ data, communities })
            }
        })
    } catch (err) {
        res.status(500).end()
    }
})

router.post("/:id", function (req, res) {
    const userId = req.userId
    if (userId == null) {
        res.status(401).end()
        return
    }
    try {
        User.findOne({ _id: userId }, async function (err, user) {
            if (err)
                throw err
            if (!user || userId === req.params.id)
                res.status(401).end()
            else {
                User.findOne({ _id: req.params.id }, async function (err, users) {
                    if (err)
                        throw err
                    if (!users)
                        res.status(401).end()
                    else {
                        if (!user.following.some(x => x.toString() === req.params.id)) {
                            await User.updateOne(
                                {
                                    '_id': userId
                                },
                                {
                                    $push: {
                                        'following': mongoose.Types.ObjectId(req.params.id)
                                    }
                                },
                                {
                                    upsert: true
                                }
                            )
                            await User.updateOne(
                                {
                                    '_id': req.params.id
                                },
                                {
                                    $push: {
                                        'follower': mongoose.Types.ObjectId(userId)
                                    }
                                },
                                {
                                    upsert: true
                                }
                            )
                            res.json(
                                {
                                    message: 'follow success'
                                }
                            )
                        } else {
                            await User.updateOne(
                                {
                                    '_id': userId
                                },
                                {
                                    $pull: {
                                        'following': mongoose.Types.ObjectId(req.params.id)
                                    }
                                },
                                {
                                    upsert: true
                                }
                            )
                            await User.updateOne(
                                {
                                    '_id': req.params.id
                                },
                                {
                                    $pull: {
                                        'follower': mongoose.Types.ObjectId(userId)
                                    }
                                },
                                {
                                    upsert: true
                                }
                            )
                            res.json(
                                {
                                    message: 'unfollow success'
                                }
                            )
                        }
                    }
                })
            }
        })
    } catch (err) {
        res.status(500).end()
    }
})

//modify user
router.put('/:id', async (req, res) => {
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
                const oldUser = await User.findOne({
                    _id: req.params.id
                })
                if (user.accessType === 'admin') {
                    const result = await User.updateOne(
                        {
                            _id: req.params.id
                        },
                        {
                            $set: {
                                displayName: req.body.displayName || oldUser.displayName,
                                accessType: req.body.accessType || oldUser.accessType,
                                avatarURL: req.body.avatarURL || oldUser.avatarURL,
                                mobilePhone: req.body.mobilePhone || oldUser.mobilePhone,
                                category: req.body.category || oldUser.category,
                                description: req.body.description || oldUser.description,
                                owner: req.body.owner || oldUser.owner,
                                address: req.body.address || oldUser.address,
                                fbPage: req.body.fbPage || oldUser.fbPage,
                                follower: req.body.follower || oldUser.follower,
                                following: req.body.following || oldUser.following,
                                active: req.body.active || oldUser.active
                            }
                        }
                    )
                    res.json(result)
                } else {
                    if (oldUser._id.toString() === userId) {
                        const result = await User.updateOne(
                            {
                                _id: req.params.id
                            },
                            {
                                $set: {
                                    displayName: req.body.displayName || oldUser.displayName,
                                    accessType: req.body.accessType || oldUser.accessType,
                                    avatarURL: req.body.avatarURL || oldUser.avatarURL,
                                    mobilePhone: req.body.mobilePhone || oldUser.mobilePhone,
                                    category: req.body.category || oldUser.category,
                                    description: req.body.description || oldUser.description,
                                    owner: req.body.owner || oldUser.owner,
                                    address: req.body.address || oldUser.address,
                                    fbPage: req.body.fbPage || oldUser.fbPage,
                                    follower: req.body.follower || oldUser.follower,
                                    following: req.body.following || oldUser.following,
                                }
                            }
                        )
                        res.json(result)
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

module.exports = router 