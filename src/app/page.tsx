export default function HomePage() {
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 60px)",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "3rem", color: "#0070f3" }}>🎬 TubeGenius</h1>
      <h2>AI YouTube Content Creator</h2>
      <p style={{ maxWidth: "600px", marginTop: "1rem" }}>
        Create viral YouTube videos with the power of AI. 
        Generate scripts, clone voices, and optimize your content.
      </p>
      
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        marginTop: "2rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <a href="/dashboard" style={{
          padding: "0.8rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px"
        }}>
          Go to Dashboard
        </a>
        <a href="/pricing" style={{
          padding: "0.8rem 1.5rem",
          backgroundColor: "white",
          color: "#0070f3",
          textDecoration: "none",
          borderRadius: "5px",
          border: "1px solid #0070f3"
        }}>
          View Pricing
        </a>
      </div>
      
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        marginTop: "4rem",
        maxWidth: "1000px"
      }}>
        <div style={{ padding: "1rem" }}>
          <h3>🤖 AI Script Generator</h3>
          <p>Generate engaging video scripts in seconds</p>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3>🎤 Voice Cloning</h3>
          <p>Create natural-sounding voiceovers</p>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3>📊 YouTube Analytics</h3>
          <p>Track your channel performance</p>
        </div>
      </div>
    </div>
  )
}