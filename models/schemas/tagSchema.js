const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

module.exports.tagSchema = new Schema({
    id: ObjectId,
    tagName: { type: String, required: true },
    idPosts: [ { type: ObjectId, ref: 'Post' } ],
    dateCreate: { type: Date, default: Date.now }
})