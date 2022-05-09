const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/error/error');

const { validationPassword, validationEmail } = require('../../utils/validators/validators');

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
});

userSchema.pre("save", function(next){
    if (!validationPassword(this.password)) {
        return next(setError(404, 'This password is not valid. The password must contained lowercase, uppercase, number and symbol. The length must be between 8 and 12 caracther.'));
    }
    if (!validationEmail(this.email)) {
        return next(setError(404, 'This email is not valid.'));
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;