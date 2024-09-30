import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import Modulo from "../models/model.js";

dotenv.config();


const schema = {
  description: "Roadmap",
  type: SchemaType.OBJECT,
  properties: {
    roadmapName: {
      type: SchemaType.STRING,
    },
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
  required: ["roadmap","roadmapName"],
};



const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1.3,
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const generateContent = async (req, res) => {
  const modulesData = await Modulo.find();

  const { userQuestionnaire } = req.body;

  const prompt = `
  Actúa como un experto en diseño de currículos educativos de programación, especializado en desarrollo de software con énfasis en JavaScript. Tienes 20 años de experiencia ayudando a personas de diferentes niveles de habilidad a dominar la programación, desde principiantes hasta expertos. 

  Tu tarea es diseñar un plan de estudios personalizado, o Roadmap, utilizando los datos proporcionados en un archivo JSON de módulos de aprendizaje y las respuestas de un cuestionario personalizado que el usuario completó previamente. El objetivo es guiar al usuario a través de una ruta de aprendizaje optimizada y ajustada a sus necesidades, habilidades y metas profesionales. 

  Aquí están los pasos detallados para completar la tarea:

  1. *Análisis del Usuario:*
    - Examina las respuestas del cuestionario (${JSON.stringify(userQuestionnaire)}) para determinar el nivel de habilidad del usuario, sus objetivos profesionales, y sus preferencias de aprendizaje.
    - Identifica las áreas donde el usuario necesita mejorar, áreas en las que muestra dominio y sus metas a corto y largo plazo en el desarrollo de software.

  2. *Estructura de la Ruta de Aprendizaje (TOTALMENTE EN ESPAÑOL):*
    - Utiliza UNICA Y EXCLUSIVAMENTE el contenido del archivo JSON (${JSON.stringify(modulesData)})  que contiene múltiples módulos y lecciones. Los módulos están diseñados para abarcar diferentes aspectos del desarrollo de software.
    - Asigna un nombre acorde al contenido generado y descriptivo , (EVITA POR COMPLETO palabras como 'Roadmap' o similares ).
    - Crea un mínimo de 6 módulos, cada uno con al menos 6 lecciones detalladas. Sin embargo, si el análisis del usuario indica una mayor necesidad de formación, puedes añadir MÁS MÓDULO y MAS LECCIONES.
    - Cada lección debe incluir:
      - Un título claro y conciso.
      - Una descripción detallada y extensa que explique el contenido y los objetivos de aprendizaje de la lección.
      - **VIDEO**: Integra los links de los videos de YouTube proporcionados en el JSON que ya contiene las lecciones.

  3. *Adaptación Personalizada:*
    - Ajusta el contenido de cada módulo y lección en función del nivel de habilidad del usuario. Asegúrate de que los conceptos avanzados se expliquen de manera accesible para quienes tienen menos experiencia, pero al mismo tiempo mantén la profundidad necesaria para los usuarios más avanzados.
    - Si el cuestionario muestra que el usuario tiene áreas de conocimiento más débiles (como conceptos mal interpretados), añade lecciones adicionales que refuercen esas áreas. Si el usuario muestra un alto dominio en ciertos temas, puedes omitir lecciones básicas en esas áreas o sugerir material complementario.

  4. *Revisión Final y Ajustes:*
    - Revisa el Roadmap completo y asegúrate de que cubra todos los aspectos relevantes del desarrollo de software según las necesidades del usuario.
    - Asegúrate de que el ritmo de los módulos sea adecuado para el nivel del usuario. 

  Finalmente, toma una respiración profunda y trabaja en este problema paso a paso.
`;

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
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
