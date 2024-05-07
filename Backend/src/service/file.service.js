import FileRepository from '../repository/file.repository.js';

class FileService {
    fileRepository = new FileRepository();

    uploadFile(fileModel) {
        this.repository.createFile(fileModel);
    }
    searchFile(fileId) {
        this.repository.readFile(fileId);
    }

    downloadFile(fileId) {
        
    }

    deleteFile(fileId) {
        this.repository.deleteFile(fileId);
    }
}

export default FileService;