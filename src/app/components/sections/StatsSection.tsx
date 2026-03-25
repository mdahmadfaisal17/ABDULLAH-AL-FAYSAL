import { useEffect, useRef, useState } from "react";
import { FadeUp } from "./FadeUp";
import type { StatItem } from "./types";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, setHasStarted };
}

function CountUpStat({ item }: { item: StatItem }) {
  const { count, setHasStarted } = useCountUp(item.value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [setHasStarted]);

  return (
    <div ref={ref}>
      <p
        style={{
          fontFamily: "Lufga, sans-serif",
          fontWeight: 800,
          fontSize: "3rem",
          color: "#111827",
          lineHeight: "1",
        }}
      >
        {count}
        {item.suffix ?? ""}
      </p>
      <p
        className="text-sm mt-2"
        style={{
          fontFamily: "Lufga, sans-serif",
          color: "#6b7280",
        }}
      >
        {item.label}
      </p>
    </div>
  );
}

export function StatsSection({ items }: { items: StatItem[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {items.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <CountUpStat item={item} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
