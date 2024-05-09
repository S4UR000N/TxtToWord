import FileRepository from '../repository/file.repository.js';
import FileModel from '../model/entity/file.model.js';
import HTMLtoDOCX from 'html-to-docx';
import ResponseModel from '../model/response/response.model.js';

class FileService {
    fileRepository = new FileRepository();

    async uploadFile(fileName, buffer) {
        try {
            const htmlData = buffer.toString();
            const docxBuffer = await HTMLtoDOCX(htmlData);
            let fileModel = new FileModel();
            fileModel.name = fileName.split('.')[0] + '.docx';
            fileModel.bytes = docxBuffer;
            const response = await this.fileRepository.createFile(fileModel);
            return response;
        } catch (error) {
            let response = new ResponseModel();
            response.error = 'File conversion failed';
            return response;
        }
    }

    async searchFile(fileId) {
        const responseModel = this.isIdValid(fileId);
        if(responseModel.success)   {
            const response = await this.fileRepository.readFile(fileId);    
            return response;  
        } 
        return responseModel;
    }
  
    async downloadFile(fileId) {
        const responseModel = this.isIdValid(fileId);
        if(responseModel.success) {
            const response = await this.fileRepository.downloadFile(fileId);
            return response;
        } 
        return responseModel;
    }

    async deleteFile(fileId) {
        const responseModel = this.isIdValid(fileId);
        if(responseModel.success) {
            const response = await this.fileRepository.deleteFile(fileId);
            return response; 
        }
       return responseModel;
    }

    isIdValid(fileId) {
        let response = new ResponseModel();
        if(fileId == 24) {
            response.success = true;
            return response;
        } 
        response.status = 400;
        response.error = 'Id should be 24 characters';
        return response;
    }
}

export default FileService;