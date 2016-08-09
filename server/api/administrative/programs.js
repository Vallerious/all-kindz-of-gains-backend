'use strict';

let programModel = require('./../models/programs.model');
module.exports = {
    getProgram(req, res, next) {
        try {
        if (req.query.programName) {
                programModel.find({  }).exec().then(function( data ){
                    res.json(data);
                }); 
        } else {
            res.json({"error":"Dictionary name not provided!"})
        }
        } catch (error) {
            res.json({"error":error.message}) 
        }

    },
    addEditProgram(req, res, next){
        try {
        if (req.body.program && req.body.program.name) {
                programModel.find({ name: req.body.program.name  }).exec().then(function(data){
                   //Directly [0] because the email is unique
                   let doc = (data[0] && data[0]._doc)?data[0]._doc:{};
                   return doc; 
                }).then(function(data){
                    let programMerged = Object.assign(data,req.body.program);
                    if(data){
                    programModel.where({ name: req.body.program.name }).update(programMerged, function (err, data) {
                        if (!err) {
                            res.json({"res":"Edit was successfull!"});
                        } else {
                            res.json({"err":err.message});
                        }
                    })
                }else{
                     let programsObj = new programModel(programMerged);
                    programsObj.save(function (err, data) {
                        if (!err) {
                            res.json({"res":"Adding was successfull!"});
                        } else {
                            res.json({err:err});
                        }

                    })
                }
                }); 
        } else {
            res.json({"error":"Program name not provided!"})
        }
        } catch (error) {
            res.json({"error":error.message}) 
        }
    }
}