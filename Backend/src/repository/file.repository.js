import BaseRepository from './base.repository.js';
import FileSchema from '../schema/file.schema.js';
import mongoose from 'mongoose';

class FileRepository extends BaseRepository {
    constructor() {
        const fs = new mongoose.Schema(FileSchema);
        super('File', fs);
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
        const file = await this.collection.deleteOne({id: fileId});
    }
}

export default FileRepository;