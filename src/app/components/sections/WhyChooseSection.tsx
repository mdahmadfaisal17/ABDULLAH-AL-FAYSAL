import { FadeUp } from "./FadeUp";
import type { WhyChooseItem } from "./types";

export function WhyChooseSection({ items }: { items: WhyChooseItem[] }) {
  return (
    <>
      <FadeUp>
        <div className="text-center">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            WHY CHOOSE ME
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
            Why Clients Choose to Work With Me
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
            I focus on delivering clean, reliable, and thoughtful design with clear communication at every step.
          </p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {items.map((item, i) => (
          <FadeUp key={item.title} delay={i * 0.08}>
            <div
              className="flex h-full flex-col items-center justify-center rounded-[28px] px-6 py-8 text-center"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              }}
            >
              <div className="mb-4">
                <item.icon size={25} style={{ color: "#E1FE5D" }} />
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
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-[18rem]"
                style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.6)" }}
              >
                {item.desc}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
