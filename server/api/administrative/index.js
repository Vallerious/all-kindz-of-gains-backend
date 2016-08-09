'use strict';

let authRouter = require('express').Router(),
    dictionary = require('./dictionary'),
    editUser =  require('./editUser'),
    programs = require('./programs');

authRouter.get('/getDictionary', dictionary.getDictionary);
authRouter.get('/getSubMuscleGroups', dictionary.getSubMuscleGroups);
authRouter.post('/editUser', editUser.editUser);
authRouter.post('/editMeasurements', editUser.editMeasurements);
authRouter.get('/getMeasurements', editUser.getMeasurements);
authRouter.get('/getProgram', programs.getProgram);
authRouter.post('/addEditProgram', programs.addEditProgram);

module.exports = authRouter;