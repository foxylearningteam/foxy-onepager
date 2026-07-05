import { revalidatePath } from "next/cache";

/**
 * Refreshes CMS content immediately (instead of waiting for the 30s window).
 * Call with `?secret=<REVALIDATE_SECRET>` — e.g. from a Notion automation/webhook
 * or manually after editing content.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = new URL(request.url).searchParams.get("secret");
  if (secret && provided !== secret) {
    return Response.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidatePath("/");
  return Response.json({ revalidated: true });
}

// Allow a simple browser GET to trigger it too.
export const GET = POST;
