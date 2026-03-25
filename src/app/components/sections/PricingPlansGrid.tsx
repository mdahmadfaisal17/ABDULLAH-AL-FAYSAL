import { CheckCircle2 } from "lucide-react";
import type { PricingPlan } from "../../data/pricing";
import ArrowIcon from "../../../imports/Arrow-1.svg";

export function PricingPlansGrid({
  plans,
  openModal,
}: {
  plans: PricingPlan[];
  openModal: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {plans.map((plan) => {
        const featureRows = [
          ...plan.features.map((feature) => ({ label: feature, muted: false })),
          ...plan.notIncluded.map((feature) => ({ label: feature, muted: true })),
        ];

        return (
          <div
            key={plan.name}
            className="relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: plan.highlighted
                ? "linear-gradient(180deg, #a978ff 0%, #925ff1 55%, #7b49df 100%)"
                : "linear-gradient(180deg, #3b245f 0%, #2f1b4e 52%, #241440 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: plan.highlighted
                ? "0 28px 80px rgba(123,73,223,0.34)"
                : "0 20px 55px rgba(10,11,26,0.22)",
            }}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span
                  className="rounded-full px-4 py-1.5 text-xs"
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    fontWeight: 700,
                    background: "#E1FE5D",
                    color: "#111827",
                    boxShadow: "0 10px 24px rgba(225,254,93,0.24)",
                  }}
                >
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-7">
              <p
                className="mb-3 text-sm"
                style={{
                  fontFamily: "Lufga, sans-serif",
                  lineHeight: "1.6",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {plan.desc}
              </p>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "Lufga, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.7rem",
                  color: "#ffffff",
                }}
              >
                {plan.name}
              </h3>
              <div className="flex items-end gap-2">
                <p
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                    lineHeight: "1",
                    color: "#ffffff",
                  }}
                >
                  {plan.price}
                </p>
                <span
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.72)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {plan.priceLabel}
                </span>
              </div>
            </div>

            <div
              className="mb-6 grid grid-cols-2 gap-5 border-b pb-6"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              <div>
                <p
                  className="mb-1 text-[0.72rem] uppercase tracking-[0.16em]"
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    color: "rgba(255,255,255,0.46)",
                  }}
                >
                  Delivery
                </p>
                <p
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {plan.delivery}
                </p>
              </div>
              <div>
                <p
                  className="mb-1 text-[0.72rem] uppercase tracking-[0.16em]"
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    color: "rgba(255,255,255,0.46)",
                  }}
                >
                  Revisions
                </p>
                <p
                  style={{
                    fontFamily: "Lufga, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {plan.revisions}
                </p>
              </div>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {featureRows.map((feature) => (
                <li
                  key={`${plan.name}-${feature.label}`}
                  className="flex items-start gap-3"
                  style={{ opacity: feature.muted ? 0.38 : 1 }}
                >
                  <CheckCircle2
                    size={16}
                    style={{
                      color: "#E1FE5D",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: "1.55",
                      color: "#ffffff",
                    }}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "#E1FE5D",
                color: "#111827",
                fontFamily: "Lufga, sans-serif",
                fontWeight: 700,
                boxShadow: "0 16px 32px rgba(225,254,93,0.18)",
              }}
            >
              Get Started
              <img
                src={ArrowIcon}
                alt=""
                className="h-3.5 w-3.5"
                style={{ filter: "brightness(0) saturate(100%)" }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
