"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/context/ToastContext"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function SettingsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const [saving, setSaving] = useState(false)
  
  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    location: "",
  })
  
  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false,
    newSubscriber: true,
    newComment: true,
    videoUploaded: false,
    marketingEmails: false,
  })
  
  // Account Settings
  const [accountData, setAccountData] = useState({
    language: "english",
    timezone: "asia/kolkata",
    dateFormat: "DD/MM/YYYY",
    twoFactorAuth: false,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setProfileData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        bio: "",
        website: "",
        location: "",
      })
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [router])

  const handleProfileSave = async () => {
    setSaving(true)
    setTimeout(() => {
      const updatedUser = { ...user, name: profileData.name }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      showToast("Profile updated successfully!", "success")
      setSaving(false)
    }, 1000)
  }

  const handleNotificationSave = async () => {
    setSaving(true)
    setTimeout(() => {
      showToast("Notification preferences saved!", "success")
      setSaving(false)
    }, 1000)
  }

  const handleAccountSave = async () => {
    setSaving(true)
    setTimeout(() => {
      showToast("Account settings saved!", "success")
      setSaving(false)
    }, 1000)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure? This action cannot be undone!")) {
      showToast("Account deleted successfully!", "error")
      setTimeout(() => {
        localStorage.removeItem("user")
        router.push("/login")
      }, 1500)
    }
  }

  // Show skeleton while loading
  if (loading || !user) {
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
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚙️ Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "2rem",
      }}>
        {/* Sidebar */}
        <div style={{
          background: "var(--card)",
          borderRadius: "15px",
          padding: "1rem",
          height: "fit-content",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: activeTab === "profile" ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
              color: activeTab === "profile" ? "white" : "var(--text)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            👤 Profile Settings
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: activeTab === "notifications" ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
              color: activeTab === "notifications" ? "white" : "var(--text)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            🔔 Notifications
          </button>
          <button
            onClick={() => setActiveTab("account")}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: activeTab === "account" ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
              color: activeTab === "account" ? "white" : "var(--text)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            🔐 Account Settings
          </button>
          <button
            onClick={() => setActiveTab("danger")}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: activeTab === "danger" ? "#dc3545" : "transparent",
              color: activeTab === "danger" ? "white" : "#dc3545",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.3s ease",
            }}
          >
            ⚠️ Danger Zone
          </button>
        </div>

        {/* Main Content */}
        <div style={{
          background: "var(--card)",
          borderRadius: "15px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>👤 Profile Settings</h2>
              
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Display Name
                </label>
                <input
                  type="text"
                  className="modern-input"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="modern-input"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="Your email"
                  disabled
                />
                <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  Email cannot be changed
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Bio
                </label>
                <textarea
                  className="modern-input"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Website
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileSave}
                disabled={saving}
                className="modern-btn"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {saving ? "Saving..." : "Save Profile Settings"}
              </button>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>🔔 Notification Preferences</h2>
              
              <div style={{ marginBottom: "1rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4>Email Notifications</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Receive emails about your account</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4>Push Notifications</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Browser push notifications</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.pushNotifications}
                      onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4>Weekly Report</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Get weekly channel analytics</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReport}
                      onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4>New Subscriber Alert</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>When someone subscribes</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.newSubscriber}
                      onChange={(e) => setNotifications({ ...notifications, newSubscriber: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4>New Comment Alert</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>When someone comments</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.newComment}
                      onChange={(e) => setNotifications({ ...notifications, newComment: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>Marketing Emails</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Promotions and updates</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleNotificationSave}
                disabled={saving}
                className="modern-btn"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {saving ? "Saving..." : "Save Notification Settings"}
              </button>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === "account" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>🔐 Account Settings</h2>
              
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Language
                </label>
                <select
                  className="modern-input"
                  value={accountData.language}
                  onChange={(e) => setAccountData({ ...accountData, language: e.target.value })}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Timezone
                </label>
                <select
                  className="modern-input"
                  value={accountData.timezone}
                  onChange={(e) => setAccountData({ ...accountData, timezone: e.target.value })}
                >
                  <option value="asia/kolkata">India (IST)</option>
                  <option value="us/eastern">US (EST)</option>
                  <option value="us/pacific">US (PST)</option>
                  <option value="europe/london">UK (GMT)</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Date Format
                </label>
                <select
                  className="modern-input"
                  value={accountData.dateFormat}
                  onChange={(e) => setAccountData({ ...accountData, dateFormat: e.target.value })}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div style={{ marginBottom: "1rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Add an extra layer of security</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={accountData.twoFactorAuth}
                      onChange={(e) => setAccountData({ ...accountData, twoFactorAuth: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Change Password
                </label>
                <input
                  type="password"
                  className="modern-input"
                  placeholder="Current password"
                  style={{ marginBottom: "0.5rem" }}
                />
                <input
                  type="password"
                  className="modern-input"
                  placeholder="New password"
                  style={{ marginBottom: "0.5rem" }}
                />
                <input
                  type="password"
                  className="modern-input"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                onClick={handleAccountSave}
                disabled={saving}
                className="modern-btn"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {saving ? "Saving..." : "Save Account Settings"}
              </button>
            </div>
          )}

          {/* Danger Zone */}
          {activeTab === "danger" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem", color: "#dc3545" }}>⚠️ Danger Zone</h2>
              
              <div style={{
                padding: "1.5rem",
                border: "1px solid #dc3545",
                borderRadius: "10px",
                background: "rgba(220,53,69,0.05)",
              }}>
                <h3 style={{ marginBottom: "0.5rem" }}>Delete Account</h3>
                <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
                  Once you delete your account, there is no going back. All your data will be permanently removed.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}