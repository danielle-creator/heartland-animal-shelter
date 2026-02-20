/*
 * HEARTLAND ANIMAL SHELTER — Footer Component
 * Design: Warm teal background matching current site, with Charity Navigator & Candid badges
 */
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D9488] text-white">
      {/* Main footer content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo + About + Badges */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Heartland Animal Shelter"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-teal-100 text-sm leading-relaxed mb-4">
              A no-kill shelter serving Chicagoland since 2002. Every animal deserves a loving home.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mb-5">
              <a href="https://www.facebook.com/heartlandanimalshelter" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <Facebook size={15} />
              </a>
              <a href="https://www.instagram.com/heartland_animal_shelter" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <Instagram size={15} />
              </a>
              <a href="https://www.tiktok.com/@heartlandanimalshelter" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@heartlandanimalshelter" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <Youtube size={15} />
              </a>
            </div>
            {/* Charity Navigator + Candid badges */}
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://www.charitynavigator.org/ein/364451712"
                target="_blank"
                rel="noopener noreferrer"
                title="Charity Navigator — Four Star Charity"
              >
                <img
                  src="https://www.charitynavigator.org/assets/images/badges/four-star-badge-v2.svg"
                  alt="Charity Navigator Four Star"
                  className="h-16 w-auto bg-white rounded p-1"
                  onError={(e) => {
                    // Fallback to text badge if SVG fails
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </a>
              <a
                href="https://www.guidestar.org/profile/36-4451712"
                target="_blank"
                rel="noopener noreferrer"
                title="Candid Platinum Transparency 2025"
              >
                <img
                  src="https://widgets.guidestar.org/TransparencySeal/10209536"
                  alt="Candid Platinum Transparency 2025"
                  className="h-16 w-auto bg-white rounded p-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </a>
            </div>
          </div>

          {/* Column 2: Hours & Location */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
              Hours & Location
            </h4>
            <div className="space-y-2 text-sm text-teal-100">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div>586 Palwaukee Drive</div>
                  <div>Wheeling, IL 60090</div>
                  <a href="https://maps.google.com/?q=586+Palwaukee+Drive+Wheeling+IL+60090"
                    target="_blank" rel="noopener noreferrer"
                    className="text-white hover:underline text-xs mt-0.5 inline-block font-semibold">
                    Get Directions →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium mb-1">Open Hours</div>
                  <div>Mon–Wed: <span className="text-red-200 font-semibold">Closed</span></div>
                  <div>Thu–Fri: 4:00 pm – 7:00 pm</div>
                  <div>Sat–Sun: 12:00 pm – 6:00 pm</div>
                  <div className="text-xs text-teal-200 mt-1">Closed Christmas & New Year's Day</div>
                  <div className="text-xs text-teal-200">Must be 18+ unless with parent</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-white flex-shrink-0" />
                <a href="tel:8472966400" className="hover:text-white transition-colors">847-296-6400</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-white flex-shrink-0" />
                <a href="mailto:info@heartlandanimalshelter.org" className="hover:text-white transition-colors text-xs">
                  info@heartlandanimalshelter.org
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-teal-100">
              {[
                { label: "Adoptable Dogs", href: "/adopt#dogs" },
                { label: "Adoptable Cats", href: "/adopt#cats" },
                { label: "How to Adopt", href: "/adopt#how-to-adopt" },
                { label: "Foster a Pet", href: "/foster" },
                { label: "Volunteer", href: "/get-involved#volunteer" },
                { label: "Donate", href: "/donate" },
                { label: "Our Mission", href: "/about" },
                { label: "News & Events", href: "/news" },
                { label: "Shop", href: "/shop" },
                { label: "Resources", href: "/resources" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
              Stay Connected
            </h4>
            <p className="text-teal-100 text-sm mb-4">
              Get the latest news, adoptable animals, and events delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                window.open(`https://heartlandanimalshelter.org/newsletter-signup?email=${encodeURIComponent(email)}`, '_blank');
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="bg-white/20 border border-white/30 text-white placeholder-teal-200 text-sm px-3 py-2.5 rounded focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold uppercase tracking-wide text-sm px-4 py-2.5 rounded transition-colors"
                style={{fontFamily:'DM Sans, sans-serif'}}
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-teal-200">
                Heartland Animal Shelter is a 501(c)(3) non-profit organization. All donations are tax-deductible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 bg-[#0a7a70]">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-teal-200">
          <div>© {new Date().getFullYear()} Heartland Animal Shelter. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
