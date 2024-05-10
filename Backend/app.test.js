import request from "supertest";
import app from "./app.js";
import mongoose from "mongoose";

beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    // Close db connection
    mongoose.disconnect();
    done()
  })

describe('GET /api/search/:fileId', () => { 

    describe('Given a correct fileId', () => {

        test('Should respond with file object', async () => {
            const response = await request(app).get('/api/search/663b7ab837a8829b30e711d0').send();
            expect(response.body).toEqual({
                name: '',
                _id: '663b7ab837a8829b30e711d0'
            });
        })
    })

    describe('Given an incorrect fileId', () => {

        test('Should respond with 400 and Id should be 24 characters', async () => {
            const response = await request(app).get('/api/search/663b7ab837a882930e711d0').send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({error: 'Id should be 24 characters'});
        })
    })

    describe('Given an invalid input', () => {

        test('Should respond with 400 and Id should be 24 characters', async () => {
            const response = await request(app).get('/api/search/fd').send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({error: 'Id should be 24 characters'});
        })
    })
});

describe('POST /api/upload', () => {

});

describe('GET /api/download/:fileId', () => {

});

describe('DELETE /api/delete/:fileId', () => {

});