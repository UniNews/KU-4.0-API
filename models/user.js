const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../configs/environments')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'username is invalid'],
    },
    loginType: {
        type: String,
        enum: ['normal', 'google', 'facebook'],
        required: true
    },
    uid: { // for facebook, google login type
        type: String,
        required: false
    },
    password: { // for email login type
        type: String,
        select: false
    },
    displayName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'store', 'user'],
        default: 'user',
        required: true
    },
    avatarURL: {
        type: String,
        required: true,
        default: 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png'
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    bio: {
        type: String,
        required: false
    },
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    /* additional fields for stores or admins */
    email: {
        type: String,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'email is invalid']
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobilePhone: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    contacts: {
        type: String,
    },
    notifications: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Notification'
    }],
    tokenNotification: {
        type: String
    },
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'user is already taken.' })

UserSchema.methods.setPassword = async function (password) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    const hash = await bcrypt.hash(password, salt)
    this.password = hash
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.generateJWT = function () {
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() + 60)
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, ACCESS_TOKEN_SECRET)
}

UserSchema.methods.follow = async function (user) {
    if (this.followings.indexOf(user._id) === -1) {
        this.followings.push(user)
        user.followers.push(this)
        await user.save()
        return await this.save()
    }
}

UserSchema.methods.unfollow = async function (user) {
    if (this.followings.indexOf(user._id) > -1) {
        this.followings.remove(user)
        user.followers.remove(this)
        await user.save()
        return await this.save()
    }
}

UserSchema.methods.like = async function (article) {
    if (this.likes.indexOf(article._id) === -1) {
        this.likes.push(article)
        article.likes.push(this)
        await article.save()
        return await this.save()
    }
}

UserSchema.methods.unlike = async function (article) {
    if (this.likes.indexOf(article._id) > -1) {
        this.likes.remove(article)
        article.likes.remove(this)
        await article.save()
        return await this.save()
    }
}


mongoose.model('User', UserSchema)