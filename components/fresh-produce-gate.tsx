"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Pincode ranges that are serviceable
// Bangalore: 560xxx
// Mysore/Mysuru: 570xxx, 571xxx
function getPincodeCity(pin: string): "Bangalore" | "Mysore" | null {
  if (!/^\d{6}$/.test(pin)) return null;
  const prefix3 = pin.substring(0, 3);
  if (prefix3 === "560") return "Bangalore";
  if (prefix3 === "570" || prefix3 === "571") return "Mysore";
  return null;
}

type Status = "detecting" | "serviceable" | "not-serviceable" | "ask";

export function FreshProduceGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("detecting");
  const [city, setCity] = useState<string>("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("dhatu_pincode");
    if (saved) {
      const c = getPincodeCity(saved);
      if (c) {
        setCity(c);
        setStatus("serviceable");
        return;
      }
    }

    // Auto-detect via IP
    fetch("https://ipapi.co/json/", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const ipCity: string = (data.city || "").toLowerCase();
        if (
          ipCity.includes("bengaluru") ||
          ipCity.includes("bangalore")
        ) {
          setCity("Bangalore");
          setStatus("serviceable");
          // Store a representative pincode
          localStorage.setItem("dhatu_pincode", "560001");
        } else if (
          ipCity.includes("mysore") ||
          ipCity.includes("mysuru")
        ) {
          setCity("Mysore");
          setStatus("serviceable");
          localStorage.setItem("dhatu_pincode", "570001");
        } else {
          setStatus("ask");
        }
      })
      .catch(() => setStatus("ask"));
  }, []);

  function checkPin() {
    const pin = pinInput.trim();
    const c = getPincodeCity(pin);
    if (!c) {
      setPinError("Fresh Produce is currently available only in Bangalore (560xxx) and Mysore (570xxx/571xxx).");
      return;
    }
    localStorage.setItem("dhatu_pincode", pin);
    setCity(c);
    setPinError("");
    setStatus("serviceable");
  }

  function changePin() {
    localStorage.removeItem("dhatu_pincode");
    setPinInput("");
    setPinError("");
    setStatus("ask");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  // ── Loading ──────────────────────────────────────────────────
  if (status === "detecting") {
    return (
      <section className="w-full py-10 px-6 md:px-12" style={{ backgroundColor: "#F5FBF5" }}>
        <div className="flex items-center justify-center gap-2" style={{ color: "#4A7A5A" }}>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span className="text-sm" style={{ fontFamily: "var(--font-nobel)", color: "#4A7A5A" }}>
            Detecting your location…
          </span>
        </div>
      </section>
    );
  }

  // ── Serviceable ──────────────────────────────────────────────
  if (status === "serviceable") {
    return (
      <div>
        {/* Delivery banner */}
        <div
          className="flex items-center justify-between px-6 py-2 md:px-12"
          style={{ backgroundColor: "#E8F5E9" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🚚</span>
            <span
              className="text-xs font-medium"
              style={{ color: "#2D6A4F", fontFamily: "var(--font-nobel)" }}
            >
              Delivering Fresh Produce to{" "}
              <strong>{city}</strong>
            </span>
          </div>
          <button
            onClick={changePin}
            className="text-[10px] underline underline-offset-2 transition-colors hover:text-[#2D6A4F]"
            style={{ color: "#4A7A5A", fontFamily: "var(--font-nobel)" }}
          >
            Change location
          </button>
        </div>
        {children}
      </div>
    );
  }

  // ── Ask for pincode ──────────────────────────────────────────
  return (
    <section className="w-full py-14 px-6 md:px-12" style={{ backgroundColor: "#F5FBF5" }}>
      <div className="mx-auto max-w-xl text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
          style={{ backgroundColor: "#E8F5E9" }}
        >
          🥬
        </div>

        {/* Heading */}
        <h2
          className="mb-2 text-2xl md:text-3xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#1A3A2A" }}
        >
          Fresh Produce
        </h2>
        <p
          className="mb-1 text-sm"
          style={{ color: "#4A7A5A", fontFamily: "var(--font-nobel)" }}
        >
          Farm-fresh organic produce, delivered to your door.
        </p>
        <p
          className="mb-6 text-xs"
          style={{ color: "#888888", fontFamily: "var(--font-nobel)" }}
        >
          Currently available only in{" "}
          <span className="font-semibold" style={{ color: "#2D6A4F" }}>
            Bangalore
          </span>{" "}
          &{" "}
          <span className="font-semibold" style={{ color: "#2D6A4F" }}>
            Mysore
          </span>.
        </p>

        {/* Pincode input */}
        <div className="flex items-center justify-center gap-2">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter your pincode"
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value.replace(/\D/g, ""));
              setPinError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && checkPin()}
            className="rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-1"
            style={{
              borderColor: "#B2D8C0",
              backgroundColor: "#FFFFFF",
              fontFamily: "var(--font-nobel)",
              color: "#2C2C2C",
              width: "170px",
            }}
          />
          <button
            onClick={checkPin}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#2D6A4F", fontFamily: "var(--font-nobel)" }}
          >
            Check
          </button>
        </div>

        {/* Error / not serviceable */}
        {pinError && (
          <p
            className="mt-4 text-xs leading-relaxed"
            style={{ color: "#C0392B", fontFamily: "var(--font-nobel)" }}
          >
            {pinError}
            <span className="block mt-1" style={{ color: "#888888" }}>
              We're expanding soon — stay tuned!
            </span>
          </p>
        )}

        {/* City pills */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {["Bangalore", "Mysore"].map((c) => (
            <span
              key={c}
              className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest"
              style={{
                borderColor: "#B2D8C0",
                color: "#2D6A4F",
                fontFamily: "var(--font-nobel)",
                backgroundColor: "#FFFFFF",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
