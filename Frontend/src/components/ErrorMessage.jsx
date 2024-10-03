import React from "react";
import { XCircle, RefreshCw } from "lucide-react";

export const ErrorMessage = ({className, message, execAction, textButton }) => {
  const ActionExec = () => {
    execAction();
  };

  return (
    <div className={`inset-0 flex items-center justify-center  ${className}`} >
      <div className="bg-white rounded-lg  p-8 max-w-lg w-full mx-4 transform transition-all">
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-16 h-16 mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Oops!</h2>
          {/* <p className="text-center text-gray-600 mb-6"></p> */}
          <div className="w-full bg-red-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700 text-center">{message}</p>
          </div>
          <button
            onClick={() => ActionExec()}
            className="flex items-center justify-center w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
};
