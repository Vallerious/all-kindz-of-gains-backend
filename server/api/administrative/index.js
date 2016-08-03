'use strict';

let authRouter = require('express').Router(),
    dictionary = require('./dictionary'),
    editUser =  require('./editUser');

authRouter.get('/getDictionary', dictionary.getDictionary);
authRouter.get('/getSubMuscleGroups', dictionary.getSubMuscleGroups);
authRouter.post('/editUser', editUser.editUser);
authRouter.post('/editMesurements', editUser.editMesurements);
authRouter.get('/getMesurements', editUser.getMesurements);

module.exports = authRouter;