import "../globals.css";
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
