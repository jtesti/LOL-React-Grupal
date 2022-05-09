const Campeon = require('./campeon.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const { setError } = require('../../utils/error/error');

const getAll = async (req, res, next) => {
    try {

        const campeones = await Campeon.find().sort({name:1});

        res.status(200).json(campeones);
    } catch (error) {
        return next(setError(404, 'It was not possible to get all the champions'))
    }
}

const getOne = async (req, res, next) => {
    try {

        const { id } = req.params;

        const campeon = await Campeon.findById(id);
        res.status(200).json(campeon);
    } catch (error) {
        return next(setError(404, 'It was not possible to get this champion'))
    }
}


const postOne = async (req, res, next) => {
    try {

        const campeon = new Campeon(req.body);
        if (req.file) campeon.img = req.file.path;
        /* campeon.name = req.body.name;
        campeon.rol = req.body.rol;
        campeon.position = req.body.position;
        campeon.tipoDeAlcance = req.body.tipoDeAlcance; */

        const campeonDB = await campeon.save();
        return res.status(201).json(campeonDB)
    } catch (error) {
        return next(setError(404, 'It was not possible to create'))
    }
}


const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campeon = new Campeon(req.body);
        campeon._id = id;
        if (req.file) campeon.img = req.file.path;

        const updateCampeon = await Campeon.findByIdAndUpdate(id, campeon);
        return res.status(200).json(updateCampeon);
    } catch (error) {
        return next(setError(404, 'It was not possible to change'));
    }
}


const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const campeon = await Campeon.findByIdAndDelete(id);

        if (campeon.img) deleteImgCloudinary(campeon.img)
        
        return res.status(200).json(campeon);
    } catch (error) {
        return next(setError(404, 'It was not possible to delete'));
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}