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

  const cleanEmail = email.trim().toLowerCase();
  const resend = new Resend(apiKey);

  try {
    // 1) Save the subscriber to a Resend audience (the list). This needs no
    //    verified domain and isn't limited by test mode.
    const { error } = await resend.contacts.create({
      audienceId,
      email: cleanEmail,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend contacts error:", error);
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

    // 2) Notify the site owner. Best-effort: the subscriber is already saved,
    //    so a failed notification email must NOT fail the request.
    await notifyOwner(resend, cleanEmail);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe failed:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

/** Emails the owner about a new subscriber. Never throws. */
async function notifyOwner(resend: Resend, subscriber: string) {
  const to = process.env.RESEND_NOTIFY_TO;
  if (!to) return; // notifications are optional

  // Sender must be a verified domain in Resend; `onboarding@resend.dev` works
  // out of the box, but in test mode can only deliver to the account owner.
  const from = process.env.RESEND_FROM ?? "Foxy <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: subscriber,
      subject: "New Foxy subscriber 🦊",
      text: `A new user just subscribed to Foxy:\n\n${subscriber}`,
    });
    if (error) console.error("Resend notify error:", error);
  } catch (err) {
    console.error("Notify failed:", err);
  }
}
