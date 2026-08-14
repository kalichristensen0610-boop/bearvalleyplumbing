"use client";

import { useState } from "react";
import { services } from "../../data/services";
import { site } from "../../data/site";

export function RequestServiceForm({ origin = "request-service" }: { origin?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  function openEmailFallback(payload: Record<string, FormDataEntryValue>) {
    const subject = encodeURIComponent(`Service request from ${String(payload.name || "website visitor")}`);
    const body = encodeURIComponent([
      `Name: ${String(payload.name || "")}`,
      `Phone: ${String(payload.phone || "")}`,
      `Email: ${String(payload.email || "")}`,
      `Address: ${String(payload.address || "")}`,
      `City: ${String(payload.city || "")}`,
      `Property type: ${String(payload.customerType || "")}`,
      `Service: ${String(payload.service || "")}`,
      `Preferred contact: ${String(payload.preferredContact || "")}`,
      "",
      String(payload.description || ""),
    ].join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setMessage("Your email app has been opened with the request details. Send the email to complete your request.");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const element = event.currentTarget;
    const payload = Object.fromEntries(new FormData(element).entries());

    try {
      const response = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, origin, ctaId: "request-form-submit" }),
      });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || "Unable to send your request.");
      setStatus("sent");
      setMessage(body.message || "Thanks. Your request has been sent.");
      element.reset();
    } catch {
      openEmailFallback(payload);
    }
  }

  return <form className="request-form" onSubmit={submit} aria-describedby="form-note" noValidate>
    <div className="form-grid">
      <label>Name*<input name="name" autoComplete="name" required /></label>
      <label>Phone*<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" /></label>
      <label>Service address<input name="address" autoComplete="street-address" /></label>
      <label>City*<input name="city" autoComplete="address-level2" required /></label>
      <label>Project type*<select name="customerType" required defaultValue=""><option value="" disabled>Select one</option><option>Residential service</option><option>New home construction</option><option>Builder or contractor inquiry</option></select></label>
      <label>Service needed*<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service.slug} value={service.name}>{service.name}</option>)}<option>Not sure</option></select></label>
      <label>Preferred contact<select name="preferredContact" defaultValue="Phone"><option>Phone</option><option>Email</option><option>Text</option></select></label>
      <label className="full">Tell us about the problem or project*<textarea name="description" rows={5} required /></label>
    </div>
    <input className="honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label className="consent"><input type="checkbox" name="consent" value="yes" required /> I agree that Bear River Plumbing may contact me about this request.*</label>
    <p id="form-note" className="form-note">Submitting this form requests contact and does not confirm an appointment. Do not use this form for an active emergency.</p>
    <button className="btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Service Request"}</button>
    {message && <p className={`form-status ${status}`} role="status">{message}</p>}
  </form>;
}
