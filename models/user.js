const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/minibackendProject')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    about: String,
    email: String,
    age: Number,
    password: String,
    profileImage: {
        type: String,
        default: "default.png"
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'post',
        }
    ]
})

module.exports = mongoose.model('user', userSchema)
