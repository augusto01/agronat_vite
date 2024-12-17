/**
 * userRoutes.js
 * 
 * Este archivo define las rutas relacionadas con las operaciones de usuario en la aplicación.
 * 
 * Contenido:
 * - Importa express y crea un router.
 * - Importa el controlador de usuarios (userController).
 * - Define las rutas:
 *   - POST /register: Llama a la función register del controlador para registrar un nuevo usuario.
 *   - POST /login: Llama a la función login del controlador para autenticar a un usuario.
 * - Exporta el router para ser utilizado en el archivo principal.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login); 


module.exports = router;
