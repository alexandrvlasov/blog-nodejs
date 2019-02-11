const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')

const { getUserByEmail } = require('../../../../models/methods/userMethod')
const { createToken } = require('../../../../utils')

loginRouter.post('/', async (req, res) => {
    const reqEmail = String(req.body.email).toLowerCase().split(' ').join('')
    const { password } = req.body

    await getUserByEmail(reqEmail).then(user => {
        if (!user) {
            return res.status(200).json({
                message: 'User no have'
            })
        }

        const { _id, email, username, passwordHash } = user

        bcrypt.compare(password, passwordHash, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Password incorectly',
                    errorMessage: error.message
                })
            }

            if (result) {
                const token = createToken(_id, email, username)

                // req.headers.authorization = `Bearer ${token}`
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    user: {
                        id: _id,
                        username: username
                    }
                })
            }
        })
    }).catch(err => {
        if (err) {
            console.log(`Error get user by email: ${err.message}`)
            res.status(400).json({
                message: 'Error in get user by email',
                errorMessage: err.message
            })
        }
    })
})

module.exports = loginRouter