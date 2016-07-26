'use strict';


module.exports = {
    getDictionary(req, res, next) {
        try {
        if (req.query.dictionaryName) {
            let dictionaryModel = require('./../models/'+req.query.dictionaryName+'.model');
                dictionaryModel.find({  }).exec().then((data) => res.json(data)); 
        } else {
            res.json({"error":"Dictionary name not provided!"})
        }
        } catch (error) {
            res.json({"error":error.message}) 
        }

    }
}