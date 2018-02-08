const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(item => {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result;

    }
})

exports.User = mongolass.model('User', {
    name: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
    avatar: {
        type: 'string',

    },
    gender: {
        type: 'string',
        enum: ['m', 'f', 'x']
    },
    bio: {
        type: 'string'
    }
});
exports.User.index({
    name: 1
}, {
    unique: true
}).exec();


exports.Post = mongolass.model('Post', {
    author: {
        type: Mongolass.Types.ObjectId,
        required: true
    },
    title: {
        type: "string",
        require: true
    },
    content: {
        type: "string",
        require: true
    },
    pv: {
        type: 'number',
        default: 0
    }
})
exports.Post.index({
    author: 1,
    _id: -1
}).exec()



exports.Comment = mongolass.model('Comment', {
    author: {
        type: Mongolass.Types.ObjectId,
        required: true
    },
    content: {
        type: 'string',
        require: true
    },
    postId: {
        type: Mongolass.Types.ObjectId,
        required: true
    }
})
exports.Comment.index({
    postId: 1,
    _id: -1

}).exec();