"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError("")
    setLoading(true)
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      background: "var(--bg)",
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        padding: "2rem",
        background: "var(--card)",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#667eea" }}>
          🔐 TubeGenius
        </h1>
        <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
          Sign in to your account
        </p>

        {error && (
          <div style={{
            padding: "0.75rem",
            background: "#dc354520",
            border: "1px solid #dc3545",
            borderRadius: "8px",
            marginBottom: "1rem",
            color: "#dc3545",
            fontSize: "0.875rem",
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              background: "var(--bg-secondary)",
              color: "var(--text)",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              background: "var(--bg-secondary)",
              color: "var(--text)",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
          <Link 
            href="/forgot-password" 
            style={{ 
              color: "#667eea", 
              textDecoration: "none", 
              fontSize: "0.875rem",
            }}
          >
            Forgot Password?
          </Link>
          <Link 
            href="/" 
            style={{ 
              color: "var(--text-secondary)", 
              textDecoration: "none", 
              fontSize: "0.875rem",
            }}
          >
            Back to Home
          </Link>
        </div>

        <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Demo: Use any email and password
          </p>
        </div>
      </div>
    </div>
  )
}