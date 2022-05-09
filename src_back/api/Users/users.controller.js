const User = require('./users.model');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');
const { setError } = require('../../utils/error/error');

const { validationId } = require('../../utils/validators/validators');

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ email: user.email });
        if (userExist) {
            return next(setError(404, 'This email already exists.'));
        }
        const userDB = await user.save();
        return res.status(201).json(userDB.name);
    } catch (error) {
        return next(setError(404, 'The register was wrong.'));
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404, 'This email is not register.'))
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = JwtUtils.generateToken(user._id, user.email);
            return res.status(200).json({ id: user._id, username: user.username , token: token });
        } else {
            return next(setError(404, 'This password is not correct.'))
        }
    } catch (error) {
        return next(setError(404, 'The login was wrong.'));
    }
};

const logout = (req, res, next) => {
    try {
        const token = null;
        return res.status(201).json(token);
    } catch (error) {
        return next(setError(404, 'The logout was wrong.'));
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (validationId(req.headers.user, user)) {
            return next(setError(404, 'This action is not allowed.'))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}




module.exports = { register, login, logout, getUser };