import express from "express";
import bodyParser from "body-parser";
import modulos from "../src/routers/modulos.js"
import cookieParser from "cookie-parser";
import login from "../src/routers/login.js";
import cors from "cors";
import generateContent from "../src/gemini-integration/gemini.js";
import connectDB from "../src/DataBase/db.js";
const app = express();

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
  origin: process.env.URL_CORS_ORIGIN, 
  credentials: true, 
}));
app.use("/api/modulos", modulos);
app.use("/login", login);
app.post("/gemini", generateContent);
app.get('/', (req, res) => {
  res.send('Bienvenido a la FutureCode Vercel');
});

connectDB();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
