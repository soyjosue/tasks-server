const Register = require('../models/Register');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async(req, res) => {
    
    const { email, password } = req.body;

    try {
        const usuario = await Register.findOne({email});

        if(!usuario) {
            return res.status(400).json({msg: 'Usuario no existe.'});
        }

        const passcorrect = await bcryptjs.compare(password, usuario.password);
    
        if(!passcorrect) {
            return res.status(400).json({msg: 'El password es incorrecto.'});
        }

        //Crear token y firmar el JWT
        const payload = {
            user: {
                id: usuario.id
            }
        };
        
        //Firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // enviar token
            res.json({token});
        })


    } catch (error) {
        console.log(error);
    }
};

exports.userAuth = async (req, res) => {
    try {
        const user = await Register.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}