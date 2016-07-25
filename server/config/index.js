'use strict';

let config = {
	dev: 'development',
	test: 'testing',
	prod: 'production',
	port: process.env.PORT || 5001,
	expireTime: 365 * 24 * 60 * 60 * 1,
	secrets: {
		jwt: 'dage'
	}
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
	envConfig = require('./' + config.env);
	// just making sure the require actually
	// got something back :)
	envConfig = envConfig || {};
} catch (e) {
	envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = Object.assign(config, envConfig);