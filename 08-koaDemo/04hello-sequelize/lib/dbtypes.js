const Sequelize = require('sequelize');
const types = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'BLOB'];

const exp = {
    ID: Sequelize.STRING(50)
}
for (let type of types) {

    exp[type] = Sequelize[type];
}
module.exports = exp;