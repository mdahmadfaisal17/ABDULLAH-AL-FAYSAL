/// <reference types="vite/client" />

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useModal } from "../context/ModalContext";
import { CheckCircle2 } from "lucide-react";
import { ProcessSection } from "../components/sections/ProcessSection";
import { CtaSection } from "../components/sections/CtaSection";
import { FaqSection } from "../components/sections/FaqSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { WhyChooseSection } from "../components/sections/WhyChooseSection";
import { faqs, processSteps, reviews, whyChoose } from "../components/sections/sectionData";
import ArrowIcon from "../../imports/Arrow-1.svg?url";
import TargetIcon from "../../imports/service-icons/target.svg?raw";
import CalendarIcon from "../../imports/service-icons/calendar.svg?raw";
import ReceiptIcon from "../../imports/service-icons/receipt.svg?raw";
import MockupIcon from "../../imports/service-icons/mockup.svg?raw";

const FH = "Lufga, sans-serif";

type ServiceFeatureTone = "default" | "strong" | "muted";

type ServiceFeature = {
  label: string;
  tone: ServiceFeatureTone;
};

type ServiceItem = {
  icon: string;
  color: string;
  title: string;
  tagline: string;
  desc: string;
  features: readonly ServiceFeature[];
  audience: string;
  cta: string;
  price: string;
};

function toCurrentColorSvg(svg: string) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
    .replace("<svg ", '<svg width="100%" height="100%" fill="currentColor" ');
}

function renderPrice(price: string) {
  const [amount, suffix] = price.split("/");

  if (!suffix) {
    return amount;
  }

  return (
    <>
      {amount}
      <span
        style={{
          fontSize: "0.52em",
          fontWeight: 500,
          color: "#E1FE5D",
          marginLeft: "0.18em",
        }}
      >
        /{suffix}
      </span>
    </>
  );
}

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

const services: readonly ServiceItem[] = [
  {
    icon: TargetIcon,
    color: "#E1FE5D",
    title: "Brand Identity & Strategy",
    tagline: "Build a brand that stands out and earns lasting trust.",
    desc: "Build a clear, consistent brand system that stands out and earns trust. From strategy to visuals, everything is designed to help your brand show up with confidence.",
    features: [
      { label: "Brand strategy & positioning", tone: "strong" },
      { label: "Logo system (primary & variations)", tone: "default" },
      { label: "Color palette & typography", tone: "default" },
      { label: "Brand voice & messaging", tone: "default" },
      { label: "Complete brand style guide", tone: "strong" },
      { label: "All essential files ready to use", tone: "default" },
    ],
    audience: "Startups, growing businesses, entrepreneurs, agencies",
    cta: "Start Your Brand",
    price: "$60",
  },
  {
    icon: CalendarIcon,
    color: "#9F74FF",
    title: "Monthly Social Media Design",
    tagline: "Stay consistent, visible, and engaging every month.",
    desc: "Consistent, high-quality visuals designed to keep your brand active and engaging. From content style to execution, everything is built to maintain a strong and recognizable presence.",
    features: [
      { label: "Monthly visual style & design direction", tone: "strong" },
      { label: "Social media post designs (based on plan)", tone: "default" },
      { label: "Content consistency across posts", tone: "default" },
      { label: "Platform-specific optimization", tone: "strong" },
      { label: "Ongoing design support", tone: "default" },
      { label: "Ready-to-use final files", tone: "default" },
    ],
    audience: "Startups, creators, and growing brands",
    cta: "Grow Your Presence",
    price: "$120/month",
  },
  {
    icon: ReceiptIcon,
    color: "#E1FE5D",
    title: "Event Branding & Visual System",
    tagline: "Create a cohesive visual experience that makes your event stand out.",
    desc: "Design a complete visual system for your event - from concept to execution. Every touchpoint is crafted to ensure consistency, clarity, and a memorable experience.",
    features: [
      { label: "Event logo / theme design", tone: "strong" },
      { label: "Invitation card & digital invites", tone: "default" },
      { label: "Social media promotion visuals", tone: "default" },
      { label: "Banner, poster & backdrop design", tone: "default" },
      { label: "Stage, standee & signage system", tone: "strong" },
      { label: "ID card, ticket & wristband design", tone: "default" },
    ],
    audience: "Weddings, corporate events, brand launches, community events",
    cta: "Design Your Event",
    price: "$80",
  },
  {
    icon: MockupIcon,
    color: "#9F74FF",
    title: "Apparel Presentation & Mockup System",
    tagline: "Showcase your clothing designs with clean, realistic visuals.",
    desc: "Create high-quality mockups that present your apparel in a clear and professional way. From product visuals to presentation systems, everything is designed to help your brand stand out and attract attention.",
    features: [
      { label: "Clothing mockups (t-shirts, hoodies, etc.)", tone: "strong" },
      { label: "Front, back & multiple view variations", tone: "default" },
      { label: "Realistic presentation style", tone: "default" },
      { label: "Branding & design placement", tone: "default" },
      { label: "Consistent visual system", tone: "strong" },
      { label: "Ready-to-use final images", tone: "default" },
    ],
    audience: "Clothing brands, e-commerce stores, print-on-demand sellers",
    cta: "Showcase Your Products",
    price: "$70",
  },
];

export default function Services() {
  const { openModal } = useModal();

  return (
    <div
      className="bg-[#07091a] text-white"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(225,254,93,0.08), transparent 26%), radial-gradient(circle at top right, rgba(159,116,255,0.16), transparent 28%), linear-gradient(180deg, #07091a 0%, #0a0b1a 48%, #060714 100%)",
      }}
    >
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: FH, color: "rgba(255,255,255,0.5)" }}
          >
            Services
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: FH,
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.15",
              color: "rgba(255,255,255,0.96)",
            }}
          >
            Strategic Design Services
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #9F74FF, #E1FE5D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              for Growing Brands
            </span>
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{ fontFamily: FH, fontSize: "1.05rem", lineHeight: "1.75", color: "rgba(255,255,255,0.68)" }}
          >
            I help brands build strong identities, stay consistent, and show up professionally across every platform.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 space-y-6">
        {services.map((svc, i) => (
          <FadeUp key={svc.title} delay={i * 0.05}>
            <div
              className="rounded-3xl p-8 lg:p-12 transition-all min-h-[31rem]"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
                    : "linear-gradient(180deg, rgba(159,116,255,0.12), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.24)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="mb-5">
                    <span
                      aria-hidden="true"
                      className="block w-8 h-8"
                      style={{ color: svc.color }}
                      dangerouslySetInnerHTML={{ __html: toCurrentColorSvg(svc.icon) }}
                    />
                  </div>
                  <h2
                    className="mb-3"
                    style={{
                      fontFamily: FH,
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "rgba(255,255,255,0.96)",
                    }}
                  >
                    {svc.title}
                  </h2>
                  <p
                    className="mb-5"
                    style={{ fontFamily: FH, fontWeight: 600, fontSize: "1rem", color: "#9F74FF" }}
                  >
                    {svc.tagline}
                  </p>
                  <p
                    className="mb-7"
                    style={{
                      fontFamily: FH,
                      fontSize: "0.95rem",
                      lineHeight: "1.8",
                      color: "rgba(255,255,255,0.66)",
                    }}
                  >
                    {svc.desc}
                  </p>
                  <div className="mb-6">
                    <p
                      className="text-xs mb-2"
                      style={{ fontFamily: FH, color: "rgba(255,255,255,0.5)" }}
                    >
                      <strong style={{ color: "rgba(255,255,255,0.78)" }}>Best for:</strong> {svc.audience}
                    </p>
                  </div>
                  <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white transition-all text-sm hover:scale-[1.03]"
                    style={{
                      background: "linear-gradient(135deg, #9F74FF, #7c54e0)",
                      fontFamily: FH,
                      fontWeight: 600,
                      boxShadow: "0 14px 32px rgba(159,116,255,0.22)",
                    }}
                  >
                    {svc.cta}
                    <img src={ArrowIcon} alt="" className="w-3 h-3" style={{ filter: "brightness(0) invert(1)" }} />
                  </button>
                </div>

                <div className="flex flex-col h-full">
                  <p
                    className="text-xs tracking-widest uppercase mb-5"
                    style={{ fontFamily: FH, color: "rgba(255,255,255,0.45)" }}
                  >
                    What's Included
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-x-8">
                    {[svc.features.filter((_, index) => index % 2 === 0), svc.features.filter((_, index) => index % 2 === 1)].map(
                      (column, columnIndex) => (
                        <div key={columnIndex} className="space-y-3.5">
                          {column.map((feature) => {
                            const isMuted = feature.tone === "muted";
                            const isStrong = feature.tone === "strong";

                            return (
                              <div key={feature.label} className="flex items-start gap-2.5">
                                <CheckCircle2
                                  size={15}
                                  style={{
                                    color: "#9F74FF",
                                    opacity: isMuted ? 0.4 : isStrong ? 0.9 : 0.72,
                                    flexShrink: 0,
                                    marginTop: 2,
                                  }}
                                />
                                <span
                                  className="text-sm"
                                  style={{
                                    fontFamily: FH,
                                    color: isMuted
                                      ? "rgba(255,255,255,0.45)"
                                      : isStrong
                                        ? "rgba(255,255,255,0.92)"
                                        : "rgba(255,255,255,0.74)",
                                    fontWeight: isStrong ? 650 : 500,
                                  }}
                                >
                                  {feature.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-8 lg:mt-auto lg:text-right">
                    <p
                      className="text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: FH, color: "rgba(255,255,255,0.5)" }}
                    >
                      Starting from
                    </p>
                    <p
                      style={{
                        fontFamily: FH,
                        fontWeight: 800,
                        fontSize: "clamp(2.5rem, 5.2vw, 3.8rem)",
                        color: "#E1FE5D",
                        lineHeight: "1.02",
                      }}
                    >
                      {renderPrice(svc.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <WhyChooseSection items={whyChoose} />
      </section>

      <ProcessSection
        eyebrow="PROCESS"
        title="My Simple Design Process"
        description="A clear, strategic process designed to build a brand that works."
        items={processSteps}
        className="pt-0 pb-24"
        background="transparent"
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <TestimonialsSection items={reviews} />
      </section>

      <section className="py-24 relative overflow-hidden" style={{ background: "#0a0b1a" }}>
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
