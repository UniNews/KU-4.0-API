const mongoose = require('mongoose')

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
}, { timestamps: true })

CommentSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        description: this.description,
        author: this.author.toJSONFor(user),
        likes: this.likes,
        isLiked: this.likes.indexOf(user._id) > -1,
        createdAt: this.createdAt,
    }
}

mongoose.model('Comment', CommentSchema)