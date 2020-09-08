const Register = require('../models/Register');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.registerUser = async(req, res) => {
    
    // Comprobar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    };

    // Extraer email y contraseña
    const { email, password } = req.body;
    
    try {
        let register = await Register.findOne({email});
        console.log(register);
        if(register) {
            return res.status(400).json({msg : 'El usuario ya existe'});
        }
        
        // Crear el Usuario
        register = new Register(req.body);

        // Hashear password
        const salt = await bcryptjs.genSalt(10);
        register.password = await bcryptjs.hash(password, salt);

        // guardar en la base de datos
        await register.save(); 
        await res.json({register});

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }    
};