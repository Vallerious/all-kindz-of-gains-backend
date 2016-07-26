'use strict';

let apiRouter = require('express').Router();

apiRouter.use('/foods', require('./foods'));
apiRouter.use('/exercises', require('./exercises'));
apiRouter.use('/programs', require('./programs'));
apiRouter.use('/administrative', require('./administrative'));
apiRouter.use('/', require('./auth'));

module.exports = apiRouter;
