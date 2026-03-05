import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Crossover Global",
    template: "%s | Crossover Global",
  },
  description:
    "Crossover Global is a 501(c)(3) charitable organization providing life assistance to brothers and sisters in need — grounded in Christian teachings.",
  icons: {
    apple: [
      { url: '/favi/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/favi/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/favi/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/favi/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/favi/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/favi/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/favi/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/favi/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/favi/apple-icon-180x180.png', sizes: '180x180' },
    ],
    icon: [
      { url: '/favi/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favi/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favi/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favi/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/favi/manifest.json',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/favi/ms-icon-144x144.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} antialiased`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
