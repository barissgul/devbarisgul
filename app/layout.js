import "@css/bootstrap.min.css";
import "@css/coloring.css";
import "@css/plugins.css";
import "@css/style.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";

import Script from "next/script";
import { Inter } from "next/font/google";
import Preloader from "@/layouts/Preloader";
import FloatingLangSwitcher from "@/components/FloatingLangSwitcher";
import { LanguageProvider } from "@/contexts/LanguageContext";

const GA_MEASUREMENT_ID = "G-SH7XSW8J77";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barış Gül - Full Stack Developer",
  description: "Barış Gül - Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <LanguageProvider>
          <Preloader />
          <FloatingLangSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
