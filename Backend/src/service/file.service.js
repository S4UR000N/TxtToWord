const FileRepository = require("../repository/file.repository");

class FileService {
    fileRepository = new FileRepository();

    uploadFile(fileModel) {

    }

    searchFile(fileId) {
        this.fileRepository.readFile();
    }

    downloadFile(fileId) {
        
    }

    deleteFile(fileId) {

    }
}

module.exports = FileService;