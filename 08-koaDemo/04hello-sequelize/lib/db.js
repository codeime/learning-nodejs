const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4')
const config = require('../config/config');
const dbtypes = require('./dbtypes');

function generateId() {
    return uuidv4();
}


let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }

});

sequelize
    .authenticate()
    .then(() => {
        console.log('-------------------------------------Connection has been established successfully.');
    })
    .catch(err => {
        console.error('-------------------------------------Unable to connect to the database:', err);
    });


/* 每个model遵循这个规范 */
function defineModel(name, attributes) {
    var attrs = {
        id: {
            type: dbtypes.ID,
            primaryKey: true
        }
    };

    for (let key in attributes) {

        if (attributes.hasOwnProperty(key)) {
            let opt = attributes[key];
            opt.allowNull = opt.allowNull || false;
            attrs[key] = opt;
        }
    }


    attrs.createdAt = {
        type: dbtypes.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: dbtypes.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: dbtypes.BIGINT,
        allowNull: false
    };

    console.log('model defined for table:' + name + '\n' + JSON.stringify(attrs, function (k, v) {
        if (k === 'type') {
            for (let key in Sequelize) {
                if (key === 'ABSTRICT' || key === 'NUMBER') {
                    continue;
                }
                // let dbType = Sequelize[key];
                let dbType = Sequelize.DataTypes[key];
                if (typeof dbType === 'function') {
                    if (v instanceof dbType) {
                        if (v._length) {
                            return `${dbType.key}(${v._length})`
                        }
                        return dbType.key;
                    }
                    if (v === dbType) {
                        return dbType.key;
                    }
                }
            }
        }
        return v;
    }, ' '));
    let options = {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity...')
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;

                } else {
                    console.log('will update entity...')
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    };
    return sequelize.define(name, attrs, options);

}



var exp = {
    defineModel: defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            return sequelize.sync({
                force: true
            });
        } else {
            throw new Error('cannot sync() when NODE_ENV is set to \'production\'. ')
        }
    }
}

exp.generateId = generateId;

module.exports = exp;