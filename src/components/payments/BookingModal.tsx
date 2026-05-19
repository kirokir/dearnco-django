import { useState } from "preact/hooks";
import RazorpayCheckout from "./RazorpayCheckout";

interface BookingModalProps {
  serviceName: string;
  serviceId: string;
  amount: number;
  triggerText?: string;
  accentColor?: string;
  showSeats?: boolean;
}

export default function BookingModal({
  serviceName,
  serviceId,
  amount,
  triggerText = "Book Now",
  accentColor = "#2A9D8F",
  showSeats = false,
}: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "pay">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    seats: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = showSeats ? amount * form.seats : amount;

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Capture lead first
      const res = await fetch("/api/payments/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: serviceName,
          college: form.college,
          details: showSeats
            ? `${form.seats} seat(s) for ${serviceName}`
            : `Booking for ${serviceName}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setStep("pay");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: Record<string, string> = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    background: "rgba(42,42,42,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F5F7",
    fontFamily: '"Lora", serif',
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const labelStyle: Record<string, string> = {
    display: "block",
    fontFamily: '"Poppins", sans-serif',
    fontSize: "0.65rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#9CA3AF",
    marginBottom: "0.4rem",
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}40`,
          color: accentColor,
          fontFamily: '"Poppins", sans-serif',
          fontSize: "0.75rem",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {triggerText}
        <svg
          style={{ width: "14px", height: "14px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#0f1117",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#F5F5F7",
              }}
            >
              {serviceName}
            </div>
            <div
              style={{
                fontFamily: '"Roboto Mono", monospace',
                fontSize: "0.65rem",
                color: accentColor,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: "0.15rem",
              }}
            >
              {step === "form" ? "Enter Details" : "Complete Payment"}
            </div>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              setStep("form");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#9CA3AF",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            <svg
              style={{ width: "20px", height: "20px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem" }}>
          {step === "form" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onInput={(e) =>
                    setForm({ ...form, name: (e.target as HTMLInputElement).value })
                  }
                  style={inputStyle}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onInput={(e) =>
                    setForm({ ...form, email: (e.target as HTMLInputElement).value })
                  }
                  style={inputStyle}
                  placeholder="you@domain.com"
                />
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onInput={(e) =>
                    setForm({ ...form, phone: (e.target as HTMLInputElement).value })
                  }
                  style={inputStyle}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label style={labelStyle}>College / Organization</label>
                <input
                  type="text"
                  value={form.college}
                  onInput={(e) =>
                    setForm({ ...form, college: (e.target as HTMLInputElement).value })
                  }
                  style={inputStyle}
                  placeholder="Institution name"
                />
              </div>

              {showSeats && (
                <div>
                  <label style={labelStyle}>Number of Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.seats}
                    onInput={(e) =>
                      setForm({
                        ...form,
                        seats: Math.max(1, parseInt((e.target as HTMLInputElement).value) || 1),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  background: `${accentColor}08`,
                  border: `1px solid ${accentColor}20`,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Roboto Mono", monospace',
                    fontSize: "0.7rem",
                    color: "#9CA3AF",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: accentColor,
                  }}
                >
                  ₹{totalAmount}
                </span>
              </div>

              {error && (
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#ef4444",
                    fontFamily: '"Roboto Mono", monospace',
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "0.5rem",
                  background: accentColor,
                  color: "#0a0a0c",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  transition: "all 0.3s",
                }}
              >
                {submitting ? "Submitting..." : "Proceed to Payment"}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p
                style={{
                  fontFamily: '"Lora", serif',
                  fontSize: "0.875rem",
                  color: "#9CA3AF",
                  marginBottom: "1.5rem",
                }}
              >
                Your details have been captured. Complete the payment below.
              </p>

              <RazorpayCheckout
                amount={totalAmount}
                serviceName={serviceName}
                serviceId={serviceId}
                buttonText={`Pay ₹${totalAmount}`}
                prefill={{
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  org: form.college,
                }}
              />

              <button
                onClick={() => setStep("form")}
                style={{
                  marginTop: "1rem",
                  background: "none",
                  border: "none",
                  color: "#9CA3AF",
                  fontFamily: '"Roboto Mono", monospace',
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                ← Edit Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
