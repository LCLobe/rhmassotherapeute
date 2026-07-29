import servicesData from "@/data/services.json";

const requiredFields = ["name", "email", "service"];
const supportedLocales = ["en", "fr", "es"];
const maxFieldLength = 120;
const maxMessageLength = 1500;

const responseMessages = {
  en: {
    invalid: "Invalid request.",
    missing: "Please complete the required fields.",
    email: "Please enter a valid email address.",
    config: "The contact form is not configured yet. Please contact Ruth through Instagram.",
    error: "The message could not be sent. Please try again later.",
    success: "Thank you for writing. Your message has been sent, and Ruth will contact you soon.",
  },
  fr: {
    invalid: "Demande invalide.",
    missing: "Veuillez compl\u00e9ter les champs obligatoires.",
    email: "Veuillez saisir une adresse email valide.",
    config: "Le formulaire de contact n'est pas encore configur\u00e9. Veuillez contacter Ruth via Instagram.",
    error: "Le message n'a pas pu \u00eatre envoy\u00e9. Veuillez r\u00e9essayer plus tard.",
    success: "Merci pour votre message. Il a bien \u00e9t\u00e9 envoy\u00e9, et Ruth vous contactera bient\u00f4t.",
  },
  es: {
    invalid: "Solicitud no v\u00e1lida.",
    missing: "Por favor completa los campos obligatorios.",
    email: "Por favor escribe un email v\u00e1lido.",
    config: "El formulario de contacto a\u00fan no est\u00e1 configurado. Contacta con Ruth por Instagram.",
    error: "No se pudo enviar el mensaje. Int\u00e9ntalo de nuevo m\u00e1s tarde.",
    success: "Muchas gracias por escribir. Tu mensaje se ha enviado correctamente y Ruth se pondr\u00e1 en contacto pronto.",
  },
};

function getLocale(locale) {
  return supportedLocales.includes(locale) ? locale : "en";
}

function cleanText(value, maxLength = maxFieldLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanExtras(value) {
  return Array.isArray(value) ? value.map((extra) => cleanText(extra)).filter(Boolean).slice(0, 8) : [];
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function localized(value, locale) {
  return value?.[locale] ?? value?.en ?? "";
}

function getServiceLabel(serviceId, locale) {
  if (serviceId === "other") {
    return locale === "fr" ? "Autre" : locale === "es" ? "Otro" : "Other";
  }

  const service = servicesData.services.find((item) => item.id === serviceId);

  if (!service) {
    return serviceId;
  }

  return `${localized(service.name, locale)} - ${localized(service.durationLabel, locale)} - CHF ${service.price}`;
}

function getExtraLabel(extraId, locale) {
  const extra = servicesData.extras.find((item) => item.id === extraId);
  return extra ? localized(extra.name, locale) : extraId;
}

function buildEmailText(payload, locale) {
  const extras = payload.extras.map((extra) => getExtraLabel(extra, locale));

  return [
    "New appointment request from RH.Massoth\u00e9rapie",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Preferred service: ${getServiceLabel(payload.service, locale)}`,
    `Preferred date/time: ${payload.preferredDate || "Not specified"}`,
    `Optional extras: ${extras.join(", ") || "None"}`,
    "",
    "Message:",
    payload.message || "No message.",
  ].join("\n");
}

function parseJsonText(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function POST(request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: responseMessages.en.invalid }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const locale = getLocale(body?.locale);
  const messages = responseMessages[locale];

  if (!body) {
    return Response.json({ message: messages.invalid }, { status: 400 });
  }

  const payload = {
    name: cleanText(body.name),
    email: cleanText(body.email),
    service: cleanText(body.service),
    preferredDate: cleanText(body.preferredDate),
    extras: cleanExtras(body.extras),
    message: cleanText(body.message, maxMessageLength),
  };

  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    return Response.json({ message: messages.missing }, { status: 400 });
  }

  if (!isEmail(payload.email)) {
    return Response.json({ message: messages.email }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return Response.json({ message: messages.config }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
        subject: `RH.Massoth\u00e9rapie - request from ${payload.name}`,
        reply_to: payload.email,
        text: buildEmailText(payload, locale),
      }),
    });

    const responseText = await response.text();
    const result = parseJsonText(responseText);

    if (!response.ok) {
      console.error("Resend email send failed", {
        status: response.status,
        statusText: response.statusText,
        response: result ?? responseText,
      });
      return Response.json({ message: messages.error }, { status: 502 });
    }

    if (!result?.id) {
      console.error("Resend email send succeeded without an email id", {
        status: response.status,
        response: result ?? responseText,
      });
    }
  } catch (error) {
    console.error("Resend email send threw an error", error);
    return Response.json({ message: messages.error }, { status: 502 });
  }

  return Response.json({ message: messages.success, sent: true });
}
