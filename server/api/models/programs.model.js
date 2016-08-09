// type, main muscle group, push/pull, video link, pictures, maxes

'use strict'

let mongoose = require('mongoose'),
    when = require('when'),
    Schema = mongoose.Schema;

let programsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!']
    },
    startDate: String,
    programLength: Number,
    summary: String,
    images: [],
    videos: [],
    days: []
});

let programs = mongoose.model('programs', programsSchema);

seedprogramss();

function seedprogramss() {
    programs.count({}, (err, count) => {
        if (!count) {
            let programss = require('./../../db/seeds/programs.json');

            programs.collection.insert(programs);
        }
    });
}

module.exports = programs;