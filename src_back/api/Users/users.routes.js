const UserRoutes = require('express').Router();
const { register, login, logout, getUser } = require('./users.controller');
const { isAuth } = require('../../middlewares/auth.middleware');


UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', [isAuth], logout);
UserRoutes.get('/', [isAuth], getUser);

module.exports = UserRoutes;