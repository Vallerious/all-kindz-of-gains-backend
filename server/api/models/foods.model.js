'use strict'

let mongoose = require('mongoose'),
    when = require('when'),
    Schema = mongoose.Schema;

let FoodsSchema = new Schema({});
let Foods = mongoose.model('Foods', FoodsSchema);

function seedFoods() {
    Foods.count({}, (err, count) => {
        if (!count) {
            let foods = require('./../../db/seeds/foods.json');

            Foods.collection.insert(foods);
        }
    });
}

seedFoods();

module.exports = Foods;