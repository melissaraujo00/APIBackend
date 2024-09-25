import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import Modulo from "../models/model.js";

dotenv.config();


const schema = {
  description: "Roadmap",
  type: SchemaType.OBJECT,
  properties: {
    roadmap: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: {
            type: SchemaType.STRING,
          },
          lessons: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: {
                  type: SchemaType.STRING,
                },
                description: {
                  type: SchemaType.STRING,
                },
                videoUrl: {
                  type: SchemaType.STRING,
                },
              },
              required: ["name", "description", "videoUrl"],
            },
          },
        },
        required: ["name", "lessons"],
      },
    },
  },
  required: ["roadmap"],
};



const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 2,
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const generateContent = async (req, res) => {
  const modulesData = await Modulo.find();

  const { userQuestionnaire } = req.body;

  const promt = `
    Actúa como un experto en diseño de currículos educativos de programación, especializado en Full Stack Web Development. Tu objetivo es crear un plan de estudios personalizado.

    Usa el JSON ${JSON.stringify(
      modulesData
    )} y el cuestionario ${JSON.stringify(
    userQuestionnaire
  )} para diseñar una ruta de aprendizaje. Sigue estos pasos:

    Análisis del usuario:
      Evalúa las respuestas del cuestionario para identificar el nivel de habilidad, preferencias de aprendizaje y objetivos profesionales del usuario.

    Estructura de la ruta de aprendizaje:
    	BASADO UNICAMENTE EN LA INFORMACION PROPORNCIONADA
      Crea como minimo 3 módulos, por Ej. .
      Cada módulo debe tener mínimo 2 lecciones.
      Las lecciones deben incluir:
        Título y descripción breve (ej. “HTML5 Essentials: Aprende los fundamentos del HTML5 y su estructura semántica”).
        vIDEO: usa los links de los videos de youtube que contiene el json que se te mostro anteriormente.

    Adaptación personalizada: 
    Ajusta los contenidos al nivel del usuario, asegurando que los conceptos sean claros y accesibles para su nivel de experiencia.

    Toma una respiración profunda y trabaja en este problema paso a paso.
  `;

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: promt,
            },
          ],
        },
        {
          parts: [
            {
              text: "de acuerdo",
            },
          ],
          role: "model",
        },
      ],
    });

    // Envía el promt
    const result = await chat.sendMessage("Genera el roadmap en formato json");
    const responseText = await result.response.text();

    // Devuelve la respuesta
    res.status(200).json(JSON.parse(responseText));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar contenido" });
  }

};

export default generateContent;
