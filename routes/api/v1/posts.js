const express = require('express')
const postsRouter = express.Router()

const { getAllPosts } = require('../../../models/methods/postMethod')

postsRouter.get('/', async (req, res) => {
    await getAllPosts().then(posts => {
        if (posts.length === 0) {
            return res.status(200).json({
                message: "No have any posts"
            })
        }

        res.status(200).json({
            message: "Success",
            posts: posts
        })
    }).catch(err => {
        res.status(500).json({
            message: 'No get posts',
            errorMessage: err.message
        })
    })
})

module.exports = postsRouter