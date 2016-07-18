'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/', require('./auth'));

module.exports = apiRouter;
