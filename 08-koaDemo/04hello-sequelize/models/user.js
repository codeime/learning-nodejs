const db = require('../lib/db');

let User = db.defineModel("user", {
    email: {
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100),
    name: db.STRING(50),
    gender: db.BOOLEAN,

});

module.exports = User;