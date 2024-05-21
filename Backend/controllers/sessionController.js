const express = require('express');
const Session = require('../models/Session');
const sessionRouter = express.Router();

sessionRouter.post('/', async (request, response) => {
    const body = request.body;
    const sessionId = body.sessionId;
    const title = body.title;
    const duration = body.duration;
    const instructor = body.instructor;
    const session = new Session({
        sessionId,
        title,
        duration,
        instructor
    });
    const savedSession = await session.save();
    response.send(savedSession);
});

sessionRouter.get('/', async (request, response) => {
    const body = request.body;
    const sessions = await Session.find();
    response.send(sessions);
})

module.exports = sessionRouter;