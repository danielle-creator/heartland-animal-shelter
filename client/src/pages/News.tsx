/*
 * HEARTLAND ANIMAL SHELTER — News & Events Page
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { CalendarDays, ArrowRight, Tag, Search, Newspaper, Instagram } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

// EmbedSocial Instagram feed widget
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

const CATEGORIES = ["All", "News", "Event", "Adoption Event", "Fundraiser", "Volunteer", "Foster", "Community"];

const CATEGORY_COLORS: Record<string, string> = {
  News: "#1C1917",
  Event: "#0D9488",
  "Adoption Event": "#C8102E",
  Fundraiser: "#92400e",
  Volunteer: "#1d4ed8",
  Foster: "#0D9488",
  Community: "#7c3aed",
};

// Static fallback posts for when DB is empty
const STATIC_POSTS = [
  {
    id: 1,
    slug: "outdoor-cats-workshop-2026",
    title: "Outdoor Cats Workshop — Learn TNR Basics",
    excerpt: "Want to learn how to help outdoor cats in your neighborhood? Whether you're brand new to trapping or have experience, this workshop is for you. We'll cover trap-neuter-return (TNR), community cat care, and how to work with Heartland.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop",
    category: "Event",
    publishedAt: new Date("2026-02-15"),
    authorName: "Heartland Team",
    published: true,
  },
  {
    id: 2,
    slug: "petsmart-adoption-event-march-2026",
    title: "PetSmart Adoption Event — $100 Off Dogs!",
    excerpt: "It's not too late to find puppy love! $100 off puppy & dog adoption fees at our Northbrook PetSmart satellite adoption center through the end of March. Come meet our amazing dogs looking for forever homes.",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop",
    category: "Adoption Event",
    publishedAt: new Date("2026-02-10"),
    authorName: "Heartland Team",
    published: true,
  },
  {
    id: 3,
    slug: "locks-of-love-fundraiser-2026",
    title: "Locks of Love Fundraiser — Help Us Raise Funds",
    excerpt: "Your love is the key to a second chance for homeless animals. Join our Locks of Love campaign and help us raise funds for our animals. Every donation goes directly to the care of animals at Heartland.",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=500&fit=crop",
    category: "Fundraiser",
    publishedAt: new Date("2026-01-28"),
    authorName: "Heartland Team",
    published: true,
  },
  {
    id: 4,
    slug: "2025-annual-report-highlights",
    title: "2025 Annual Report: 98.4% Live Release Rate!",
    excerpt: "We are thrilled to share our 2025 Annual Report results. Thanks to our incredible community, we achieved a 98.4% live release rate, welcomed 1,325 animals, completed 1,252 adoptions, and logged 19,913 volunteer hours.",
    imageUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=500&fit=crop",
    category: "News",
    publishedAt: new Date("2026-01-15"),
    authorName: "Heartland Team",
    published: true,
  },
  {
    id: 5,
    slug: "foster-kitten-season-2026",
    title: "Kitten Season is Coming — Foster Families Needed!",
    excerpt: "Spring kitten season is just around the corner, and we need foster families to help care for neonatal kittens. No experience necessary — we provide all supplies, food, and 24/7 vet support. It's the most rewarding thing you'll ever do.",
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=500&fit=crop",
    category: "Foster",
    publishedAt: new Date("2026-01-05"),
    authorName: "Heartland Team",
    published: true,
  },
  {
    id: 6,
    slug: "volunteer-appreciation-2025",
    title: "Thank You to Our 653 Volunteers!",
    excerpt: "In 2025, our 653 dedicated volunteers contributed an incredible 19,913 hours of service. From dog walking to kitten fostering to event staffing, our volunteers are the backbone of everything we do at Heartland.",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop",
    category: "Volunteer",
    publishedAt: new Date("2025-12-20"),
    authorName: "Heartland Team",
    published: true,
  },
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts = [], isLoading } = trpc.news.listPosts.useQuery();

  // Use DB posts if available, otherwise fall back to static
  const allPosts = posts.length > 0 ? posts : STATIC_POSTS;

  const filtered = allPosts.filter((post: any) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* Header */}
      <section className="bg-[#1C1917] py-14">
        <div className="container">
          <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">Stay Informed</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            News & Events
          </h1>
          <p className="text-white/70 max-w-xl">
            Stay up to date with the latest happenings at Heartland Animal Shelter — adoption events, fundraisers, volunteer opportunities, and more.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
              />
            </div>
            {/* Category pills */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#C8102E] text-white"
                      : "text-[#78716C] hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No posts found.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-[#0D9488] text-sm font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Featured post (first one) */}
              {selectedCategory === "All" && !searchQuery && filtered.length > 0 && (
                <div className="mb-8">
                  <Link href={`/news/${filtered[0].slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-64 md:h-auto overflow-hidden">
                          {filtered[0].imageUrl ? (
                            <img
                              src={filtered[0].imageUrl}
                              alt={filtered[0].title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Newspaper size={48} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: CATEGORY_COLORS[filtered[0].category ?? "News"] ?? "#1C1917" }}
                            >
                              {filtered[0].category}
                            </span>
                            <span className="text-xs text-[#78716C] flex items-center gap-1">
                              <CalendarDays size={11} />
                              {new Date((filtered[0] as any).publishedAt ?? (filtered[0] as any).createdAt ?? Date.now()).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <h2
                            className="text-2xl font-black text-[#1C1917] mb-3 group-hover:text-[#C8102E] transition-colors"
                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                          >
                            {filtered[0].title}
                          </h2>
                          <p className="text-[#78716C] leading-relaxed mb-4 line-clamp-3">
                            {filtered[0].excerpt}
                          </p>
                          <div className="flex items-center gap-1.5 text-[#C8102E] font-bold text-sm">
                            Read More <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest of posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === "All" && !searchQuery ? filtered.slice(1) : filtered).map((post: any) => (
                  <Link key={post.id} href={`/news/${post.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                      <div className="h-48 overflow-hidden bg-gray-50">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper size={40} className="text-gray-200" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: CATEGORY_COLORS[post.category ?? "News"] ?? "#1C1917" }}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-[#78716C] flex items-center gap-1">
                            <CalendarDays size={10} />
                            {new Date((post as any).publishedAt ?? (post as any).createdAt ?? Date.now()).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h3
                          className="font-black text-[#1C1917] mb-2 group-hover:text-[#C8102E] transition-colors line-clamp-2"
                          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#78716C] leading-relaxed line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-1 text-[#C8102E] font-bold text-sm mt-3">
                          Read More <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="container">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Instagram size={18} className="text-[#C8102E]" />
              <div className="text-[#C8102E] text-xs font-bold uppercase tracking-widest">Follow Along</div>
            </div>
            <h2 className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              @heartlandanimalshelter
            </h2>
            <p className="text-[#78716C] text-sm mt-1">See our latest posts and animal stories on Instagram</p>
          </div>
          <EmbedSocialFeed />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#0D9488] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Never Miss an Update
          </h2>
          <p className="text-white/90 mb-5 text-sm max-w-md mx-auto">
            Sign up for our newsletter to get the latest news, events, and animal stories delivered to your inbox.
          </p>
          <a
            href="https://heartlandanimalshelter.org/newsletter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0D9488] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
