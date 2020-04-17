const mongoose = require('mongoose')
const sendPushNotifications = require('../configs/notification')
const { Expo } = require('expo-server-sdk')

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['article', 'follower'],
    },
    redirectId: {
        type: String,
    },
    receivers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    reads: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true })

NotificationSchema.pre('save', function (next) {
    this._wasNew = this.isNew
    next()
})

NotificationSchema.post('save', async function (doc) {
    if (doc._wasNew) {
        let notifications = []
        const notification = await doc.populate('receivers').execPopulate()
        for (const follower of notification.receivers) {
            // follower.notifications.push(doc)
            // follower.save()
            for (const tokenNotification of follower.tokenNotifications) {
                if (Expo.isExpoPushToken(tokenNotification))
                    notifications.push({
                        to: tokenNotification,
                        sound: 'default',
                        title: notification.title,
                        body: notification.body,
                        // data: { redirectId: doc.redirectId },
                        _displayInForeground: true,
                    })
            }
        }
        sendPushNotifications(notifications)
    }
})

NotificationSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        sender: this.sender.toJSONFor(user),
        type: this.type,
        title: this.title,
        body: this.body,
        redirectId: this.redirectId,
        createdAt: this.createdAt,
        isRead: this.reads.indexOf(user._id) > -1
    }
}

mongoose.model('Notification', NotificationSchema)