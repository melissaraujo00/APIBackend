import React, { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";

import ModalConfirmation from "./ModalConfirmation";
import { DeleteOneUser } from "../../../components/Api/UserRoutes";

export default function UsersContent({ userRole, usersList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userDeleting, setUserDeleting] = useState();

  const deleteUser = (dataUser) => {
    setUserDeleting(dataUser);
    setIsOpen(true);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {isOpen == true && (
        <ModalConfirmation
          title={"Confimar eliminacion del usuario"}
          body={
            <>
            
              <p className="text-lg">id: {userDeleting._id}</p>
              <p className="text-ls">
                Nombre: {userDeleting.name} {userDeleting.lastName}
              </p>
              <p className="text-ls">Email: {userDeleting.email} </p>
              <p className="text-ls">Rol: {userDeleting.roles} </p>
            </>
          }
          isOpen={setIsOpen}
          execFunction={DeleteOneUser}
          idItem={userDeleting._id}
        />
      )}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Gestión de Usuarios
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombres
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apellidos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersList.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button> */}
                  {userRole == "admin" && (
                    <button
                      onClick={() => deleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
