const mongoose = require('mongoose')
const Notification = mongoose.model('Notification')
const Report = mongoose.model('Report')

const CommentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
}, {
    timestamps: true,
    versionKey: false
})


CommentSchema.post('remove', async function (doc) {
    await Notification.remove({ redirectId: doc._id }).exec();
    const reports = await Report.find({ postDestination: doc._id })
    if (reports) {
        for (const report of reports) {
            report.removed = true
            await report.save()
        }
    }
})

CommentSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        description: this.description,
        author: this.author.toJSONFor(user),
        likes: this.likes,
        isLiked: this.likes.indexOf(user._id) > -1,
        createdAt: this.createdAt,
        article: this.article.toJSONFor(user)
    }
}

mongoose.model('Comment', CommentSchema)