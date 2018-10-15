//  引入数据库
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// 传到 模型
mongoose.model('users',UserSchema)
