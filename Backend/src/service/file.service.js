import FileRepository from '../repository/file.repository.js';
import FileModel from '../model/entity/file.model.js';
import HTMLtoDOCX from 'html-to-docx';

class FileService {
    fileRepository = new FileRepository();

    async uploadFile(fileName, buffer) {
        const htmlData = buffer.toString();
        const docxBuffer = await HTMLtoDOCX(htmlData);
        let fileModel = new FileModel();
        fileModel.name = fileName.split('.')[0] + '.docx';
        fileModel.bytes = docxBuffer;
        let savedFileId = await this.fileRepository.createFile(fileModel);
        return savedFileId;
    }

    async searchFile(fileId) {
        const data = await this.fileRepository.readFile(fileId);
        return data;
    }

    async deleteFile(fileId) {
        const result = await this.fileRepository.deleteFile(fileId);
        if (result.deletedCount > 0) {
            return true;
        }
        return false;
    }
}

export default FileService;