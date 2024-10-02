import React, { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import {
  GetAllUsers,
  getAllRoadmaps,
} from "../../../components/Api/UserRoutes";

export default function RoadmapContent() {
  const [roadmapsInfo, setRoadmapsInfo] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await getAllRoadmaps();
      if (response.status == 200) {
        const roadmapsData = response.data;
        // console.log("roadmapsData", roadmapsData);

        setRoadmapsInfo(roadmapsData);
      }
    };
    data();
  }, []);

  const getRoadmapLength = (roadmap) => {
    let roadmapLength = 0;

    for (
      let roadmapModule = 0;
      roadmapModule < roadmap.length;
      roadmapModule++
    ) {
      for (
        let lesson = 0;
        lesson < roadmap[roadmapModule].lessons.length;
        lesson++
      ) {
        roadmapLength += 1;
      }
    }

    return roadmapLength;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Gestión de rutas de aprendizaje
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del roadmap
              </th>
              <th className="px-6 py-3  text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                Lecciones totales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roadmapsInfo.map((roadmap) => (
              <tr key={roadmap._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {roadmap.roadmapName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {getRoadmapLength(roadmap.roadmap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
