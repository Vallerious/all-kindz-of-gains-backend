'use strict';

let bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
};