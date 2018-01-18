const Post = require("../lib/mongo").Post;
const CommentModel = require('./comment');
const marked = require('marked')

Post.plugin('addCommentCount', {
    afterFind: function (posts) {
        return Promise.all(posts.map(post => {
            return CommentModel
                .getCommentCountByPostId(post._id)
                .then(count => {
                    post.commentCount = count;
                    return post;
                })
        }))
    },
    afterFindOne: function (post) {
        if (post) {
            return CommentModel
                .getCommentCountByPostId(post._id)
                .then(count => {
                    post.commentCount = count;
                    return post;
                })
        }
        return post;
    }
})


Post.plugin("contentToHtml", {
    afterFind: function (results) {
        return results.map(function (result) {
            result.content = marked(result.content)
            return result;
        });
    },
    afterFindOne: function (result) {
        if (result) {
            result.content = marked(result.content);
        };

        return result;

    }
});
module.exports = {
    create: function create(post) {
        return Post.create(post).exec()
    },
    getPostById(id) {
        return Post
            .findOne({
                _id: id
            })
            .populate({
                path: "author",
                model: "User"
            })
            .addCreatedAt()
            .addCommentCount()
            .contentToHtml()
            .exec()
    },
    getRawPostById(id) {
        return Post
            .findOne({
                _id: id
            })
            .populate({
                path: "author",
                model: "User"
            })
            .addCreatedAt()
            .exec()
    },
    getPosts(author) {
        const query = {};
        if (author) {
            query.author = author
        }
        return Post
            .find(query)
            .populate({
                path: "author",
                model: 'User'
            })
            .sort({
                _id: -1
            })
            .addCreatedAt()
            .addCommentCount()
            .contentToHtml()
            .exec()
    },
    updatePostById(id, data) {
        return Post.update({
                _id: id
            }, {
                $set: data
            })
            .exec()
    },
    deletePostById(id) {
        return Post.remove({
            _id,
            id
        }).exec()
    },
    incPv(id) {
        return Post
            .update({
                _id: id
            }, {
                $inc: {
                    pv: 1
                }
            })
            .exec()
    }
}