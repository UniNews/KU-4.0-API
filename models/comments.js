const mongoose = require("../configs/database");

const commentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true,
    },
    like: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User' 
        }
    ]
})

module.exports = mongoose.model('Comments', commentsSchema)