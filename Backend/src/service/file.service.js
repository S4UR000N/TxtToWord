import FileRepository from '../repository/file.repository.js';
import FileModel from '../model/entity/file.model.js';
import mammoth from 'mammoth';

class FileService {
    fileRepository = new FileRepository();

    async uploadFile(file) {
        const options = { transformDocument: mammoth.transforms.docx()};

        const docxData = await mammoth.convertText({ buffer: file.buffer }, options);
        const binaryData = new Binary(docxData);
        
        let fileModel = new FileModel(file.name, binaryData);

        this.repository.createFile(fileModel);
    }

    async searchFile(fileId) {
        const data = await this.fileRepository.readFile(fileId);
        return data;
    }

    deleteFile(fileId) {
        this.repository.deleteFile(fileId);
    }
}

export default FileService;