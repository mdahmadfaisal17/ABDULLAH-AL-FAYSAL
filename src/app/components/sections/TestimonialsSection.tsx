import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FadeUp } from "./FadeUp";
import type { ReviewItem } from "./types";

export function TestimonialsSection({ items }: { items: ReviewItem[] }) {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [visibleReviewCards, setVisibleReviewCards] = useState(2);
  const [isCompactReviewLayout, setIsCompactReviewLayout] = useState(false);
  const reviewGap = 24;

  useEffect(() => {
    const handleResize = () => {
      setVisibleReviewCards(window.innerWidth <= 768 ? 1 : 2);
      setIsCompactReviewLayout(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxReviewIndex = useMemo(
    () => Math.max(0, items.length - visibleReviewCards),
    [items.length, visibleReviewCards]
  );

  useEffect(() => {
    if (reviewIndex > maxReviewIndex) {
      setReviewIndex(maxReviewIndex);
    }
  }, [reviewIndex, maxReviewIndex]);

  useEffect(() => {
    if (maxReviewIndex === 0) return;

    const autoplay = window.setInterval(() => {
      setReviewIndex((current) => (current >= maxReviewIndex ? 0 : current + 1));
    }, 10000);

    return () => window.clearInterval(autoplay);
  }, [maxReviewIndex]);

  return (
    <>
      <FadeUp>
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            TESTIMONIALS
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: "Lufga, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            What My Clients Say About Working With Me
          </h2>
          <p
            className="max-w-xl mx-auto mb-8"
            style={{
              fontFamily: "Lufga, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Real feedback from Fiverr and direct clients, focused on results, quality, and experience.
          </p>
        </div>
      </FadeUp>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            gap: `${reviewGap}px`,
            transform:
              visibleReviewCards === 1
                ? `translateX(calc(-${reviewIndex} * (100% + ${reviewGap}px)))`
                : `translateX(calc(-${reviewIndex} * ((100% - ${reviewGap}px) / ${visibleReviewCards} + ${reviewGap}px)))`,
          }}
        >
          {items.map((review) => (
            <article
              key={review.name}
              className="relative overflow-hidden shrink-0"
              style={{
                width: visibleReviewCards === 2 ? `calc((100% - ${reviewGap}px) / 2)` : "100%",
                borderRadius: isCompactReviewLayout ? "24px" : "30px",
                padding: isCompactReviewLayout ? "1.2rem" : "1.5rem",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(225,254,93,0.32), transparent 34%), radial-gradient(circle at 100% 100%, rgba(159,116,255,0.24), transparent 32%), linear-gradient(180deg, #ffffff, #f7f5ff)",
                border: "1px solid rgba(32,34,49,0.08)",
                boxShadow: "0 24px 50px rgba(15,23,42,0.08)",
              }}
            >
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(124,92,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(circle at 100% 100%, black 20%, transparent 72%)",
                }}
              />
              <div className="relative z-10 flex h-full flex-col" style={{ minHeight: isCompactReviewLayout ? "272px" : "340px" }}>
                <div
                  className="flex items-start justify-between"
                  style={{
                    gap: isCompactReviewLayout ? "0.8rem" : "1rem",
                    marginBottom: isCompactReviewLayout ? "1rem" : "1.25rem",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="rounded-full object-cover border-2"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: isCompactReviewLayout ? "3rem" : "4rem",
                        height: isCompactReviewLayout ? "3rem" : "4rem",
                        minWidth: isCompactReviewLayout ? "3rem" : "4rem",
                        borderColor: "rgba(124,92,255,0.18)",
                      }}
                    />
                    <div>
                      <h3
                        className="mb-1"
                        style={{
                          fontFamily: "Lufga, sans-serif",
                          fontWeight: 600,
                          color: "#202231",
                          fontSize: isCompactReviewLayout ? "1rem" : "1.125rem",
                        }}
                      >
                        {review.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "Lufga, sans-serif",
                          color: "rgba(32,34,49,0.62)",
                          fontSize: isCompactReviewLayout ? "0.82rem" : "0.875rem",
                        }}
                      >
                        {review.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center shrink-0"
                    style={{
                      gap: isCompactReviewLayout ? "0.12rem" : "0.25rem",
                      paddingTop: isCompactReviewLayout ? "0.1rem" : "0.25rem",
                    }}
                  >
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} size={isCompactReviewLayout ? 14 : 18} fill="#FFA200" stroke="none" />
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    marginBottom: isCompactReviewLayout ? "0.35rem" : "0.375rem",
                    fontSize: isCompactReviewLayout ? "clamp(1.02rem, 1.35vw, 1.18rem)" : "clamp(1.3rem, 1.8vw, 1.48rem)",
                    lineHeight: isCompactReviewLayout ? "1.42" : "1.55",
                    color: "rgba(32,34,49,0.78)",
                  }}
                >
                  {review.short}
                </p>

                <p
                  className="flex-1"
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    marginBottom: isCompactReviewLayout ? "1rem" : "1.75rem",
                    fontSize: isCompactReviewLayout ? "clamp(1.02rem, 1.35vw, 1.18rem)" : "clamp(1.3rem, 1.8vw, 1.48rem)",
                    lineHeight: isCompactReviewLayout ? "1.42" : "1.55",
                    color: "rgba(32,34,49,0.78)",
                  }}
                >
                  {review.review}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxReviewIndex + 1 }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to review slide ${index + 1}`}
            onClick={() => setReviewIndex(index)}
            className="h-1 rounded-[2px] transition-all duration-300"
            style={{
              width: reviewIndex === index ? "40px" : "16px",
              background: reviewIndex === index ? "#7C5CFF" : "rgba(255,255,255,0.22)",
            }}
          />
        ))}
      </div>
    </>
  );
}
