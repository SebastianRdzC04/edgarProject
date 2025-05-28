"use client"

import { useState } from "react"

export default function LoginForm() {
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
            const response = await fetch("https://apiedgar.kysedomi.lat/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión")
            }

            localStorage.setItem("token", data.token)
            showNotification("success", "Bienvenido al sistema del consultorio médico")
            window.location.href = "/"
        } catch (error: any) {
            showNotification("error", error.message || "Ocurrió un error al iniciar sesión")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* Keyframes para la animación */}
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
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
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
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? (
                        <span>
                            <span style={spinnerStyles}>
                                ◌
                            </span>
                            Cargando...
                        </span>
                    ) : (
                        "Iniciar Sesión"
                    )}
                </button>
            </form>
        </div>
    )
}