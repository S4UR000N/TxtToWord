import BaseRepository from './base.repository.js';
import FileSchema from '../schema/file.schema.js';
import ResponseModel from '../model/response/response.model.js';
import logger from '../service/logger.service.js';

class FileRepository extends BaseRepository {
    constructor() {
        super('file', FileSchema);
    }

    async createFile(fileModel) {
        let response = new ResponseModel();
        try {
            const file = await this.collection.create(fileModel);
            response.success = true;
            response.data = file;
            return response;
        } catch (error) {
            logger.error('File creation failed' + error);
            response.status = 404;
            response.error = 'File saving failed';
            return response;
        }
    }

    async readFile(fileId) {
        let response = new ResponseModel();
        try {
            const file = await this.collection.findById(fileId).select('_id name').exec();
            if (file === null) {
                response.status = 404;
                response.error = 'File not found';
                return response;
            }
            response.data = file;
            response.success = true;
            return response; 
        } catch (error) {
            logger.error('File reading failed' + error);
            response.error = 'File reading failed';
            return response;
        }
    }

    async downloadFile(fileId) {
        let response = new ResponseModel();
        try {
            const file = await this.collection.findById(fileId).exec();
            if (file === null) {
                response.status = 404;
                response.error = 'File not found';
                return response;
            }
            response.data = file;
            response.success = true;
            return response;
        } catch (error) {
            logger.error('File reading for download failed' + error);
            response.error = 'File reading for download failed';
            return response;
        }
    }

    async deleteFile(fileId) {
        let response = new ResponseModel();
        try {
            const fileDeletion = await this.collection.deleteOne({ _id: fileId });
            if (fileDeletion.deletedCount > 0) {
                response.success = true;
                return response;
            } else {
                response.status = 404;
                response.error = 'File deletion failed';
                return response;
            }
        } catch (error) {
            logger.error('File deletion failed', error);
            response.error = 'File deletion failed';
            return response;
        }
    }
}

export default FileRepository;