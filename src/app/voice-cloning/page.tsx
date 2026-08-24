"use client"

import { useState, useRef } from "react"
import { useToast } from "@/context/ToastContext"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function VoiceCloningPage() {
  const { showToast } = useToast()
  const [recording, setRecording] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioPreview, setAudioPreview] = useState<string>("")
  const [voiceName, setVoiceName] = useState("")
  const [textToSpeak, setTextToSpeak] = useState("")
  const [generatedAudio, setGeneratedAudio] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("record")
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioPreview(audioUrl)
        const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' })
        setAudioFile(file)
        stream.getTracks().forEach(track => track.stop())
        showToast("Recording saved!", "success")
      }

      mediaRecorder.start()
      setRecording(true)
      showToast("Recording started...", "info")
    } catch (error) {
      console.error("Error accessing microphone:", error)
      showToast("Please allow microphone access", "error")
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  // Handle audio file upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('audio/')) {
        showToast("Please select a valid audio file", "error")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast("File size should be less than 10MB", "error")
        return
      }
      setAudioFile(file)
      const audioUrl = URL.createObjectURL(file)
      setAudioPreview(audioUrl)
      showToast("Audio uploaded successfully!", "success")
    }
  }

  // Generate cloned voice (REAL API)
  const generateVoice = async () => {
    if (!textToSpeak) {
      showToast("Please enter text to speak", "error")
      return
    }
    
    setIsGenerating(true)
    try {
      const res = await fetch("/api/voice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak })
      })
      
      const data = await res.json()
      if (data.success) {
        setGeneratedAudio(data.audioUrl)
        showToast("Voice generated successfully!", "success")
      } else {
        showToast(data.error || "Failed to generate voice", "error")
      }
    } catch (error) {
      showToast("Something went wrong", "error")
    } finally {
      setIsGenerating(false)
    }
  }

  // Show skeleton while generating
  if (isGenerating) {
    return <LoadingSkeleton />
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎤 Voice Cloning Studio</h1>
        <p>Clone your voice or create custom AI voices for your videos</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--border)",
      }}>
        <button
          onClick={() => setActiveTab("record")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "none",
            border: "none",
            color: activeTab === "record" ? "var(--primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "record" ? "600" : "400",
            borderBottom: activeTab === "record" ? `2px solid var(--primary)` : "none",
            cursor: "pointer",
          }}
        >
          🎙️ Record Voice
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "none",
            border: "none",
            color: activeTab === "upload" ? "var(--primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "upload" ? "600" : "400",
            borderBottom: activeTab === "upload" ? `2px solid var(--primary)` : "none",
            cursor: "pointer",
          }}
        >
          📤 Upload Audio
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}>
        {/* Left Column - Voice Input */}
        <div style={{
          padding: "1.5rem",
          background: "var(--card)",
          borderRadius: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>🎙️ Voice Input</h3>

          {/* Record Tab */}
          {activeTab === "record" && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: recording ? "#dc3545" : "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animation: recording ? "pulse 1s infinite" : "none",
              }}
              onClick={recording ? stopRecording : startRecording}
              >
                <div style={{ fontSize: "3rem", color: "white" }}>
                  {recording ? "⏹️" : "🎙️"}
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)" }}>
                {recording ? "Recording... Click to stop" : "Click to start recording"}
              </p>
              {audioPreview && (
                <div style={{ marginTop: "1rem" }}>
                  <audio controls src={audioPreview} style={{ width: "100%" }} />
                </div>
              )}
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: "10px",
                  padding: "2rem",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
                onClick={() => document.getElementById("audio-upload")?.click()}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📁</div>
                <p>Click to upload audio file</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  MP3, WAV, M4A (Max 10MB)
                </p>
              </div>
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                style={{ display: "none" }}
              />
              {audioPreview && (
                <div style={{ marginTop: "1rem" }}>
                  <audio controls src={audioPreview} style={{ width: "100%" }} />
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    ✅ {audioFile?.name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Voice Name */}
          <div style={{ marginTop: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Voice Name
            </label>
            <input
              type="text"
              className="modern-input"
              placeholder="e.g., My Voice, Celebrity Voice, etc."
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
            />
          </div>
        </div>

        {/* Right Column - Text to Speech */}
        <div style={{
          padding: "1.5rem",
          background: "var(--card)",
          borderRadius: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>📝 Text to Speech</h3>
          
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Enter Text to Speak
            </label>
            <textarea
              className="modern-input"
              rows={5}
              placeholder="Type the text you want your cloned voice to say..."
              value={textToSpeak}
              onChange={(e) => setTextToSpeak(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>

          <button
            onClick={generateVoice}
            disabled={!textToSpeak || isGenerating}
            className="modern-btn"
            style={{
              width: "100%",
              marginTop: "1rem",
              opacity: !textToSpeak || isGenerating ? 0.6 : 1,
            }}
          >
            {isGenerating ? "Generating..." : "🎤 Generate Cloned Voice"}
          </button>

          {/* Generated Audio Preview */}
          {generatedAudio && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>Generated Voice Preview</h4>
              <audio controls src={generatedAudio} style={{ width: "100%" }} />
              <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "var(--success)" }}>
                ✅ Voice cloned successfully!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Voice Samples Section */}
      <div style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "var(--card)",
        borderRadius: "15px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{ marginBottom: "1rem" }}>🎵 Voice Samples</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}>
          {[
            { name: "Male Voice 1", sample: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { name: "Female Voice 1", sample: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            { name: "Celebrity Voice", sample: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
            { name: "Cartoon Voice", sample: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
          ].map((voice, i) => (
            <div key={i} style={{ padding: "0.75rem", background: "var(--bg-secondary)", borderRadius: "10px", textAlign: "center" }}>
              <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>{voice.name}</p>
              <audio controls src={voice.sample} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "var(--bg-secondary)",
        borderRadius: "10px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          💡 Tip: Record 30 seconds of clear audio for best voice cloning results.
          Supported formats: MP3, WAV, M4A. Max file size: 10MB.
        </p>
      </div>
    </div>
  )
}