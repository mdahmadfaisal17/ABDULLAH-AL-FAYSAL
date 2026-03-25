import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import { FadeUp } from "./FadeUp";
import type { ServiceItem } from "./types";

export function ServicesSection({ items }: { items: ServiceItem[] }) {
  const ArrowIcon = new URL("../../../imports/Arrow-1.svg", import.meta.url).href;

  return (
    <>
      <FadeUp>
        <div className="text-center">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            SERVICES
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
            Strategic Design for Growing Brands
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
            I help brands build strong identities, stay consistent, and present themselves professionally.
          </p>
        </div>

        <div className="flex justify-end mb-12">
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:opacity-80 hover:gap-3"
            style={{ fontFamily: "Lufga, sans-serif", fontWeight: 500, color: "#E1FE5D" }}
          >
            Explore My Services
            <img
              src={ArrowIcon}
              alt=""
              className="w-3 h-3 transition-transform duration-300"
              style={{ filter: "brightness(0) saturate(100%) invert(88%) sepia(95%) saturate(391%) hue-rotate(13deg) brightness(104%) contrast(97%)" }}
            />
          </NavLink>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-32">
        {items.map((svc, i) => (
          <FadeUp key={svc.title} delay={i * 0.08}>
            <div
              className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(159,116,255,0.15),0_4px_15px_rgba(159,116,255,0.1)]"
              style={{
                background: "#0a0b1a",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div className="mb-4 transition-transform group-hover:scale-110 duration-300">
                <img
                  src={svc.icon}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    filter:
                      "brightness(0) saturate(100%) invert(88%) sepia(95%) saturate(391%) hue-rotate(13deg) brightness(104%) contrast(97%)",
                  }}
                />
              </div>
              {svc.tag && (
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs mb-2"
                  style={{ fontFamily: "Lufga, sans-serif", background: "rgba(159,116,255,0.2)", color: "#E1FE5D" }}
                >
                  {svc.tag}
                </span>
              )}
              <h3
                className="mb-2"
                style={{
                  fontFamily: "Lufga, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                {svc.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.6)" }}
              >
                {svc.desc}
              </p>
              <NavLink
                to="/services"
                className="mt-auto inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
                style={{
                  fontFamily: "Lufga, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "#E1FE5D",
                }}
              >
                See More <ArrowRight size={16} className="transition-transform duration-300" />
              </NavLink>
            </div>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
