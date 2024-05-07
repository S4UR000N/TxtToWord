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

    searchFile(fileId) {
        // this.repository.readFile(fileId);
        this.fileRepository.readFile('663979f073beb50bbed7592f');
    }

    downloadFile(fileId) {
        
    }

    deleteFile(fileId) {
        this.repository.deleteFile(fileId);
    }
}

export default FileService;