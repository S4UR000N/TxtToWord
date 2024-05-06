const BaseRepository = require("./base.repository");

class FileRepository extends BaseRepository {
    constructor() {
        super();

        this.run();
    }
}

module.exports = FileRepository;