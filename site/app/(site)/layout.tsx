import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";

/**
 * Chrome for the public site. Lives in the `(site)` group so `/studio` renders
 * without the NavBar/Footer. The group does not affect URLs.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
