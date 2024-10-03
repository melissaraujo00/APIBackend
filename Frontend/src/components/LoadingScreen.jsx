import React from "react";

export const LoadingScreen = ({ className, textLoading }) => {
  return (
    <div className={`inset-0 flex items-center justify-center ${className}`}>
      <div className="bg-white rounded-lg  p-10 max-w-lg w-full mx-4 ">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-8 border-indigo-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cargando...</h2>
          <p className="text-center text-gray-600">{textLoading}</p>
        </div>
      </div>
    </div>
  );
};
