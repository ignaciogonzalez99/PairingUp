import "./globals.css";

export const metadata = {
  title: "People Pairing App",
  description: "Drag and drop to create pairs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
