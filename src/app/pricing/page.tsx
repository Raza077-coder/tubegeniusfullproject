"use client"

export default function PricingPage() {
  const plans = [
    { name: "Free", price: "$0", features: ["1 channel", "10 videos/month", "Basic analytics"] },
    { name: "Pro", price: "$29", features: ["5 channels", "100 videos/month", "Advanced analytics", "AI script generator"] },
    { name: "Business", price: "$99", features: ["Unlimited channels", "Unlimited videos", "Custom AI training", "24/7 support"] }
  ]

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>Pricing Plans</h1>
      <p style={{ textAlign: "center" }}>Choose the plan that works for you</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2rem" }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
            <h2>{plan.name}</h2>
            <h1>{plan.price}</h1>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ margin: "0.5rem 0" }}>✅ {feature}</li>
              ))}
            </ul>
            <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}