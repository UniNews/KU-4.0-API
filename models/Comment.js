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
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true })

mongoose.model('Comment', CommentSchema)