const mongoose = require('mongoose')

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

mongoose.model('Article', ArticleSchema)