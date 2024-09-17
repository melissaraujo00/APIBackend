import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async (req, res) => {

    try {

        const prompt = "Generate 5 roadmaps for learning JavaScript";
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.send(response);

    } catch (error) {
        console.log(error);
        res.send("Error");
    }
}

export default generateContent;