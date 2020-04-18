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
        timestamps: true
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
    }],
    ads: {
        type: Boolean,
        default: false,
    }
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
        const redirectId = article._id
        const notification = new Notification({
            sender,
            type,
            receivers,
            title,
            body,
            redirectId
        })
        notification.save()
    }
})

ArticleSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        title: this.title,
        description: this.description,
        articleType: this.articleType,
        newsType: this.newsType,
        imageURL: this.imageURL,
        author: this.author ? this.author.toJSONFor(user) : null,
        views: this.views,
        comments: this.comments,
        tags: this.tags,
        likes: this.likes,
        isLiked: this.likes.indexOf(user._id) > -1,
        createdAt: this.createdAt,
    }
}

mongoose.model('Article', ArticleSchema)