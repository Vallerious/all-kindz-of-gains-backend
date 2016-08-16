'use strict';

let authRouter = require('express').Router(),
    controller = require('./controller');

authRouter.get('/muscles', controller.getMuscles);
authRouter.get('/getExercises', controller.getExercises);
authRouter.post('/addExercise', controller.addExercise);

module.exports = authRouter;