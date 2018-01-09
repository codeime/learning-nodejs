const MongoClient = require('mongodb').MongoClient;

function __connect(fn) {
    var url = "mongodb://localhost:27017/shuoshuo";
    MongoClient.connect(url, function (err, db) {
        if (err) {
            fn("出错 ", null);
            return;
        }
        fn(null, db);
    })
}

module.exports.insertOne = function (collectionNmae, json, callback) {

    __connect(function (err, db) {
        db.collection(collectionNmae).insertOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}

module.exports.find = function (collectionName, json, c, d) {
    if (arguments.length == 3) {
        let callback = c;
        let skip = 0;
        let limit = 0;

    } else if (arguments.length == 4) {
        let callback = d;
        let args = c;
        let skip = args.page * args.pageSize;
        let limit = args.page;
    } else {
        throw new Error("find参数错误");
        return;
    }

    __connect(function (err, db) {
        let cursor = db.collection(collection).find(json).skip(skip).limit(limit);
        let result = [];
        cursor.each((err, doc) => {
            if (err) {
                callback("出现错误", null);
                return;
            }
            if (doc != null) {
                result.push(doc)
            } else {
                callback(null, result);
                db.close();
            }
        })
    })
}
module.exports.delete = function (collectionName, json, callback) {
    __connect(function (err, db) {
        db.collection(collectionName).deleteMany(json, function (err, result) {
            callback(err, result);
        })
    })
}
module.exports.updata = function (collectionName, json, callback) {
    __connect(function (err, db) {
        db.collection(collectionName).updataMany(json1, json2, function (err, result) {
            callback(err, result)
        })
    })
}
module.exports.count = function (collectionName, json, callback) {
    __connect(function (err, db) {
        let c = db.collection(collectionName).find(json).count();
        callback(err, c);
    })
}