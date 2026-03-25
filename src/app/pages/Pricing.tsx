import { motion } from "motion/react";
import { useState } from "react";
import { CtaSection } from "../components/sections/CtaSection";
import { FaqSection } from "../components/sections/FaqSection";
import { PricingPlansGrid } from "../components/sections/PricingPlansGrid";
import { useModal } from "../context/ModalContext";
import { faqs } from "../components/sections/sectionData";
import {
  defaultPricingService,
  pricingByService,
  pricingServices,
  type PricingService,
} from "../data/pricing";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Pricing() {
  const { openModal } = useModal();
  const [activeService, setActiveService] = useState<PricingService>(defaultPricingService);
  const plans = pricingByService[activeService];

  return (
    <div className="bg-[#0a0b1a] text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-widest uppercase text-white/50 mb-3" style={{ fontFamily: "Lufga, sans-serif" }}>Pricing</p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "Lufga, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Simple{" "}
            <span style={{ background: "linear-gradient(135deg, #9F74FF, #E1FE5D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Pricing
            </span>{" "}
            That Works
          </h1>
          <p className="text-white/65 max-w-xl mx-auto" style={{ fontFamily: "Lufga, sans-serif", fontSize: "1.05rem", lineHeight: "1.75" }}>
            Clear pricing with no confusion. Choose a package that fits your needs and goals.
          </p>
          <div className="mt-8 flex justify-center">
            <div
              className="inline-flex flex-wrap justify-center gap-2 rounded-[28px] px-[10px] py-[10px] sm:rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
              }}
            >
              {pricingServices.map((service) => {
                const isActive = service === activeService;

                return (
                  <button
                    key={service}
                    onClick={() => setActiveService(service)}
                    className="rounded-full px-5 py-2.5 text-sm transition-all duration-300"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 500,
                      background: isActive ? "#9F74FF" : "transparent",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.78)",
                      boxShadow: isActive ? "0 10px 24px rgba(159,116,255,0.28)" : "none",
                    }}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        <FadeUp>
          <PricingPlansGrid plans={plans} openModal={openModal} />
        </FadeUp>

        {/* Custom note */}
        <FadeUp delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm" style={{ fontFamily: "Lufga, sans-serif" }}>
              Need something custom?{" "}
              <button
                onClick={openModal}
                className="text-[#9F74FF] hover:underline"
                style={{ fontFamily: "Lufga, sans-serif", fontWeight: 500 }}
              >
                {"Let's talk about your project \u2192"}
              </button>
            </p>
          </div>
        </FadeUp>
      </section>

      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "#0a0b1a" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[34rem] h-56 rounded-full opacity-35 blur-3xl"
          style={{ background: "#9F74FF" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[28rem] h-44 rounded-full opacity-30 blur-3xl"
          style={{ background: "#E1FE5D" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FaqSection items={faqs} title="Got Questions? I've Got Answers" />
        </div>
      </section>

      <div className="bg-white">
        <CtaSection
          eyebrow="LET'S WORK TOGETHER"
          title="Let's Build a Brand That Stands Out"
          description="Ready to take your brand to the next level? Let's create something clean, professional, and impactful."
          buttonText="Start Your Project"
          onClick={openModal}
        />
      </div>
    </div>
  );
}
