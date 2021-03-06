'use strict';

let mongoose = require('mongoose'),
    when = require('when'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

let MeasurementsSchema = new Schema({
    userId: {
        type: String,
        required: [true],
        index: { unique: false },
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    bodyFats: {
        type: Number,
    },
    shoulders: {
        type: Number,
    },
    chest: {
        type: Number,
    },
    arms: {
        type: [{
            left:{
                type:Number
            },
            right:{
                type:Number
            }
        }],
    },
    beforeArm: {
        type: [{
            left:{
                type:Number
            },
            right:{
                type:Number
            }
        }],
    },
    waist: {
        type: Number,
    },
    hip: {
        type: Number,
    },
    thigh: {
        type: [{
            left:{
                type:Number
            },
            right:{
                type:Number
            }
        }],
    },
    calf: {
        type: [{
            left:{
                type:Number
            },
            right:{
                type:Number
            }
        }],
    },
    neck: {
        type: Number,
    },
    wrist: {
        type: Number,
    },
    ankle: {
        type: Number,
    },
    date: {
        type: String,
        required: [true]
    },

});



let Measurements = mongoose.model('Mesurements', MeasurementsSchema);


function seedMesurements() {
    Measurements.count({}, (err, count) => {
        if (!count) {
            let mesurements = require('./../../db/seeds/mesurements.json');

            Measurements.collection.insert(mesurements);
        }
    });
}

seedMesurements();
module.exports = Measurements;