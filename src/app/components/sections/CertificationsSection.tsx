import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "./FadeUp";
import type { CertificationItem } from "./types";

export function CertificationsSection({
  eyebrow,
  title,
  description,
  items,
  className = "py-20",
  background = "#0a0b1a",
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CertificationItem[];
  className?: string;
  background?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={className} style={{ background }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-12">
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
            >
              {eyebrow}
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
              {title}
            </h2>
            <p
              className="max-w-xl mx-auto mb-8"
              style={{
                fontFamily: "Lufga, sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {description}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="lg:order-2">
            <FadeUp>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <FadeUp key={item.title} delay={i * 0.06}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveIndex(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveIndex(i);
                        }
                      }}
                      className="w-full rounded-[18px] p-5 cursor-pointer transition-all duration-300"
                      style={{
                        background:
                          activeIndex === i
                            ? "linear-gradient(180deg, rgba(159,116,255,0.18), rgba(159,116,255,0.08))"
                            : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                        border:
                          activeIndex === i
                            ? "1px solid rgba(159,116,255,0.2)"
                            : "1px solid rgba(255,255,255,0.08)",
                        boxShadow:
                          activeIndex === i
                            ? "0 16px 40px rgba(159,116,255,0.08)"
                            : "0 14px 35px rgba(0,0,0,0.18)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          style={{
                            fontFamily: "Lufga, sans-serif",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            color: "rgba(255,255,255,0.95)",
                          }}
                        >
                          {item.title}
                        </h3>
                        <ChevronDown
                          size={20}
                          style={{
                            color: "rgba(255,255,255,0.6)",
                            transform: activeIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                            flexShrink: 0,
                          }}
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {activeIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="mt-4"
                              style={{
                                fontFamily: "Lufga, sans-serif",
                                fontSize: "0.98rem",
                                lineHeight: "1.75",
                                color: "rgba(255,255,255,0.62)",
                              }}
                            >
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:order-1">
            <FadeUp>
              <div
                className="overflow-hidden rounded-[24px] border"
                style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 22px 55px rgba(0,0,0,0.2)" }}
              >
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="w-full aspect-[1.1/1] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
