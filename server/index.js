'use strict';

module.exports = {
    init: start()
}

function start() {
    let express = require('express'),
        app = express(),
        api = require('./api/'),
        config = require('./config/'),
        port = config.port;

    app.use('/', express.static(__dirname + '/public/public/'));
    require('./db/connection')(config.db.url);
    require('./middleware/app.middleware')(app);
    app.use('/api/', api);

    app.use((err, req, res, next) => {
        if (err) {
            console.log(err.message);
            res.status(err.status || 200).send({ error: err.message });
        }
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/public/index.html');
    });

    return function () {
        app.listen(port, function () {
            console.log(`Server listening on port ${port}`);
        });
    }
}