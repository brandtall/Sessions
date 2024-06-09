import {App, initializeApp} from "../app.js";
import request from "supertest";

let app;
app = App();
initializeApp(app)

describe('Test Controllers', () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    })
})