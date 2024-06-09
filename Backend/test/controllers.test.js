import {App, initializeApp} from "../app.js";
import request from "supertest";
import mockingoose from "mockingoose";
import User from "../models/User.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

let app;
app = App();
initializeApp(app)

describe('Test Controllers', () => {
    test("Should return 200 for root path", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    })
    const user = {
        _id: "41224d776a326fb40f000001",
        name: "name",
        userId: "2",
        passwordHash: "12345",
        courses: [],
        userType: "Instructor",
        };
    mockingoose(User).toReturn(user, 'find')
    test("Should return 200 for users path", done => {
        request(app)
            .get("/users/")
            .then(response => {
                expect(response.body.id).toEqual(user._id);
                done();
            })
    })
})