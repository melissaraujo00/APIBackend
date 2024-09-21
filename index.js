import express from "express";
import bodyParser from "body-parser";
import modulos from "./routers/modulos.js";
import cookieParser from "cookie-parser";
import login from "./routers/login.js";
import cors from "cors";
import generateContent from "./gemini-integration/gemini.js";
import connectDB from "./DataBase/db.js";
const app = express();


const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());


app.use(bodyParser.json());
app.use();
app.use("/api/modulos", modulos);
app.use("/login", login);
app.get("/gemini", generateContent);

connectDB();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



