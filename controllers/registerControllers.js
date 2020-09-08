const Register = require('../models/Register');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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
        
        //Crear token y firmar JWT
        const payload = {
            user : {
                id : register.id
            }
        };

        // Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Enviar token
            res.json({token});
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }    
};