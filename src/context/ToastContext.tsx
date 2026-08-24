"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
  toasts: Toast[]
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return "✅"
      case "error":
        return "❌"
      case "warning":
        return "⚠️"
      case "info":
        return "ℹ️"
    }
  }

  const getColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "#10b981"
      case "error":
        return "#ef4444"
      case "warning":
        return "#f59e0b"
      case "info":
        return "#6366f1"
    }
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: "var(--card)",
            borderLeft: `4px solid ${getColor(toast.type)}`,
            borderRadius: "12px",
            padding: "1rem 1.5rem",
            minWidth: "280px",
            maxWidth: "350px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideInRight 0.3s ease",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>{getIcon(toast.type)}</span>
          <p style={{ flex: 1, margin: 0, fontSize: "0.875rem" }}>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "var(--text-secondary)",
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}