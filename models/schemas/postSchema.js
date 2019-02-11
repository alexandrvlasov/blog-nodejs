const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

module.exports.postSchema = new Schema({
    id: ObjectId,
    title: { type: String, required: true },
    type: { type: String },
    imgHeader: { type: String, required: true },
    images: [ { type: String } ],
    content: { type: String, required: true },
    author: { type: String },
    isVisible: { type: Boolean, default: true },
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date }
})