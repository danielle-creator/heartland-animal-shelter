/*
 * HEARTLAND ANIMAL SHELTER — Foster Program Page
 */
import { Link } from "wouter";
import {
  Heart, Home, CheckCircle, Clock, Package, Phone,
  ArrowRight, Star, Baby, Cat, Dog, HelpCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_FOSTER = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-3_1771606683000_na1fn_aGVyby1mb3N0ZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTNfMTc3MTYwNjY4MzAwMF9uYTFmbl9hR1Z5YnkxbWIzTjBaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qqhGrgML~C3aiqyqXZBGSGnWp86lPbd6L74EnrJTCCKYvD-UwJCTGGvq0qCOI-FOe4~8fdbkTFjznI8EIw8QA0L8I6Kl8EhDxr1Nq6V~3N8hf9soQoyV7NZZNW1KAXnZGmo9da7fBoCXXYT9LrcHeuNCkcv7II1UJOq8IUtH78CYOscCfAWJziAnaKD4VMaYnWok5VVA35nLKbXNvtYNI2OZoBliKxLj4wD~DevXs~-QGi9D0I3aW2AtcB41AOghLwZDJ47QWhE5qHx1L3225k91~JaMmKOi1uVhzI5TnManJBlRmRVE1KT4hgFmgA5QIcVIJyo2rnI8PJj3QweZyA__";

const fosterTypes = [
  {
    icon: <Baby size={28} className="text-[#C8102E]" />,
    title: "Neonatal Kittens",
    desc: "Bottle-feed kittens too young for adoption. The most critical and rewarding foster role — you save lives that couldn't survive without you.",
    commitment: "24/7 care, 4–8 weeks",
    badge: "Most Needed",
    badgeColor: "#C8102E",
  },
  {
    icon: <Cat size={28} className="text-[#0D9488]" />,
    title: "Cats & Kittens",
    desc: "Provide a quiet home environment for cats who need socialization or recovery time before adoption.",
    commitment: "2–6 weeks typically",
    badge: "Great for Beginners",
    badgeColor: "#0D9488",
  },
  {
    icon: <Dog size={28} className="text-[#C8102E]" />,
    title: "Dogs & Puppies",
    desc: "Help dogs decompress from shelter stress, learn basic manners, and prepare for their forever home.",
    commitment: "1–4 weeks typically",
    badge: "All Experience Levels",
    badgeColor: "#1d4ed8",
  },
  {
    icon: <Heart size={28} className="text-[#0D9488]" />,
    title: "Medical Foster",
    desc: "Provide recovery care for animals post-surgery or with medical needs. Training provided — you don't need to be a vet!",
    commitment: "Varies by animal",
    badge: "Training Provided",
    badgeColor: "#92400e",
  },
];

const steps = [
  {
    num: "01",
    title: "Complete the Application",
    desc: "Fill out our online foster application. It takes about 10 minutes and helps us match you with the right animal.",
  },
  {
    num: "02",
    title: "Attend Orientation",
    desc: "Join a free 1-hour orientation (in-person or virtual) to learn about foster care, what to expect, and how we support you.",
  },
  {
    num: "03",
    title: "Get Matched",
    desc: "Our foster coordinator will reach out to match you with an animal based on your home, experience, and preferences.",
  },
  {
    num: "04",
    title: "Pick Up Your Foster",
    desc: "Come to the shelter to pick up your foster animal along with all supplies, food, and written care instructions.",
  },
  {
    num: "05",
    title: "Provide Love & Care",
    desc: "Open your home and heart! Our team is available 24/7 for questions, and we cover all medical expenses.",
  },
  {
    num: "06",
    title: "Return When Ready",
    desc: "When your foster animal is ready for adoption, bring them back to the shelter. Then do it all over again! 🐾",
  },
];

const faqs = [
  {
    q: "Do I need experience with animals?",
    a: "Not at all! We welcome first-time fosters and provide all the training and support you need. We'll match you with an animal that fits your experience level.",
  },
  {
    q: "What does fostering cost?",
    a: "Fostering is completely free. Heartland provides all food, supplies, litter, bedding, and covers all veterinary expenses. You just provide the love!",
  },
  {
    q: "Can I foster if I already have pets?",
    a: "Yes! Many of our fosters have resident pets. We'll work with you to find a foster animal that's compatible with your household.",
  },
  {
    q: "What if I fall in love and want to adopt?",
    a: "Foster-to-adopt is wonderful! Many of our fosters end up adopting their foster animals. Just let your foster coordinator know you're interested.",
  },
  {
    q: "How long does fostering last?",
    a: "It depends on the animal. Some fosters last a few days, others a few months. We'll discuss timeframes when we match you with an animal.",
  },
  {
    q: "What support do I get as a foster?",
    a: "You'll have a dedicated foster coordinator, 24/7 emergency vet support, a private Facebook group for foster families, and regular check-ins from our team.",
  },
];

export default function Foster() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] overflow-hidden">
        <img src={HERO_FOSTER} alt="Foster an animal" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-5">
                <Heart size={14} fill="white" />
                Fosters Save Lives
              </div>
              <h1
                className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Open Your Home,<br />Save a Life
              </h1>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                In 2025, <strong className="text-white">274 foster homes</strong> provided <strong className="text-white">22,373 days of care</strong>. You supply the love — we supply everything else.
              </p>
              <a
                href="https://heartlandanimalshelter.org/foster-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#0D9488] font-bold uppercase tracking-wide text-sm px-7 py-3.5 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
              >
                Apply to Foster
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#1C1917] py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "274", label: "Foster Homes in 2025" },
              { number: "22,373", label: "Days of Foster Care" },
              { number: "100%", label: "Supplies Provided Free" },
              { number: "24/7", label: "Vet & Staff Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black text-[#0D9488] mb-0.5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {stat.number}
                </div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foster types */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Find Your Fit</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Types of Foster Care
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {fosterTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  {type.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-black text-[#1C1917] text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {type.title}
                  </h3>
                </div>
                <span
                  className="inline-block text-xs font-bold px-2 py-0.5 rounded-full text-white mb-3"
                  style={{ backgroundColor: type.badgeColor }}
                >
                  {type.badge}
                </span>
                <p className="text-sm text-[#78716C] leading-relaxed mb-3">{type.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#0D9488] font-semibold">
                  <Clock size={12} />
                  {type.commitment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Simple Process</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              How to Become a Foster
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C8102E] text-white font-black text-sm flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1917] mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://heartlandanimalshelter.org/foster-application"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-heartland-red rounded-lg px-8 py-3.5"
            >
              Start Your Application
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* What we provide */}
      <section className="bg-[#FAF7F2] py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">We've Got You Covered</div>
              <h2 className="text-3xl font-black text-[#1C1917] mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Everything You Need,<br />Provided Free
              </h2>
              <p className="text-[#78716C] leading-relaxed mb-6">
                We know that opening your home is a big commitment. That's why Heartland provides everything you need to care for your foster animal — at no cost to you.
              </p>
              <div className="space-y-3">
                {[
                  "All food, treats, and feeding supplies",
                  "Crates, carriers, and bedding",
                  "Litter boxes and litter for cats",
                  "Toys and enrichment items",
                  "All veterinary care and medications",
                  "Written care instructions for your animal",
                  "24/7 emergency vet support line",
                  "Dedicated foster coordinator",
                  "Private foster family Facebook group",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-[#0D9488] flex-shrink-0" />
                    <span className="text-sm text-[#1C1917]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0D9488] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-black mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Ready to Change a Life?
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Fostering is one of the most impactful things you can do for animals in need. Whether you have a few weeks or a few months, every foster home saves lives.
              </p>
              <div className="space-y-3">
                <a
                  href="https://heartlandanimalshelter.org/foster-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#0D9488] font-bold uppercase tracking-wide text-sm px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  Apply to Foster
                  <ArrowRight size={14} />
                </a>
                <a
                  href="mailto:foster@heartlandanimalshelter.org"
                  className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors w-full"
                >
                  <Phone size={14} />
                  Contact Foster Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2">Got Questions?</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Foster FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[#FAF7F2] rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#1C1917] mb-1.5">{faq.q}</h3>
                    <p className="text-sm text-[#78716C] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#FAF7F2] py-12">
        <div className="container max-w-2xl text-center">
          <div className="flex gap-0.5 justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl italic text-[#1C1917] mb-4 leading-relaxed">
            "Fostering kittens through Heartland has been one of the most rewarding experiences of my life. The staff is incredibly supportive, and knowing I'm saving lives that couldn't survive without me is indescribable."
          </blockquote>
          <div className="font-bold text-[#1C1917]">Sarah M.</div>
          <div className="text-sm text-[#0D9488] font-semibold">Foster Parent since 2022</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
