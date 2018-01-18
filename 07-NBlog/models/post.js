const Post = require("../lib/mongo").Post;
const marked = require('marked')
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
            .contentToHtml()
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
            .contentToHtml()
            .exec()
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