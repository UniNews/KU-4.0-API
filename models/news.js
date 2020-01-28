const mongoose = require("../configs/database");
const Comment = require('./comments');
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
    views: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageURL: {
        type: String,
        required: true
    },
    comments: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: Comment
        }
    ]
})

module.exports = mongoose.model('News', newsSchema,'newsCollection')