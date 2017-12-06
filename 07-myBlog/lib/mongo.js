const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();

mongolass.connect(config.mongodb);


exports.User = mongolass.model('user', {
    name: {
        type: 'String'
    },
    password: {
        type: 'String'
    },
    avatar: {
        type: 'String'
    },
    gender: {
        type: 'String',
        enum: ['m', 'f', 'x']
    },
    bio: {
        type: 'String'
    }
});
exports.User.index({
    name: 1
}, {
    unique: true
}).exec();