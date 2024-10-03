import express from "express";
import bodyParser from "body-parser";
import modulos from "../Backend/src/routers/modulos.js"
import cookieParser from "cookie-parser";
import login from "../Backend/src/routers/login.js";
import cors from "cors";
import generateContent from "../Backend/src/gemini-integration/gemini.js";
import connectDB from "../Backend/src/DataBase/db.js";
const app = express();

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
app.use("/api/modulos", modulos);
app.use("/login", login);
app.post("/gemini", generateContent);
app.get('/', (req, res) => {
  res.send('Bienvenido a la FutureCode ');
});

connectDB();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
