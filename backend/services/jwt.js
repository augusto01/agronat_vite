//importar dependencias 
const jwt = require ('jsonwebtoken');
const moment = require('moment');


//clave secreta
const secret = "CLAVE_SECRETA_del_proyecto_DE_POS_987987";


//generar token 
const createToken = (user) =>{
    const payload = {
                    id: user._id,
                    name: user.name,
                    lastname: user.surname,
                    nickname: user.nickname,
                    email: user.email,
                    rol: user.rol,
                    image: user.image,
                    fecha_creacion: user.creted_at,

                    iat: moment().unix(),
                    exp: moment().add(30, "days").unix()
    }

    return jwt.sign(payload, secret);

}

module.exports = {
    secret,
    createToken,

}