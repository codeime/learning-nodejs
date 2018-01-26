const db = require('../lib/db');

var Pet = db.defineModel('pets', {
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
});

module.exports = {
    add(pet) {
        return Pet.create(pet);
    },
}