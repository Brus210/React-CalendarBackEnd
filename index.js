

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// console.log(process.env);


//crear servidor express
const app = express();

//BD
dbConnection();

// CORS
app.use(cors())

//Directorio publico
app.use(express.static('public'));

//(Lectura y parseo del body)
app.use(express.json());

//Rutas
//TODO: auth //create,login,renew
app.use('/api/auth', require('./routes/auth'));
//TODO CRUD: eventos
app.use('/api/events', require('./routes/events'));





//escuchar peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});