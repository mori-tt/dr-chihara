import "../globals.css";
import "../dialogues.css";
import "../care.css";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"}>
      <body>{children}</body>
    </html>
  );
}
