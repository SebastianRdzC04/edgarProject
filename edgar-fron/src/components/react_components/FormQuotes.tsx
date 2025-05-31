"use client"

import { useEffect, useState } from "react"

interface Material {
  id: string;
  name: string;
  description: string;
}

interface SelectedMaterial {
  material_id: string;
  name: string; // For display purposes
}

export default function FormQuotes() {
  // Quote form fields
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [address, setAddress] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [userId, setUserId] = useState("")
  
  // Materials management
  const [materials, setMaterials] = useState<Material[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([])
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(true)
  
  // Form state
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: "", message: "" })
  const [users, setUsers] = useState<{id: string, username: string}[]>([])

  useEffect(() => {
    // Fetch available materials
    const fetchMaterials = async () => {
      try {
        const response = await fetch('https://apiedgar.kysedomi.lat/materials/');
        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        showNotification("error", "Error al cargar materiales");
      } finally {
        setIsLoadingMaterials(false);
      }
    };

    // Fetch available users
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://apiedgar.kysedomi.lat/users/all');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      } catch (error) {
        showNotification("error", "Error al cargar usuarios");
      }
    };

    fetchMaterials();
    fetchUsers();
  }, []);

  // Notification styles
  const notificationStyles = {
    base: {
      padding: "10px",
      marginBottom: "16px",
      borderRadius: "4px",
    },
    success: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    error: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
    }
  }

  // Style for the spinner
  const spinnerStyles = {
    display: "inline-block",
    marginRight: "8px",
    animation: "spin 1s linear infinite"
  }

  const showNotification = (type: string, message: string) => {
    setNotification({ show: true, type, message })
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" })
    }, 3000)
  }

  const handleAddMaterial = (materialId: string) => {
    const materialToAdd = materials.find(m => m.id === materialId);
    if (!materialToAdd) return;

    if (selectedMaterials.some(m => m.material_id === materialId)) {
      showNotification("error", "Este material ya ha sido agregado");
      return;
    }

    setSelectedMaterials([
      ...selectedMaterials,
      {
        material_id: materialId,
        name: materialToAdd.name
      }
    ]);
  }

  const handleRemoveMaterial = (materialId: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.material_id !== materialId));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Step 1: Create the quote - WITHOUT the status field
      const quoteResponse = await fetch("https://apiedgar.kysedomi.lat/quotes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          text,
          address,
          price: Number(price),
          user_id: userId
          // Don't include status field at all since it's not in the QuoteCreate model
        }),
      });

      console.log("Quote payload:", {
        title,
        text,
        address,
        price: Number(price),
        user_id: userId
      });

      if (!quoteResponse.ok) {
        const errorData = await quoteResponse.json();
        throw new Error(errorData.message || "Error al crear la cotización");
      }

      const quoteData = await quoteResponse.json();
      const quoteId = quoteData.id;

      // Step 2: Add materials to the quote
      if (selectedMaterials.length > 0) {
        for (const material of selectedMaterials) {
          const materialResponse = await fetch("https://apiedgar.kysedomi.lat/quote-materials/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              quote_id: quoteId,
              material_id: material.material_id,
              quantity: 0,
              price: 0
            }),
          });

          if (!materialResponse.ok) {
            console.error("Error adding material to quote:", await materialResponse.json());
          }
        }
      }

      showNotification("success", "Cotización creada exitosamente");
      resetForm();
      
    } catch (error: any) {
      showNotification("error", error.message || "Ocurrió un error al crear la cotización");
      console.error("Error details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setText("");
    setAddress("");
    setPrice(0);
    setSelectedMaterials([]);
  };

  return (
    <div className="bg-white shadow-md rounded-xl w-full">
      <div className="p-6 border-b border-gray-200 bg-gray-800 text-white">
        <h3 className="text-2xl font-bold">
          Crear <span className="text-blue-300">Cotización</span>
        </h3>
        <p className="mt-2 text-gray-300">Complete el formulario para crear una nueva cotización.</p>
      </div>

      {/* Keyframes para la animación */}
      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `}
      </style>

      <div className="p-6">
        {notification.show && (
          <div style={{
            ...notificationStyles.base,
            ...(notification.type === "success" ? notificationStyles.success : notificationStyles.error)
          }}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* General Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Título de la Cotización</label>
              <input
                id="title"
                type="text"
                placeholder="Ej: Remodelación de cocina"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="userId" className="text-sm font-medium text-gray-700">Cliente</label>
              <select
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione un cliente</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Dirección</label>
            <input
              id="address"
              type="text"
              placeholder="Ej: Av. Principal #123, Ciudad"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="text-sm font-medium text-gray-700">Descripción de la Cotización</label>
            <textarea
              id="text"
              placeholder="Descripción detallada del trabajo a realizar"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">Precio Estimado (MXN)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Materials Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Materiales</h4>
            
            <div className="mb-4">
              <label htmlFor="addMaterial" className="text-sm font-medium text-gray-700">Agregar Material</label>
              <div className="flex space-x-2 mt-1">
                <select
                  id="addMaterial"
                  disabled={isLoadingMaterials}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione un material</option>
                  {materials.map(material => (
                    <option key={material.id} value={material.id}>{material.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const selectElement = document.getElementById("addMaterial") as HTMLSelectElement;
                    if (selectElement.value) {
                      handleAddMaterial(selectElement.value);
                      selectElement.value = ""; // Reset selection
                    }
                  }}
                  disabled={isLoadingMaterials}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Selected Materials List */}
            <div className="bg-gray-50 rounded-md p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Materiales Seleccionados</h5>
              
              {selectedMaterials.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {selectedMaterials.map((material) => (
                    <li key={material.material_id} className="py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-800">{material.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(material.material_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 py-2">No hay materiales seleccionados</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span style={spinnerStyles as React.CSSProperties}>
                  ◌
                </span>
                Guardando...
              </span>
            ) : (
              "Crear Cotización"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
