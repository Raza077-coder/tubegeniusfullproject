export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>About TubeGenius</h1>
      <p style={{ textAlign: "center" }}>AI-Powered YouTube Content Creation Platform</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2rem" }}>
        <div style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2>🎯</h2>
          <h3>Our Mission</h3>
          <p>Empower creators with AI tools to produce viral content effortlessly.</p>
        </div>

        <div style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2>💡</h2>
          <h3>Our Vision</h3>
          <p>Revolutionize YouTube content creation with cutting-edge AI technology.</p>
        </div>

        <div style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2>🚀</h2>
          <h3>Our Goal</h3>
          <p>Help 1 million creators grow their channels with AI assistance.</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px" }}>
        <h2>Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>✅ AI Script Generator</div>
          <div>✅ Voice Cloning</div>
          <div>✅ YouTube Analytics</div>
          <div>✅ Thumbnail Generator</div>
          <div>✅ SEO Optimization</div>
          <div>✅ Schedule Upload</div>
        </div>
      </div>
    </div>
  )
}