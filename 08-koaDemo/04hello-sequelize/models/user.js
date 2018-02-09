const db = require('../lib/db');
const dbtypes = require('../lib/dbtypes');

let User = db.defineModel("user", {
    email: {
        type: dbtypes.STRING(100),
        unique: true
    },
    password: dbtypes.STRING(100),
    name: dbtypes.STRING(50),
    gender: dbtypes.BOOLEAN,

});

module.exports = User;