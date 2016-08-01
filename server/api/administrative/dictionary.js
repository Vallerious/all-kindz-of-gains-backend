'use strict';


module.exports = {
    getDictionary(req, res, next) {
        try {
        if (req.query.dictionaryName) {
            let dictionaryModel = require('./../models/'+req.query.dictionaryName+'.model');
                dictionaryModel.find({  },'name').exec().then(function( data ){
                    res.json(data);
                }); 
        } else {
            res.json({"error":"Dictionary name not provided!"})
        }
        } catch (error) {
            res.json({"error":error.message}) 
        }

    },
    getSubMuscleGroups(req, res, next){
        try {
        if (req.query.muscleGroup) {
            let dictionaryModel = require('./../models/muscleGroups.model');
                dictionaryModel.find({ name: req.query.muscleGroup }).exec().then(function( data ){

                    //res.json({key:data[0]._doc.muscles});

                    let musclesArr = [];
                    for(let i=0;i<data[0]._doc.muscles.length;i++ ){
                        musclesArr.push({key:data[0]._doc.muscles[i], val: data[0]._doc.muscles[i] })
                    }
                    res.json(musclesArr)
                }); 
        } else {
            res.json({"error":"Dictionary name not provided!"})
        }
        } catch (error) {
            res.json({"error":error.message}) 
        }
    }
}