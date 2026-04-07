import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanishka Balaji: Product Designer",
  description:
    "Portfolio of Kanishka Balaji, a Product Designer pursuing a Masters in Human Computer Interaction at the University of Washington.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
