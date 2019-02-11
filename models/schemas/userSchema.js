const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

module.exports.userSchema = new Schema({
    id: ObjectId,
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    username: { type: String, required: true },
    isAdmin: { type: Boolean },
    isModerator: { type: Boolean },
    isAuthor: { type: Boolean },
    deteCreate: { type: Date, default: Date.now }
})