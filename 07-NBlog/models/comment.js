const Comment = require("../lib/mongo").Comment;
module.exports = {
    addComment(comment) {
        return Comment.create(comment).exec();
    },
    getCommentByPostId(postId) {
        return Comment.find({
                postId: postId
            })
            .populate({
                path: "author",
                model: "user"
            })
            .sort({
                id: 1
            })
            .addCreatedAt()
            .exec();
    },
    getComentById(id) {
        return Comment.find({
                _id: id
            })
            .exec();
    },
    deleteCommentById(id) {
        return Comment.remove({
                _id: id
            })
            .exec();
    },
    deleteCommentByPostId(postId) {
        return Comment.remove({
                postId: postId
            })
            .exec();
    },
    getCommentCountByPostId(postId) {
        return Comment.count({
                postId: postId
            })
            .exec();
    }
}