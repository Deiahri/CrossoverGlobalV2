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
