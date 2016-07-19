'use strict'

let mongoose = require('mongoose'),
    when = require('when'),
    Schema = mongoose.Schema;

let MuscleGroupsSchema = new Schema({
    name: String,
    muscles: []
});

let MuscleGroups = mongoose.model('MuscleGroups', MuscleGroupsSchema);

seedMuscleGroups();

function seedMuscleGroups() {
    MuscleGroups.count({}, (err, count) => {
        if (!count) {
            let muscleGroups = require('./../../db/seeds/muscleGroups.json');
            
            MuscleGroups.collection.insert(muscleGroups);
        }
    });
}

module.exports = MuscleGroups;