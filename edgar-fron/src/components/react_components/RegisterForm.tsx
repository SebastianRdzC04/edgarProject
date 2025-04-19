"use client"

import { useState } from "react"

export default function RegisterForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            const response = await fetch("http://kysedomi.lat:705/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error al registrarse")
            }

            showNotification("success", "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.")

            // Limpiar el formulario
            setUsername("")
            setEmail("")
            setPassword("")
        } catch (error: any) {
            showNotification("error", error.message || "Ocurrió un error al registrarse")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>

            {notification.show && (
                <div style={{
                    ...notificationStyles.base,
                    ...(notification.type === "success" ? notificationStyles.success : notificationStyles.error)
                }}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="usuario123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="email-register">Correo electrónico</label>
                    <input
                        id="email-register"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="password-register">Contraseña</label>
                    <input
                        id="password-register"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        padding: "10px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                        width: "100%"
                    }}
                >
                    {isLoading ? (
                        <>
                            <span style={spinnerStyles}>◌</span>
                            Procesando...
                        </>
                    ) : (
                        "Registrarse"
                    )}
                </button>
            </form>
        </div>
    )
}