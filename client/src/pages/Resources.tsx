/*
 * HEARTLAND ANIMAL SHELTER — Resources Page
 * Design: Editorial Warmth — red/teal accents, Playfair Display + DM Sans
 * Sections: Hero, Pet Surrender, Community Resources, Pet Food Pantry, Vaccine Clinics, Lost & Found, Links
 */
import { Link } from "wouter";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_MAIN = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-1_1771606687000_na1fn_aGVyby1tYWlu.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTFfMTc3MTYwNjY4NzAwMF9uYTFmbl9hR1Z5YnkxdFlXbHUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Vf9O0hduNY1Eb151V1laThMynfbCtIt8YqupN5qk4QpmCT1TJJ3iHi-GrTt0omWgbKaZYPTcmLwOgvwDQ5i3KTxvo6stS8qzsUooGUHjB1CanKhx-KiJ-ccDyMygoGwlOuFimGh6WjajdZvVnvFiP5aKh2H3ojqlST0JB9o1TC~8-eDTBoGdhmGTpH-p3IWRWocgxIfp-1SEy1caEtfNrMe-BPfNbtEyNLHLzo57wQYAg~pbogjT5Bx0XwRPL15tWKa1EZev4Bhhfy4fjv1L9GAHXHo-6hP43l2MjxA8HnKFhqdGFqowcAdXlKKs60sQMQmv-0U1ccbF3pKNAJiE5g__";

const communityResources = [
  {
    title: "Pet Food Pantry",
    desc: "Heartland launched a pop-up pet food pantry in December 2025 to keep animals with the families who love them. Free dog and cat food is available to community members in need.",
    detail: "Open the 1st and 3rd Sundays of each month during shelter hours.",
    icon: "🥫",
    color: "#0D9488",
  },
  {
    title: "Free Vaccine Clinics",
    desc: "Heartland hosts free pet wellness and vaccination clinics, made possible through a grant from Petco LoveCare and in partnership with Cook County Animal and Rabies Control.",
    detail: "Vaccines offered: DAPPV, FVRCP, rabies, and microchips. Check our events page for upcoming dates.",
    icon: "💉",
    color: "#C8102E",
  },
  {
    title: "Behavior & Training Resources",
    desc: "Our behavior and enrichment programs provide structured daily enrichment for both dogs and cats. We can connect you with training resources to help keep pets in their homes.",
    detail: "Contact us for referrals to local trainers and behaviorists.",
    icon: "🐾",
    color: "#92400e",
  },
  {
    title: "Outdoor Cat Programs",
    desc: "Heartland supports community cats through Trap-Neuter-Return (TNR) programs and workshops. We can help you manage outdoor cat colonies humanely.",
    detail: "We offer workshops for beginners and experienced trappers alike.",
    icon: "🐱",
    color: "#0D9488",
  },
];

const externalLinks = [
  { title: "Chicago Animal Care & Control (CACC)", desc: "Chicago's municipal animal shelter and control agency.", href: "https://www.chicago.gov/city/en/depts/cacc.html" },
  { title: "Cook County Animal & Rabies Control", desc: "Animal control services for Cook County, IL.", href: "https://www.cookcountyil.gov/service/animal-and-rabies-control" },
  { title: "ASPCA", desc: "National resources for animal welfare, behavior, and health.", href: "https://www.aspca.org" },
  { title: "Petco Love Lost", desc: "National lost and found pet database.", href: "https://lovelost.petco.com" },
  { title: "PetFinder", desc: "Search for adoptable pets nationwide.", href: "https://www.petfinder.com" },
  { title: "Best Friends Animal Society", desc: "National no-kill advocacy and resources.", href: "https://bestfriends.org" },
];

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navigation />

      {/* Page Hero */}
      <section className="relative h-64 md:h-72 overflow-hidden">
        <img src={HERO_MAIN} alt="Resources" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Community Support</div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              Resources
            </h1>
            <p className="text-white/90 mt-2 text-lg" style={{fontFamily:'DM Sans, sans-serif'}}>
              Keeping pets and families together.
            </p>
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Free Programs</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Community Programs</h2>
            <p className="text-[#78716C] mt-2 max-w-xl mx-auto text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
              Heartland continues to support community members and their pets, with a focus on keeping animals healthy, cared for, and in their homes whenever possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {communityResources.map((res) => (
              <div key={res.title} className="bg-[#FAF7F2] rounded-xl overflow-hidden shadow-sm card-hover">
                <div className="h-1.5" style={{backgroundColor: res.color}} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{res.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>{res.title}</h3>
                      <div className="text-xs font-semibold mt-0.5" style={{color: res.color, fontFamily:'DM Sans, sans-serif'}}>{res.detail}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#78716C] leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>{res.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surrender / Relinquishment */}
      <section className="paw-bg py-14">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Need Help?</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Surrendering a Pet</h2>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <p className="text-[#78716C] leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
              We understand that sometimes circumstances change and you may need to surrender a pet. Heartland accepts owner surrenders of dogs and cats when space is available. We ask that you contact us first so we can best prepare for your animal's arrival.
            </p>
            <p className="text-[#78716C] leading-relaxed mb-6" style={{fontFamily:'DM Sans, sans-serif'}}>
              Before surrendering, we encourage you to explore all options to keep your pet in your home — including our community resources, behavior support, and rehoming assistance. We're here to help you find the best solution for you and your pet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#FAF7F2] rounded-lg p-4">
                <h4 className="font-bold text-[#1C1917] text-sm mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Surrender a Dog</h4>
                <p className="text-xs text-[#78716C] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Contact our dog team to discuss availability and schedule an intake appointment.</p>
                <a href="mailto:dogs@heartlandanimalshelter.org" className="text-sm font-bold text-[#C8102E] flex items-center gap-1 hover:underline" style={{fontFamily:'DM Sans, sans-serif'}}>
                  <Mail size={13} /> dogs@heartlandanimalshelter.org
                </a>
              </div>
              <div className="bg-[#FAF7F2] rounded-lg p-4">
                <h4 className="font-bold text-[#1C1917] text-sm mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Surrender a Cat</h4>
                <p className="text-xs text-[#78716C] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Contact our cat team to discuss availability and schedule an intake appointment.</p>
                <a href="mailto:cats@heartlandanimalshelter.org" className="text-sm font-bold text-[#0D9488] flex items-center gap-1 hover:underline" style={{fontFamily:'DM Sans, sans-serif'}}>
                  <Mail size={13} /> cats@heartlandanimalshelter.org
                </a>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800" style={{fontFamily:'DM Sans, sans-serif'}}>
              <strong>Note:</strong> Heartland accepts surrenders based on available space. A surrender fee may apply. Please contact us before bringing your pet to the shelter.
            </div>
          </div>
        </div>
      </section>

      {/* Lost & Found */}
      <section className="bg-white py-14">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Missing a Pet?</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Lost & Found Pets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF7F2] rounded-xl p-6">
              <h3 className="font-bold text-[#1C1917] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>If You Lost a Pet</h3>
              <ul className="space-y-2 text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
                <li>• Visit Heartland during open hours to check for your pet</li>
                <li>• Contact Chicago Animal Care & Control and local shelters</li>
                <li>• Post on Petco Love Lost and local Facebook groups</li>
                <li>• Put up flyers in your neighborhood</li>
                <li>• Check with local veterinary offices</li>
                <li>• Make sure your pet's microchip is registered and up to date</li>
              </ul>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-6">
              <h3 className="font-bold text-[#1C1917] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>If You Found a Pet</h3>
              <ul className="space-y-2 text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
                <li>• Bring the pet to a vet or shelter to scan for a microchip</li>
                <li>• Post on Petco Love Lost and local Facebook groups</li>
                <li>• Contact Heartland and local shelters to report the found pet</li>
                <li>• Post flyers in the area where you found the pet</li>
                <li>• Contact Cook County Animal Control if the pet appears injured</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <a href="https://lovelost.petco.com" target="_blank" rel="noopener noreferrer">
              <button className="btn-heartland-teal rounded px-6 py-2.5 text-sm flex items-center gap-2 mx-auto">
                Search Petco Love Lost <ArrowRight size={14} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="paw-bg py-14">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Helpful Links</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>External Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalLinks.map((link) => (
              <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 shadow-sm card-hover flex flex-col gap-1">
                <div className="font-bold text-[#1C1917] text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{link.title}</div>
                <div className="text-xs text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>{link.desc}</div>
                <div className="text-xs text-[#C8102E] font-semibold mt-1 flex items-center gap-1" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Visit Site <ArrowRight size={11} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#1C1917] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-black text-white mb-3" style={{fontFamily:'Playfair Display, serif'}}>Have a Question?</h2>
          <p className="text-gray-400 mb-6 text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>
            Our team is happy to help connect you with the right resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400" style={{fontFamily:'DM Sans, sans-serif'}}>
            <a href="tel:8472966400" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={14} /> 847-296-6400
            </a>
            <a href="mailto:info@heartlandanimalshelter.org" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={14} /> info@heartlandanimalshelter.org
            </a>
            <a href="https://maps.google.com/?q=586+Palwaukee+Drive+Wheeling+IL+60090" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={14} /> 586 Palwaukee Drive, Wheeling, IL
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
