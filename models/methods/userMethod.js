const User = require('../User')

module.exports = {
    createUser(email, username, passwordHash) {
        return new User({
            email,
            username,
            passwordHash
        }).save()
    },

    getUserByEmail(email) {
        return User.findOne({
            email: email
        })
    },

    async getUserCountByEmail(email) {
        const userByEmail = await User.find({ email })
        return userByEmail.length
    },

    async getUserCountByUsername(username) {
        const userByUsername = await User.find({ username })
        return userByUsername.length
    }
}