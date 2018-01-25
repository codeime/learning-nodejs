const Sequelize = require('sequelize');
const db = require('./db');

var Pet = sequelize.define('pets', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,

}, {
    timestamps: false
});

module.exports = {
    add(pet) {
        return Pet.create(pet);
    },
}