import { FadeUp } from "./FadeUp";
import type { ProcessStepItem } from "./types";

export function ProcessSection({
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
  items: ProcessStepItem[];
  className?: string;
  background?: string;
}) {
  return (
    <section className={className} style={{ background }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <p
            className="text-xs tracking-widest uppercase mb-3 text-center"
            style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            {eyebrow}
          </p>
          <h2
            className="mb-4 text-center"
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
            className="text-center max-w-xl mx-auto mb-14"
            style={{ fontFamily: "Lufga, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}
          >
            {description}
          </p>
        </FadeUp>

        <div className="relative">
          <div
            className="hidden lg:block absolute left-[3%] right-[3%] top-0 h-px z-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(159,116,255,0.55), rgba(255,255,255,0.06))",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 pt-10">
            {items.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div
                  className="relative z-10 flex h-full min-h-[280px] flex-col items-center text-center rounded-[28px] px-6 py-8"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    className="hidden lg:block absolute left-1/2 -top-10 h-10 w-px -translate-x-1/2"
                    style={{
                      background: "linear-gradient(180deg, rgba(159,116,255,0.65), rgba(255,255,255,0.08))",
                      boxShadow: "0 0 10px rgba(159,116,255,0.28)",
                    }}
                  />
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-lg shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 800,
                      background: "#9F74FF",
                      color: "#FFFFFF",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-[16rem]"
                    style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.6)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
