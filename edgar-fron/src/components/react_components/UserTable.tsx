import React, { useEffect, useState } from 'react';

interface User {
  username: string;
  email: string;
  id: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://apiedgar.kysedomi.lat/users/all');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden bg-white shadow-md rounded-xl w-full p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden bg-white shadow-md rounded-xl w-full p-6">
        <div className="flex flex-col items-center justify-center space-y-3 h-40 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-lg font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl w-full">
      <div className="p-6 border-b border-gray-200 bg-gray-800 text-white flex justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            Clientes <span className="text-blue-300">Registrados</span>
          </h3>
          <p className="mt-2 text-gray-300">Lista completa de usuarios en el sistema.</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-300 text-black font-bold rounded-lg hover:bg-blue-400 transition duration-300 flex items-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Cliente
          </button>
        </div>
      </div>

      <div className="w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors">
                        Detalles
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">No hay clientes disponibles</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {users.length > 0 && (
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{users.length}</span> clientes en total
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-gray-800 text-white border border-gray-800 rounded hover:bg-gray-700 transition-colors">
              Exportar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
