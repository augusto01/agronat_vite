//importar modulos 
const jwt = require ('jsonwebtoken');
const moment = require ('moment')

//importar secreto 
const libjwt = require("../services/jwt.js") 
const secret =  libjwt.secret


//middlewere de autenticacion
exports.auth = (req, res, next) => {
    // Obtener el token del header Authorization
    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        // Verificar y decodificar el token
        let payload = jwt.verify(token, secret);

        // Comprobar la expiración del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).json({
                status: "error",
                message: "Token expirado"
            });
        }

        // Agregar los datos del usuario al objeto req
        req.user = payload;

        // Obtener el parámetro de la URL
        req.params.userId = req.params[0];

        // Llamar al siguiente middleware
        next();
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "Token inválido"+error
        });
    }
};

