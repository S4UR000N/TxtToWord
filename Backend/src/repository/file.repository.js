const BaseRepository = require("./base.repository");

class FileRepository extends BaseRepository {
    constructor() {
        super('files');
    }

    createFile(fileModel) {

    }

    readFile(fileId) {

    }

    updateFile(fileModel) {

    }

    deleteFile(fileId) {

    }
}

module.exports = FileRepository;