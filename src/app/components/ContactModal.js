"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { localized } from "./localization";

const fallbackMessages = {
  en: {
    close: "Close",
    error: "The message could not be sent. Please try again later.",
    success: "Thank you for writing. Your message has been sent, and Ruth will contact you soon.",
  },
  fr: {
    close: "Fermer",
    error: "Le message n'a pas pu \u00eatre envoy\u00e9. Veuillez r\u00e9essayer plus tard.",
    success: "Merci pour votre message. Il a bien \u00e9t\u00e9 envoy\u00e9, et Ruth vous contactera bient\u00f4t.",
  },
  es: {
    close: "Cerrar",
    error: "No se pudo enviar el mensaje. Int\u00e9ntalo de nuevo m\u00e1s tarde.",
    success: "Muchas gracias por escribir. Tu mensaje se ha enviado correctamente y Ruth se pondr\u00e1 en contacto pronto.",
  },
};

function getFallbackMessage(locale, key) {
  return fallbackMessages[locale]?.[key] ?? fallbackMessages.en[key];
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
  const isSubmittingRef = useRef(false);
  const closeTimerRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function closeModal() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    isSubmittingRef.current = false;
    setOpen(false);
  }

  function openModal() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    isSubmittingRef.current = false;
    setStatus("idle");
    setMessage("");
    setOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
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
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      const sent = response.ok && result.sent === true;
      setStatus(sent ? "sent" : "error");
      setMessage(result.message || getFallbackMessage(locale, sent ? "success" : "error"));

      if (sent) {
        event.currentTarget.reset();
        closeTimerRef.current = setTimeout(() => {
          closeModal();
        }, 2400);
      } else {
        isSubmittingRef.current = false;
      }
    } catch {
      isSubmittingRef.current = false;
      setStatus("error");
      setMessage(getFallbackMessage(locale, "error"));
    }
  }

  const triggerClass =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-[#0a0a0a] px-6 text-sm uppercase tracking-[0.18em] text-[#f9ece3] shadow-[0_16px_36px_rgba(10,10,10,0.22)] transition hover:bg-[#443a28]"
      : "inline-flex min-h-11 items-center justify-center rounded-full bg-[#0a0a0a] px-5 text-sm uppercase tracking-[0.16em] text-[#f9ece3] transition hover:bg-[#443a28]";

  const modal =
    open && typeof document !== "undefined" ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:py-8">
        <button
          type="button"
          aria-label={content.close}
          className="absolute inset-0 bg-[#0a0a0a]/55 backdrop-blur-sm"
          onClick={status === "sending" ? undefined : closeModal}
        />
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative h-[80vh] w-full max-w-2xl overflow-auto rounded-[2rem] border border-[#d8c8b5] bg-[#fff8f2] p-6 text-[#443a28] shadow-2xl sm:p-8"
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
              onClick={closeModal}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#947e4c]/40 text-xl"
              aria-label={content.close}
              disabled={status === "sending"}
            >
              x
            </button>
          </div>

          {status === "sent" ? (
            <div className="mt-8 rounded-2xl border border-[#947e4c]/35 bg-[#f9ece3] p-6 text-[#443a28]">
              <p className="font-display text-3xl leading-tight">{message}</p>
              <button
                type="button"
                onClick={closeModal}
                className="mt-6 min-h-12 rounded-full bg-[#0a0a0a] px-6 text-sm uppercase tracking-[0.18em] text-[#f9ece3] transition hover:bg-[#443a28]"
              >
                {getFallbackMessage(locale, "close")}
              </button>
            </div>
          ) : (
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
                      {localized(service.name, locale)} - {localized(service.durationLabel, locale)}
                    </option>
                  ))}
                  <option value="other">{content.fields.otherService}</option>
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
                <textarea
                  name="message"
                  rows={4}
                  className="resize-none rounded-2xl border border-[#d8c8b5] bg-white/70 px-4 py-3 outline-none focus:border-[#7f5614]"
                  placeholder={content.fields.messagePlaceholder}
                />
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
          )}
        </section>
      </div>
    ) : null;

  return (
    <>
      <button type="button" onClick={openModal} className={triggerClass}>
        {triggerLabel}
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
