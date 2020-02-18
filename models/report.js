const mongoose = require("../configs/database");
const Community = require('./community');
const reportSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
    comment: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Comments', 
        required: true 
    },
    news: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'newsCollection', 
        required: false
    },
    message:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    community: {
        type: mongoose.Schema.ObjectId, 
        ref: Community, 
        required: false
    }
})

module.exports = mongoose.model('Report', reportSchema,'reportCollection')