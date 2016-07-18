'use strict';
let authRouter = require('express').Router(),
    controller = require('./controller'),
    auth = require('./token');

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);
authRouter.use(auth.assignToken());

module.exports = authRouter;