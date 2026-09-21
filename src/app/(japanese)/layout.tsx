import "../globals.css";
import "../dialogues.css";
import "../care.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
