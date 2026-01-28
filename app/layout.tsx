import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/components/layout/search-context";
import { SearchModal } from "@/components/layout/search-modal";
import { AuthProvider } from "@/components/auth/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { ProfileModal } from "@/components/auth/profile-modal";
import { ThemeProvider } from "@/components/layout/theme-context";
import { ArticleBanner } from "@/components/layout/article-banner";
import { Footer } from "@/components/layout/footer";
import NextTopLoader from "nextjs-toploader";

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
  description: "Die exklusive Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies.",
  metadataBase: new URL("https://virals.club"),
  icons: {
    icon: "/YC-white.png",
    apple: "/YC-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased dark:bg-black bg-white`}>
        <NextTopLoader 
          color="#22c55e"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #22c55e,0 0 5px #22c55e"
        />
        <ThemeProvider>
          <AuthProvider>
            <SearchProvider>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <ArticleBanner />
              <SearchModal />
              <AuthModal />
              <ProfileModal />
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
