const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../configs/environments')
const Notification = mongoose.model('Notification')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
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
    tokenNotifications: [{
        type: String
    }],
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'user is already taken.' })

UserSchema.methods.setPassword = async function (password) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    const hash = await bcrypt.hash(password, salt)
    this.password = hash
}

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
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
        await this.save()
        // create follower notification
        const sender = this
        const type = 'follower'
        const receivers = [user._id]
        const title = 'คุณมีผู้ติดตามใหม่!'
        const body = `${this.displayName} ได้ติดตามคุณ`
        const redirectId = this._id
        const notification = new Notification({
            sender,
            type,
            receivers,
            title,
            body,
            redirectId
        })
        await notification.save()
    }
}

UserSchema.methods.unfollow = async function (user) {
    if (this.followings.indexOf(user._id) > -1) {
        this.followings.remove(user)
        user.followers.remove(this)
        await user.save()
        await this.save()
    }
}

UserSchema.methods.toJSONFor = function (user) {
    return {
        ...this._doc,
        isFollowing: user.followings.indexOf(this._id) > -1
    }
}

mongoose.model('User', UserSchema)