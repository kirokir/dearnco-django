import { useState, useEffect, useRef } from "preact/hooks";

interface RazorpayCheckoutProps {
  amount: number;
  serviceName: string;
  serviceId: string;
  buttonText?: string;
  buttonClass?: string;
  prefill?: {
    name?: string;
    email?: string;
    phone?: string;
    org?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayCheckout({
  amount,
  serviceName,
  serviceId,
  buttonText = "Pay Now",
  buttonClass = "",
  prefill = {},
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const scriptRef = useRef(false);

  // Load Razorpay SDK
  useEffect(() => {
    if (scriptRef.current) return;
    scriptRef.current = true;

    if (typeof window !== "undefined" && window.Razorpay) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setError("Failed to load payment system.");
    document.head.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      setError("Payment system is loading. Please wait.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          service_name: serviceId,
          customer: {
            name: prefill.name || "",
            email: prefill.email || "",
            phone: prefill.phone || "",
            org: prefill.org || "",
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        // Fallback to razorpay.me if server not configured
        if (orderData.fallback_url) {
          window.open(orderData.fallback_url, "_blank");
          setLoading(false);
          return;
        }
        throw new Error(orderData.error || "Failed to create order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "KINBO TECHNOLOGIES",
        description: serviceName,
        order_id: orderData.order_id,
        prefill: {
          name: prefill.name || "",
          email: prefill.email || "",
          contact: prefill.phone || "",
        },
        notes: {
          service: serviceId,
          org: prefill.org || "",
        },
        theme: {
          color: "#2A9D8F",
          backdrop_color: "rgba(0,0,0,0.85)",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response: any) => {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch("/api/payments/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                service_name: serviceId,
                customer: {
                  name: prefill.name,
                  email: prefill.email,
                  phone: prefill.phone,
                  org: prefill.org,
                  amount,
                  currency: "INR",
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              window.location.href = `/services/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
            } else {
              window.location.href = "/services/payment-cancelled";
            }
          } catch {
            // Even if verification call fails, payment may have succeeded
            window.location.href = `/services/payment-success?payment_id=${response.razorpay_payment_id}`;
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        window.location.href = "/services/payment-cancelled";
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const defaultBtnStyle: Record<string, string> = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    background: "#2A9D8F",
    color: "#0a0a0c",
    fontFamily: '"Poppins", sans-serif',
    fontSize: "0.75rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    cursor: loading ? "wait" : "pointer",
    opacity: loading ? "0.7" : "1",
    transition: "all 0.3s ease",
    border: "none",
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={defaultBtnStyle}
        class={buttonClass}
      >
        {loading ? (
          <>
            <svg
              style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                style={{ opacity: 0.25 }}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                style={{ opacity: 0.75 }}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            {buttonText}
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </>
        )}
      </button>

      {error && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.7rem",
            color: "#ef4444",
            fontFamily: '"Roboto Mono", monospace',
          }}
        >
          {error}
        </p>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
