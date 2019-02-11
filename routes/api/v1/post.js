const express = require('express')
const postRouter = express.Router()

const { getPostByID, createPost, deletePostByID } = require('../../../models/methods/postMethod')

postRouter.get('/:id', async (req, res) => {
    await getPostByID(req.params.id).exec().then(post => {
        res.status(200).json({
            message: "post ok",
            post: post
        })
    }).catch(err => {
        if (err) {
            res.status(500).json({
                message: "Post get faild or exist",
                errorMessage: `${err.message}`
            })
        }
    })
})

postRouter.post('/create', (req, res) => {
    const { title, images, bodyText } = req.body

    createPost(title, images, bodyText).then(result => {
        if (result) {
            res.status(200).json({
                message: "Success create new post",
                post: result
            })
        }
    }).catch(err => {
        if (err) {
            console.log(`Error ${err.message}`)
            res.status(500).json({
                message: "Create faild",
                errorMessage: `${err.message}`
            })
        }
    })
})

postRouter.get('/delete/:id', (req, res) => {
    if (id && id != '') {
        deletePostByID(req.params.id).then(result => {
            if (result) {
                res.status(200).json({
                    message: "Success delete post by ID",
                    post: result
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    message: "Delete post faild",
                    errorMessage: `${err.message}`
                })
            }
        })
    }
})

module.exports = postRouter