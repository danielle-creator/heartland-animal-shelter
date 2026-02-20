/*
 * HEARTLAND ANIMAL SHELTER — About Page
 * Design: Editorial Warmth — red/teal accents, Playfair Display + DM Sans
 * Sections: Hero, Mission/History, Values, Stats, Staff/Leadership, Strategic Plan
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_MAIN = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-1_1771606687000_na1fn_aGVyby1tYWlu.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTFfMTc3MTYwNjY4NzAwMF9uYTFmbl9hR1Z5YnkxdFlXbHUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Vf9O0hduNY1Eb151V1laThMynfbCtIt8YqupN5qk4QpmCT1TJJ3iHi-GrTt0omWgbKaZYPTcmLwOgvwDQ5i3KTxvo6stS8qzsUooGUHjB1CanKhx-KiJ-ccDyMygoGwlOuFimGh6WjajdZvVnvFiP5aKh2H3ojqlST0JB9o1TC~8-eDTBoGdhmGTpH-p3IWRWocgxIfp-1SEy1caEtfNrMe-BPfNbtEyNLHLzo57wQYAg~pbogjT5Bx0XwRPL15tWKa1EZev4Bhhfy4fjv1L9GAHXHo-6hP43l2MjxA8HnKFhqdGFqowcAdXlKKs60sQMQmv-0U1ccbF3pKNAJiE5g__";

const values = [
  { title: "Compassionate", desc: "We are compassionate members of our community who equally value serving our animal friends and their human guardians." },
  { title: "Community-Oriented", desc: "We believe in cultivating a community-oriented approach with our stakeholders to provide a network of support, resources, and advocacy for homeless pets in need." },
  { title: "Respectful", desc: "We hold the value of respect as a cornerstone of our mission, ensuring that every interaction with our animals, staff, volunteers, and community reflects a deep consideration for the dignity and worth of all." },
  { title: "Collaborative", desc: "We work together and learn from each other to make Heartland the best it can be. We collaborate, listen, share ideas, and give/receive feedback in the spirit of continuous improvement." },
  { title: "Safe", desc: "We are committed to fostering a safe and fear-free environment for animals and humans alike. We model safe handling and minimize anxiety with humane and respectful treatment of the animals in our care." },
  { title: "Trustworthy", desc: "We create a foundation of trust by being transparent and accountable to all stakeholders. We honor our commitments and support one another with empathy and honesty." },
  { title: "Integrity", desc: "Our decisions, practices, and policies are shaped by the unwavering commitment to do what is right and ethical." },
];

const strategicPillars = [
  { icon: "💰", title: "Funding", desc: "Ensure long-term financial stability in an increasingly challenging environment." },
  { icon: "⚙️", title: "Operations", desc: "Continuously improve shelter operations to provide the best care for our animals." },
  { icon: "👥", title: "People", desc: "Invest in the people who support our operations — staff, volunteers, and fosters." },
  { icon: "📢", title: "Communications & Marketing", desc: "Create and implement effective and consistent communications and branding to all stakeholders." },
  { icon: "🤝", title: "Communities & Partnerships", desc: "Extend our services by investing more in community and partner-oriented foster and diversion programs." },
];

const staffList = [
  { name: "Jenny Schlueter", title: "Executive Director" },
  { name: "Emily Yacker, DVM", title: "Veterinarian" },
  { name: "Jennifer Nevis, DVM", title: "Veterinarian" },
  { name: "Allyson Rosenthal", title: "Shelter Operations Manager" },
  { name: "Courtney Robinson", title: "Director of Mission Advancement & Marketing" },
  { name: "Mary Wozencraft", title: "Programs & Community Engagement Manager" },
  { name: "Eric Gordon", title: "Dog Adoption Lead" },
  { name: "Danielle Gordon", title: "Marketing Associate" },
  { name: "Olga Bernad", title: "Social Media Manager" },
  { name: "Abby Okrsezik", title: "Lead Animal Care Attendant & Operations Assistant" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navigation />

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={HERO_MAIN} alt="About Heartland Animal Shelter" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Since 2002</div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              About Us
            </h1>
            <p className="text-white/90 mt-2 text-lg" style={{fontFamily:'DM Sans, sans-serif'}}>
              Saving lives in Chicagoland for over 20 years.
            </p>
          </div>
        </div>
      </section>

      {/* Mission + History */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Our Mission</div>
              <h2 className="text-3xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                Why We Exist
              </h2>
              <blockquote className="border-l-4 border-[#C8102E] pl-4 mb-6">
                <p className="text-lg text-[#1C1917] italic leading-relaxed" style={{fontFamily:'Playfair Display, serif'}}>
                  "Heartland Animal Shelter provides excellent care to the most vulnerable dogs and cats until we find them good homes. Through progressive programs, outreach, and collaborative partnerships, we also work to keep all companion animals with their families."
                </p>
              </blockquote>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                Our vision is to build a humane community where pets and people thrive together in Chicagoland and beyond.
              </p>
            </div>
            <div>
              <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Our History</div>
              <h2 className="text-3xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                20+ Years of Lifesaving
              </h2>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                Heartland Animal Shelter was founded in October 2002 by Dr. Herbert Preiser, DVM, with a vision to eliminate the euthanasia of adoptable animals. Since opening, Heartland has saved the lives of tens of thousands of animals.
              </p>
              <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                In June 2024, a devastating flood forced Heartland into temporary accommodations for nearly a year. After extraordinary effort from our staff, volunteers, and community, we celebrated our reopening in February 2025 — and went on to have a record-breaking year.
              </p>
              <p className="text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>
                In 2025, we welcomed 1,325 animals — our highest intake ever — and achieved a 98.4% live release rate, up from 97.7% in 2024. We also completed 1,252 adoptions, our highest total ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#C8102E] py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "2002", label: "Year Founded" },
              { number: "1,325", label: "Animals in 2025" },
              { number: "98.4%", label: "Live Release Rate" },
              { number: "1,252", label: "Adoptions in 2025" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily:'DM Sans, sans-serif'}}>{stat.number}</div>
                <div className="text-white/80 text-xs uppercase tracking-wide font-semibold" style={{fontFamily:'DM Sans, sans-serif'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="paw-bg py-16">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>What We Stand For</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {values.map((val) => (
              <div key={val.title} className="bg-white rounded-xl p-5 shadow-sm card-hover">
                <div className="h-1 bg-[#C8102E] rounded-full mb-3 w-8" />
                <h3 className="font-bold text-[#1C1917] mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>{val.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Plan */}
      <section className="bg-white py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>2023–2028</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Our Strategic Plan</h2>
            <p className="text-[#78716C] mt-2 max-w-xl mx-auto text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
              In 2023, Heartland launched a five-point Strategic Plan, shaped by staff, volunteers, fosters, donors, and community input. The Board of Directors monitors quarterly progress.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {strategicPillars.map((pillar, i) => (
              <div key={pillar.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center text-2xl mx-auto mb-3 shadow-sm">
                  {pillar.icon}
                </div>
                <div className="font-bold text-[#1C1917] text-sm mb-1" style={{fontFamily:'DM Sans, sans-serif'}}>{pillar.title}</div>
                <p className="text-xs text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{pillar.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://heartlandanimalshelter.org/strategic-plan" target="_blank" rel="noopener noreferrer">
              <button className="btn-heartland-teal rounded px-6 py-2.5 text-sm flex items-center gap-2 mx-auto">
                Read the Full Plan <ArrowRight size={14} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="paw-bg py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Our Team</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Heartland Staff</h2>
          </div>

          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { name: "Jenny Schlueter", title: "Executive Director", quote: "As we reflect on 2025, I am deeply grateful for the resilience and dedication of the Heartland community. Your support makes it all possible." },
              { name: "C.J. Sultz", title: "President, Board of Directors", quote: "Heartland's Board is proud of the extraordinary work our team does every day. We are committed to the long-term sustainability of our mission." },
            ].map((leader) => (
              <div key={leader.name} className="bg-white rounded-xl p-6 shadow-sm flex gap-4">
                <div className="w-14 h-14 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-[#C8102E]" style={{fontFamily:'DM Sans, sans-serif'}}>{leader.name[0]}</span>
                </div>
                <div>
                  <div className="font-bold text-[#1C1917]" style={{fontFamily:'DM Sans, sans-serif'}}>{leader.name}</div>
                  <div className="text-xs text-[#0D9488] font-semibold mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>{leader.title}</div>
                  <p className="text-xs text-[#78716C] italic leading-relaxed" style={{fontFamily:'Playfair Display, serif'}}>"{leader.quote}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Staff list */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[#1C1917] mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>Full Staff</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {staffList.map((staff) => (
                <div key={staff.name} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#1C1917]" style={{fontFamily:'DM Sans, sans-serif'}}>{staff.name}</span>
                    <span className="text-xs text-[#78716C] ml-1.5" style={{fontFamily:'DM Sans, sans-serif'}}>— {staff.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#1C1917] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-black text-white mb-3" style={{fontFamily:'Playfair Display, serif'}}>Get in Touch</h2>
          <p className="text-gray-400 mb-6 text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
            586 Palwaukee Drive, Wheeling, IL 60090 &nbsp;|&nbsp; 847-296-6400 &nbsp;|&nbsp; info@heartlandanimalshelter.org
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:info@heartlandanimalshelter.org">
              <button className="btn-heartland-red rounded px-6 py-2.5 text-sm">Email Us</button>
            </a>
            <a href="tel:8472966400">
              <button className="btn-heartland-teal rounded px-6 py-2.5 text-sm">Call Us</button>
            </a>
            <a href="https://maps.google.com/?q=586+Palwaukee+Drive+Wheeling+IL+60090" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-white text-white font-bold uppercase tracking-wide text-sm px-6 py-2.5 rounded hover:bg-white/10 transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>
                Get Directions
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
