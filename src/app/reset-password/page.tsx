"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setMessage("")
    setError("")

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      })

      const data = await res.json()

      if (data.success) {
        setMessage(data.message)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
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
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🔐 Reset Password</h1>
        <p>Enter your new password</p>
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              New Password
            </label>
            <input
              type="password"
              className="modern-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="modern-input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="modern-btn"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link href="/login" style={{ color: "#667eea", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}