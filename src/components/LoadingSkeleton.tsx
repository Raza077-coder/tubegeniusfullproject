"use client"

export default function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Header Skeleton */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <div className="skeleton-text" style={{ width: "60%", margin: "0 auto 0.5rem", height: "32px" }}></div>
        <div className="skeleton-text" style={{ width: "40%", margin: "0 auto", height: "20px" }}></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div className="skeleton-icon" style={{ width: "40px", height: "40px", margin: "0 auto 0.5rem" }}></div>
            <div className="skeleton-text" style={{ width: "60%", margin: "0 auto 0.5rem", height: "30px" }}></div>
            <div className="skeleton-text" style={{ width: "40%", margin: "0 auto", height: "16px" }}></div>
          </div>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        <div className="skeleton-card" style={{ padding: "1.5rem", height: "400px" }}>
          <div className="skeleton-text" style={{ width: "50%", marginBottom: "1rem", height: "24px" }}></div>
          <div className="skeleton-chart" style={{ height: "300px" }}></div>
        </div>
        <div className="skeleton-card" style={{ padding: "1.5rem", height: "400px" }}>
          <div className="skeleton-text" style={{ width: "50%", marginBottom: "1rem", height: "24px" }}></div>
          <div className="skeleton-chart" style={{ height: "300px" }}></div>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="skeleton-card" style={{ padding: "1.5rem" }}>
        <div className="skeleton-text" style={{ width: "30%", marginBottom: "1rem", height: "24px" }}></div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-button" style={{ width: "120px", height: "40px", borderRadius: "8px" }}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .skeleton-text, .skeleton-card, .skeleton-icon, .skeleton-chart, .skeleton-button {
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 1000px 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-card {
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .skeleton-text {
          height: 16px;
          border-radius: 4px;
        }

        .skeleton-icon {
          border-radius: 50%;
        }

        .skeleton-chart {
          border-radius: 12px;
        }

        .skeleton-button {
          border-radius: 8px;
        }

        [data-theme="dark"] .skeleton-text,
        [data-theme="dark"] .skeleton-icon,
        [data-theme="dark"] .skeleton-chart,
        [data-theme="dark"] .skeleton-button {
          background: linear-gradient(90deg, #2a2a4a 25%, #3a3a5a 50%, #2a2a4a 75%);
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  )
}