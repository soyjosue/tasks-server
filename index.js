const express = require('express');
const connectDB = require('./config/db-config');

// Crear el servidor
const app = express();

// Conectar la base de datos
connectDB();

// Habilitar express.json();
app.use( express.json({ extended: true }) );

// Puerto del servidor
const port = process.env.PORT || 4000;

// Importar las rutas
app.use('/api/register', require('./routes/register-routes'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
