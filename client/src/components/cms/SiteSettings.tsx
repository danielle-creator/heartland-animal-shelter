import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Palette, Navigation } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface Settings {
  // Identity
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  // Contact
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  // Social
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  // Brand colors
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  colorDark: string;
  // Navigation (JSON array of {label, url})
  navLinks: string;
  // Footer
  footerTagline: string;
  footerCopyright: string;
  // Analytics
  googleAnalyticsId: string;
}

const DEFAULTS: Settings = {
  siteName: "Heartland Animal Shelter",
  tagline: "Every Animal Deserves a Loving Home",
  logoUrl: "",
  faviconUrl: "",
  phone: "(555) 123-4567",
  email: "info@heartlandanimalshelter.org",
  address: "1234 Shelter Lane",
  city: "Heartland",
  state: "IL",
  zip: "60601",
  hours: "Mon–Fri 10am–6pm · Sat–Sun 10am–5pm",
  facebook: "https://facebook.com/heartlandanimalshelter",
  instagram: "https://instagram.com/heartlandanimalshelter",
  twitter: "",
  youtube: "",
  colorPrimary: "#C8102E",
  colorSecondary: "#008080",
  colorAccent: "#F5A623",
  colorDark: "#1C1917",
  navLinks: JSON.stringify([
    { label: "Adopt", url: "/adopt" },
    { label: "Get Involved", url: "/get-involved" },
    { label: "Foster", url: "/foster" },
    { label: "Donate", url: "/donate" },
    { label: "News", url: "/news" },
    { label: "About", url: "/about" },
  ], null, 2),
  footerTagline: "Saving lives, one paw at a time.",
  footerCopyright: `© ${new Date().getFullYear()} Heartland Animal Shelter. All rights reserved.`,
  googleAnalyticsId: "",
};

const STORAGE_KEY = "cms_site_settings";

function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULTS, ...JSON.parse(saved) };
  } catch {}
  return DEFAULTS;
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [navError, setNavError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"identity" | "contact" | "social" | "colors" | "navigation" | "footer">("identity");

  function set(patch: Partial<Settings>) {
    setSettings((s) => ({ ...s, ...patch }));
  }

  async function handleSave() {
    // Validate nav JSON
    try {
      JSON.parse(settings.navLinks);
      setNavError(null);
    } catch {
      setNavError("Navigation links must be valid JSON.");
      setActiveTab("navigation");
      return;
    }

    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      // Try to push to server CMS
      try {
        const items = Object.entries(settings).map(([key, value]) => ({
          key: `settings.${key}`,
          value: String(value),
          label: key,
          contentType: key.endsWith("Url") || key.endsWith("url") ? "image" : key.startsWith("color") ? "color" : "text",
          section: "settings",
        }));
        await fetch("/api/trpc/adminCms.bulkSet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "0": { json: items } }),
        });
      } catch {}
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: "identity", label: "Identity", icon: <Globe size={13} /> },
    { id: "contact", label: "Contact", icon: <Phone size={13} /> },
    { id: "social", label: "Social", icon: <Instagram size={13} /> },
    { id: "colors", label: "Colors", icon: <Palette size={13} /> },
    { id: "navigation", label: "Navigation", icon: <Navigation size={13} /> },
    { id: "footer", label: "Footer", icon: <Globe size={13} /> },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === t.id
                ? "bg-white text-[#1C1917] shadow-sm"
                : "text-gray-500 hover:text-[#1C1917]"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Identity */}
      {activeTab === "identity" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => set({ siteName: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => set({ tagline: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUploader
              value={settings.logoUrl}
              onChange={(url) => set({ logoUrl: url })}
              label="Logo"
              aspectRatio="wide"
            />
            <ImageUploader
              value={settings.faviconUrl}
              onChange={(url) => set({ faviconUrl: url })}
              label="Favicon"
              aspectRatio="square"
            />
          </div>
        </div>
      )}

      {/* Contact */}
      {activeTab === "contact" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "phone", label: "Phone", icon: <Phone size={13} />, placeholder: "(555) 123-4567" },
            { key: "email", label: "Email", icon: <Mail size={13} />, placeholder: "info@shelter.org" },
            { key: "address", label: "Street Address", icon: <MapPin size={13} />, placeholder: "1234 Shelter Lane" },
            { key: "city", label: "City", icon: null, placeholder: "Heartland" },
            { key: "state", label: "State", icon: null, placeholder: "IL" },
            { key: "zip", label: "ZIP Code", icon: null, placeholder: "60601" },
          ].map(({ key, label, icon, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                {icon} {label}
              </label>
              <input
                type="text"
                value={(settings as any)[key]}
                onChange={(e) => set({ [key]: e.target.value } as any)}
                placeholder={placeholder}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Hours</label>
            <input
              type="text"
              value={settings.hours}
              onChange={(e) => set({ hours: e.target.value })}
              placeholder="Mon–Fri 10am–6pm"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
            />
          </div>
        </div>
      )}

      {/* Social */}
      {activeTab === "social" && (
        <div className="space-y-3">
          {[
            { key: "facebook", label: "Facebook", icon: <Facebook size={13} />, placeholder: "https://facebook.com/…" },
            { key: "instagram", label: "Instagram", icon: <Instagram size={13} />, placeholder: "https://instagram.com/…" },
            { key: "twitter", label: "X / Twitter", icon: <Twitter size={13} />, placeholder: "https://twitter.com/…" },
            { key: "youtube", label: "YouTube", icon: <Youtube size={13} />, placeholder: "https://youtube.com/…" },
          ].map(({ key, label, icon, placeholder }) => (
            <div key={key}>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                {icon} {label}
              </label>
              <input
                type="url"
                value={(settings as any)[key]}
                onChange={(e) => set({ [key]: e.target.value } as any)}
                placeholder={placeholder}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
            </div>
          ))}
        </div>
      )}

      {/* Colors */}
      {activeTab === "colors" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">These brand colors are applied across the entire site.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "colorPrimary", label: "Primary (Red)", description: "Buttons, links, highlights" },
              { key: "colorSecondary", label: "Secondary (Teal)", description: "Accents, hover states" },
              { key: "colorAccent", label: "Accent (Gold)", description: "Badges, callouts" },
              { key: "colorDark", label: "Dark", description: "Text, dark backgrounds" },
            ].map(({ key, label, description }) => (
              <div key={key} className="bg-gray-50 rounded-xl p-3">
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">{label}</label>
                <p className="text-xs text-gray-400 mb-2">{description}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={(settings as any)[key]}
                    onChange={(e) => set({ [key]: e.target.value } as any)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <div>
                    <input
                      type="text"
                      value={(settings as any)[key]}
                      onChange={(e) => set({ [key]: e.target.value } as any)}
                      className="w-28 text-xs font-mono border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    />
                    <div
                      className="mt-1 h-4 rounded"
                      style={{ backgroundColor: (settings as any)[key] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      {activeTab === "navigation" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            Edit the navigation menu as a JSON array. Each item needs a <code className="bg-gray-100 px-1 rounded">label</code> and <code className="bg-gray-100 px-1 rounded">url</code>.
          </p>
          <textarea
            value={settings.navLinks}
            onChange={(e) => set({ navLinks: e.target.value })}
            rows={14}
            className="w-full text-xs font-mono border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-y"
          />
          {navError && <p className="text-xs text-red-500">{navError}</p>}
          {/* Preview */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Preview</p>
            <div className="flex flex-wrap gap-2">
              {(() => {
                try {
                  const links = JSON.parse(settings.navLinks);
                  return links.map((l: any, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                      {l.label}
                    </span>
                  ));
                } catch {
                  return <span className="text-xs text-red-400">Invalid JSON</span>;
                }
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {activeTab === "footer" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Footer Tagline</label>
            <input
              type="text"
              value={settings.footerTagline}
              onChange={(e) => set({ footerTagline: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Copyright Text</label>
            <input
              type="text"
              value={settings.footerCopyright}
              onChange={(e) => set({ footerCopyright: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Google Analytics ID</label>
            <input
              type="text"
              value={settings.googleAnalyticsId}
              onChange={(e) => set({ googleAnalyticsId: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
            />
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#C8102E] hover:bg-[#a00d24] text-white"
          }`}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
