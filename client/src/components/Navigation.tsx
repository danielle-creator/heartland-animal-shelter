/*
 * HEARTLAND ANIMAL SHELTER — Navigation Component
 * Design: Editorial Warmth — sticky top nav, red/teal brand colors, DM Sans
 * Features: Mobile hamburger, prominent Donate + Adopt CTAs, dropdown for Adopt
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, Phone } from "lucide-react";

const navLinks = [
  { label: "Adopt", href: "/adopt" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Donate", href: "/donate" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#1C1917] text-white text-xs py-1.5 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={11} />
              <a href="tel:8472966400" className="hover:text-[#0D9488] transition-colors">847-296-6400</a>
            </span>
            <span>586 Palwaukee Drive, Wheeling, IL 60090</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Thu–Fri: 4–7pm &nbsp;|&nbsp; Sat–Sun: 12–6pm</span>
            <a href="mailto:info@heartlandanimalshelter.org" className="hover:text-[#0D9488] transition-colors">
              info@heartlandanimalshelter.org
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="24" cy="24" r="22" fill="#C8102E" />
                    <path d="M24 34C24 34 13 27 13 20C13 16.134 16.134 13 20 13C22.21 13 24 15 24 15C24 15 25.79 13 28 13C31.866 13 35 16.134 35 20C35 27 24 34 24 34Z" fill="white"/>
                    <circle cx="17" cy="12" r="3" fill="white" opacity="0.7"/>
                    <circle cx="31" cy="12" r="3" fill="white" opacity="0.7"/>
                    <circle cx="13" cy="17" r="2.5" fill="white" opacity="0.7"/>
                    <circle cx="35" cy="17" r="2.5" fill="white" opacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <div className="font-black text-[#C8102E] text-base md:text-lg leading-tight tracking-tight" style={{fontFamily:'DM Sans, sans-serif'}}>
                    HEARTLAND
                  </div>
                  <div className="text-[#0D9488] text-xs md:text-sm font-semibold leading-tight tracking-widest uppercase" style={{fontFamily:'DM Sans, sans-serif'}}>
                    Animal Shelter
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`px-3 py-2 text-sm font-600 transition-colors relative group ${
                      location === link.href
                        ? "text-[#C8102E]"
                        : "text-[#1C1917] hover:text-[#C8102E]"
                    }`}
                    style={{fontFamily:'DM Sans, sans-serif', fontWeight: 600}}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#C8102E] transition-all duration-200 ${location === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/adopt">
                <button className="btn-heartland-teal rounded text-sm px-4 py-2">
                  Adopt Now
                </button>
              </Link>
              <Link href="/donate">
                <button className="btn-heartland-red rounded text-sm px-4 py-2 flex items-center gap-1.5">
                  <Heart size={14} fill="white" />
                  Donate
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#1C1917]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block px-3 py-3 text-base font-semibold rounded transition-colors ${
                      location === link.href
                        ? "text-[#C8102E] bg-red-50"
                        : "text-[#1C1917] hover:text-[#C8102E] hover:bg-gray-50"
                    }`}
                    style={{fontFamily:'DM Sans, sans-serif'}}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <Link href="/adopt" className="flex-1">
                  <button className="btn-heartland-teal rounded w-full text-sm py-2.5">Adopt Now</button>
                </Link>
                <Link href="/donate" className="flex-1">
                  <button className="btn-heartland-red rounded w-full text-sm py-2.5 flex items-center justify-center gap-1.5">
                    <Heart size={13} fill="white" /> Donate
                  </button>
                </Link>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <div><a href="tel:8472966400" className="hover:text-[#C8102E]">📞 847-296-6400</a></div>
                <div>Thu–Fri: 4–7pm &nbsp;|&nbsp; Sat–Sun: 12–6pm</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
