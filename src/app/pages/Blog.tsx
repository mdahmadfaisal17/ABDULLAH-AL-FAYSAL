import { motion } from "motion/react";
import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { CtaSection } from "../components/sections/CtaSection";
import { useModal } from "../context/ModalContext";
import { API_BASE_URL } from "../lib/api";
import { optimizeImageUrl } from "../lib/images";
import ArrowIcon from "../../imports/Arrow-1.svg";

type BlogApiItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  publishedAt: string;
  status: "Draft" | "Published";
};

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const catColors: Record<string, string> = {
  Branding: "#9F74FF",
  "Social Media": "#E1FE5D",
  "Design Tips": "#9F74FF",
  Business: "#E1FE5D",
  Process: "#9F74FF",
  Career: "#E1FE5D",
};

export default function Blog() {
  const { openModal } = useModal();
  const [posts, setPosts] = useState<BlogApiItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }

        const items = (await response.json()) as BlogApiItem[];
        if (isMounted) {
          setPosts(items.filter((item) => item.status === "Published"));
        }
      } catch (error) {
        console.error("Failed to load published blogs.", error);
      }
    };

    void loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  const estimateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="bg-[#0a0b1a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-xs tracking-widest uppercase text-white/50 mb-3" style={{ fontFamily: "Lufga, sans-serif" }}>Blog</p>
            <h1
              className="text-white mb-4"
              style={{ fontFamily: "Lufga, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Design{" "}
              <span style={{ background: "linear-gradient(135deg, #9F74FF, #E1FE5D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
               Insights & Ideas
              </span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto" style={{ fontFamily: "Lufga, sans-serif", fontSize: "1rem", lineHeight: "1.75" }}>
              Insights on branding, design process, freelancing, and building a strong creative career, with practical ideas you can apply to real projects.
            </p>
          </motion.div>

          <div className="mt-12">
            {!featured ? (
              <div
                className="rounded-3xl border border-white/10 px-8 py-12 text-center text-white/70"
                style={{ fontFamily: "Lufga, sans-serif" }}
              >
                No published blog posts yet.
              </div>
            ) : (
            <FadeUp>
              <Link
                to={`/blog/${featured.id}`}
                className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden transition-all cursor-pointer"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(159,116,255,0.18), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.035))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
                }}
              >
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img
                    src={optimizeImageUrl(featured.thumbnail, { width: 1200 })}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-sm text-xs"
                      style={{ fontFamily: "Lufga, sans-serif", fontWeight: 500, background: "#E1FE5D", color: "#111827" }}
                    >
                      Latest
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-sm text-xs"
                      style={{
                        fontFamily: "Lufga, sans-serif",
                        fontWeight: 500,
                        background: `${catColors[featured.category || "Uncategorized"] ?? "#9F74FF"}22`,
                        color: (catColors[featured.category || "Uncategorized"] ?? "#9F74FF") === "#E1FE5D" ? "#E1FE5D" : "#D6C2FF",
                        border: `1px solid ${(catColors[featured.category || "Uncategorized"] ?? "#9F74FF")}44`,
                      }}
                    >
                      {featured.category || "Uncategorized"}
                    </span>
                  </div>
                  <h2
                    className="text-white mb-3 group-hover:text-[#E9D8FF] transition-colors"
                    style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: "1.3" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed" style={{ fontFamily: "Lufga, sans-serif", fontSize: "0.95rem", lineHeight: "1.75" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-6" style={{ fontFamily: "Lufga, sans-serif" }}>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(featured.publishedAt)}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {estimateReadTime(featured.content)}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-[#E1FE5D]" style={{ fontFamily: "Lufga, sans-serif", fontWeight: 500 }}>
                    Read Article <img src={ArrowIcon} alt="" className="w-3.5 h-3.5" style={{ filter: "brightness(0) saturate(100%) invert(92%) sepia(65%) saturate(463%) hue-rotate(20deg) brightness(108%) contrast(106%)" }} />
                  </span>
                </div>
              </Link>
            </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.07}>
              <Link
                to={`/blog/${post.id}`}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(159,116,255,0.24)]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={optimizeImageUrl(post.thumbnail, { width: 720 })}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="inline-block px-2.5 py-1 rounded-sm text-xs mb-3 self-start"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 500,
                      background: `${catColors[post.category || "Uncategorized"] ?? "#9F74FF"}22`,
                      color: (catColors[post.category || "Uncategorized"] ?? "#9F74FF") === "#E1FE5D" ? "#E1FE5D" : "#D6C2FF",
                      border: `1px solid ${(catColors[post.category || "Uncategorized"] ?? "#9F74FF")}44`,
                    }}
                  >
                    {post.category || "Uncategorized"}
                  </span>
                  <h3
                    className="text-white mb-3 flex-1 group-hover:text-[#E9D8FF] transition-colors"
                    style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700, fontSize: "1rem", lineHeight: "1.45" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4" style={{ fontFamily: "Lufga, sans-serif" }}>
                    {post.excerpt.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/10" style={{ fontFamily: "Lufga, sans-serif" }}>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {estimateReadTime(post.content)}</span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="bg-white">
        <CtaSection
          eyebrow="LET'S WORK TOGETHER"
          title="Let's Build a Brand That Stands Out"
          description="Ready to take your brand to the next level? Let's create something clean, professional, and impactful."
          buttonText="Start Your Project"
          onClick={openModal}
        />
      </div>
    </div>
  );
}

