import { Resend } from "resend";

// Simple email shape check — good enough for a subscribe form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The key is added to the environment separately (.env.local / hosting env).
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  // Sender must be a verified domain in Resend. `onboarding@resend.dev`
  // works out of the box for testing.
  const from = process.env.RESEND_FROM ?? "Foxy <onboarding@resend.dev>";
  // Where subscriber notifications are delivered.
  const to = process.env.RESEND_TO ?? "tabaexperience@gmail.com";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "New Foxy subscriber 🦊",
      text: `A new user subscribed to Foxy: ${email}`,
    });

    if (error) {
      console.error("Resend error:", error);

      // Resend throttles to a few requests/second — surface a clear message.
      if (error.name === "rate_limit_exceeded") {
        return Response.json(
          { error: "Too many requests — please wait a moment and try again." },
          { status: 429 },
        );
      }
      // Daily/monthly sending quota reached on the current plan.
      if (error.name === "daily_quota_exceeded") {
        return Response.json(
          { error: "The mailbox is full for today. Please try again tomorrow." },
          { status: 429 },
        );
      }

      return Response.json(
        { error: "Could not subscribe right now. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe failed:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
