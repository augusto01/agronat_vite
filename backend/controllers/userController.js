/**
 * userController.js
 * 
 * Este archivo contiene la lógica de negocio relacionada con los usuarios,
 * incluyendo el registro y el inicio de sesión.
 * 
 * Contenido:
 * - Importa el modelo de usuario (User) y las bibliotecas bcrypt y jsonwebtoken.
 * - Define las funciones:
 *   - register: Maneja la creación de nuevos usuarios, valida la entrada,
 *     cifra la contraseña y guarda el usuario en la base de datos.
 *   - login: Maneja la autenticación de usuarios, verifica las credenciales
 *     y genera un token JWT si las credenciales son válidas.
 * - Ambas funciones envían respuestas adecuadas según el resultado de las operaciones.
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ===================================== REGISTRO DE USUARIO =====================================//
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// ===================================== INICIO DE SESIÓN =====================================//
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    try {
        const user = await User.findOne({ email });
        console.log('Usuario encontrado:', user);
        if (!user) {
            console.log('Usuario no encontrado con el email:', email);
            return res.status(401).send('Invalid credentials');
        }

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            
            // Si los password coinciden generamos el token y obtenemos los datos del usuario
            res.json({
                token,
                nombre: user.nombre,
                apellido: user.apellido,
                username: user.nombre_usuario,
                email: user.email,
                domicilio: {
                  calle: user.domicilio.calle,
                  numero: user.domicilio.numero,
                  ciudad: user.domicilio.ciudad,
                  provincia: user.domicilio.provincia,
                  codigo_postal: user.domicilio.codigo_postal
                }
              });

              console.log('Datos del usuario:', user);

              
        } else {
            res.status(401).send('Error login');
        }
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
};
