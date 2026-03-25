type CtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  dark?: boolean;
};

export function CtaSection({
  eyebrow,
  title,
  description,
  buttonText,
  onClick,
  dark = false,
}: CtaSectionProps) {
  const ArrowIcon = new URL("../../../imports/Arrow-1.svg", import.meta.url).href;

  return (
    <section className="py-24" style={dark ? { background: "#0a0b1a" } : undefined}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #1a1a2e)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full opacity-30 blur-3xl"
            style={{ background: "#9F74FF" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-32 rounded-full opacity-20 blur-3xl"
            style={{ background: "#E1FE5D" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: "Lufga, sans-serif", color: "#E1FE5D" }}
            >
              {eyebrow}
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              {title}
            </h2>
            <p
              className="mb-8"
              style={{ fontFamily: "Lufga, sans-serif", fontSize: "1rem", lineHeight: "1.7", color: "#9ca3af" }}
            >
              {description}
            </p>
            <button
              onClick={onClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-gray-900 transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "#E1FE5D",
                fontFamily: "Lufga, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              {buttonText}
              <img src={ArrowIcon} alt="" className="w-4 h-4" style={{ filter: "brightness(0) saturate(100%)" }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
