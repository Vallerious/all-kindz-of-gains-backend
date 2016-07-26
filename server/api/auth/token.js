'use strict';

let jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    config = require('../../config/'),
    checkToken = expressJwt({ secret: config.secrets.jwt });

exports.decodeToken = () => {
    return (req, res, next) => {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        checkToken(req, res, next);
    };
};

exports.assignToken = () => {
    return (req, res, next) => {
        if(req.user){
        req.user.access_token = signToken(req.user._id);
        res.json(req.user);
    }
    next();
    }
};

let signToken = (id) => {
    return jwt.sign(
        { _id: id },
        config.secrets.jwt,
        { expiresIn: config.expireTime }
    );
};