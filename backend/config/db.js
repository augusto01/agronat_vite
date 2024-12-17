/**
 * db.js
 * 
 * Este archivo contiene la configuración para conectar la aplicación a la base de datos MongoDB.
 * 
 * Contenido:
 * - Importa las dependencias necesarias: mongoose y dotenv.
 * - Carga las variables de entorno desde el archivo .env.
 * - Define una función connectDB que intenta conectarse a la base de datos utilizando la URI especificada en las variables de entorno.
 * - Exporta la función connectDB para ser utilizada en otros archivos.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
