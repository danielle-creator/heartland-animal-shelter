/*
 * HEARTLAND ANIMAL SHELTER — Donate Page
 * Design: Editorial Warmth — red/teal accents, Playfair Display + DM Sans
 * Sections: Hero, Donate Options, Impact, Monthly Giving, Other Ways to Give
 */
import { useState } from "react";
import { Link } from "wouter";
import { Heart, CheckCircle, ArrowRight, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_DONATE = "https://private-us-east-1.manuscdn.com/sessionFile/i9Rkx5kBkAcV6IJZagE19X/sandbox/7bDFGpvEpWAS8MPGknQqW7-img-5_1771606681000_na1fn_aGVyby1kb25hdGU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlSa3g1a0JrQWNWNklKWmFnRTE5WC9zYW5kYm94LzdiREZHcHZFcFdBUzhNUEdrblFxVzctaW1nLTVfMTc3MTYwNjY4MTAwMF9uYTFmbl9hR1Z5Ynkxa2IyNWhkR1UuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kLLFkxPKqVnMuOg5VZZtFAguNkTPv4dZY8ooLtj4teShW1VfSMO~idODQkRX9bKRYPkpUrE3vPeE9OqaK3vtedFoEbzTa-s~Y6QjZvynQiEYboJKxtyzxCugIWEw1pbKO9AAgSZKfcXImgO6KBvmuRiBLn4E0Qei16KpG9bTECmKTE-Vjps0AS8RPUKuCkq4-ZQRHZRz5sk7YDUSc5-8SGtb~ixwQ~0iQfaZQIqMZYyD-V6lzK-VQwKZS~mW20xwtc7~Oh6AAtYtVL5RNUY9LFAk7czTq5j3-7UK7fy4ljypxm1DZwOQw~wYNLCj7Owjm--Dw8i2nLw9oavujS0t3g__";

const impactAmounts = [
  { amount: "$25", impact: "Provides food for one animal for a month" },
  { amount: "$50", impact: "Covers vaccinations for one animal" },
  { amount: "$100", impact: "Helps fund medical care for a sick or injured pet" },
  { amount: "$250", impact: "Sponsors an animal's full care for one month" },
  { amount: "$500", impact: "Funds a critical surgery for an animal in need" },
  { amount: "$1,000", impact: "Covers the full cost of care for a senior animal" },
];

const otherWays = [
  {
    title: "Heartland Heroes — Monthly Giving",
    desc: "Become a Heartland Hero by setting up a recurring monthly gift. Monthly donors provide the reliable, sustained funding that allows us to plan ahead and say yes to more animals.",
    cta: "Become a Hero",
    href: "https://heartlandanimalshelter.org/donate",
    color: "#C8102E",
  },
  {
    title: "Tribute & Memorial Gifts",
    desc: "Honor a beloved person or pet with a tribute gift to Heartland. We'll send a notification to the family of your choice. It's a meaningful way to celebrate a life.",
    cta: "Give a Tribute Gift",
    href: "https://heartlandanimalshelter.org/donate",
    color: "#0D9488",
  },
  {
    title: "Planned Giving & Bequests",
    desc: "Leave a lasting legacy by including Heartland in your estate plans. A bequest is one of the most powerful ways to ensure animals are cared for long into the future.",
    cta: "Learn About Bequests",
    href: "mailto:info@heartlandanimalshelter.org",
    color: "#92400e",
  },
  {
    title: "Employer Matching",
    desc: "Many employers match charitable donations — sometimes doubling or tripling your gift. Check with your HR department to see if your company participates.",
    cta: "Check Your Eligibility",
    href: "mailto:info@heartlandanimalshelter.org",
    color: "#C8102E",
  },
  {
    title: "Special Funds",
    desc: "Donate to specific funds: Dr. Do More (medical), Arlo (behavioral), or Dill & Penny Kitten fund. These funds help animals with special needs get the care they deserve.",
    cta: "Give to a Special Fund",
    href: "https://heartlandanimalshelter.org/donate",
    color: "#0D9488",
  },
  {
    title: "Stock & Securities",
    desc: "Donating appreciated stock or securities can be a tax-efficient way to give. Contact us to discuss how to make a gift of securities to Heartland.",
    cta: "Contact Us",
    href: "mailto:info@heartlandanimalshelter.org",
    color: "#92400e",
  },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState("$50");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount = customAmount || selectedAmount.replace("$", "");
    window.open(`https://heartlandanimalshelter.org/donate?amount=${amount}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navigation />

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={HERO_DONATE} alt="Donate to Heartland" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>501(c)(3) Non-Profit</div>
            <h1 className="text-4xl md:text-5xl font-black text-white" style={{fontFamily:'Playfair Display, serif'}}>
              Donate
            </h1>
            <p className="text-white/90 mt-2 text-lg" style={{fontFamily:'DM Sans, sans-serif'}}>
              Every dollar goes directly to the animals in our care.
            </p>
          </div>
        </div>
      </section>

      {/* Main Donate Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Left: Donate Widget */}
            <div>
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Make a Gift</div>
              <h2 className="text-3xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                Support Our Animals
              </h2>
              <p className="text-[#78716C] leading-relaxed mb-6" style={{fontFamily:'DM Sans, sans-serif'}}>
                Heartland Animal Shelter is a 501(c)(3) non-profit organization. We could not operate without the generous support of our donors. Every gift — large or small — directly helps the animals in our care.
              </p>

              {/* Amount selector */}
              <div className="bg-[#FAF7F2] rounded-xl p-6 mb-4">
                <div className="text-sm font-bold text-[#1C1917] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Select an Amount</div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {["$25", "$50", "$100", "$250", "$500", "$1,000"].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-2.5 rounded-lg text-sm font-bold transition-all border-2 ${
                        selectedAmount === amt && !customAmount
                          ? "bg-[#C8102E] text-white border-[#C8102E]"
                          : "bg-white text-[#1C1917] border-gray-200 hover:border-[#C8102E]"
                      }`}
                      style={{fontFamily:'DM Sans, sans-serif'}}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="text-xs text-[#78716C] mb-1.5" style={{fontFamily:'DM Sans, sans-serif'}}>Or enter a custom amount:</div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] font-bold">$</span>
                    <input
                      type="number"
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(""); }}
                      className="w-full pl-7 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8102E] transition-colors"
                      style={{fontFamily:'DM Sans, sans-serif'}}
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div className="flex gap-2 mb-5">
                  <button className="flex-1 py-2 rounded-lg text-sm font-bold bg-[#C8102E] text-white" style={{fontFamily:'DM Sans, sans-serif'}}>One-Time</button>
                  <button className="flex-1 py-2 rounded-lg text-sm font-bold bg-white border-2 border-gray-200 text-[#78716C] hover:border-[#C8102E] transition-colors" style={{fontFamily:'DM Sans, sans-serif'}}>Monthly</button>
                </div>

                <button
                  onClick={handleDonate}
                  className="btn-heartland-red rounded-lg w-full py-3.5 text-base flex items-center justify-center gap-2"
                >
                  <Heart size={16} fill="white" />
                  Donate {customAmount ? `$${customAmount}` : selectedAmount}
                </button>

                <p className="text-xs text-center text-[#78716C] mt-3" style={{fontFamily:'DM Sans, sans-serif'}}>
                  Secure donation processing. Tax-deductible. EIN: 36-4417966
                </p>
              </div>

              {/* Other ways quick links */}
              <div className="flex flex-wrap gap-2">
                {["Mail a Check", "Donate by Phone", "Employer Match"].map((opt) => (
                  <span key={opt} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>{opt}</span>
                ))}
              </div>
            </div>

            {/* Right: Impact */}
            <div>
              <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>Your Impact</div>
              <h2 className="text-3xl font-black text-[#1C1917] mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                What Your Gift Does
              </h2>
              <div className="space-y-3 mb-6">
                {impactAmounts.map((item) => (
                  <div key={item.amount} className="flex items-start gap-3 bg-[#FAF7F2] rounded-lg p-3">
                    <div className="font-black text-[#C8102E] text-sm w-14 flex-shrink-0" style={{fontFamily:'DM Sans, sans-serif'}}>{item.amount}</div>
                    <div className="text-sm text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>{item.impact}</div>
                  </div>
                ))}
              </div>

              {/* Cost of care callout */}
              <div className="bg-[#1C1917] rounded-xl p-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>Cost of Care</div>
                <p className="text-sm leading-relaxed" style={{fontFamily:'DM Sans, sans-serif'}}>
                  The average cost to Heartland for an animal in our care from the time they enter our doors until adoption is approximately <strong>$450 for younger animals</strong> and <strong>$1,000 for animals over the age of seven</strong>.
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-2xl font-black text-[#C8102E]">3,506</div>
                    <div className="text-xs text-gray-400" style={{fontFamily:'DM Sans, sans-serif'}}>Donors in 2025</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#0D9488]">98.4%</div>
                    <div className="text-xs text-gray-400" style={{fontFamily:'DM Sans, sans-serif'}}>Live Release Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Giving / Heartland Heroes */}
      <section id="monthly" className="bg-[#C8102E] py-14">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-300 fill-yellow-300" />)}
              </div>
              <h2 className="text-3xl font-black text-white mb-4" style={{fontFamily:'Playfair Display, serif'}}>
                Become a Heartland Hero
              </h2>
              <p className="text-white/90 leading-relaxed mb-4" style={{fontFamily:'DM Sans, sans-serif'}}>
                Monthly donors are the backbone of our financial sustainability. By giving just a small amount each month, you provide the reliable funding we need to plan ahead, say yes to more animals, and invest in our programs.
              </p>
              <p className="text-white/90 leading-relaxed mb-6" style={{fontFamily:'DM Sans, sans-serif'}}>
                As a Heartland Hero, you'll receive exclusive updates, recognition in our newsletter, and the knowledge that you're making a lasting difference every single month.
              </p>
              <a href="https://heartlandanimalshelter.org/donate" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded hover:bg-gray-100 transition-colors flex items-center gap-2" style={{fontFamily:'DM Sans, sans-serif'}}>
                  <Heart size={15} className="text-[#C8102E]" fill="#C8102E" />
                  Join the Heroes
                </button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { amount: "$10/mo", impact: "Feeds one animal for a month" },
                { amount: "$25/mo", impact: "Covers basic medical supplies" },
                { amount: "$50/mo", impact: "Funds vaccinations for 2 animals" },
                { amount: "$100/mo", impact: "Sponsors an animal's full monthly care" },
              ].map((item) => (
                <div key={item.amount} className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-white mb-1" style={{fontFamily:'DM Sans, sans-serif'}}>{item.amount}</div>
                  <div className="text-xs text-white/80" style={{fontFamily:'DM Sans, sans-serif'}}>{item.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="paw-bg py-14">
        <div className="container">
          <div className="text-center mb-8">
            <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>More Options</div>
            <h2 className="text-3xl font-black text-[#1C1917]" style={{fontFamily:'Playfair Display, serif'}}>Other Ways to Give</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherWays.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm card-hover">
                <div className="h-1 rounded-full mb-4" style={{backgroundColor: item.color}} />
                <h3 className="font-bold text-[#1C1917] mb-2 text-sm" style={{fontFamily:'DM Sans, sans-serif'}}>{item.title}</h3>
                <p className="text-xs text-[#78716C] leading-relaxed mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>{item.desc}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <button className="text-xs font-bold flex items-center gap-1 transition-colors" style={{color: item.color, fontFamily:'DM Sans, sans-serif'}}>
                    {item.cta} <ArrowRight size={12} />
                  </button>
                </a>
              </div>
            ))}
          </div>

          {/* Mail a check */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm max-w-lg mx-auto text-center">
            <h3 className="font-bold text-[#1C1917] mb-2" style={{fontFamily:'Playfair Display, serif'}}>Mail a Check</h3>
            <p className="text-sm text-[#78716C] mb-2" style={{fontFamily:'DM Sans, sans-serif'}}>
              Make checks payable to <strong>Heartland Animal Shelter</strong> and mail to:
            </p>
            <div className="text-sm font-semibold text-[#1C1917]" style={{fontFamily:'DM Sans, sans-serif'}}>
              586 Palwaukee Drive<br />
              Wheeling, IL 60090
            </div>
            <div className="mt-3 text-xs text-[#78716C]" style={{fontFamily:'DM Sans, sans-serif'}}>
              EIN: 36-4417966 &nbsp;|&nbsp; 501(c)(3) Non-Profit
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
