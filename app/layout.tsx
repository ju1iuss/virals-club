import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Virals Club Deutschland | The growth engineers mindset",
  description: "Die exklusive Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies in Deutschland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
