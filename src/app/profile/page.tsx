"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [router])

  // Show skeleton while loading
  if (loading || !user) {
    return <LoadingSkeleton />
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div className="modern-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          fontSize: "3rem",
        }}>
          👤
        </div>
        <h1 className="gradient-text" style={{ fontSize: "2rem" }}>My Profile</h1>
        <p style={{ color: "var(--text-secondary)" }}>Manage your account settings</p>
      </div>

      <div className="modern-card">
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            Full Name
          </label>
          <p style={{ fontSize: "1.125rem", fontWeight: "500" }}>{user.name || "User"}</p>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            Email Address
          </label>
          <p style={{ fontSize: "1.125rem", fontWeight: "500" }}>{user.email}</p>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            Member Since
          </label>
          <p style={{ fontSize: "1.125rem", fontWeight: "500" }}>{new Date().toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            Current Plan
          </label>
          <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#6366f1" }}>Free Plan</p>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={() => router.push("/dashboard")} className="modern-btn" style={{ flex: 1 }}>
            ← Back to Dashboard
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem("user")
              router.push("/login")
            }}
            className="modern-btn"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", flex: 1 }}
          >
            Logout →
          </button>
        </div>
      </div>
    </div>
  )
}