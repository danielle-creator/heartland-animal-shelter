/*
 * HEARTLAND ANIMAL SHELTER — Adopt Page
 * Design: Editorial Warmth — red/teal accents, Playfair Display + DM Sans
 * Sections: Hero, Adoptable Dogs/Cats (Shelterluv embed), How to Adopt, Fees, FAQ
 */
import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Dog, Cat, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_ADOPT = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-2_1771606675000_na1fn_aGVyby1hZG9wdA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTJfMTc3MTYwNjY3NTAwMF9uYTFmbl9hR1Z5YnkxaFpHOXdkQS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RNiI0UWHZ62GTLg47Ct8Kcq-EgEOSqinmCCJ8wRMUYYNTpcDZBp~9Ot~mzBoia5WDdpAVpoddLpvayb4lU8Nk7JbNl2ke-y7F5khevkPODrW4vdyeGfvN2iNpIlaQJLjV389FDUDzUa3bspHRIkk6UyTaOogY64oVMPFrH4w69qH4Dq5hnV9NBLqjTtI0KLq2ptgjsnO~wlR2tXBCWEm9J~o93hqqaVDxEcekO4s3ntmWlRvqwC5MkYwSacHe5eGJeI8ZWKI0Y84ZxQoVimhj2gPmMbBZn-Q~21pb-kS8ZAzqaMqsbsTuoF-RlH6MLcB11qRhwT6Dv75AckH833gEQ__";

const adoptionSteps = [
  { step: "1", title: "Browse Our Animals", desc: "View all available dogs and cats below, or visit us in person. Our animals are also at PetSmart Northbrook." },
  { step: "2", title: "Submit an Application", desc: "Fill out a dog or cat adoption application online. Applications are reviewed by our adoption team." },
  { step: "3", title: "Meet Your Match", desc: "Visit the shelter to meet your potential new pet in person. Bring all household members, including resident dogs." },
  { step: "4", title: "Finalize the Adoption", desc: "Allow 45 minutes to complete paperwork. Bring your ID and payment. We accept cash, check, or credit card." },
];

const dogFees = [
  { category: "Puppies/Juveniles (up to 6 months)", fee: "$450" },
  { category: "Small Dogs (under 35 lbs, 6 months–8 years)", fee: "$375" },
  { category: "Medium/Large Dogs (over 35 lbs, 6 months–8 years)", fee: "$300" },
  { category: "Senior Dogs (all sizes, over 8 years)", fee: "$175 *free for seniors 65+" },
];

const catFees = [
  { category: "Kittens (up to 6 months)", fee: "$200 / pair $350" },
  { category: "Cats (6 months–8 years)", fee: "$150 / pair $250" },
  { category: "Senior Cats (over 8 years)", fee: "$125 / pair $200 *free for seniors 65+" },
];

const faqs = [
  {
    q: "Do I need an appointment to visit?",
    a: "No appointment is needed during open hours (Thu–Fri 4–7pm, Sat–Sun 12–6pm). Just come in! You must be 18+ unless accompanied by a parent.",
  },
  {
    q: "Can I hold an animal while I decide?",
    a: "We are not able to 'hold' animals. We recommend visiting as soon as possible if you're interested in a specific pet.",
  },
  {
    q: "What does the adoption fee include?",
    a: "Adoption fees cover vaccinations, deworming, heartworm test (dogs 6+ months), FeLV/FIV test (cats), microchip, and spay/neuter. All animals are spayed or neutered before adoption.",
  },
  {
    q: "I rent — can I still adopt?",
    a: "Yes! Renters must provide a current lease agreement showing the species/breed is permitted, or provide the landlord's name and phone number.",
  },
  {
    q: "Do kittens need to be adopted in pairs?",
    a: "We strongly recommend kittens under 5 months be adopted in pairs. Exceptions may be made at the discretion of the cat program staff.",
  },
  {
    q: "What is the Seniors for Seniors program?",
    a: "Adopters aged 65+ can adopt a senior animal (8+ years) with the adoption fee waived. We also take individual financial circumstances into account.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#1C1917] text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{q}</span>
        {open ? <ChevronUp size={16} className="text-[#C8102E] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#78716C] flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{a}</div>
      )}
    </div>
  );
}

export default function Adopt() {
  const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navigation />

      {/* Page Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={HERO_ADOPT} alt="Adopt a pet" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>No-Kill Shelter</div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              Adopt a Pet
            </h1>
            <p className="text-white/90 mt-2 text-lg" style={{fontFamily:'DM Sans, sans-serif'}}>
              When you adopt, you save two lives.
            </p>
          </div>
        </div>
      </section>

      {/* PetSmart satellite callout */}
      <div className="bg-[#0D9488] py-3">
        <div className="container flex flex-wrap items-center justify-center gap-2 text-sm text-white" style={{fontFamily:'DM Sans, sans-serif'}}>
          <span className="font-semibold">🐱 Also visit us at PetSmart Northbrook!</span>
          <span className="text-white/80">Our satellite adoption center is open 7 days a week for cats.</span>
        </div>
      </div>

      {/* Quick CTA bar */}
      <div className="bg-[#C8102E] py-3">
        <div className="container flex flex-wrap items-center justify-center gap-4 text-sm text-white" style={{fontFamily:'DM Sans, sans-serif'}}>
          <span className="font-semibold">Ready to adopt?</span>
          <a href="https://www.shelterluv.com/matchme/adopt/HAS/Dog" target="_blank" rel="noopener noreferrer"
            className="bg-white text-[#C8102E] font-bold px-4 py-1.5 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide text-xs">
            Dog Application
          </a>
          <a href="https://www.shelterluv.com/matchme/adopt/HAS/Cat" target="_blank" rel="noopener noreferrer"
            className="bg-white text-[#C8102E] font-bold px-4 py-1.5 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide text-xs">
            Cat Application
          </a>
          <span>Questions? Email <a href="mailto:dogs@heartlandanimalshelter.org" className="underline">dogs@</a> or <a href="mailto:cats@heartlandanimalshelter.org" className="underline">cats@heartlandanimalshelter.org</a></span>
        </div>
      </div>

      {/* Adoptable Animals */}
      <section id="animals" className="bg-white py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>
              Meet Our Adoptable Animals
            </h2>
            <p className="text-[#78716C] max-w-xl mx-auto" style={{fontFamily:'DM Sans, sans-serif'}}>
              Our animals are also available at the <strong>Heartland Satellite Adoption Center at PetSmart – Northbrook</strong> and in foster homes throughout Chicagoland.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => setActiveTab('dogs')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'dogs' ? 'bg-[#C8102E] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                style={{fontFamily:'DM Sans, sans-serif'}}
              >
                <Dog size={16} /> Dogs
              </button>
              <button
                onClick={() => setActiveTab('cats')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold transition-all ${activeTab === 'cats' ? 'bg-[#C8102E] text-white shadow-sm' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                style={{fontFamily:'DM Sans, sans-serif'}}
              >
                <Cat size={16} /> Cats
              </button>
            </div>
          </div>

          {/* Shelterluv embed */}
          <div id="dogs" className={activeTab === 'dogs' ? 'block' : 'hidden'}>
            <div className="bg-[#FAF7F2] rounded-xl p-4 mb-4 text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
              <strong className="text-[#1C1917]">Interested in a specific dog?</strong> Email <a href="mailto:dogs@heartlandanimalshelter.org" className="text-[#C8102E] hover:underline">dogs@heartlandanimalshelter.org</a>. Click a dog's profile to learn more and submit an application.
            </div>
            <div className="w-full min-h-[600px] bg-gray-50 rounded-xl overflow-hidden">
              <iframe
                src="https://www.shelterluv.com/embed/animal/HAS?type=Dog&status=Available"
                width="100%"
                height="700"
                frameBorder="0"
                title="Adoptable Dogs"
                className="rounded-xl"
              />
            </div>
          </div>

          <div id="cats" className={activeTab === 'cats' ? 'block' : 'hidden'}>
            <div className="bg-[#FAF7F2] rounded-xl p-4 mb-4 text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
              <strong className="text-[#1C1917]">Interested in a specific cat?</strong> Email <a href="mailto:cats@heartlandanimalshelter.org" className="text-[#C8102E] hover:underline">cats@heartlandanimalshelter.org</a>. <strong>Kittens under 5 months must be adopted in pairs</strong> (with few exceptions).
            </div>
            <div className="w-full min-h-[600px] bg-gray-50 rounded-xl overflow-hidden">
              <iframe
                src="https://www.shelterluv.com/embed/animal/HAS?type=Cat&status=Available"
                width="100%"
                height="700"
                frameBorder="0"
                title="Adoptable Cats"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Adopt */}
      <section id="how-to-adopt" className="paw-bg py-14">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Simple Process</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>How to Adopt</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adoptionSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="w-10 h-10 bg-[#C8102E] text-white rounded-full flex items-center justify-center font-black text-lg mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                  {step.step}
                </div>
                <h3 className="font-bold text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>{step.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="mt-10 bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>Requirements to Adopt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Must be 21 years of age or older with a valid government-issued ID",
                "Renters must provide a lease showing the species/breed is permitted, or landlord contact info",
                "We encourage all household members to visit before adopting",
                "Dog adopters should bring all resident dogs to meet the potential new pet",
                "All animals are vaccinated, dewormed, and microchipped prior to adoption",
                "Kittens under 5 months must be adopted in pairs (with few exceptions)",
              ].map((req) => (
                <div key={req} className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Fees */}
      <section className="bg-white py-14">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Transparent Pricing</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Adoption Fees</h2>
            <p className="text-[#78716C] mt-2 max-w-xl mx-auto text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
              Fees cover vaccinations, deworming, microchip, heartworm/FeLV/FIV testing, and spay/neuter. <em>Fees are subject to change.</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF7F2] rounded-xl overflow-hidden">
              <div className="bg-[#C8102E] px-6 py-3 flex items-center gap-2">
                <Dog size={18} className="text-white" />
                <h3 className="font-bold text-white" style={{fontFamily:'DM Sans, sans-serif'}}>Canine Fees</h3>
              </div>
              <div className="p-4">
                {dogFees.map((row) => (
                  <div key={row.category} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0 gap-4">
                    <span className="text-sm text-[#1C1917]" style={{fontFamily:'DM Sans, sans-serif'}}>{row.category}</span>
                    <span className="font-bold text-[#C8102E] text-sm whitespace-nowrap" style={{fontFamily:'DM Sans, sans-serif'}}>{row.fee}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF7F2] rounded-xl overflow-hidden">
              <div className="bg-[#0D9488] px-6 py-3 flex items-center gap-2">
                <Cat size={18} className="text-white" />
                <h3 className="font-bold text-white" style={{fontFamily:'DM Sans, sans-serif'}}>Feline Fees</h3>
              </div>
              <div className="p-4">
                {catFees.map((row) => (
                  <div key={row.category} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0 gap-4">
                    <span className="text-sm text-[#1C1917]" style={{fontFamily:'DM Sans, sans-serif'}}>{row.category}</span>
                    <span className="font-bold text-[#0D9488] text-sm whitespace-nowrap" style={{fontFamily:'DM Sans, sans-serif'}}>{row.fee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800" style={{fontFamily:'DM Sans, sans-serif'}}>
            <strong>Seniors for Seniors:</strong> Adopters aged 65+ can adopt a senior animal (8+ years) with the adoption fee waived. We also consider individual financial circumstances — please speak with our staff.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="paw-bg py-14">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Common Questions</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Adoption FAQ</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C8102E] py-12">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={{fontFamily:'Playfair Display, serif'}}>
            Ready to Find Your New Best Friend?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://www.shelterluv.com/matchme/adopt/HAS/Dog" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded hover:bg-gray-100 transition-colors flex items-center gap-2" style={{fontFamily:'DM Sans, sans-serif'}}>
                <Dog size={16} /> Dog Application
              </button>
            </a>
            <a href="https://www.shelterluv.com/matchme/adopt/HAS/Cat" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded hover:bg-gray-100 transition-colors flex items-center gap-2" style={{fontFamily:'DM Sans, sans-serif'}}>
                <Cat size={16} /> Cat Application
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
