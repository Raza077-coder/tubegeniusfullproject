"use client"

import { useState, useRef } from "react"
import { useToast } from "@/context/ToastContext"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function UploadPage() {
  const { showToast } = useToast()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Video selection handler
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validation
      const newErrors: { [key: string]: string } = {}
      
      // Check file type
      if (!file.type.startsWith("video/")) {
        newErrors.video = "Please select a valid video file"
        showToast("Please select a valid video file", "error")
      }
      
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        newErrors.video = "Video size should be less than 100MB"
        showToast("Video size should be less than 100MB", "error")
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      
      setVideoFile(file)
      setErrors({})
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
      showToast("Video selected successfully!", "success")
    }
  }

  // Form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!videoFile) {
      newErrors.video = "Please select a video file"
      showToast("Please select a video file", "error")
    }
    
    if (!title.trim()) {
      newErrors.title = "Title is required"
      showToast("Title is required", "error")
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters"
      showToast("Title must be at least 5 characters", "error")
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
      showToast("Title must be less than 100 characters", "error")
    }
    
    if (description.length > 5000) {
      newErrors.description = "Description must be less than 5000 characters"
      showToast("Description must be less than 5000 characters", "error")
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle upload
  const handleUpload = async () => {
    if (!validateForm()) return
    
    setUploading(true)
    showToast("Uploading video... Please wait", "info")
    
    // Simulate upload (replace with actual API call)
    setTimeout(() => {
      showToast("Video uploaded successfully! 🎉", "success")
      setUploading(false)
      
      // Reset form
      setVideoFile(null)
      setVideoPreview("")
      setTitle("")
      setDescription("")
      setTags("")
      setCategory("")
      setPrivacy("public")
      if (fileInputRef.current) fileInputRef.current.value = ""
    }, 3000)
  }

  // Reset form
  const handleReset = () => {
    setVideoFile(null)
    setVideoPreview("")
    setTitle("")
    setDescription("")
    setTags("")
    setCategory("")
    setPrivacy("public")
    setErrors({})
    if (fileInputRef.current) fileInputRef.current.value = ""
    showToast("Form reset successfully", "info")
  }

  // Show skeleton while uploading
  if (uploading) {
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
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📤 Upload Video</h1>
        <p>Share your content with the world</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}>
        {/* Left Column - Video Preview */}
        <div style={{
          padding: "1.5rem",
          background: "var(--card)",
          borderRadius: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>Video Preview</h3>
          
          <div
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              cursor: "pointer",
              background: "var(--bg-secondary)",
              transition: "all 0.3s ease",
            }}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#667eea"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {videoPreview ? (
              <video
                src={videoPreview}
                controls
                style={{ width: "100%", borderRadius: "8px", maxHeight: "300px" }}
              />
            ) : (
              <div style={{ padding: "3rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎥</div>
                <p>Click to select video</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>MP4, WebM, MOV (Max 100MB)</p>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            style={{ display: "none" }}
          />
          
          {errors.video && (
            <p style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.video}</p>
          )}
          
          {videoFile && (
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#10b98120", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.8rem" }}>✅ Selected: {videoFile.name}</p>
              <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </div>

        {/* Right Column - Form */}
        <div style={{
          padding: "1.5rem",
          background: "var(--card)",
          borderRadius: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>Video Details</h3>
          
          {/* Title Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Title <span style={{ color: "#dc3545" }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="modern-input"
              style={{
                borderColor: errors.title ? "#dc3545" : "var(--border)",
              }}
            />
            {errors.title && (
              <p style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors.title}</p>
            )}
            <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {title.length}/100 characters
            </p>
          </div>

          {/* Description Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={4}
              className="modern-input"
              style={{
                borderColor: errors.description ? "#dc3545" : "var(--border)",
                resize: "vertical",
              }}
            />
            {errors.description && (
              <p style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem" }}>{errors.description}</p>
            )}
            <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {description.length}/5000 characters
            </p>
          </div>

          {/* Tags Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., tutorial, how-to, tips"
              className="modern-input"
            />
          </div>

          {/* Category Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="modern-input"
            >
              <option value="">Select category</option>
              <option value="education">📚 Education</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="gaming">🎮 Gaming</option>
              <option value="technology">💻 Technology</option>
              <option value="music">🎵 Music</option>
              <option value="sports">⚽ Sports</option>
              <option value="travel">✈️ Travel</option>
              <option value="food">🍳 Food</option>
            </select>
          </div>

          {/* Privacy Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Privacy
            </label>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="public" 
                  checked={privacy === "public"}
                  onChange={(e) => setPrivacy(e.target.value)}
                /> 
                🌍 Public
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="unlisted" 
                  checked={privacy === "unlisted"}
                  onChange={(e) => setPrivacy(e.target.value)}
                /> 
                🔗 Unlisted
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  name="privacy" 
                  value="private" 
                  checked={privacy === "private"}
                  onChange={(e) => setPrivacy(e.target.value)}
                /> 
                🔒 Private
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleUpload}
              disabled={uploading || !videoFile}
              className="modern-btn"
              style={{ 
                flex: 2,
                opacity: uploading || !videoFile ? 0.6 : 1,
              }}
            >
              {uploading ? "📤 Uploading..." : "📤 Upload Video"}
            </button>
            
            <button
              onClick={handleReset}
              disabled={uploading}
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "var(--bg-secondary)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                cursor: uploading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Upload Tips */}
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "var(--bg-secondary)",
        borderRadius: "10px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          💡 Tips: Use high-quality thumbnails, add relevant tags, and write engaging descriptions for better reach!
        </p>
      </div>
    </div>
  )
}