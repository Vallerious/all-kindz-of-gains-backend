'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/exercises', require('./exercises'));
apiRouter.use('/', require('./auth'));

module.exports = apiRouter;
