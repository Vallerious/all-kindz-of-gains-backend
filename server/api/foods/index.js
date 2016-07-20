'use strict';

let authRouter = require('express').Router(),
    Foods = require('./../models/foods.model');

authRouter.get('/', (req, res, next) => {
    let selectObj = {
        "_id": 1,
        "Shrt_Desc": 1,
        "Protein_(g)": 1,
        "Carbohydrt_(g)": 1,
        "Lipid_Tot_(g)": 1,
        "Energ_Kcal": 1
    };

    if (req.query.full === "1") {
        selectObj = {};
    }

    if (req.query.id) {
        let {id} = req.query;

        Foods.findById({ _id: id }, selectObj)
            .exec().then((data) => res.json(data));
    } else {
        let query = Foods.find({}, selectObj);

        query.exec().then((data) => { 
            res.json(data) 
        });
    }
});

module.exports = authRouter;