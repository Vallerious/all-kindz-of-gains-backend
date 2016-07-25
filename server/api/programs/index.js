'use strict';

let authRouter = require('express').Router(),
    controller = require('./controller');

authRouter.get('/generateProgram', controller.generateProgram);

module.exports = authRouter;