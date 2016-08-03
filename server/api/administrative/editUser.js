'use strict';


module.exports = {
    editUser(req, res, next) {
        let userModel = require('./../models/user.model');
        try {
        if (req.body.user && req.body.user.email) {

                userModel.find({ email: req.body.user.email  }).exec().then(function(data){
                   //Directly [0] because the email is unique
                   return data[0]._doc; 
                }).then(function(data){
                    let userMerged = Object.assign(data,req.body.user);
                    userModel.where({ email: req.body.user.email }).update(userMerged, function (err, data) {
                        if (!err) {
                            res.json({"res":"Edit was successfull!"});
                        } else {
                            res.json({"err":err.message});
                        }
                    })
                }); 
        } else {
            res.json({"err":"No email supplied!"})
        }
        } catch (error) {
            res.json({"err":error.message}) 
        }

    },
    editMesurements(req, res, next) {
       let mesurementsModel = require('./../models/mesurements.model'); 
       let userModel = require('./../models/user.model');
        try {
        if (req.body.mesurements && req.body.mesurements.userId) {

                mesurementsModel.find({ userId: req.body.mesurements.userId  }).exec().then(function(data){
                   //Directly [0] because the email is unique
                   return data[0]._doc; 
                }).then(function(data){
                    req.body.mesurements.date = req.body.mesurements.date || new Date().toISOString(); 
                    let mesurementsMerged = Object.assign(data,req.body.mesurements);
                    mesurementsModel.where({ userId: req.body.mesurements.userId }).update(mesurementsMerged, function (err, data) {
                        if (!err) {
                            res.json({"res":"Edit was successfull!"});
                        } else {
                            res.json({"err":err.message});
                        }
                    })
                }); 
        } else {
            res.json({"err":"UserId not supplied!"})
        }
        } catch (error) {
            res.json({"err":error.message}) 
        }
    },
    getMesurements(req, res, next) {
       let mesurementsModel = require('./../models/mesurements.model'); 
       let userModel = require('./../models/user.model');
        try {
        if (req.query && req.query.userId) {

                mesurementsModel.find({ userId: req.query.userId  }).exec().then(function(data){
                   //Directly [0] because the email is unique
                   res.json(data); 
                });
        } else {
            res.json({"err":"UserId not supplied!"})
        }
        } catch (error) {
            res.json({"err":error.message}) 
        }
    }
}