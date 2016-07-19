'use strict';

let authRouter = require('express').Router(),
    controller = require('./controller');

authRouter.get('/muscles', controller.getMuscles);

module.exports = authRouter;