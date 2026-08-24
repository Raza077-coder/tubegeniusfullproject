"use client"

import { useState } from "react"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function AIToolsPage() {
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [script, setScript] = useState("")
  const [titles, setTitles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"script" | "titles">("script")

  const generateScript = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setScript(`🎬 VIDEO SCRIPT: ${topic}

📌 INTRO (0:00 - 0:30)
Hey everyone! Welcome back to the channel. Today we're diving deep into ${topic}.

📝 MAIN CONTENT (0:30 - 5:00)
• First, let's understand what ${topic} is all about
• Here are the top 5 tips you need to know
• Common mistakes to avoid

🎯 CONCLUSION (5:00 - 6:00)
Thanks for watching! Don't forget to like, subscribe, and hit that bell icon!

⏰ TIMESTAMPS:
0:00 - Introduction
0:30 - What is ${topic}?
2:00 - Top 5 Tips
4:00 - Common Mistakes
5:30 - Conclusion & Outro`)
    setLoading(false)
  }

  const generateTitles = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setTitles([
      `${topic} - The Ultimate Guide 2024`,
      `How to Master ${topic} in 5 Minutes`,
      `${topic} for Beginners: Complete Tutorial`,
      `Top 10 ${topic} Tips You Need to Know`,
      `${topic} Explained: Everything You Need`,
      `The Truth About ${topic} Nobody Talks About`,
    ])
    setLoading(false)
  }

  // Show skeleton while loading
  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Header */}
      <div className="modern-card" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          🤖 AI Content Generator
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Generate viral scripts, titles, and descriptions with AI
        </p>
      </div>

      {/* Input Section */}
      <div className="modern-card" style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
          What's your video about?
        </label>
        <input
          type="text"
          className="modern-input"
          placeholder="e.g., How to start a YouTube channel, AI tutorial, Gaming tips..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="modern-btn" onClick={generateScript} disabled={!topic}>
            📝 Generate Script
          </button>
          <button 
            className="modern-btn" 
            onClick={generateTitles} 
            disabled={!topic}
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            🎯 Generate Titles
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "2px solid var(--border)" }}>
        <button
          onClick={() => setActiveTab("script")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "none",
            border: "none",
            color: activeTab === "script" ? "var(--primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "script" ? "600" : "400",
            borderBottom: activeTab === "script" ? `2px solid var(--primary)` : "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          📝 Generated Script
        </button>
        <button
          onClick={() => setActiveTab("titles")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "none",
            border: "none",
            color: activeTab === "titles" ? "var(--primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "titles" ? "600" : "400",
            borderBottom: activeTab === "titles" ? `2px solid var(--primary)` : "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          🎯 Generated Titles
        </button>
      </div>

      {/* Output Section */}
      <div className="modern-card" style={{ minHeight: "400px" }}>
        {activeTab === "script" && (
          <>
            <h3 style={{ marginBottom: "1rem" }}>Your AI-Generated Script</h3>
            {script ? (
              <pre style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                background: "var(--bg-secondary)",
                padding: "1rem",
                borderRadius: "12px",
                lineHeight: "1.6",
              }}>
                {script}
              </pre>
            ) : (
              <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem" }}>
                Enter a topic and click "Generate Script" to see your AI-powered script here
              </p>
            )}
          </>
        )}

        {activeTab === "titles" && (
          <>
            <h3 style={{ marginBottom: "1rem" }}>Your AI-Generated Titles</h3>
            {titles.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {titles.map((title, i) => (
                  <div
                    key={i}
                    className="modern-card"
                    style={{
                      padding: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
                  >
                    {i+1}. {title}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem" }}>
                Enter a topic and click "Generate Titles" to see your AI-powered titles here
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}