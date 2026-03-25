import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "./FadeUp";
import type { FaqItem } from "./types";

export function FaqSection({
  items,
  title = "Got Questions? I've Got Answers",
  description = "Answers to common questions about my process, services, and how we can work together.",
}: {
  items: FaqItem[];
  title?: string;
  description?: string;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      <FadeUp>
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            FAQ
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

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {items.map((faq, i) => (
          <FadeUp key={faq.question} delay={i * 0.05}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenFaqIndex((current) => (current === i ? null : i))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenFaqIndex((current) => (current === i ? null : i));
                }
              }}
              className="w-full text-left rounded-[12px] p-6 transition-all duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
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
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    transform: openFaqIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                />
              </div>
              <AnimatePresence initial={false}>
                {openFaqIndex === i && (
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
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
