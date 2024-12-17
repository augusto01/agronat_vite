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
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  nombre_usuario: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  domicilio: {
    calle: { type: String, required: true },
    numero: { type: Number, required: true },
    ciudad: { type: String, required: true },
    provincia: { type: String, required: true },
    codigo_postal: { type: String, required: true }
  }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);





