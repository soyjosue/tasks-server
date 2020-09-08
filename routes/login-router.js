const express = require("express");
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', 'Debe colocar un email valido').isEmail(),
        check('password', 'Debe colocar una contraseña').not().isEmpty()
    ],  
    loginControllers.loginUser
);

router.get('/',
    auth,
    loginControllers.userAuth
)

module.exports = router;