'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/', require('./auth'));
apiRouter.use('/exercises', require('./exercises'));

module.exports = apiRouter;
