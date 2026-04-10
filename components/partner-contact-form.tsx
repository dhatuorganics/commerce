"use client";

import { useState } from "react";

const SUBJECTS = [
  { value: "exports", label: "Exports" },
  { value: "white-labelling", label: "White Labelling" },
  { value: "franchise", label: "Franchise" },
  { value: "retail-store", label: "Retail Store" },
  { value: "others", label: "Others" },
];

export function PartnerContactForm({ preselect }: { preselect?: string }) {
  const [subject, setSubject] = useState(preselect || "");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Compose mailto link as reliable no-backend fallback
    const subjectLabel = SUBJECTS.find((s) => s.value === subject)?.label || subject;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Enquiry Type: ${subjectLabel}`,
      ``,
      `Message:`,
      form.message,
    ].join("\n");

    // Small delay for perceived loading
    await new Promise((r) => setTimeout(r, 600));
    window.location.href = `mailto:info@dhatuorganics.com?subject=Partner Enquiry – ${subjectLabel}&body=${encodeURIComponent(body)}`;
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(204,153,102,0.15)" }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#CC9966" strokeWidth={2}>
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="mb-2 text-2xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
        >
          Thank you
        </h3>
        <p
          className="text-sm leading-7"
          style={{ fontFamily: "var(--font-nobel)", color: "#888" }}
        >
          Your enquiry has been prepared. Please send the email
          <br />that just opened, or write directly to{" "}
          <a
            href="mailto:info@dhatuorganics.com"
            className="underline underline-offset-2"
            style={{ color: "#CC9966" }}
          >
            info@dhatuorganics.com
          </a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs uppercase tracking-[0.3em] underline underline-offset-4"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          Name *
        </label>
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="border-b bg-transparent pb-3 text-sm outline-none placeholder:text-[#555] transition-colors focus:border-[#CC9966]"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          Email *
        </label>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="your@company.com"
          className="border-b bg-transparent pb-3 text-sm outline-none placeholder:text-[#555] transition-colors focus:border-[#CC9966]"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        />
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          Company / Organisation
        </label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Your company name"
          className="border-b bg-transparent pb-3 text-sm outline-none placeholder:text-[#555] transition-colors focus:border-[#CC9966]"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          Phone
        </label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 00000 00000"
          className="border-b bg-transparent pb-3 text-sm outline-none placeholder:text-[#555] transition-colors focus:border-[#CC9966]"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        />
      </div>

      {/* Subject — full width */}
      <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          I am interested in *
        </label>
        <select
          name="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-b bg-transparent pb-3 text-sm outline-none transition-colors focus:border-[#CC9966] appearance-none cursor-pointer"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: subject ? "#FAF7F2" : "#555",
            fontFamily: "var(--font-nobel)",
            backgroundColor: "transparent",
          }}
        >
          <option value="" disabled style={{ backgroundColor: "#2C2C2C", color: "#888" }}>
            Select an option
          </option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value} style={{ backgroundColor: "#2C2C2C", color: "#FAF7F2" }}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message — full width */}
      <div className="col-span-1 flex flex-col gap-2 md:col-span-2">
        <label
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
        >
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          className="resize-none border-b bg-transparent pb-3 text-sm outline-none placeholder:text-[#555] transition-colors focus:border-[#CC9966]"
          style={{
            borderColor: "rgba(204,153,102,0.3)",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        />
      </div>

      {/* Submit */}
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-10 py-4 text-xs uppercase tracking-[0.35em] transition-all duration-300 hover:opacity-80 disabled:opacity-50"
          style={{
            backgroundColor: "#CC9966",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
          }}
        >
          {loading ? "Preparing..." : "Send Enquiry"}
        </button>
      </div>

    </form>
  );
}
