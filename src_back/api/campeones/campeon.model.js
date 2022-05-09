const mongoose = require('mongoose');
// Creamos un SCHEMA -> Es un método de una clase que nos permite definir un modelo de datos.
const campeonSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        rol: [{ type: String, required: true, trim: true }],
        position: [{  type: String, required: true, trim: true }],
        tipoDeAlcance: { type: String, required: true, trim: true },
        img: { type: String, required: false, trim: true }
    },
    // Timestamps: fecha de creación - modificación
    {
        timestamps: true
    }
);

// Guardar en Actor la referencia y el Schema
// actors - es el nombre de mi colección en la DB
const Campeones = mongoose.model('campeones', campeonSchema);
// Exportar ES5
module.exports = Campeones;