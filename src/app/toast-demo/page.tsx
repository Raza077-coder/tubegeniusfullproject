"use client"

import { useToast } from "@/context/ToastContext"

export default function ToastDemoPage() {
  const { showToast } = useToast()

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔔 Toast Notifications Demo</h1>
        <p>Click the buttons to see different toast messages</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
      }}>
        <button
          onClick={() => showToast("Video uploaded successfully!", "success")}
          style={{
            padding: "1rem",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ✅ Success Toast
        </button>

        <button
          onClick={() => showToast("Failed to upload video. Please try again.", "error")}
          style={{
            padding: "1rem",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ❌ Error Toast
        </button>

        <button
          onClick={() => showToast("Your session will expire in 5 minutes.", "warning")}
          style={{
            padding: "1rem",
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ⚠️ Warning Toast
        </button>

        <button
          onClick={() => showToast("New update available! Refresh to install.", "info")}
          style={{
            padding: "1rem",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ℹ️ Info Toast
        </button>
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "var(--card)",
        borderRadius: "10px",
        textAlign: "center",
        border: "1px solid var(--border)",
      }}>
        <p style={{ color: "var(--text-secondary)" }}>
          💡 Toasts automatically disappear after 3 seconds
        </p>
      </div>
    </div>
  )
}