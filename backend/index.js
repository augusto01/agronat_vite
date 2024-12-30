/**
 * index.js
 * 
 * Este es el archivo principal de la aplicación, donde se inicializa el servidor Express
 * y se configuran las rutas.
 * 
 * Contenido:
 * - Importa las dependencias necesarias: express, cors, dotenv, la función de conexión a la base de datos y las rutas de usuario.
 * - Carga las variables de entorno desde el archivo .env.
 * - Inicializa la aplicación Express y configura el middleware para CORS y el análisis de JSON.
 * - Llama a la función connectDB para establecer la conexión con la base de datos.
 * - Configura las rutas de usuario bajo el prefijo /api/users.
 * - Inicia el servidor en el puerto especificado y muestra un mensaje en la consola.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();



app.use('/api/user', userRoutes); // RUTAS USUARIO

const puerto = 5000;
app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ' + puerto);
});
