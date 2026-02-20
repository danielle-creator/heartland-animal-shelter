/*
 * HEARTLAND ANIMAL SHELTER — News Post Detail Page
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, CalendarDays, User, Tag, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

const CATEGORY_COLORS: Record<string, string> = {
  News: "#1C1917",
  Event: "#0D9488",
  "Adoption Event": "#C8102E",
  Fundraiser: "#92400e",
  Volunteer: "#1d4ed8",
  Foster: "#0D9488",
  Community: "#7c3aed",
};

export default function NewsPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: post, isLoading, error } = trpc.news.getPost.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#C8102E] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-black text-[#1C1917]">Post Not Found</h1>
          <p className="text-[#78716C]">This article may have been removed or the URL is incorrect.</p>
          <Link href="/news">
            <button className="btn-heartland-teal rounded-lg px-6 py-3">
              Back to News
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category ?? "News"] ?? "#1C1917";
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* Hero image */}
      {post.imageUrl && (
        <div className="h-64 md:h-80 overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article */}
      <article className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumb */}
          <Link href="/news">
            <button className="flex items-center gap-1.5 text-[#0D9488] font-semibold text-sm mb-6 hover:underline">
              <ArrowLeft size={14} />
              Back to News & Events
            </button>
          </Link>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category}
            </span>
            {publishDate && (
              <span className="text-xs text-[#78716C] flex items-center gap-1">
                <CalendarDays size={12} />
                {publishDate}
              </span>
            )}
            {post.authorName && (
              <span className="text-xs text-[#78716C] flex items-center gap-1">
                <User size={12} />
                {post.authorName}
              </span>
            )}
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-1 text-xs text-[#78716C] hover:text-[#C8102E] transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-black text-[#1C1917] mb-6 leading-tight"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-[#78716C] leading-relaxed mb-8 border-l-4 border-[#C8102E] pl-4 italic">
              {post.excerpt}
            </p>
          )}

          {/* Body */}
          {post.body ? (
            <div
              className="prose prose-lg max-w-none text-[#1C1917]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
              dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, "<br/>") }}
            />
          ) : (
            <p className="text-[#78716C] italic">Full article content coming soon.</p>
          )}

          {/* CTA */}
          <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-[#1C1917] mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Want to Help?
            </h3>
            <p className="text-sm text-[#78716C] mb-4">
              Every donation, adoption, and volunteer hour makes a difference for the animals at Heartland.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/donate">
                <button className="btn-heartland-red rounded-lg px-5 py-2 text-sm">Donate Now</button>
              </Link>
              <Link href="/adopt">
                <button className="btn-heartland-teal rounded-lg px-5 py-2 text-sm">Adopt a Pet</button>
              </Link>
              <Link href="/foster">
                <button className="border-2 border-[#0D9488] text-[#0D9488] font-bold text-sm px-5 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                  Foster
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
