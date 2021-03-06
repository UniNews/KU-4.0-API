const mongoose = require('mongoose')
const Notification = mongoose.model('Notification')
const Report = mongoose.model('Report')
const Comment = mongoose.model('Comment')

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
    likesCount: {
        type: Number,
        default: 0,
        required: true
    },
    ads: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false
})

ArticleSchema.pre('save', function (next) {
    this._wasNew = this.isNew
    next()
})

ArticleSchema.post('save', function (article) {
    if (article._wasNew) {
        const sender = article.author
        const type = article.articleType
        const receivers = article.author.followers
        const title = `${article.author.displayName} ได้โพสต์สิ่งใหม่!`
        const body = article.title || article.description
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

ArticleSchema.post('remove', async function (doc) {
    await Notification.remove({ redirectId: doc._id }).exec();
    const reports = await Report.find({ postDestination: doc._id })
    if (reports) {
        for (const report of reports) {
            report.removed = true
            await report.save()
        }
    }
    await Comment.remove({ article: doc._id }).exec();
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
        likesCount: this.likesCount
    }
}

mongoose.model('Article', ArticleSchema)