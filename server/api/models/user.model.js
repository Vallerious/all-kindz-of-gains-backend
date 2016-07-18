'use strict';

let mongoose = require('mongoose'),
    when = require('when'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required!'],
        index: { unique: true },
        set: toLower,
        validate: {
            validator: (val) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    salt: {
        type: String,
        default: generateSalt
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        required: [false, 'Gender is required!'],
        validate: {
            validator: (val) => {
                return val === 'M' || val === 'F';
            },
            message: '{VALUE} is not a valid gender!'
        }
    },
    dateOfBirth: {
        type: Number,
        required: [false, 'Date of birth is required!'],
        validate: {
            validator: validateDate,
            message: '{VALUE} is not a valid date!'
        }
    },
    images: [{
        id: Number,
        generatedName: String,
        originalName: String
    }],
    profileImage: Number,
});

UserSchema.pre('save', function (next) {
    let user = this._doc;
    let {salt, password} = user;

    pbkdfEncryptPassword(password, salt).then((hash) => {
        user.password = hash;
        next();
    });

    user.profileCreatedOn = Date.now();
});

UserSchema.pre('update', function (next) {
    this.options.runValidators = true;
    next();
});

UserSchema.methods.verifyPassword = function (password, salt, hash) {
    return when.promise((resolve, reject) => {
        pbkdfEncryptPassword(password, salt).then((key) => {
            resolve(key === hash);
        });
    });
};

UserSchema.statics.addUser = (data) => {
    let {email, password, confirmPass, firstName, lastName, gender, city, country, dateOfBirth} = data;
    let user = new User({ email, password, confirmPass, firstName, lastName, gender, city, country, dateOfBirth });

    return user.save().then((user) => { return user; });
};

UserSchema.statics.getUserByEmail = (email) => {
    if (email) {
        return User.findOne({ email }).exec().then((user) => { return user; });
    }
};

UserSchema.statics.verifyUser = (email, password) => {
    let deffered = when.defer();

    if (email && password) {

        UserSchema.statics.getUserByEmail(email).then((user) => {
            if (user) {
                user.verifyPassword(password, user.salt, user.password).then((areEqual) => {
                    if (areEqual) {
                        deffered.resolve(user);
                    } else {
                        deffered.resolve(null);
                    }
                });
            } else {
                deffered.resolve(null);
            }
        });
    }

    return deffered.promise;
};

function validateDate(timestamp) {
    return timestamp && (new Date(timestamp)).getTime() > 1;
}

function toLower(text) {
    return text.toLowerCase();
}

function generateSalt() {
    return crypto.randomBytes(256).toString("hex");
}

function pbkdfEncryptPassword(password, salt) {
    let deffered = when.defer();

    crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, key) => {
        if (err) deffered.reject(err);

        deffered.resolve(key.toString('hex'));
    });

    return deffered.promise;
}

let User = mongoose.model('User', UserSchema);

module.exports = User;