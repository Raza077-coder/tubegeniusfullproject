"use client"

import { useState } from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [resetLink, setResetLink] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")
    setResetLink("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (data.success) {
        setMessage(data.message)
        if (data.devLink) {
          setResetLink(data.devLink)
        }
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🔐 Forgot Password?</h1>
        <p>Enter your email to reset password</p>
      </div>

      <div style={{
        padding: "1.5rem",
        background: "var(--card)",
        borderRadius: "15px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        {message && (
          <div style={{
            padding: "0.75rem",
            background: "#10b98120",
            border: "1px solid #10b981",
            borderRadius: "8px",
            marginBottom: "1rem",
            color: "#10b981",
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            padding: "0.75rem",
            background: "#dc354520",
            border: "1px solid #dc3545",
            borderRadius: "8px",
            marginBottom: "1rem",
            color: "#dc3545",
          }}>
            {error}
          </div>
        )}

        {resetLink && (
          <div style={{
            padding: "0.75rem",
            background: "#667eea20",
            border: "1px solid #667eea",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}>
            <p style={{ marginBottom: "0.5rem" }}>Click here to reset password (Dev only):</p>
            <a href={resetLink} style={{ color: "#667eea", wordBreak: "break-all" }}>{resetLink}</a>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Email Address
            </label>
            <input
              type="email"
              className="modern-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="modern-btn"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link href="/login" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  )
}