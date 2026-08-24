"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const links = [
    { href: "/", label: "🏠 Home" },
    { href: "/dashboard", label: "📊 Dashboard" },
    { href: "/upload", label: "📤 Upload" },
    { href: "/ai-tools", label: "🤖 AI Tools" },
    { href: "/voice-cloning", label: "🎤 Voice Clone" },
    { href: "/payment", label: "💳 Payment" },
    { href: "/settings", label: "⚙️ Settings" },
    { href: "/about", label: "ℹ️ About" },
    { href: "/pricing", label: "💰 Pricing" },
    { href: "/profile", label: "👤 Profile" },
  ]

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(26,26,46,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${theme === "light" ? "#e0e0e0" : "#2a2a4a"}`,
      padding: "0.75rem 2rem",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: "1.3rem",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textDecoration: "none",
        }}>
          🎬 TubeGenius
        </Link>

        {/* Links */}
        <div style={{
          display: "flex",
          gap: "1.2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? "#667eea" : "var(--text)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: pathname === link.href ? "600" : "400",
                transition: "color 0.3s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "0.3rem 0.8rem",
            background: theme === "light" ? "#1a1a2e" : "#f8f9fa",
            color: theme === "light" ? "#ffffff" : "#1a1a2e",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  )
}