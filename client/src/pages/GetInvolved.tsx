/*
 * HEARTLAND ANIMAL SHELTER — Get Involved Page
 * Design: Editorial Warmth — red/teal accents, Playfair Display + DM Sans
 * Sections: Hero, Volunteer, Foster, Other Ways to Help
 */
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Heart, Users, HomeIcon, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_VOLUNTEER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-4_1771606683000_na1fn_aGVyby12b2x1bnRlZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTRfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxMmIyeDFiblJsWlhJLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=emtohp-iyn4Ma8XEPFMvKmP4vlOQIVsRVqgwStz2uZ6kWjttuWQW0qewszT3OihGrU3RTghWoDz-0DDPXftwYIKgCWTiS40lW-7C2DW1~qIfa3-fte89rNiOQwzwfgJTcAl8fJ4qJlqKg--ck9PpvW1Q-RJF7dNyc2xzvpfnwTd4NH93TQ-dcCnBy8rGjcHpFtlWN0VK1muwxfCM1AuPPESxVRaHEGl8KXEjn4UrRx1KF0QUZeg0nPTUl~GTQc-uiVfLnN5O8EFyprAxZ3aika7Zmhdn7fR~Fyf3M3jq8abkUDeFJuMdk-Rn4NtmpsnLreBzqniZxpCgSv7hisyQJA__";
const HERO_FOSTER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-3_1771606683000_na1fn_aGVyby1mb3N0ZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTNfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxbWIzTjBaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qqhGrgML~C3aiqyqXZBGSGnWp86lPbd6L74EnrJTCCKYvD-UwJCTGGvq0qCOI-FOe4~8fdbkTFjznI8EIw8QA0L8I6Kl8EhDxr1Nq6V~3N8hf9soQoyV7NZZNW1KAXnZGmo9da7fBoCXXYT9LrcHeuNCkcv7II1UJOq8IUtH78CYOscCfAWJziAnaKD4VMaYnWok5VVA35nLKbXNvtYNI2OZoBliKxLj4wD~DevXs~-QGi9D0I3aW2AtcB41AOghLwZDJ47QWhE5qHx1L3225k91~JaMmKOi1uVhzI5TnManJBlRmRVE1KT4hgFmgA5QIcVIJyo2rnI8PJj3QweZyA__";

const volunteerOpps = [
  { title: "Dog Care", desc: "Walk, socialize, and provide enrichment for our dogs. Help them stay healthy and adoption-ready." },
  { title: "Cat Care", desc: "Socialize cats, clean colony rooms, and provide enrichment to help cats feel at home." },
  { title: "Events & Fundraising", desc: "Help plan and run adoption events, fundraisers, and community outreach activities." },
  { title: "Administrative Support", desc: "Help with thank-you notes, data entry, social media, and other behind-the-scenes tasks." },
  { title: "Transportation", desc: "Drive animals to vet appointments, adoption events, or partner locations." },
  { title: "Photography", desc: "Help capture beautiful photos of our animals to help them find homes faster." },
];

const fosterFAQ = [
  { q: "What does fostering cost?", a: "Fostering is completely free. Heartland provides all food, supplies, and medical care." },
  { q: "How long do I foster?", a: "Foster periods vary. Some animals need just a few days; others may need weeks or months. You set your availability." },
  { q: "Can I adopt my foster?", a: "Yes! Many of our animals are adopted by their foster families — we call it a 'foster fail' (in the best way)." },
  { q: "What types of animals need fostering?", a: "We foster dogs, cats, kittens, and puppies. Some need medical care; others just need socialization and a home environment." },
];

export default function GetInvolved() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navigation />

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={HERO_VOLUNTEER} alt="Volunteer at Heartland" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Make a Difference</div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              Get Involved
            </h1>
            <p className="text-white/90 mt-2 text-lg" style={{fontFamily:'DM Sans, sans-serif'}}>
              Volunteer, foster, or support our mission in the community.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved — Quick Nav */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container flex flex-wrap gap-2 justify-center">
          {[
            { label: "Volunteer", href: "#volunteer" },
            { label: "Foster", href: "#foster" },
            { label: "Donate", href: "/donate" },
            { label: "Shop Wishlist", href: "#wishlist" },
            { label: "Corporate Giving", href: "#corporate" },
          ].map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm font-semibold px-4 py-1.5 rounded-full border border-gray-200 text-[#1C1917] hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E] transition-all"
              style={{fontFamily:'DM Sans, sans-serif'}}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* VOLUNTEER SECTION */}
      <section id="volunteer" className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Join Our Team</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                Volunteer at Heartland
              </h2>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                Volunteers are at the heart of everything we do at Heartland. In 2025, <strong>653 volunteers contributed 19,913 hours</strong> to support our pets and expand our organization's capacity.
              </p>
              <p className="text-[#78716C] leading-relaxed mb-6" style={{fontFamily:'DM Sans, sans-serif'}}>
                Whether you love walking dogs, socializing cats, or helping behind the scenes, there's a meaningful role for you. We offer orientations, training, and a welcoming community of animal lovers.
              </p>

              <div className="space-y-2 mb-6">
                {[
                  "Must be 18+ to volunteer independently",
                  "Ages 14–17 may volunteer with a parent or guardian",
                  "Flexible scheduling — choose your own hours",
                  "Monthly dog- and cat-focused volunteer meetings",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>{item}</span>
                  </div>
                ))}
              </div>

              <a href="https://heartlandanimalshelter.org/volunteer" target="_blank" rel="noopener noreferrer">
                <button className="btn-heartland-red rounded px-6 py-3 flex items-center gap-2">
                  Apply to Volunteer <ArrowRight size={15} />
                </button>
              </a>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                {volunteerOpps.map((opp) => (
                  <div key={opp.title} className="bg-[#FAF7F2] rounded-xl p-4 card-hover">
                    <h4 className="font-bold text-[#1C1917] text-sm mb-1" style={{fontFamily:'DM Sans, sans-serif'}}>{opp.title}</h4>
                    <p className="text-xs text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{opp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOSTER SECTION */}
      <section id="foster" className="py-16 bg-[#FAF7F2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg">
              <img src={HERO_FOSTER} alt="Foster a pet" className="w-full h-80 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Open Your Home</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                Foster a Pet
              </h2>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                Fostering is one of the most impactful ways to help animals. By opening your home, you give animals a safe, loving environment to heal, decompress, and learn what it means to live in a home.
              </p>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                In 2025, <strong>274 foster homes provided 22,373 days of care</strong> for 369 dogs and 503 cats. Fostering allows us to welcome more animals while keeping pets happier and more adoptable.
              </p>

              <div className="bg-[#0D9488]/10 border border-[#0D9488]/20 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-[#0D9488]" style={{fontFamily:'DM Sans, sans-serif'}}>
                  🏠 Fostering is 100% free. We provide all food, supplies, and medical care.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {fosterFAQ.map((item) => (
                  <div key={item.q} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-sm text-[#1C1917] mb-1" style={{fontFamily:'DM Sans, sans-serif'}}>Q: {item.q}</div>
                    <div className="text-xs text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>A: {item.a}</div>
                  </div>
                ))}
              </div>

              <a href="https://heartlandanimalshelter.org/foster" target="_blank" rel="noopener noreferrer">
                <button className="btn-heartland-teal rounded px-6 py-3 flex items-center gap-2">
                  Apply to Foster <ArrowRight size={15} />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WISHLIST / DONATE SUPPLIES */}
      <section id="wishlist" className="py-14 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>In-Kind Giving</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Donate Supplies</h2>
            <p className="text-[#78716C] mt-2 max-w-xl mx-auto text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
              We always need supplies for our animals. Shop our Amazon Wishlist or drop off items at the shelter during open hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Most Needed", items: ["Dry dog food (large bags)", "Dry cat food", "Cat litter (unscented)", "Paper towels & cleaning supplies", "Dog & cat toys"], color: "#C8102E" },
              { title: "Medical Supplies", items: ["Pill pockets", "Syringes (no needles)", "Baby food (meat-based)", "Heating pads", "Towels & blankets"], color: "#0D9488" },
              { title: "Enrichment", items: ["Kong toys", "Puzzle feeders", "Catnip & cat wands", "Dog chews & bully sticks", "Cardboard boxes for cats"], color: "#92400e" },
            ].map((cat) => (
              <div key={cat.title} className="bg-[#FAF7F2] rounded-xl overflow-hidden">
                <div className="px-5 py-3" style={{backgroundColor: cat.color}}>
                  <h3 className="font-bold text-white text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{cat.title}</h3>
                </div>
                <ul className="p-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="https://www.amazon.com/hz/wishlist/ls/heartlandanimalshelter" target="_blank" rel="noopener noreferrer">
              <button className="btn-heartland-red rounded px-8 py-3 flex items-center gap-2 mx-auto">
                Shop Our Amazon Wishlist <ArrowRight size={15} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* CORPORATE / OTHER WAYS */}
      <section id="corporate" className="paw-bg py-14">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>More Ways to Help</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Other Ways to Support</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Star size={22} className="text-[#C8102E]" />,
                title: "Heartland Heroes",
                desc: "Become a monthly recurring donor. Heartland Heroes give each month and provide the reliable funding we need to plan ahead for our animals.",
                cta: "Become a Hero",
                href: "/donate#monthly",
              },
              {
                icon: <Users size={22} className="text-[#0D9488]" />,
                title: "Young Professionals Board (HYP)",
                desc: "Heartland's Young Professionals Board hosts events and fundraisers to support our mission. Join a community of passionate animal advocates.",
                cta: "Learn More",
                href: "mailto:info@heartlandanimalshelter.org",
              },
              {
                icon: <HomeIcon size={22} className="text-[#C8102E]" />,
                title: "Corporate Partnerships",
                desc: "Partner with Heartland for employee volunteer days, cause marketing, event sponsorships, and more. We'd love to work with your organization.",
                cta: "Contact Us",
                href: "mailto:info@heartlandanimalshelter.org",
              },
              {
                icon: <Heart size={22} className="text-[#0D9488]" />,
                title: "Planned Giving",
                desc: "Leave a lasting legacy for the animals by including Heartland in your estate plans. Every bequest helps us continue our lifesaving work.",
                cta: "Learn About Bequests",
                href: "/donate#planned-giving",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>{item.desc}</p>
                <a href={item.href}>
                  <button className="text-sm font-bold flex items-center gap-1 text-[#C8102E] hover:text-[#a00d24] transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                    {item.cta} <ArrowRight size={13} />
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
