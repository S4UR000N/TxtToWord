const BaseRepository = require("./base.repository");
const FileModel = require("../model/entity/file.model");
const { ObjectId } = require('mongodb')

class FileRepository extends BaseRepository {
    constructor() {
        super('files');
    }

    async createFile(fileModel) {
        await this.con;
        let fm = new FileModel();
        fm.name = "test name";
        fm.bytes = "123123123123"

        this.col.insertOne(fm)
        .then(res => {
            this.logger.info("file insert success");
            return res;
        })
        .catch(e => {             
            this.logger.error("file insert failure\n" + e);
        });
    }

    async readFile(fileId) {
        await this.con;
        const query = { _id: new ObjectId("663979f073beb50bbed7592f") };
        const file = await this.col.findOne(query);
        console.log(file);
    }

    async updateFile(fileModel) {

    }

    async deleteFile(fileId) {

    }
}

module.exports = FileRepository;