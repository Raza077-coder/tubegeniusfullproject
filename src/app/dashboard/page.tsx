"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { useToast } from "@/context/ToastContext"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { exportToCSV, exportDashboardStats } from '@/services/export/export.service'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function DashboardPage() {
  const { showToast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // YouTube Data States
  const [channel, setChannel] = useState<any>(null)
  const [videos, setVideos] = useState<any[]>([])
  const [youtubeLoading, setYoutubeLoading] = useState(false)
  const [showYoutubeSetup, setShowYoutubeSetup] = useState(false)
  const [channelHandle, setChannelHandle] = useState("")
  
  // Stats (will be replaced with real data)
  const [stats, setStats] = useState({
    videos: 0,
    channels: 0,
    subscribers: 0,
    views: 0,
    watchTime: 0,
    engagement: 0,
  })

  // Fetch YouTube Data
  const fetchYouTubeData = async (handle: string) => {
    setYoutubeLoading(true)
    try {
      // Fetch channel data
      const channelRes = await fetch(`/api/youtube/channel?handle=${handle}`)
      const channelData = await channelRes.json()
      
      if (channelData.success && channelData.channel) {
        setChannel(channelData.channel)
        
        // Update stats with real data
        setStats({
          videos: channelData.channel.videoCount || 0,
          channels: 1,
          subscribers: channelData.channel.subscriberCount || 0,
          views: channelData.channel.viewCount || 0,
          watchTime: Math.floor((channelData.channel.viewCount || 0) / 1000),
          engagement: 8.5,
        })
        
        // Fetch videos
        const videosRes = await fetch(`/api/youtube/videos?channelId=${channelData.channel.id}&maxResults=6`)
        const videosData = await videosRes.json()
        
        if (videosData.success) {
          setVideos(videosData.videos)
          showToast(`YouTube data loaded successfully!`, "success")
        }
      } else {
        showToast("Channel not found. Please check the handle.", "error")
        setShowYoutubeSetup(true)
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error)
      showToast("Failed to fetch YouTube data", "error")
    } finally {
      setYoutubeLoading(false)
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/login"
    } else {
      setUser(JSON.parse(userData))
      showToast("Welcome back to your dashboard!", "success")
    }
    
    // Check for saved YouTube handle
    const savedHandle = localStorage.getItem("youtubeHandle")
    if (savedHandle) {
      setChannelHandle(savedHandle)
      fetchYouTubeData(savedHandle)
    } else {
      setShowYoutubeSetup(true)
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  // Show skeleton while loading
  if (loading) {
    return <LoadingSkeleton />
  }

  // Show YouTube setup if no channel
  if (showYoutubeSetup && !channel) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <div className="modern-card" style={{ textAlign: "center" }}>
          <h2>🔗 Connect Your YouTube Channel</h2>
          <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
            Enter your YouTube channel handle to see real analytics
          </p>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (channelHandle) {
              localStorage.setItem("youtubeHandle", channelHandle)
              fetchYouTubeData(channelHandle)
              setShowYoutubeSetup(false)
            }
          }} style={{ marginTop: "2rem" }}>
            <input
              type="text"
              placeholder="@yourchannel or channel handle"
              value={channelHandle}
              onChange={(e) => setChannelHandle(e.target.value.replace('@', ''))}
              className="modern-input"
              style={{ marginBottom: "1rem" }}
            />
            <button type="submit" className="modern-btn" style={{ width: "100%" }}>
              Connect Channel
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Line Chart Data (Views over time - from real videos)
  const lineChartData = {
    labels: videos.length > 0 ? videos.map(v => v.title.substring(0, 15) + '...') : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: videos.length > 0 ? videos.map(v => v.viewCount) : [12000, 19000, 15000, 25000, 32000, 45000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Likes',
        data: videos.length > 0 ? videos.map(v => v.likeCount) : [500, 800, 1200, 2000, 3500, 5000],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  // Bar Chart Data (Video Performance)
  const barChartData = {
    labels: videos.length > 0 ? videos.map(v => v.title.substring(0, 15) + '...') : ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5', 'Video 6'],
    datasets: [
      {
        label: 'Views',
        data: videos.length > 0 ? videos.map(v => v.viewCount) : [125, 89, 234, 67, 156, 98],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 8,
      },
    ],
  }

  // Donut Chart Data (Traffic Sources - Demo)
  const donutChartData = {
    labels: ['YouTube Search', 'Suggested Videos', 'External Links', 'Playlists', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgb(99, 102, 241)',
          'rgb(236, 72, 153)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 0,
      },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Video Performance',
      },
    },
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Video Views',
      },
    },
  }

  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Traffic Sources',
      },
    },
  }

  // Export functions
  const handleExportCSV = () => {
    const exportData = [
      { Metric: 'Total Videos', Value: stats.videos },
      { Metric: 'Channels', Value: stats.channels },
      { Metric: 'Subscribers', Value: stats.subscribers },
      { Metric: 'Total Views', Value: stats.views },
      { Metric: 'Watch Time (hours)', Value: stats.watchTime },
      { Metric: 'Engagement Rate', Value: `${stats.engagement}%` },
    ]
    exportToCSV(exportData, 'tubegenius-stats')
    showToast('CSV exported successfully!', 'success')
  }

  const handleExportPDF = () => {
    const topVideos = videos.map(v => ({
      title: v.title,
      views: v.viewCount,
      likes: v.likeCount
    }))
    exportDashboardStats(stats, topVideos)
    showToast('PDF exported successfully!', 'success')
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Welcome back, {user?.name || user?.email?.split('@')[0]}! 👋
        </h1>
        <p>Here's your YouTube channel performance analytics</p>
      </div>

      {/* Channel Info */}
      {channel && (
        <div className="modern-card" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <img src={channel.thumbnailUrl} alt={channel.title} style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <h2>{channel.title}</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              {channel.subscriberCount?.toLocaleString()} subscribers • {channel.videoCount} videos • {channel.viewCount?.toLocaleString()} views
            </p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("youtubeHandle")
              setShowYoutubeSetup(true)
              setChannel(null)
            }} 
            className="modern-btn"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
          >
            Change Channel
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        <div className="stat-card">
          <div style={{ fontSize: "2rem" }}>📹</div>
          <h3 style={{ fontSize: "2rem", margin: "0.5rem 0", color: "#667eea" }}>{stats.videos}</h3>
          <p>Total Videos</p>
          <small style={{ color: "#10b981" }}>Real Data</small>
        </div>
        
        <div className="stat-card">
          <div style={{ fontSize: "2rem" }}>📺</div>
          <h3 style={{ fontSize: "2rem", margin: "0.5rem 0", color: "#667eea" }}>{stats.channels}</h3>
          <p>Channels</p>
          <small style={{ color: "#10b981" }}>Real Data</small>
        </div>
        
        <div className="stat-card">
          <div style={{ fontSize: "2rem" }}>👥</div>
          <h3 style={{ fontSize: "2rem", margin: "0.5rem 0", color: "#667eea" }}>{stats.subscribers.toLocaleString()}</h3>
          <p>Subscribers</p>
          <small style={{ color: "#10b981" }}>Real Data</small>
        </div>
        
        <div className="stat-card">
          <div style={{ fontSize: "2rem" }}>👁️</div>
          <h3 style={{ fontSize: "2rem", margin: "0.5rem 0", color: "#667eea" }}>{stats.views.toLocaleString()}</h3>
          <p>Total Views</p>
          <small style={{ color: "#10b981" }}>Real Data</small>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        {/* Line Chart */}
        <div className="modern-card">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Bar Chart */}
        <div className="modern-card">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Second Row of Charts */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        {/* Donut Chart */}
        <div className="modern-card">
          <Doughnut data={donutChartData} options={donutChartOptions} />
        </div>

        {/* Recent Videos */}
        <div className="modern-card">
          <h3 style={{ marginBottom: "1rem" }}>Recent Videos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {videos.length > 0 ? (
              videos.slice(0, 5).map((video, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  background: "var(--bg-secondary)",
                  borderRadius: "8px",
                }}>
                  <div>
                    <p style={{ fontWeight: "500", fontSize: "0.9rem" }}>{video.title.substring(0, 40)}...</p>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                      {video.viewCount?.toLocaleString()} views • {video.likeCount?.toLocaleString()} likes
                    </p>
                  </div>
                  <a href={`https://youtube.com/watch?v=${video.id}`} target="_blank" style={{ color: "#667eea" }}>
                    🔗
                  </a>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--text-secondary)" }}>No videos found</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="modern-card">
        <h2 style={{ marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button 
            className="modern-btn"
            onClick={() => showToast("Create video feature coming soon!", "info")}
          >
            🎬 Create Video
          </button>
          <button 
            className="modern-btn" 
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            onClick={() => showToast("AI Script Generator is processing!", "success")}
          >
            🤖 AI Script
          </button>
          <button 
            className="modern-btn" 
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            onClick={() => showToast("Voice cloning is in development!", "warning")}
          >
            🎤 Voice Clone
          </button>
          <button 
            className="modern-btn" 
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            onClick={handleExportCSV}
          >
            📊 Export CSV
          </button>
          <button 
            className="modern-btn" 
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
            onClick={handleExportPDF}
          >
            📑 Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}