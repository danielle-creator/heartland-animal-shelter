/*
 * HEARTLAND ANIMAL SHELTER — Navigation Component
 * Design: Sticky frosted-glass bar — thin, mostly opaque, blur on scroll
 * Logo bigger, links clean, Adopt + Donate CTAs on right
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { label: "Adopt", href: "/adopt" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Volunteer/Foster", href: "/foster" },
  { label: "News/Events", href: "/news" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md shadow-sm border-b border-gray-100/80"
          : "bg-white/96 shadow-sm"
      }`}
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-1.5">

          {/* Logo — bigger, left */}
          <Link href="/">
            <div className="flex items-center flex-shrink-0">
              <img
                src="/logo.png"
                alt="Heartland Animal Shelter"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Nav links — center (desktop) */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative px-3.5 py-2 text-[13px] font-semibold transition-colors group ${
                    location === link.href
                      ? "text-[#C8102E]"
                      : "text-[#44403C] hover:text-[#C8102E]"
                  }`}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#C8102E] rounded-full transition-all duration-200 ${
                      location === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Right side — phone + Donate (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:8472966400"
              className="text-xs text-[#78716C] hover:text-[#C8102E] transition-colors mr-1 hidden xl:block"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              847-296-6400
            </a>

            {/* Donate — prominent red CTA */}
            <Link href="/donate">
              <button
                className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-md bg-[#C8102E] text-white hover:bg-[#a00d24] transition-all duration-200 shadow-sm hover:shadow-md"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <Heart size={13} fill="white" strokeWidth={0} />
                Donate
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#1C1917] rounded hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/96 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="container py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`block px-3 py-3 text-sm font-semibold rounded-lg transition-colors ${
                    location === link.href
                      ? "text-[#C8102E] bg-red-50"
                      : "text-[#1C1917] hover:text-[#C8102E] hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Mobile CTAs */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link href="/donate" className="flex-1">
                <button
                  className="w-full text-sm font-bold py-2.5 rounded-lg bg-[#C8102E] text-white flex items-center justify-center gap-1.5"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  <Heart size={13} fill="white" strokeWidth={0} />
                  Donate
                </button>
              </Link>
            </div>

            {/* Mobile contact info */}
            <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-[#78716C] space-y-1 px-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
              <div><a href="tel:8472966400" className="hover:text-[#C8102E]">📞 847-296-6400</a></div>
              <div>Thu–Fri: 4–7pm &nbsp;|&nbsp; Sat–Sun: 12–6pm</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
