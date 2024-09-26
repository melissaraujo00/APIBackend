import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  //   const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerateText = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gemini", {
        prompt,
      });

      console.log(res.data.history);

      //   setResponse(res.data.text);
      setHistory((prev) => [
        ...prev,
        { user: prompt },
        { model: res.data.text },
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error al generar texto:", error);
    }
  };

  //   const handleResetHistory = async () => {
  //     try {
  //       await axios.post("http://localhost:3000/gemini");

  //       setHistory([]);

  //       setResponse("");
  //     } catch (error) {
  //       console.error("Error al resetear historial:", error);
  //     }
  //   };

  return (
    <div className="m-5">
      <h1>Generador de Texto con Gemini API (con Historial)</h1>
      <div className="flex flex-col absolue top-0">
        <textarea
          className="h-20 p-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Introduce tu prompt aquí"
        />
        <button onClick={handleGenerateText} className="">
          Generar Texto
        </button>
      </div>
      <div>
        <h2>Historial de Conversación:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>{item.user ? "Usuario" : "Modelo"}:</strong>{" "}
              {item.user || item.model}
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="bg-slate-300 p-10">
        <span> </span>
      </div> */}
    </div>
  );
}

export default App;
