import BaseRepository from './base.repository.js';
import FileSchema from '../schema/file.schema.js';

class FileRepository extends BaseRepository {
    constructor() {
        super('file', FileSchema);
    }

    async createFile(fileModel) {
        const file = await this.collection.create(fileModel);
        return file._id;
    }

    async readFile(fileId) {
        const file = await this.collection.findById(fileId).exec();
        return file;
    }

    async deleteFile(fileId) {
        const file = await this.collection.deleteOne({ _id: fileId });
    }
}

export default FileRepository;