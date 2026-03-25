import { Link, useParams } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/api";
import { optimizeImageUrl } from "../lib/images";

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

export default function BlogDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogApiItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }

        const items = (await response.json()) as BlogApiItem[];
        const publishedPost = items.find(
          (item) => item.id === postId && item.status === "Published",
        );

        if (isMounted) {
          setPost(publishedPost ?? null);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load blog details.", error);
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    void loadBlog();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  const readTime = post
    ? `${Math.max(1, Math.ceil(post.content.trim().split(/\s+/).filter(Boolean).length / 200))} min read`
    : "";

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0b1a] text-white flex items-center justify-center px-6">
        <p className="text-white/70" style={{ fontFamily: "Lufga, sans-serif" }}>
          Loading article...
        </p>
      </div>
    );
  }

  if (isLoaded && !post) {
    return (
      <div className="min-h-screen bg-[#0a0b1a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-white/70 mb-4" style={{ fontFamily: "Lufga, sans-serif" }}>
            Blog article not found.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#E1FE5D]"
            style={{ fontFamily: "Lufga, sans-serif", fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const resolvedPost = post;

  return (
    <div className="bg-[#0a0b1a] text-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mb-8 text-sm text-[#E1FE5D]"
          style={{ fontFamily: "Lufga, sans-serif", fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <p
          className="text-xs tracking-widest uppercase text-white/50 mb-3"
          style={{ fontFamily: "Lufga, sans-serif" }}
        >
          {resolvedPost.category || "Uncategorized"}
        </p>
        <h1
          className="mb-4"
          style={{
            fontFamily: "Lufga, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            lineHeight: "1.2",
          }}
        >
          {resolvedPost.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-white/60 mb-8" style={{ fontFamily: "Lufga, sans-serif" }}>
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(resolvedPost.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime}</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
          <img
            src={optimizeImageUrl(resolvedPost.thumbnail, { width: 1200 })}
            alt={resolvedPost.title}
            className="w-full h-auto object-cover"
            decoding="async"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>

        <article
          className="rounded-2xl p-6 md:p-8 border border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          }}
        >
          <p className="text-slate-300 leading-8" style={{ fontFamily: "Lufga, sans-serif" }}>
            {resolvedPost.content}
          </p>
        </article>
      </section>
    </div>
  );
}

