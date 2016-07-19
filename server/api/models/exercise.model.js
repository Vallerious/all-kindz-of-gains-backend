// type, main muscle group, push/pull, video link, pictures, maxes

'use strict'

let mongoose = require('mongoose'),
    when = require('when'),
    Schema = mongoose.Schema,
    exerciseUtils = require('./../utils/exercise.utils');

let ExerciseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!']
    },
    mainMuscleGroup: String,
    muscles: {
        type: [],
        required: [true, 'Muscle groups field is required!'],
        validate: {
            validator: (val) => {
                return exerciseUtils.getMuscleGroups().indexOf(val) > -1
            },
            message: '{VALUE} is not a valid muscle group!'
        }
    },
    isPush: Boolean,
    videoLink: String,
    pictures: [],
    maxes: []
});

let Exercise = mongoose.model('Exercise', ExerciseSchema);

seedMuscleGroups();
seedExercises();

function seedMuscleGroups() {
    let MuscleGroups = mongoose.model('MuscleGroups', new Schema({
        name: String,
        muscles: []
    }));

    MuscleGroups.count({}, (err, count) => {
        if (!count) {
            let muscleGroups = require('./../../db/seeds/muscleGroups.json');
            
            MuscleGroups.collection.insert(muscleGroups);
        }
    });
}

function seedExercises() {
    Exercise.count({}, (err, count) => {
        if (!count) {
            let exercises = require('./../../db/seeds/exercises.json');

            Exercise.collection.insert(exercises);
        }
    });
}

module.exports = Exercise;