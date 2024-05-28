import express from "express";
import cors from "cors";
import userRouter from "./controllers/userController";
import registerRouter from "./controllers/registerRouter";
import loginRouter from "./controllers/loginController";
import sessionRouter from "./controllers/sessionController";

export function App() {
    return express();
}

export const initializeApp = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/session', sessionRouter);
    app.get('/', (request, response) => {
        response.send("Hello!");
    });
};