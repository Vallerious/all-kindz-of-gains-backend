'use strict';

let muscleGroups = require('./../models/muscleGroups.model');
let exercises = require('./../models/exercise.model');

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
        if (req.body && req.body.name && req.body.mainMuscleGroup) {
            exercises.findById(req.body._id, function (err, found) {
                let exerciseObj = {};
                if (found && found._doc) {
                    exerciseObj = new exercises({
                        "name": req.body.name || found._doc.name,
                        "mainMuscleGroup": req.body.mainMuscleGroup || found._doc.mainMuscleGroup,
                        "muscles": req.body.muscles || found._doc.muscles || [],
                        "equipment": req.body.equipment || found._doc.equipment || [],
                        "videoLink": req.body.videoLink || found._doc.videoLink || "",
                        "pictures": req.body.pictures || found._doc.pictures || "",
                        "maxes": req.body.maxes || found._doc.maxes || []
                    });
                    exercises.where({ _id: req.body._id }).update(exerciseObj, function (err, data) {
                        if (!err) {
                            res.json("Edit was successfull!");
                        } else {
                            res.json(err);
                        }
                    })
                } else {
                    exerciseObj = new exercises({
                        "name": req.body.name,
                        "mainMuscleGroup": req.body.mainMuscleGroup,
                        "muscles": req.body.muscles || [],
                        "equipment": req.body.equipment || [],
                        "videoLink": req.body.videoLink || "",
                        "pictures": req.body.pictures || "",
                        "maxes": req.body.maxes || []
                    });
                    exerciseObj.save(function (err, data) {
                        if (!err) {
                            res.json("Adding was successfull!");
                        } else {
                            res.json(err);
                        }

                    })
                }


            });
        } else {
            res.json("Wrong validation parameters!");
        }
    },

    getExercises(req, res) {
        var findParams = {};

        if (req.query.exerciseId) {
            findParams = {
                _id: req.query.exerciseId
            };
        }

        exercises
            .find(findParams)
            .exec()
            .then((data) => res.json({exercises: data}))
            .catch((err) => res.json(err));
    }
};