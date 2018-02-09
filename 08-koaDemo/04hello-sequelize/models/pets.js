const db = require('../lib/db');
const dbtypes = require('../lib/dbtypes');

var Pet = db.defineModel('pets', {
    name: dbtypes.STRING(100),
    gender: dbtypes.BOOLEAN,
    birth: dbtypes.STRING(10),
});

module.exports = Pet;