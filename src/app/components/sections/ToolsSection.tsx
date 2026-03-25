import { FadeUp } from "./FadeUp";
import type { ToolItem } from "./types";

export function ToolsSection({
  eyebrow,
  title,
  description,
  items,
  className = "py-20",
  background = "#07091a",
  marginBottom = "mb-0",
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: ToolItem[];
  className?: string;
  background?: string;
  marginBottom?: string;
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
            className="text-center max-w-xl mx-auto mb-12"
            style={{ fontFamily: "Lufga, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}
          >
            {description}
          </p>
        </FadeUp>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${marginBottom}`}>
          {items.map((tool, i) => (
            <FadeUp key={tool.name} delay={i * 0.06}>
              <div
                className="flex h-full items-center gap-4 rounded-[16px] px-6 py-5"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(225,254,93,0.1), transparent 32%), radial-gradient(circle at 100% 100%, rgba(159,116,255,0.12), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] text-sm">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="max-h-14 max-w-14 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {tool.type}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
