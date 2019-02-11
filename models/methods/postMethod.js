const Post = require('../Post')

module.exports = {

    createPost(title, images, bodyText) {
        return new Post({
            title: title,
            images: images,
            bodyText: bodyText
        }).save()
    },

    getAllPosts() {
        return Post.find()
    },

    getPostByID(id) {
        return Post.findById(id)
    },

    deletePostByID(id) {
        return Post.findByIdAndDelete(id)
    }
}