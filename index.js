const express = require('express');
const cors = require('cors');
const { connect } = require('./src_back/utils/database/db');

const { configCloudinary } = require('./src_back/utils/cloudinary/config');

const CampeonRoutes = require('./src_back/api/campeones/campeon.routes');
const UserRoutes = require('./src_back/api/Users/users.routes');

const PORT = process.env.PORT || 8000;

const app = express();

connect();

configCloudinary();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://127.0.0.1:5501', 'http://localhost:8001', 'http://localhost:8000'],
    credentials: true
}));

// Límite de flujo de información
app.use(express.json({ limit: '5mb' }))


// No codifica caracteres reservador que tienene un significado especial en la URI.
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

// Cargar las rutas
app.use('/api/campeones', CampeonRoutes);
app.use('/api/users', UserRoutes);

// Manejador de errores de rutas no encontradas
app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

// Control de errores no esperados o del server
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// Queremos ocultar con qué está realizada nuestra API
app.disable('x-powered-by');



// Escuchadores de nuestro server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port 🙈: ${PORT}`)
});