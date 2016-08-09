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
    description: String,
    mainMuscleGroup: String,
    muscles: {
        type: []
    },
    isPush: Boolean,
    videoLink: [String],
    pictures: [],
    maxes: [],
    score: Number
});

let Exercise = mongoose.model('Exercise', ExerciseSchema);

seedExercises();

function seedExercises() {
    Exercise.count({}, (err, count) => {
        if (!count) {
            let exercises = require('./../../db/seeds/exercises.json');

            Exercise.collection.insert(exercises);
        }
    });
}

module.exports = Exercise;