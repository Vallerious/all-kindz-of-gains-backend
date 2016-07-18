'use strict';

let authMware = require('./token'),
	User = require('./../models/user.model'),
	userUtils = require('./../utils/user.utils');

module.exports = {
	login(req, res, next) {
		let {email, password} = req.body;

		User.verifyUser(email, password).then((user) => {
			if (user) {
				req.user = userUtils.trimUserInfo(user._doc);
				next();
			} else {
				next(new Error('Invalid username or password'));
			}
		});
	},
	register(req, res, next) {
		let { email, password, confirmPass, firstName, lastName } = req.body;

		if (password === confirmPass) {
			User.addUser({ email, password, firstName, lastName }).then((user) => {
				req.user = userUtils.trimUserInfo(user._doc);
				next();
			}).catch((err) => {
				next(new Error(err));
			});
		} else {
			next(new Error('Passwords do not match!'));
		}
	}
}