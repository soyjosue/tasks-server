const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si hay token
    if(!token) return res.status(401).json({msg : 'Permiso no obtenido, no hay token'});

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }    

    next();
};