/**
 * Usuario.js
 * 
 * Este archivo define el esquema del modelo de usuario para MongoDB utilizando Mongoose.
 * 
 * Contenido:
 * - Importa mongoose.
 * - Define el esquema UserSchema con los campos email y password,
 *   donde email es único y requerido.
 * - Exporta el modelo User basado en el esquema definido, que se utilizará
 *   para interactuar con la colección de usuarios en la base de datos.
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);




