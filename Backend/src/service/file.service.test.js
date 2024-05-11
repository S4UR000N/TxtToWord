import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import FileService from "./file.service";

beforeAll(done => {
    done()
});
  
afterAll(done => {
// Close db connection
    mongoose.disconnect();
    done()
});

const fileId = '663e874f22ad1b57ae6d2cbf';
const invalidId = new ObjectId();

describe('File Service', () => {

    describe('isIdValid', () => {

        test('Should return true', () => {
            const fileService = new FileService();
            const response = fileService.isIdValid(fileId);
            expect(response.success).toEqual(true);
        });
        test('Should return false', () => {
            const fileService = new FileService();
            const response = fileService.isIdValid(invalidId);
            expect(response.success).toEqual(false);
        });
    });
}); 