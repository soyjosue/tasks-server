// Route para registrar usuario

const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');
const { check } = require('express-validator');

// Crear un usuario api/register
router.post('/', 
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'Agrega un email valido.').isEmail(),
        check('gender', 'Seleccione su genero.').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres.').isLength({min: 6})
    ],
    registerControllers.registerUser
);

module.exports = router;