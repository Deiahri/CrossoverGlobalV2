"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import Button from "./Button";

const LOGO_FULL  = "/logo/logo.png";
const LOGO_WORDS = "/logo/logo_just_words.png";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/good-news", label: "Good News" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-colors ${
          open
            ? "bg-brand-950 border-b border-white/10 shadow-none"
            : scrolled
              ? "bg-white border-b border-border shadow-xs"
              : "bg-transparent border-b border-transparent shadow-none"
        }`}
        style={{ transitionDuration: "var(--duration-normal)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between relative">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center gap-2 font-bold text-lg tracking-tight transition-colors ${
                open
                  ? "text-white hover:text-white/80"
                  : scrolled
                    ? "text-primary hover:text-primary-hover"
                    : "text-white hover:text-white/90 drop-shadow-sm"
              }`}
              style={{ transitionDuration: "var(--duration-fast)" }}
            >
              <span className="relative inline-flex h-8">
                {/* Words-only logo — visible at top, white; fades in from right */}
                <img
                  src={LOGO_WORDS}
                  alt="Crossover Global"
                  className="h-8 w-auto object-contain absolute inset-0 top-0.5"
                  style={{
                    transition: `opacity var(--duration-normal), transform var(--duration-normal)`,
                    opacity: scrolled || open ? 0 : 1,
                    transform: scrolled || open ? "translateX(3rem)" : "translateX(0)",
                    filter: "brightness(0) invert(1)",
                  }}
                />
                {/* Full logo — visible when scrolled; fades in from left */}
                <img
                  src={LOGO_FULL}
                  alt=""
                  aria-hidden
                  className="h-8 w-auto object-contain"
                  style={{
                    transition: `opacity var(--duration-normal), transform var(--duration-normal)`,
                    opacity: scrolled && !open ? 1 : 0,
                    transform: scrolled && !open ? "translateX(0)" : "translateX(-3rem)",
                  }}
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-6 fixed left-1/2 -translate-x-1/2"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors group ${
                      scrolled
                        ? active
                          ? "text-primary"
                          : "text-neutral-600 hover:text-foreground"
                        : active
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                    }`}
                    style={{ transitionDuration: "var(--duration-fast)" }}
                  >
                    {label}
                    {/* Underline indicator */}
                    <span
                      className={`absolute bottom-0.5 left-0 right-0 h-px transition-all ${
                        scrolled ? "bg-primary" : "bg-white"
                      }`}
                      style={{
                        transitionDuration: "var(--duration-fast)",
                        opacity: active ? 1 : 0,
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button href="/give" variant="donate" size="sm">
                Give Now
              </Button>
            </div>

            {/* Mobile right side — toggle only */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                className={`p-2 rounded-md transition-colors ${
                  open
                    ? "text-white hover:text-white/70"
                    : scrolled
                      ? "text-neutral-600 hover:bg-surface-raised"
                      : "text-white hover:bg-white/15"
                }`}
                style={{ transitionDuration: "var(--duration-fast)" }}
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >
                <span
                  className="block"
                  style={{
                    transform: open ? "rotate(90deg)" : "rotate(0deg)",
                    transition: `transform var(--duration-normal)`,
                  }}
                >
                  {open ? (
                    <RiCloseLine className="w-6 h-6" />
                  ) : (
                    <RiMenuLine className="w-6 h-6" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className="lg:hidden fixed inset-0 z-40 flex flex-col px-8 pt-24 pb-12"
        style={{
          backgroundColor: "var(--brand-950)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity var(--duration-normal) var(--ease-out)`,
        }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }, i) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-4 border-b border-white/10 transition-colors ${
                  active ? "text-white" : "text-white/50 hover:text-white"
                }`}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity var(--duration-slow) var(--ease-out) ${i * 60}ms, transform var(--duration-slow) var(--ease-out) ${i * 60}ms, color var(--duration-fast)`,
                }}
              >
                <span className="text-4xl font-bold tracking-tight">{label}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </Link>
            );
          })}
          {/* Give Now — sits right below nav links */}
          <Link
            href="/give"
            onClick={() => setOpen(false)}
            className="flex items-center py-4 text-4xl font-bold tracking-tight text-white -mx-8 px-8 mt-1 transition-colors"
            style={{
              backgroundColor: "var(--donate)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transition: `opacity var(--duration-slow) var(--ease-out) ${NAV_LINKS.length * 60}ms, transform var(--duration-slow) var(--ease-out) ${NAV_LINKS.length * 60}ms, background-color var(--duration-fast)`,
            }}
          >
            Give Now
          </Link>
        </nav>
      </div>
    </>
  );
}
