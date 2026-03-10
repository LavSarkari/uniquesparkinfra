import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "./utilities.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Unique Spark Infra Pvt. Ltd. | Luxury Real Estate & Interiors",
  description:
    "Uncompromising quality in luxury residential plots, bespoke interior design, and visionary commercial developments across Varanasi and NRI Corridors.",
  keywords:
    "luxury real estate varanasi, nri real estate investment, interior design studio, premium plots, commercial developments india",
  openGraph: {
    title: "Unique Spark Infra Pvt. Ltd.",
    description:
      "Pinnacle of luxury real estate, bespoke architectural interiors, and visionary developments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Tag Manager (gtag.js) - GA4 + GSC + Google Ads */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
            // Google Ads Conversion tracking linking
            gtag('config', 'AW-XXXXXXXXX');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
