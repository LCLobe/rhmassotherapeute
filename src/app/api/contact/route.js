const requiredFields = ["name", "email", "service"];

export async function POST(request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    return Response.json({ message: "Please complete the required fields." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    return Response.json(
      {
        message:
          "Request saved locally in the browser preview. Configure Resend environment variables to send emails.",
      },
      { status: 202 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New appointment request from ${payload.name}`,
      reply_to: payload.email,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Service: ${payload.service}`,
        `Preferred date/time: ${payload.preferredDate || "Not specified"}`,
        `Extras: ${(payload.extras || []).join(", ") || "None"}`,
        "",
        payload.message || "No message.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return Response.json({ message: "The message could not be sent. Please try again later." }, { status: 502 });
  }

  return Response.json({ message: "Thank you. Your request has been sent." });
}
