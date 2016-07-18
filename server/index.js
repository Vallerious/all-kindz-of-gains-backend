'use strict';

module.exports = {
    init: start()
}

function start() {
    let app = require('express')(),
        api = require('./api/'),
        config = require('./config/'),
        port = config.port

    require('./db/connection')(config.db.url);
    require('./middleware/app.middleware')(app);
    app.use('/api/', api);

    app.use((err, req, res, next) => {
        if (err) {
            console.log(err.message);
            res.status(err.status || 500).send({error: err.message});
        }
    });

    return function () {
        app.listen(port, function () {
            console.log(`Server listening on port ${port}`);
        });
    }
}