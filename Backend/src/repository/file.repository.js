import BaseRepository from './base.repository.js';
import FileSchema from '../schema/file.schema.js';

class FileRepository extends BaseRepository {
    constructor() {
        super('File', FileSchema);
    }

    async createFile(fileModel) {
        const file = await this.collection.create(fileModel);
        console.log(file._id);
    }

    async readFile(fileId) {
        const file = await this.collection.findById(fileId).exec();
        console.log(file);
    }

    async deleteFile(fileId) {
        const file = await this.collection.deleteOne({ _id: fileId });
        console.log(file);
    }
}

export default FileRepository;