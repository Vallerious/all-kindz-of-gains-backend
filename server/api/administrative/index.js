'use strict';

let authRouter = require('express').Router(),
    dictionary = require('./dictionary'),
    editUser =  require('./editUser');

authRouter.get('/getDictionary', dictionary.getDictionary);
authRouter.post('/editUser', editUser.editUser);

module.exports = authRouter;