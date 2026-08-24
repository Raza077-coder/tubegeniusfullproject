"use client"

import { useState } from "react"

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const plans = {
    free: {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: ["1 channel", "10 videos/month", "Basic analytics", "Community support"],
      popular: false,
    },
    pro: {
      name: "Pro",
      price: { monthly: 29, yearly: 290 },
      features: ["5 channels", "100 videos/month", "Advanced analytics", "AI script generator", "Priority support", "Voice cloning"],
      popular: true,
    },
    business: {
      name: "Business",
      price: { monthly: 99, yearly: 990 },
      features: ["Unlimited channels", "Unlimited videos", "Custom AI training", "API access", "24/7 support", "Team collaboration"],
      popular: false,
    },
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Name on card is required"
    }
    if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry = "Expiry must be MM/YY"
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "CVV must be 3-4 digits"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert(`Payment successful! You are now on ${plans[selectedPlan as keyof typeof plans].name} plan.`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    setFormData({ ...formData, [e.target.name]: value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const getPrice = () => {
    const price = plans[selectedPlan as keyof typeof plans].price[billingCycle]
    return billingCycle === "yearly" ? price / 10 : price
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        borderRadius: "20px",
        marginBottom: "2rem",
        color: "white",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳 Choose Your Plan</h1>
        <p>Upgrade to unlock premium features and grow your channel faster</p>
      </div>

      {/* Billing Toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div style={{
          background: "var(--card)",
          padding: "0.5rem",
          borderRadius: "40px",
          display: "inline-flex",
          gap: "0.5rem",
          border: "1px solid var(--border)",
        }}>
          <button
            onClick={() => setBillingCycle("monthly")}
            style={{
              padding: "0.5rem 1.5rem",
              background: billingCycle === "monthly" ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
              color: billingCycle === "monthly" ? "white" : "var(--text)",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            style={{
              padding: "0.5rem 1.5rem",
              background: billingCycle === "yearly" ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
              color: billingCycle === "yearly" ? "white" : "var(--text)",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Yearly <span style={{ fontSize: "0.7rem", marginLeft: "0.25rem" }}>(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            onClick={() => setSelectedPlan(key)}
            style={{
              padding: "1.5rem",
              background: selectedPlan === key ? "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))" : "var(--card)",
              border: selectedPlan === key ? "2px solid #667eea" : "1px solid var(--border)",
              borderRadius: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
            }}
          >
            {plan.popular && (
              <div style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                padding: "0.25rem 1rem",
                borderRadius: "20px",
                fontSize: "0.7rem",
                color: "white",
              }}>
                Most Popular
              </div>
            )}
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{plan.name}</h2>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: "bold" }}>${getPrice()}</span>
              <span style={{ color: "var(--text-secondary)" }}>/{billingCycle === "monthly" ? "month" : "month"}</span>
              {billingCycle === "yearly" && (
                <p style={{ fontSize: "0.7rem", color: "#10b981" }}>Billed annually (${plan.price.yearly}/year)</p>
              )}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ margin: "0.5rem 0", fontSize: "0.875rem" }}>✅ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Checkout Form */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}>
        {/* Payment Form */}
        <div style={{
          padding: "1.5rem",
          background: "var(--card)",
          borderRadius: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>💳 Payment Details</h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="modern-input"
                style={{ borderColor: errors.cardNumber ? "#dc3545" : "var(--border)" }}
              />
              {errors.cardNumber && (
                <p style={{ color: "#dc3545", fontSize: "0.7rem", marginTop: "0.25rem" }}>{errors.cardNumber}</p>
              )}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Name on Card
              </label>
              <input
                type="text"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleInputChange}
                className="modern-input"
                style={{ borderColor: errors.cardName ? "#dc3545" : "var(--border)" }}
              />
              {errors.cardName && (
                <p style={{ color: "#dc3545", fontSize: "0.7rem", marginTop: "0.25rem" }}>{errors.cardName}</p>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="modern-input"
                  style={{ borderColor: errors.expiry ? "#dc3545" : "var(--border)" }}
                />
                {errors.expiry && (
                  <p style={{ color: "#dc3545", fontSize: "0.7rem", marginTop: "0.25rem" }}>{errors.expiry}</p>
                )}
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="modern-input"
                  style={{ borderColor: errors.cvv ? "#dc3545" : "var(--border)" }}
                />
                {errors.cvv && (
                  <p style={{ color: "#dc3545", fontSize: "0.7rem", marginTop: "0.25rem" }}>{errors.cvv}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="modern-btn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              💳 Pay ${getPrice()} Now
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{
          padding: "1.5rem",
          background: "linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05))",
          borderRadius: "15px",
          height: "fit-content",
          border: "1px solid var(--border)",
        }}>
          <h3 style={{ marginBottom: "1rem" }}>📋 Order Summary</h3>
          
          <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Plan:</span>
              <strong>{plans[selectedPlan as keyof typeof plans].name}</strong>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
              <span>Billing:</span>
              <strong>{billingCycle === "monthly" ? "Monthly" : "Yearly"}</strong>
            </p>
          </div>

          <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal:</span>
              <span>${getPrice()}</span>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
              <span>Tax:</span>
              <span>$0.00</span>
            </p>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold" }}>
              <span>Total:</span>
              <span style={{ color: "#667eea" }}>${getPrice()}</span>
            </p>
          </div>

          <div style={{
            padding: "0.75rem",
            background: "rgba(16,185,129,0.1)",
            borderRadius: "10px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "0.7rem", color: "#10b981" }}>
              🔒 Secure payment encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        <span>🔒 SSL Secure</span>
        <span>💳 100% Money Back</span>
        <span>🛡️ Fraud Protection</span>
        <span>⭐ 24/7 Support</span>
      </div>
    </div>
  )
}