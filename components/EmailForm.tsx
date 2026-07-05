"use client";

import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";

type Status = "idle" | "loading" | "success" | "error";

export type EmailFormText = {
  formLabel: string;
  placeholder: string;
  submitLabel: string;
  consentIntro: string;
  termsLabel: string;
  privacyLabel: string;
  consentAnd: string;
  successMessage: string;
};

export default function EmailForm({ text }: { text: EmailFormText }) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !agreed || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage(text.successMessage);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Could not subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-[32px] rounded-[28px] bg-white px-8 py-9 shadow-[0_3px_0_0_var(--color-lip)]"
    >
      <label
        htmlFor="email"
        className="block text-center font-nunito text-2xl font-extrabold text-purple"
      >
        {text.formLabel}
      </label>

      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={text.placeholder}
        aria-invalid={status === "error"}
        className="w-full rounded-2xl border-2 border-peach-deep bg-peach px-5 py-4 font-nunito text-base font-extrabold text-navy placeholder:font-extrabold placeholder:text-placeholder focus:border-orange focus:outline-none"
      />

      <Checkbox id="terms" checked={agreed} onChange={setAgreed}>
        {text.consentIntro}{" "}
        <a href="#" className="font-bold text-navy underline">
          {text.termsLabel}
        </a>{" "}
        {text.consentAnd}{" "}
        <a href="#" className="font-bold text-navy underline">
          {text.privacyLabel}
        </a>
      </Checkbox>

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={!email || !agreed || status === "loading"}
        >
          {status === "loading"
            ? "Subscribing…"
            : status === "success"
              ? "Subscribed!"
              : text.submitLabel}
        </Button>

        {message && (
          <p
            role="status"
            className={`mt-3 text-center font-nunito text-xs font-semibold ${
              status === "error" ? "text-orange" : "text-purple"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
