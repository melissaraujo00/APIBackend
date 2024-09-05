const express = require('express');
const bodyParser = require('body-parser');
const modulos = require('./routers/router');
const login = require('./routers/routerLogin')
const cors = require('cors');
const connectDB = require('./DataBase/db'); 
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/modulo', modulos);
app.use('/login', login );

connectDB();

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



