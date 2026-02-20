/*
 * HEARTLAND ANIMAL SHELTER — Home Page (v3)
 * Design: Modern editorial — split-screen hero, spotlight strip, integrated finder+animals,
 *         wave dividers, scroll-triggered animations, floating donate button, masonry grid
 * Color system: Red (#C8102E) + Teal (#0D9488) primary, Orange (#F97316) accent, warm cream bg
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Heart, Users, Home as HomeIcon, ArrowRight,
  ChevronLeft, ChevronRight, Star, CalendarDays,
  HandHeart, Search, Dog, Cat, MapPin, Megaphone, Ticket, Gift
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

// ─── EmbedSocial Instagram Feed ───────────────────────────────────────────────
function EmbedSocialFeed() {
  useEffect(() => {
    const scriptId = "EmbedSocialHashtagScript";
    if (!document.getElementById(scriptId)) {
      const js = document.createElement("script");
      js.id = scriptId;
      js.src = "https://embedsocial.com/cdn/ht.js";
      document.getElementsByTagName("head")[0].appendChild(js);
    }
  }, []);
  return (
    <div
      className="embedsocial-hashtag"
      data-ref="f69fe8e264f8377238a31bdce137cae3266c3ad9"
    />
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Wave SVG divider ─────────────────────────────────────────────────────────
function WaveDivider({ fill = "#ffffff", flip = false }: { fill?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} style={{ height: 48 }}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// ─── Hero images ──────────────────────────────────────────────────────────────
const HERO_DOG  = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370886037/IGQsyxvcwPrUTGWz.jpg";
const HERO_CAT  = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370886037/fZeCiqBIWSYkTYvH.jpg";
const HERO_FOSTER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-3_1771606683000_na1fn_aGVyby1mb3N0ZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTNfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxbWIzTjBaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qqhGrgML~C3aiqyqXZBGSGnWp86lPbd6L74EnrJTCCKYvD-UwJCTGGvq0qCOI-FOe4~8fdbkTFjznI8EIw8QA0L8I6Kl8EhDxr1Nq6V~3N8hf9soQoyV7NZZNW1KAXnZGmo9da7fBoCXXYT9LrcHeuNCkcv7II1UJOq8IUtH78CYOscCfAWJziAnaKD4VMaYnWok5VVA35nLKbXNvtYNI2OZoBliKxLj4wD~DevXs~-QGi9D0I3aW2AtcB41AOghLwZDJ47QWhE5qHx1L3225k91~JaMmKOi1uVhzI5TnManJBlRmRVE1KT4hgFmgA5QIcVIJyo2rnI8PJj3QweZyA__";

const heroSlides = [
  {
    image: HERO_DOG,
    label: "Adopt a Dog",
    headline: "Every Animal Deserves a Loving Home",
    sub: "Heartland Animal Shelter finds permanent, loving homes for each animal in our care — with a 98.4% live release rate.",
    cta1: { label: "Adopt an Animal", href: "/adopt" },
    cta2: { label: "Donate Now", href: "/donate" },
    accent: "#C8102E",
  },
  {
    image: HERO_CAT,
    label: "Adopt a Cat",
    headline: "Your New Best Friend is Waiting",
    sub: "When you adopt from a no-kill shelter, you save two lives — the animal you adopt and the one that takes their place.",
    cta1: { label: "Meet Our Cats", href: "/adopt#cats" },
    cta2: { label: "Foster a Cat", href: "/foster" },
    accent: "#0D9488",
  },
];

// ─── Featured spotlight items (campaigns / events / promotions) ───────────────
const spotlightItems = [
  {
    tag: "Adoption Event",
    title: "$100 Off Dog Adoptions",
    desc: "At our Northbrook PetSmart satellite center through Feb 28.",
    href: "/adopt",
    color: "#C8102E",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370886037/gILHhWtVRgoppvZQ.jpg",
  },
  {
    tag: "Workshop",
    title: "Outdoor Cats Workshop",
    desc: "Learn TNR and community cat care. Feb 22 at Heartland Shelter.",
    href: "/news",
    color: "#0D9488",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370886037/EIDpGKNfrZZvMwik.jpg",
  },
  {
    tag: "Fundraiser",
    title: "Locks of Love Campaign",
    desc: "Your love is the key to a second chance. Help us raise funds for animals in need.",
    href: "/donate",
    color: "#F97316",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370886037/YtDkOtEEYRlMGjFg.jpg",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { number: "1,325", label: "Animals Welcomed", sublabel: "in 2025", color: "#0D9488" },
  { number: "98.4%", label: "Live Release Rate", sublabel: "no-kill commitment", color: "#C8102E" },
  { number: "1,252", label: "Adoptions", sublabel: "in 2025", color: "#0D9488" },
  { number: "274",   label: "Foster Homes", sublabel: "22,373 days of care", color: "#C8102E" },
  { number: "19,913", label: "Volunteer Hours", sublabel: "by 653 volunteers", color: "#0D9488" },
  { number: "3,506", label: "Generous Donors", sublabel: "thank you!", color: "#C8102E" },
];

// ─── Featured animals (uniform grid) ────────────────────────────────────────
const featuredAnimals = [
  { name: "Bella",   type: "Dog", age: "2 yrs", breed: "Lab Mix",            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop", badge: "Available" },
  { name: "Oliver",  type: "Cat", age: "1 yr",  breed: "Tabby",              image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=400&fit=crop", badge: "Available" },
  { name: "Max",     type: "Dog", age: "4 yrs", breed: "Shepherd Mix",       image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=500&h=400&fit=crop", badge: "Available" },
  { name: "Luna",    type: "Cat", age: "3 yrs", breed: "Domestic Shorthair", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&h=400&fit=crop&fit=crop&crop=faces,center", badge: "Available" },
  { name: "Charlie", type: "Dog", age: "6 mo",  breed: "Beagle Mix",         image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=400&fit=crop", badge: "Available" },
  { name: "Mochi",   type: "Cat", age: "5 yrs", breed: "Persian Mix",        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop", badge: "Senior" },
];

const upcomingEvents = [
  { date: { month: "FEB", day: "22" }, title: "Outdoor Cats Workshop", desc: "Learn how to help outdoor cats in your neighborhood — trapping, TNR, and community cat care.", location: "Heartland Shelter, Northbrook", color: "#0D9488" },
  { date: { month: "MAR", day: "1" },  title: "PetSmart Adoption Event", desc: "$100 off puppy & dog adoption fees at our Northbrook PetSmart satellite adoption center.", location: "PetSmart, Northbrook", color: "#C8102E" },
  { date: { month: "MAR", day: "15" }, title: "Locks of Love Fundraiser", desc: "Your love is the key to a second chance. Join our Locks of Love campaign and help raise funds.", location: "Heartland Shelter", color: "#92400e" },
];

const successStories = [
  { quote: "We adopted Biscuit three years ago and he has completely changed our family. We can't imagine life without him!", name: "The Johnson Family", animal: "Biscuit, Golden Mix", image: HERO_DOG },
  { quote: "Fostering kittens through Heartland has been one of the most rewarding experiences of my life. They make it so easy!", name: "Sarah M.", animal: "Foster Parent", image: HERO_FOSTER },
];

// ─── Animated stat card ───────────────────────────────────────────────────────
function StatCard({ number, label, sublabel, color }: { number: string; label: string; sublabel: string; color: string }) {
  const { ref, visible } = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="text-2xl md:text-3xl font-black mb-1 leading-none" style={{ color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
        {number}
      </div>
      <div className="text-[#1C1917] font-bold text-sm uppercase tracking-wide mb-0.5">{label}</div>
      <div className="text-[#78716C] text-xs">{sublabel}</div>
    </div>
  );
}

// ─── Animal card with hover reveal ───────────────────────────────────────────
function AnimalCard({ animal }: { animal: typeof featuredAnimals[0] }) {
  const badgeColor = animal.badge === "Senior" ? "#92400e" : "#C8102E";
  return (
    <Link href="/adopt">
      <div className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-1">
        <div className="relative overflow-hidden h-32">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge */}
          <div
            className="absolute top-2 left-2 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm"
            style={{ backgroundColor: badgeColor }}
          >
            {animal.badge}
          </div>
          {/* Hover reveal overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="w-full p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button
                className="w-full bg-white text-[#C8102E] font-bold text-sm py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <Heart size={14} fill="#C8102E" strokeWidth={0} />
                Meet {animal.name}
              </button>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="font-bold text-[#1C1917] text-sm flex items-center gap-1.5">
            {animal.type === "Dog"
              ? <Dog size={13} className="text-[#C8102E]" />
              : <Cat size={13} className="text-[#0D9488]" />}
            {animal.name}
          </div>
          <div className="text-xs text-[#78716C]">{animal.breed} · {animal.age}</div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animalType, setAnimalType] = useState("all");
  const [animalAge, setAnimalAge] = useState("any");
  const [showFloatingDonate, setShowFloatingDonate] = useState(false);

  const { data: newsData } = trpc.news.listPosts.useQuery({ limit: 3 });

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  // Show floating donate button after scrolling past hero
  useEffect(() => {
    const handleScroll = () => setShowFloatingDonate(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slide = heroSlides[currentSlide];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (animalType !== "all") params.set("type", animalType);
    if (animalAge !== "any") params.set("age", animalAge);
    window.location.href = `/adopt?${params.toString()}`;
  };

  // Scroll reveal for sections
  const spotlightReveal = useScrollReveal();
  const finderReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const eventsReveal = useScrollReveal();
  const storiesReveal = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* ── 1. SPLIT-SCREEN HERO ─────────────────────────────────────────────── */}
      <section className="relative flex" style={{ minHeight: "82vh", maxHeight: 860 }}>
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex transition-opacity duration-1000 ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Left: photo (60%) */}
            <div className="w-full md:w-[60%] relative overflow-hidden">
              <img
                src={s.image}
                alt={s.headline}
                className="w-full h-full object-cover"
                style={{ minHeight: "82vh" }}
              />
              {/* Subtle gradient only on right edge for blending on mobile */}
              <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
            {/* Right: text panel (40%) */}
            <div className="hidden md:flex w-[40%] bg-white flex-col justify-center px-10 lg:px-14 relative">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ backgroundColor: s.accent }} />
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full inline-block self-start text-white"
                style={{ backgroundColor: s.accent }}
              >
                {s.label}
              </div>
              <h1
                className="font-black text-[#1C1917] mb-5 leading-tight"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
              >
                {s.headline}
              </h1>
              <p className="text-[#78716C] text-base mb-8 leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {s.sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={s.cta1.href}>
                  <button
                    className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: s.accent, fontFamily: "DM Sans, sans-serif" }}
                  >
                    <Heart size={15} fill="white" strokeWidth={0} />
                    {s.cta1.label}
                  </button>
                </Link>
                <Link href={s.cta2.href}>
                  <button
                    className="flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: s.accent, color: s.accent, fontFamily: "DM Sans, sans-serif" }}
                  >
                    {s.cta2.label}
                  </button>
                </Link>
              </div>
              {/* Slide dots */}
              <div className="flex gap-2 mt-10">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-[#C8102E]" : "w-2 bg-gray-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Mobile hero text overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 p-6">
          <h1 className="text-3xl font-black text-white mb-3 leading-tight drop-shadow-lg" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            {slide.headline}
          </h1>
          <div className="flex gap-3">
            <Link href={slide.cta1.href}>
              <button className="btn-heartland-red rounded-xl text-sm px-5 py-3 flex items-center gap-1.5">
                <Heart size={14} fill="white" strokeWidth={0} /> {slide.cta1.label}
              </button>
            </Link>
            <Link href={slide.cta2.href}>
              <button className="btn-heartland-teal rounded-xl text-sm px-5 py-3">{slide.cta2.label}</button>
            </Link>
          </div>
        </div>

        {/* Arrow controls */}
        <button
          onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1C1917] shadow-md transition-all md:hidden"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1C1917] shadow-md transition-all md:hidden"
        >
          <ChevronRight size={18} />
        </button>
      </section>

      {/* ── 2. FEATURED SPOTLIGHT STRIP ─────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div
          ref={spotlightReveal.ref}
          className={`container transition-all duration-700 ${spotlightReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spotlightItems.map((item) => (
              <Link key={item.title} href={item.href}>
                <div
                  className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-48"
                >
                  {/* Background photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1 px-2 py-0.5 rounded-full inline-block self-start text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tag}
                    </div>
                    <div className="font-bold text-white text-base mb-1 leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      {item.title}
                    </div>
                    <div className="text-white/80 text-xs leading-relaxed line-clamp-2">{item.desc}</div>
                  </div>
                  <ArrowRight size={16} className="absolute top-4 right-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTEGRATED FIND YOUR MATCH + MEET OUR ANIMALS ────────────────── */}
      <section className="bg-[#0D9488] pt-10 pb-0">
        <div
          ref={finderReveal.ref}
          className={`container transition-all duration-700 ${finderReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Header + search controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Find Your Match</div>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Meet Our Animals
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-sm border border-white/30 focus:ring-2 focus:ring-white/40 outline-none backdrop-blur-sm"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <option value="all" className="text-gray-800">All Animals</option>
                <option value="dog" className="text-gray-800">Dogs</option>
                <option value="cat" className="text-gray-800">Cats</option>
              </select>
              <select
                value={animalAge}
                onChange={(e) => setAnimalAge(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-sm border border-white/30 focus:ring-2 focus:ring-white/40 outline-none backdrop-blur-sm"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <option value="any" className="text-gray-800">Any Age</option>
                <option value="baby" className="text-gray-800">Baby / Kitten / Puppy</option>
                <option value="young" className="text-gray-800">Young (1–3 yrs)</option>
                <option value="adult" className="text-gray-800">Adult (3–8 yrs)</option>
                <option value="senior" className="text-gray-800">Senior (8+ yrs)</option>
              </select>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-md"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <Search size={15} />
                Search
              </button>
              <Link href="/adopt">
                <button className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-semibold transition-colors">
                  View All <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* Uniform animal grid — seamlessly connected to the teal section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.name} animal={animal} />
            ))}
          </div>


        </div>
      </section>

      <WaveDivider fill="#0D9488" flip={true} />

      {/* ── 4. IMPACT STATS ──────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-16 md:py-20">
        <div
          ref={statsReveal.ref}
          className={`container transition-all duration-700 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-3">2025 Annual Report</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C1917] mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              How YOU Helped Animals in 2025
            </h2>
            <p className="text-[#78716C] max-w-xl mx-auto text-sm">
              Because of our community's generosity, Heartland achieved a 98.4% live release rate — one of the highest in the nation.
            </p>
            <div className="w-14 h-1 bg-[#C8102E] mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about">
              <button className="btn-heartland-teal rounded-xl px-7 py-3">
                Read Our Annual Report
              </button>
            </Link>
          </div>
        </div>
      </section>


      {/* ── 5. FOSTER + VOLUNTEER ────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] pt-0 pb-16 md:pb-20">
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Get Involved</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Foster &amp; Volunteer
            </h2>
            <p className="text-[#78716C] mt-3 max-w-xl mx-auto">
              Open your home or give your time — every contribution saves lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── FOSTER CARD ── */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0D9488] text-white">
              <div className="absolute inset-0">
                <img src={HERO_FOSTER} alt="Foster an animal" className="w-full h-full object-cover opacity-20" />
              </div>
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mb-6 self-start">
                  <HandHeart size={14} />
                  Foster
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Open Your Home,<br />Save a Life
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  In 2025, <strong className="text-white">274 foster homes</strong> provided <strong className="text-white">22,373 days of care</strong> for animals in need. You supply the love — we supply everything else. Fostering is free, flexible, and one of the most impactful things you can do.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { number: "274", label: "Foster Homes" },
                    { number: "22,373", label: "Days of Care" },
                    { number: "Free", label: "All Supplies" },
                    { number: "24/7", label: "Vet Support" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                      <div className="text-xl font-black text-white mb-0.5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{stat.number}</div>
                      <div className="text-white/80 text-xs font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href="/foster">
                    <button className="bg-white text-[#0D9488] font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md w-full" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Become a Foster
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── VOLUNTEER CARD ── */}
            <div className="relative overflow-hidden rounded-3xl bg-[#C8102E] text-white">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                  <circle cx="350" cy="50" r="200" fill="white" />
                  <circle cx="50" cy="350" r="150" fill="white" />
                </svg>
              </div>
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mb-6 self-start">
                  <Users size={14} />
                  Volunteer
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Give Your Time,<br />Change a Life
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  In 2025, <strong className="text-white">653 volunteers</strong> contributed <strong className="text-white">19,913 hours</strong> of care, enrichment, and love. From dog walking to event support, there's a role for everyone.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { number: "653", label: "Volunteers" },
                    { number: "19,913", label: "Hours Given" },
                    { number: "Free", label: "Training Provided" },
                    { number: "Flexible", label: "Scheduling" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                      <div className="text-xl font-black text-white mb-0.5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{stat.number}</div>
                      <div className="text-white/80 text-xs font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href="/get-involved">
                    <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md w-full" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Become a Volunteer
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── 6. NEWS & EVENTS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div
          ref={eventsReveal.ref}
          className={`container transition-all duration-700 ${eventsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Stay in the Loop</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Upcoming Events
              </h2>
            </div>
            <Link href="/news">
              <button className="hidden md:flex items-center gap-1.5 text-sm font-bold text-[#0D9488] hover:text-[#0a7a70] transition-colors">
                All News & Events <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(newsData ?? upcomingEvents).slice(0, 3).map((item: any, idx: number) => {
              const isDbPost = "slug" in item;
              const title = item.title;
              const excerpt = isDbPost ? item.excerpt : item.desc;
              const category = isDbPost ? item.category : "Event";
              const color = isDbPost ? "#C8102E" : item.color;
              const dateLabel = isDbPost
                ? new Date(item.publishedAt ?? item.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                : `${item.date.month} ${item.date.day}`;
              const href = isDbPost ? `/news/${item.slug}` : "#";

              return (
                <div key={idx} className="group bg-[#FAF7F2] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100">
                  <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: color }} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                        {category}
                      </span>
                      <span className="text-xs text-[#78716C] flex items-center gap-1">
                        <CalendarDays size={11} />{dateLabel}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1C1917] mb-2 group-hover:text-[#C8102E] transition-colors" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      {title}
                    </h3>
                    <p className="text-sm text-[#78716C] leading-relaxed mb-4">{excerpt}</p>
                    {!isDbPost && item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#78716C] mb-3">
                        <MapPin size={12} className="text-[#0D9488]" />
                        {item.location}
                      </div>
                    )}
                    <Link href={href}>
                      <button className="text-sm font-bold flex items-center gap-1 transition-colors" style={{ color }}>
                        Learn More <ArrowRight size={13} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. SUCCESS STORIES ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-16 md:py-20">
        <div
          ref={storiesReveal.ref}
          className={`container transition-all duration-700 ${storiesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Happy Endings</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Success Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {successStories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="h-52 overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <blockquote className="text-[#1C1917] text-base italic leading-relaxed mb-4 flex-1">
                    "{story.quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-[#1C1917] text-sm">{story.name}</div>
                    <div className="text-xs text-[#0D9488] font-semibold">{story.animal}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. INSTAGRAM FEED ────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="container">
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="https://www.instagram.com/heartland_animal_shelter/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90 shadow-md"
              style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", fontFamily: "DM Sans, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Follow on Instagram
            </a>
            <a
              href="https://www.facebook.com/HeartlandAnimalShelter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: "#1877F2", fontFamily: "DM Sans, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Follow on Facebook
            </a>
          </div>
          <EmbedSocialFeed />
        </div>
      </section>

      {/* ── 9. DONATE CTA BAND ───────────────────────────────────────────────── */}
      <section className="bg-[#C8102E] py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Help Us Save More Lives in 2026
              </h2>
              <p className="text-white/90 text-base">
                Heartland is a 501(c)(3) non-profit. Every dollar goes directly to the animals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/donate">
                <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Donate Now
                </button>
              </Link>
              <Link href="/donate#monthly">
                <button className="border-2 border-white text-white font-bold uppercase tracking-wide text-sm px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Give Monthly
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── FLOATING DONATE BUTTON ───────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showFloatingDonate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Link href="/donate">
          <button
            className="flex items-center gap-2 bg-[#C8102E] text-white font-bold text-sm px-5 py-3 rounded-full shadow-xl hover:bg-[#a00d24] hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <Heart size={16} fill="white" strokeWidth={0} />
            Donate
          </button>
        </Link>
      </div>
    </div>
  );
}
