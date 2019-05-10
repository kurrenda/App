const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    title: {
        type: String,
        requried: true
    },

    status: {
        type: String,
        default: 'public'
    },

    description: {
        type: String,
        requried: true
    },

    creationdate: {
        type: Date,
        default: Date.now()
    }




});

// module.exports = {Post: mongoose.model('post', PostSchema)};

let SensorPost = mongoose.model('SensorPost', PostSchema);
module.exports = SensorPost;