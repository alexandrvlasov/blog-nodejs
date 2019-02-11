const express = require('express')
const registerRouter = express.Router()
const bcrypt = require('bcrypt')

const { SALT_FOR_PASSWORD } = require('../../../../constants')
const { getUserCountByEmail, getUserCountByUsername, createUser } = require('../../../../models/methods/userMethod')
const { createToken } = require('../../../../utils')

registerRouter.post('/', async (req, res) => {
    const email = String(req.body.email).toLowerCase().split(' ').join('')  // replace(/\s/g, '');
    const username = String(req.body.username).toLowerCase().split(' ').join('')  // replace(/\s/g, '');
    const { password } = req.body

    const emailCount = await getUserCountByEmail(email)
    const usernameCount = await getUserCountByUsername(username)

    if (usernameCount != 0) {
        return res.status(409).json({
            message: 'Username exists'
        })
    }
    if (emailCount != 0) {
        return res.status(409).json({
            message: "Mail exists"
        })
    }
    await bcrypt.hash(password, SALT_FOR_PASSWORD, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'Error at create hash password',
                errorMessage: err.message
            })
        }

        createUser(email, username, hash).then(user => {
            const { _id, email, username } = user
            const token = createToken(_id, email, username)

            req.headers.authorization = `Bearer ${token}`
            res.status(200).json({
                message: 'Create user success',
                token,
                user: {
                    id: _id,
                    username
                }
            })
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    message: 'Create user fail',
                    errorMessage: err.message
                })
            }
        })
    })
})

module.exports = registerRouter