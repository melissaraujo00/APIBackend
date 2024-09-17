import express from 'express';
import bodyParser from 'body-parser';
import modulos from './routers/modulos.js';
import cookieParser from 'cookie-parser';
import login from './routers/routerLogin.js';
import cors from 'cors';
import connectDB from './DataBase/db.js';
const app = express();

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());


app.use(bodyParser.json());
app.use(cors());
app.use('/api/modulos', modulos);
app.use('/login', login);

connectDB();

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



