//  引入数据库
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    details: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// 传到 模型
mongoose.model('ideas',IdeaSchema)