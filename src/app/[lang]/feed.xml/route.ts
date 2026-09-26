import { rssFeed } from "@/lib/feed";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  return new Response(rssFeed(lang === "zh" ? "zh" : "en"), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
