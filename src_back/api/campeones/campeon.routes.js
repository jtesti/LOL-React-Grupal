const CampeonRoutes = require('express').Router();

const upload = require('../../middlewares/updateFile.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./campeon.controller');

const { isAuth } = require('../../middlewares/auth.middleware');

CampeonRoutes.get('/', getAll);

CampeonRoutes.get('/:id', getOne);

CampeonRoutes.post('/', [isAuth], upload.single('img'), postOne);

CampeonRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);

CampeonRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = CampeonRoutes;