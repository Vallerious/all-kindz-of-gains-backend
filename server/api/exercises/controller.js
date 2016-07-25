'use strict';

let muscleGroups = require('./../models/muscleGroups.model');

module.exports = {
    getMuscles(req, res, next) {
        if (req.query.group) {
            let {group} = req.query;

            muscleGroups.find({ name: group }).select({ muscles: 1, _id: 1 }).exec().then((data) => res.json(data));
        } else {
            let query = muscleGroups.find({}).select({ name: 1, _id: 1 });

            query.exec().then((data) => { res.json(data) });
        }
    },
        addExercise(req, res, next) {
            debugger
    }
}