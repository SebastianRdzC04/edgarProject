"use client"

import { useState } from "react"

interface FormMaterialProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormMaterial({ isOpen, onClose, onSuccess }: FormMaterialProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, type: "", message: "" })

  // Estilos de notificación
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

  // Estilo para el spinner
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8000/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, description }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el material")
      }

      showNotification("success", "Material creado exitosamente")
      setName("")
      setDescription("")
      // Close modal immediately
      onClose()
      // Then update the materials list
      onSuccess()
    } catch (error: any) {
      showNotification("error", error.message || "Ocurrió un error al crear el material")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* Keyframes para la animación */}
        <style>
          {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          `}
        </style>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Nuevo Material</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {notification.show && (
          <div style={{
            ...notificationStyles.base,
            ...(notification.type === "success" ? notificationStyles.success : notificationStyles.error)
          }}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre del material</label>
            <input
              id="name"
              type="text"
              placeholder="Ej: Cemento, Varilla, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="description"
              placeholder="Descripción detallada del material"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span style={spinnerStyles as React.CSSProperties}>
                  ◌
                </span>
                Guardando...
              </span>
            ) : (
              "Guardar Material"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
