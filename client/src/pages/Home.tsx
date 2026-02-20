/*
 * HEARTLAND ANIMAL SHELTER — Home Page
 * Design: Editorial Warmth — emotion-first, asymmetric layout, bold animal photography
 * Sections: Hero slider, 3-col CTAs, Featured Pets, Impact Stats, Foster CTA, News/Events, Success Stories, Newsletter
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Heart, Users, HomeIcon, ArrowRight, ChevronLeft, ChevronRight, Star, CalendarDays } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_MAIN = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-1_1771606687000_na1fn_aGVyby1tYWlu.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTFfMTc3MTYwNjY4NzAwMF9uYTFmbl9hR1Z5YnkxdFlXbHUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Vf9O0hduNY1Eb151V1laThMynfbCtIt8YqupN5qk4QpmCT1TJJ3iHi-GrTt0omWgbKaZYPTcmLwOgvwDQ5i3KTxvo6stS8qzsUooGUHjB1CanKhx-KiJ-ccDyMygoGwlOuFimGh6WjajdZvVnvFiP5aKh2H3ojqlST0JB9o1TC~8-eDTBoGdhmGTpH-p3IWRWocgxIfp-1SEy1caEtfNrMe-BPfNbtEyNLHLzo57wQYAg~pbogjT5Bx0XwRPL15tWKa1EZev4Bhhfy4fjv1L9GAHXHo-6hP43l2MjxA8HnKFhqdGFqowcAdXlKKs60sQMQmv-0U1ccbF3pKNAJiE5g__";
const HERO_ADOPT = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-2_1771606675000_na1fn_aGVyby1hZG9wdA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTJfMTc3MTYwNjY3NTAwMF9uYTFmbl9hR1Z5YnkxaFpHOXdkQS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RNiI0UWHZ62GTLg47Ct8Kcq-EgEOSqinmCCJ8wRMUYYNTpcDZBp~9Ot~mzBoia5WDdpAVpoddLpvayb4lU8Nk7JbNl2ke-y7F5khevkPODrW4vdyeGfvN2iNpIlaQJLjV389FDUDzUa3bspHRIkk6UyTaOogY64oVMPFrH4w69qH4Dq5hnV9NBLqjTtI0KLq2ptgjsnO~wlR2tXBCWEm9J~o93hqqaVDxEcekO4s3ntmWlRvqwC5MkYwSacHe5eGJeI8ZWKI0Y84ZxQoVimhj2gPmMbBZn-Q~21pb-kS8ZAzqaMqsbsTuoF-RlH6MLcB11qRhwT6Dv75AckH833gEQ__";
const HERO_VOLUNTEER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-4_1771606683000_na1fn_aGVyby12b2x1bnRlZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTRfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxMmIyeDFiblJsWlhJLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=emtohp-iyn4Ma8XEPFMvKmP4vlOQIVsRVqgwStz2uZ6kWjttuWQW0qewszT3OihGrU3RTghWoDz-0DDPXftwYIKgCWTiS40lW-7C2DW1~qIfa3-fte89rNiOQwzwfgJTcAl8fJ4qJlqKg--ck9PpvW1Q-RJF7dNyc2xzvpfnwTd4NH93TQ-dcCnBy8rGjcHpFtlWN0VK1muwxfCM1AuPPESxVRaHEGl8KXEjn4UrRx1KF0QUZeg0nPTUl~GTQc-uiVfLnN5O8EFyprAxZ3aika7Zmhdn7fR~Fyf3M3jq8abkUDeFJuMdk-Rn4NtmpsnLreBzqniZxpCgSv7hisyQJA__";
const HERO_FOSTER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-3_1771606683000_na1fn_aGVyby1mb3N0ZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTNfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxbWIzTjBaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qqhGrgML~C3aiqyqXZBGSGnWp86lPbd6L74EnrJTCCKYvD-UwJCTGGvq0qCOI-FOe4~8fdbkTFjznI8EIw8QA0L8I6Kl8EhDxr1Nq6V~3N8hf9soQoyV7NZZNW1KAXnZGmo9da7fBoCXXYT9LrcHeuNCkcv7II1UJOq8IUtH78CYOscCfAWJziAnaKD4VMaYnWok5VVA35nLKbXNvtYNI2OZoBliKxLj4wD~DevXs~-QGi9D0I3aW2AtcB41AOghLwZDJ47QWhE5qHx1L3225k91~JaMmKOi1uVhzI5TnManJBlRmRVE1KT4hgFmgA5QIcVIJyo2rnI8PJj3QweZyA__";
const HERO_DONATE = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-5_1771606681000_na1fn_aGVyby1kb25hdGU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTVfMTc3MTYwNjY4MTAwMF9uYTFmbl9hR1Z5Ynkxa2IyNWhkR1UuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kLLFkxPKqVnMuOg5VZZtFAguNkTPv4dZY8ooLtj4teShW1VfSMO~idODQkRX9bKRYPkpUrE3vPeE9OqaK3vtedFoEbzTa-s~Y6QjZvynQiEYboJKxtyzxCugIWEw1pbKO9AAgSZKfcXImgO6KBvmuRiBLn4E0Qei16KpG9bTECmKTE-Vjps0AS8RPUKuCkq4-ZQRHZRz5sk7YDUSc5-8SGtb~ixwQ~0iQfaZQIqMZYyD-V6lzK-VQwKZS~mW20xwtc7~Oh6AAtYtVL5RNUY9LFAk7czTq5j3-7UK7fy4ljypxm1DZwOQw~wYNLCj7Owjm--Dw8i2nLw9oavujS0t3g__";

const heroSlides = [
  {
    image: HERO_MAIN,
    tag: "No-Kill Shelter Since 2002",
    headline: "Every Animal Deserves a Loving Home",
    sub: "Heartland Animal Shelter finds permanent, loving homes for each animal in our care — with a 98.4% live release rate.",
    cta1: { label: "Adopt a Pet", href: "/adopt" },
    cta2: { label: "Donate Now", href: "/donate" },
  },
  {
    image: HERO_ADOPT,
    tag: "1,252 Adoptions in 2025",
    headline: "Your New Best Friend is Waiting",
    sub: "When you adopt from a no-kill shelter, you save two lives: the animal you adopt and the one that takes their place.",
    cta1: { label: "Meet Our Dogs", href: "/adopt#dogs" },
    cta2: { label: "Meet Our Cats", href: "/adopt#cats" },
  },
  {
    image: HERO_VOLUNTEER,
    tag: "19,913 Volunteer Hours in 2025",
    headline: "Volunteers Are the Heart of Heartland",
    sub: "Our 653 volunteers are the backbone of everything we do. Join us and make a real difference for animals in need.",
    cta1: { label: "Volunteer", href: "/get-involved#volunteer" },
    cta2: { label: "Foster a Pet", href: "/get-involved#foster" },
  },
];

const stats = [
  { number: "1,325", label: "Animals Welcomed in 2025", icon: "🐾" },
  { number: "98.4%", label: "Live Release Rate", icon: "❤️" },
  { number: "1,252", label: "Adoptions in 2025", icon: "🏠" },
  { number: "274", label: "Foster Homes", icon: "🤝" },
  { number: "19,913", label: "Volunteer Hours", icon: "⭐" },
  { number: "3,506", label: "Donors Supporting Us", icon: "💛" },
];

const featuredPets = [
  { name: "Bella", type: "Dog", age: "2 years", breed: "Lab Mix", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", badge: "Available Now" },
  { name: "Oliver", type: "Cat", age: "1 year", breed: "Tabby", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop", badge: "Available Now" },
  { name: "Max", type: "Dog", age: "4 years", breed: "Shepherd Mix", image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop", badge: "Available Now" },
  { name: "Luna", type: "Cat", age: "3 years", breed: "Domestic Shorthair", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop", badge: "Needs Foster" },
  { name: "Charlie", type: "Dog", age: "6 months", breed: "Beagle Mix", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop", badge: "Available Now" },
  { name: "Mochi", type: "Cat", age: "5 years", breed: "Persian Mix", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop", badge: "Senior" },
];

const newsItems = [
  {
    date: "Feb 2026",
    title: "Outdoor Cats Workshops",
    excerpt: "Want to learn how to help outdoor cats in your neighborhood? Whether you're brand new to trapping or have experience, this workshop is for you.",
    category: "Event",
    color: "#0D9488",
  },
  {
    date: "Jan 2026",
    title: "PetSmart Adoption Event",
    excerpt: "It's not too late to find puppy love! $100 off puppy & dog adoption fees at our Northbrook PetSmart satellite adoption center.",
    category: "Adoption Event",
    color: "#C8102E",
  },
  {
    date: "Jan 2026",
    title: "Locks of Love",
    excerpt: "Your love is the key to a second chance for homeless animals. Join our Locks of Love campaign and help us raise funds for our animals.",
    category: "Fundraiser",
    color: "#92400e",
  },
];

const successStories = [
  {
    quote: "We adopted Biscuit three years ago and he has completely changed our family. We can't imagine life without him!",
    name: "The Johnson Family",
    pet: "Biscuit, Golden Mix",
    image: HERO_ADOPT,
  },
  {
    quote: "Fostering kittens through Heartland has been one of the most rewarding experiences of my life. They make it so easy!",
    name: "Sarah M.",
    pet: "Foster Parent",
    image: HERO_FOSTER,
  },
];

function CountUpStat({ number, label, icon }: { number: string; label: string; icon: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-3xl mb-1">{icon}</div>
      <div className="stat-number text-4xl md:text-5xl text-[#C8102E] mb-1">{number}</div>
      <div className="text-sm font-semibold text-[#78716C] uppercase tracking-wide" style={{fontFamily:'DM Sans, sans-serif'}}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor:'#FAF7F2'}}>
      <Navigation />

      {/* HERO SLIDER */}
      <section className="relative h-[70vh] min-h-[520px] max-h-[800px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image} alt={s.headline} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-block bg-[#C8102E] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-5 rounded-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
                {slide.tag}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight drop-shadow-lg" style={{fontFamily:'Playfair Display, serif', textShadow:'0 2px 12px rgba(0,0,0,0.4)'}}>
                {slide.headline}
              </h1>
              <p className="text-white/95 text-lg mb-8 max-w-lg leading-relaxed drop-shadow" style={{fontFamily:'DM Sans, sans-serif'}}>
                {slide.sub}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={slide.cta1.href}>
                  <button className="btn-heartland-red rounded text-base px-6 py-3 flex items-center gap-2">
                    <Heart size={16} fill="white" />
                    {slide.cta1.label}
                  </button>
                </Link>
                <Link href={slide.cta2.href}>
                  <button className="btn-heartland-teal rounded text-base px-6 py-3">
                    {slide.cta2.label}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <button
          onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'bg-[#C8102E] w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* THREE-COLUMN CTA SECTION */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              {
                icon: <HomeIcon size={28} className="text-[#C8102E]" />,
                title: "Adopt",
                desc: "When you adopt from a no-kill shelter, you save two lives: the animal you adopt and the one that replaces them.",
                cta: "Find Your Pet",
                href: "/adopt",
                color: "#C8102E",
              },
              {
                icon: <Users size={28} className="text-[#0D9488]" />,
                title: "Get Involved",
                desc: "Volunteer, foster, or join our community of animal lovers. There's something meaningful for everyone to do.",
                cta: "Get Involved",
                href: "/get-involved",
                color: "#0D9488",
              },
              {
                icon: <Heart size={28} className="text-[#C8102E]" />,
                title: "Donate",
                desc: "Heartland is a 501(c)(3) non-profit that could not operate without our generous donors. Every gift saves lives.",
                cta: "Make a Gift",
                href: "/donate",
                color: "#C8102E",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center px-8 py-8 group">
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-[#78716C] text-sm leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>{item.desc}</p>
                <Link href={item.href}>
                  <button
                    className="text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors"
                    style={{color: item.color, fontFamily:'DM Sans, sans-serif'}}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ADOPTABLE PETS */}
      <section className="paw-bg py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Find Your Match</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>
                Meet Our Animals
              </h2>
            </div>
            <Link href="/adopt">
              <button className="hidden md:flex items-center gap-1.5 text-sm font-bold text-[#0D9488] hover:text-[#0a7a70] transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredPets.map((pet) => (
              <Link key={pet.name} href="/adopt">
                <div className="card-hover bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer border border-gray-100">
                  <div className="relative aspect-square">
                    <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                    <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full ${pet.badge === 'Needs Foster' ? 'bg-[#0D9488]' : pet.badge === 'Senior' ? 'bg-amber-600' : 'bg-[#C8102E]'}`}>
                      {pet.badge}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-[#1C1917] text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{pet.name}</div>
                    <div className="text-xs text-[#78716C]">{pet.breed}</div>
                    <div className="text-xs text-[#78716C]">{pet.age}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/adopt">
              <button className="btn-heartland-red rounded px-8 py-3">
                See All Adoptable Pets
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="bg-[#1C1917] py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>2025 By the Numbers</div>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              Our Impact This Year
            </h2>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about">
              <button className="btn-heartland-teal rounded px-8 py-3">
                Read Our Annual Report
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOSTER CTA BAND */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_FOSTER} alt="Foster a pet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0D9488]/85" />
        </div>
        <div className="relative z-10 container py-16">
          <div className="max-w-2xl">
            <div className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>
              Fosters Save Lives
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{fontFamily:'Playfair Display, serif'}}>
              Open Your Home, Save a Life
            </h2>
            <p className="text-white/90 text-lg mb-6 leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>
              In 2025, 274 foster homes provided 22,373 days of care for animals in need. You supply the love — we supply everything else. Fostering is free, flexible, and one of the most impactful things you can do.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-involved#foster">
                <button className="bg-white text-[#0D9488] font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-gray-100 transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Become a Foster
                </button>
              </Link>
              <Link href="/get-involved">
                <button className="border-2 border-white text-white font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Other Ways to Help
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS & EVENTS */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Stay in the Loop</div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>
                News & Events
              </h2>
            </div>
            <a href="https://heartlandanimalshelter.org/news" target="_blank" rel="noopener noreferrer">
              <button className="hidden md:flex items-center gap-1.5 text-sm font-bold text-[#0D9488] hover:text-[#0a7a70] transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                View All <ArrowRight size={14} />
              </button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div key={item.title} className="card-hover bg-[#FAF7F2] rounded-xl overflow-hidden">
                <div className="h-2" style={{backgroundColor: item.color}} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white" style={{backgroundColor: item.color, fontFamily:'DM Sans, sans-serif'}}>
                      {item.category}
                    </span>
                    <span className="text-xs text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
                      <CalendarDays size={11} className="inline mr-1" />{item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>{item.title}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>{item.excerpt}</p>
                  <button className="text-sm font-bold flex items-center gap-1 transition-colors" style={{color: item.color, fontFamily:'DM Sans, sans-serif'}}>
                    Read More <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="paw-bg py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Happy Endings</div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>
              Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {successStories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-[#1C1917] text-base italic leading-relaxed mb-4 flex-1" style={{fontFamily:'Playfair Display, serif'}}>
                    "{story.quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-[#1C1917] text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{story.name}</div>
                    <div className="text-xs text-[#0D9488] font-semibold" style={{fontFamily:'DM Sans, sans-serif'}}>{story.pet}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE CTA BAND */}
      <section className="bg-[#C8102E] py-14">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2" style={{fontFamily:'Playfair Display, serif'}}>
                Help Us Save More Lives in 2026
              </h2>
              <p className="text-white/90 text-base" style={{fontFamily:'DM Sans, sans-serif'}}>
                Heartland is a 501(c)(3) non-profit. Every dollar goes directly to the animals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/donate">
                <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded hover:bg-gray-100 transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Donate Now
                </button>
              </Link>
              <Link href="/donate#monthly">
                <button className="border-2 border-white text-white font-bold uppercase tracking-wide text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Give Monthly
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
