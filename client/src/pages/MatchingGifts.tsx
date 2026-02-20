/*
 * HEARTLAND ANIMAL SHELTER — Matching Gifts Page (Unlisted)
 * This page is NOT in the navigation. It's linked from Double the Donation emails.
 * Features: Double the Donation plugin embed, instructions, FAQ
 */
import { Link } from "wouter";
import { useEffect } from "react";
import { Heart, ArrowRight, Building2, DollarSign, Search, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MatchingGifts() {
  // Load Double the Donation plugin script
  useEffect(() => {
    // Double the Donation embed script
    // Replace PLUGIN_KEY with your actual Double the Donation plugin key
    const PLUGIN_KEY = "hEjsp4KFXOCUNtzS";
    const scriptId = "dtd-plugin-script";

    // Set config before script loads
    (window as any).DDCONF = { API_KEY: PLUGIN_KEY };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://doublethedonation.com/api/js/ddplugin.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1C1917] py-14">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0D9488]/20 rounded-full flex items-center justify-center">
              <Building2 size={20} className="text-[#0D9488]" />
            </div>
            <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest">Double Your Impact</div>
          </div>
          <h1
            className="text-3xl md:text-4xl font-black text-white mb-3"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Matching Gifts
          </h1>
          <p className="text-white/70 max-w-2xl">
            Many employers match their employees' charitable donations — sometimes 2:1 or even 3:1. Check if your company participates and double or triple the impact of your gift to Heartland!
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#0D9488] py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
            <div>
              <div className="text-2xl font-black mb-0.5">65%</div>
              <div className="text-white/80 text-sm">of Fortune 500 companies offer matching gift programs</div>
            </div>
            <div>
              <div className="text-2xl font-black mb-0.5">$4–7B</div>
              <div className="text-white/80 text-sm">in matching gift funds go unclaimed each year</div>
            </div>
            <div>
              <div className="text-2xl font-black mb-0.5">2–3×</div>
              <div className="text-white/80 text-sm">the impact of your donation with employer matching</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <h2 className="text-2xl font-black text-[#1C1917] mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                How Matching Gifts Work
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Make your donation",
                    desc: "Donate to Heartland Animal Shelter online or by check.",
                  },
                  {
                    step: "2",
                    title: "Check your employer",
                    desc: "Use the search tool below to see if your employer offers a matching gift program.",
                  },
                  {
                    step: "3",
                    title: "Submit a match request",
                    desc: "Follow your employer's process to request the match — usually a simple online form.",
                  },
                  {
                    step: "4",
                    title: "We receive the match",
                    desc: "Your employer sends the matching funds directly to Heartland, doubling your impact!",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#C8102E] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-[#1C1917] text-sm">{item.title}</div>
                      <div className="text-sm text-[#78716C]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1C1917] mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Our Organization Info
              </h3>
              <p className="text-sm text-[#78716C] mb-4">
                You may need these details when submitting a matching gift request:
              </p>
              <div className="space-y-3">
                {[
                  { label: "Organization Name", value: "Heartland Animal Shelter" },
                  { label: "EIN / Tax ID", value: "36-4274000" },
                  { label: "Address", value: "2975 Patriot Blvd, Glenview, IL 60026" },
                  { label: "Phone", value: "(847) 296-6400" },
                  { label: "Website", value: "heartlandanimalshelter.org" },
                  { label: "501(c)(3) Status", value: "Yes — tax-exempt charitable organization" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-xs font-bold text-[#78716C] uppercase tracking-wide">{item.label}</span>
                    <span className="text-sm text-[#1C1917] font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Double the Donation Plugin */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Search size={20} className="text-[#0D9488]" />
              <h2 className="text-xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Search Your Employer
              </h2>
            </div>
            <p className="text-sm text-[#78716C] mb-6">
              Enter your employer's name below to check if they offer a matching gift program and get instructions for submitting your match request.
            </p>

            {/* Double the Donation employer search widget */}
            <div id="dd-container" className="min-h-[200px]" />
          </div>

          {/* Companies that match */}
          <div className="mb-10">
            <h3 className="text-xl font-black text-[#1C1917] mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Companies That Commonly Match
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Microsoft", "Google", "Apple", "Amazon",
                "Boeing", "Allstate", "Baxter", "Abbott",
                "Motorola", "United Airlines", "Walgreens", "Caterpillar",
              ].map((company) => (
                <div
                  key={company}
                  className="bg-white rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1C1917] border border-gray-100 text-center"
                >
                  {company}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#78716C] mt-3">
              This is a partial list. Use the search tool above to check your specific employer.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#C8102E] rounded-2xl p-8 text-center">
            <Heart size={32} className="text-white mx-auto mb-3 fill-white" />
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Ready to Make Your Gift?
            </h3>
            <p className="text-white/90 mb-5 max-w-md mx-auto">
              Make your donation first, then submit your matching gift request to double your impact for Heartland animals.
            </p>
            <Link href="/donate">
              <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
