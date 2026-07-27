"use client";

import { useId, useState } from "react";

function localized(value, locale) {
  return value?.[locale] ?? value?.en ?? "";
}

export default function ContactModal({
  triggerLabel,
  services,
  extras,
  content,
  variant = "default",
  locale = "en",
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const titleId = useId();

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      preferredDate: formData.get("preferredDate"),
      extras: formData.getAll("extras"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setStatus(response.ok ? "sent" : "error");
    setMessage(result.message);

    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  const triggerClass =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-[#0a0a0a] px-6 text-sm uppercase tracking-[0.18em] text-[#f9ece3] shadow-[0_16px_36px_rgba(10,10,10,0.22)] transition hover:bg-[#443a28]"
      : "inline-flex min-h-11 items-center justify-center rounded-full bg-[#0a0a0a] px-5 text-sm uppercase tracking-[0.16em] text-[#f9ece3] transition hover:bg-[#443a28]";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClass}>
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label={content.close}
            className="absolute inset-0 bg-[#0a0a0a]/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] border border-[#d8c8b5] bg-[#fff8f2] p-6 text-[#443a28] shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#7f5614]">{content.eyebrow}</p>
                <h2 id={titleId} className="mt-3 font-display text-4xl leading-none sm:text-5xl">
                  {content.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#947e4c]/40 text-xl"
                aria-label={content.close}
              >
                x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span>{content.fields.name}</span>
                <input name="name" required className="rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]" />
              </label>
              <label className="grid gap-2">
                <span>{content.fields.email}</span>
                <input name="email" type="email" required className="rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]" />
              </label>
              <label className="grid gap-2">
                <span>{content.fields.service}</span>
                <select name="service" required className="rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]">
                  <option value="">{content.fields.servicePlaceholder}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {localized(service.name, locale)} - {localized(service.durationLabel, locale)} - {service.price} CHF
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                <span>{content.fields.preferredDate}</span>
                <input name="preferredDate" className="rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]" placeholder={content.fields.preferredDatePlaceholder} />
              </label>
              <fieldset className="rounded-2xl border border-[#d8c8b5] p-4">
                <legend className="px-2">{content.fields.extras}</legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {extras.map((extra) => (
                    <label key={extra.id} className="flex items-center gap-3">
                      <input type="checkbox" name="extras" value={extra.id} className="h-4 w-4 accent-[#7f5614]" />
                      <span>{localized(extra.name, locale)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="grid gap-2">
                <span>{content.fields.message}</span>
                <textarea name="message" rows={4} className="resize-none rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]" />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 min-h-12 rounded-full bg-[#0a0a0a] px-6 text-sm uppercase tracking-[0.18em] text-[#f9ece3] transition hover:bg-[#443a28] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? content.sending : content.submit}
              </button>
              {message ? (
                <p className={status === "error" ? "text-[#7f5614]" : "text-[#443a28]"}>{message}</p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
