import request from "supertest";
import mongoose from "mongoose";
import app from "./app.js";
import { ObjectId } from "mongodb";

beforeAll(done => {
    done()
});
  
afterAll(done => {
// Close db connection
    mongoose.disconnect();
    done()
});

// Replace this with a real ID from your database
const fileId = '663fa5c685f2630c9fc2bba0';
let createdId = '';
const invalidId = new ObjectId();

describe('GET /api/search/:fileId', () => { 

    describe('Given a correct fileId', () => {

        test('Should respond with 200', async () => {
            const response = await request(app).get(`/api/search/${fileId}`).send();
            expect(response.status).toBe(200);
        });
    });

    describe('Given an incorrect fileId', () => {

        test('Should respond with 404 - file not found', async () => {
            const response = await request(app).get(`/api/search/${invalidId}`).send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({error: 'File not found'});
        });
    });

    describe('Given an invalid input', () => {

        test('Should respond with 400 and Id should be 24 characters', async () => {
            const response = await request(app).get('/api/search/invalidInput').send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({error: 'Id should be 24 characters'});
        });
    });
});

describe('POST /api/upload', () => {

    describe('Given a valid file', () => {

        test('Should upload a file', async () => {
            const response = await request(app).post('/api/upload').attach('file', './src/assets/testFile.txt');
            createdId = response.body._id;
            expect(response.status).toBe(200);
        });
    });

    describe('Given an invalid file', () => {

        test('Should respond with 500', async () => {
            const response = await request(app).post('/api/upload').attach('file', './src/assets/invalidTestFile.docx');
            expect(response.status).toBe(500);
        });
    });

    describe('Given no file', () => {

        test('Should respond with 400', async () => {
            const response = await request(app).post('/api/upload');
            expect(response.status).toBe(400);
        });
    });
});

describe('GET /api/download/:fileId', () => {

    describe('Given a correct fileId', () => {

        test('Should respond with 200', async () => {
            const response = await request(app).get(`/api/download/${fileId}`).send();
            expect(response.status).toBe(200);
        });
    });

    describe('Given an incorrect fileId', () => {

        test('Should respond with 404 - file not found', async () => {
            const response = await request(app).get(`/api/download/${invalidId}`).send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({error: 'File not found'});
        });
    });

    describe('Given an invalid input', () => {

        test('Should respond with 400 and Id should be 24 characters', async () => {
            const response = await request(app).get('/api/download/invalidInput').send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({error: 'Id should be 24 characters'});
        });
    });
});

describe('DELETE /api/delete/:fileId', () => {

    describe('Given a correct fileId', () => {

        test('Should respond with 200', async () => {
            const response = await request(app).delete(`/api/delete/${createdId}`).send();
            expect(response.status).toBe(200);
        });
    });

    describe('Given an incorrect fileId', () => {

        test('Should respond with 404 - file not found', async () => {
            const response = await request(app).delete(`/api/delete/${invalidId}`).send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({error: 'File deletion failed'});
        });
    });

    describe('Given an invalid input', () => {

        test('Should respond with 400 and Id should be 24 characters', async () => {
            const response = await request(app).delete('/api/delete/invalidInput').send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({error: 'Id should be 24 characters'});
        });
    });
});