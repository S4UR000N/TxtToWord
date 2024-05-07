const { ObjectId } = require('mongodb')

class FileModel {
    _id = new ObjectId();
    name = "";
    bytes = "";
}

module.exports = FileModel;