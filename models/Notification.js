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

NotificationSchema.post('save', async function (doc) {
    let notifications = []
    const notification = await doc.populate('receivers').execPopulate()
    for (const follower of notification.receivers) {
        follower.notifications.push(doc)
        follower.save()
        if (Expo.isExpoPushToken(follower.tokenNotification))
            notifications.push({
                to: follower.tokenNotification,
                sound: 'default',
                title: notification.title,
                body: notification.body,
                data: doc
            })
    }
    sendPushNotifications(notifications)
})

mongoose.model('Notification', NotificationSchema)