const mongoose = require ("mongoose");


/**definimos el esquema para el usuario extraido de la db  */

/**======== LOGIN ========= */
    const UsuarioSchema = new mongoose.Schema({
        email: String,
        password: String
    });

    const UsuarioModel = mongoose.model('usuarios ',UsuarioSchema);
    module.exports = UsuarioModel;

/**======== REGISTRO ========= */



