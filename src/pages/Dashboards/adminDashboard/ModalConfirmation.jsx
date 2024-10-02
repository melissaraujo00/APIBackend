import React from "react";
import { Trash2, CircleX, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorMessage } from "../../../components/ErrorMessage";

const ModalConfirmation = ({ title, body, isOpen, execFunction, idItem }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState("NOT");

  const execute = async () => {
    setIsLoading("LOADING");
    try {
      const response = await execFunction(idItem);
      if (response.status == 200) {
        setResult("Proceso completado");
        setIsLoading(`SUCCESSFUL`);
      } else {
        setResult("Ocurrio un error");
        setIsLoading("ERROR");
      }
    } catch (error) {
      setResult(`Ocurrio un error`);
      setIsLoading("ERROR");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all ">
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-600 mb-6">{title}</p>
          <div className="w-full bg-gray-100 rounded-lg p-4 mb-6">
            {result == null ?  body  :  result }
          </div>
          <div className="flex w-full gap-5 ">
            {isLoading == "NOT" ? (
              <>
                <button
                  onClick={() => execute()}
                  className="flex items-center justify-center w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    isOpen(false);
                  }}
                  className="flex items-center justify-center w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
                >
                  <CircleX className="w-5 h-5 mr-2" />
                  Cancelar
                </button>
              </>
            ) : isLoading == "LOADING" ? (
              <LoadingScreen className={"w-full"} />
            ) : isLoading == "SUCCESSFUL" ? (
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
              >
                <Check className="w-5 h-5 mr-2" />
                Ok
              </button>
            ) : (
              <ErrorMessage
                className={"w-full"}
                message={result}
                textButton={"Reintentar"}
                execAction={execute}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
