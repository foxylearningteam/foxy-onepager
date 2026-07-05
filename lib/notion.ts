import { Client } from "@notionhq/client";

/** Flat map of content keys (e.g. "hero.title") to their text value. */
export type ContentMap = Record<string, string>;

/**
 * Reads every row of the Notion content database and returns a `Key -> Value`
 * map. Expects a database with a title property named "Key" and a text
 * property named "Value". Returns `{}` when Notion isn't configured or on any
 * error, so the site always falls back to its built-in copy.
 */
export async function fetchNotionContent(): Promise<ContentMap> {
  const token = process.env.NOTION_TOKEN;
  if (!token) return {};

  const notion = new Client({
    auth: token,
    // Cache Notion responses in Next's data cache for 30s; the "content" tag
    // lets /api/revalidate refresh them on demand for instant updates.
    fetch: (url, init) => fetch(url, { ...init, next: { revalidate: 30 } }),
  });
  const map: ContentMap = {};

  try {
    const dataSourceId = await resolveDataSourceId(notion);
    if (!dataSourceId) return {};

    let cursor: string | undefined;
    do {
      // Notion API 2025-09+: databases are queried through their data source.
      const res = (await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: cursor,
        page_size: 100,
      })) as {
        results: { properties?: Record<string, unknown> }[];
        has_more: boolean;
        next_cursor: string | null;
      };

      for (const row of res.results ?? []) {
        const props = row.properties ?? {};
        const name = readKey(props);
        if (!name) continue;
        // Rows are grouped by a "Section" select; the full key is
        // `<section>.<name>` (e.g. section "hero" + name "title").
        const section = readSection(props);
        const key = section ? `${section}.${name}` : name;
        map[key] = readValue(props);
      }
      cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
    } while (cursor);
  } catch (err) {
    console.error("Notion fetch failed:", err);
    return {};
  }

  return map;
}

/** A database ID can be given directly; otherwise resolve its first data source. */
async function resolveDataSourceId(notion: Client): Promise<string | null> {
  const direct = process.env.NOTION_DATA_SOURCE_ID;
  if (direct) return direct;

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) return null;

  const db = (await notion.databases.retrieve({ database_id: databaseId })) as {
    data_sources?: { id: string }[];
  };
  return db.data_sources?.[0]?.id ?? null;
}

type NotionProp = {
  type?: string;
  title?: { plain_text?: string }[];
  rich_text?: { plain_text?: string }[];
  select?: { name?: string } | null;
  status?: { name?: string } | null;
};

/** The section is the first select/status property value (e.g. "hero"). */
function readSection(props: Record<string, unknown>): string {
  for (const prop of Object.values(props)) {
    const p = prop as NotionProp;
    if (p?.type === "select" && p.select?.name) return p.select.name;
    if (p?.type === "status" && p.status?.name) return p.status.name;
  }
  return "";
}

/** Joins the plain_text runs of a title/rich_text property. */
function runsToText(runs?: { plain_text?: string }[]): string {
  if (!Array.isArray(runs)) return "";
  return runs
    .map((r) => r.plain_text ?? "")
    .join("")
    .trim();
}

/** The key is the row's title property, whatever it is named. */
function readKey(props: Record<string, unknown>): string {
  for (const prop of Object.values(props)) {
    const p = prop as NotionProp;
    if (p?.type === "title") return runsToText(p.title);
  }
  return "";
}

/** The value is a text property named "Value", else the first text property. */
function readValue(props: Record<string, unknown>): string {
  const named = props["Value"] as NotionProp | undefined;
  if (named?.type === "rich_text") return runsToText(named.rich_text);
  for (const prop of Object.values(props)) {
    const p = prop as NotionProp;
    if (p?.type === "rich_text") return runsToText(p.rich_text);
  }
  return "";
}
