const mongoose = require('mongoose')
const Notification = mongoose.model('Notification')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    articleType: {
        type: String,
        enum: ['community', 'news'],
        required: true
    },
    newsType: { // for news article type
        type: String,
        enum: ['club', 'promotion', 'lost-found', 'university'],
    },
    imageURL: {
        type: String,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    views: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [
        { type: String }
    ],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true })

ArticleSchema.pre('save', function (next) {
    this._wasNew = this.isNew
    next()
})

ArticleSchema.post('save', function (article) {
    if (article._wasNew) {
        const sender = article.author
        const type = 'article'
        const receivers = article.author.followers
        const title = article.title
        const body = article.description
        const notification = new Notification({
            sender,
            type,
            receivers,
            title,
            body
        })
        notification.save()
    }
})

mongoose.model('Article', ArticleSchema)