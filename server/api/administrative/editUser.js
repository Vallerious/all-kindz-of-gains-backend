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

    }
}