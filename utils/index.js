const jwt = require('jsonwebtoken')
const { DATABASE, DB_USER, DB_PASSWORD, SECRET_FOR_JWT, EXPIRES_IN_JWT } = require('../constants')

module.exports.DB_CONNECT_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds255924.mlab.com:55924/${DATABASE}`

module.exports.createToken = (id, email, username) => {
    return jwt.sign({ id, email, username }, SECRET_FOR_JWT, { expiresIn: EXPIRES_IN_JWT })
}