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
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    // Both are supplied via the environment (.env.local / hosting env).
    return Response.json(
      { error: "Subscriptions are not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    // Add the subscriber to a Resend audience (your list). This does NOT send
    // an email, so it needs no verified domain and isn't limited by test mode.
    const { error } = await resend.contacts.create({
      audienceId,
      email: email.trim().toLowerCase(),
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend contacts error:", error);

      // Resend throttles to a few requests/second — surface a clear message.
      if (error.name === "rate_limit_exceeded") {
        return Response.json(
          { error: "Too many requests — please wait a moment and try again." },
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
