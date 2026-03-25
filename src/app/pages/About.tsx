import { motion } from "motion/react";
import { CertificationsSection } from "../components/sections/CertificationsSection";
import { CtaSection } from "../components/sections/CtaSection";
import { FadeUp } from "../components/sections/FadeUp";
import { StatsSection } from "../components/sections/StatsSection";
import { ToolsSection } from "../components/sections/ToolsSection";
import { WhyChooseSection } from "../components/sections/WhyChooseSection";
import { useModal } from "../context/ModalContext";
import { homeCertifications, homeStats, tools, whyChoose } from "../components/sections/sectionData";

const designerImg = "https://res.cloudinary.com/dcbdxgpm0/image/upload/v1774013083/Images01_bn2teg.jpg";
const workspaceImg = "https://res.cloudinary.com/dcbdxgpm0/image/upload/v1774016507/photo_6156755067164363608_y_swytjn.jpg";

export default function About() {
  const { openModal } = useModal();

  return (
    <div className="bg-white">
      {/* About + Journey */}
      <section className="relative overflow-hidden bg-[#0a0b1a]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#E1FE5D]/30 blur-[120px]" />
          <div className="absolute right-[-120px] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#9F74FF]/28 blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-widest uppercase text-white/50 mb-3" style={{ fontFamily: "Lufga, sans-serif" }}>About Me</p>
            <h1
              className="text-white leading-tight mb-5"
              style={{ fontFamily: "Lufga, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              I Don't Just Design,
              <br />
              <span style={{ background: "linear-gradient(135deg, #9F74FF, #E1FE5D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              I Focus on Building Clear, Meaningful Brands
              </span>
            </h1>
            <p className="text-slate-300 mb-6 leading-relaxed" style={{ fontFamily: "Lufga, sans-serif", fontSize: "1.05rem", lineHeight: "1.8" }}>
              I'm Abdullah Al Faysal, a brand identity designer helping businesses present themselves with clarity, confidence, and consistency. I focus on building visual identities that don't just look good, but feel right and reflect the true purpose of a brand.
            </p>
            <p className="text-slate-300 leading-relaxed" style={{ fontFamily: "Lufga, sans-serif", fontSize: "1.05rem", lineHeight: "1.8" }}>
              Most brands don't lack ideas - they lack the right visual direction. With over 5 years of experience, I create brand identities and mockups that feel cohesive, trustworthy, and built to leave a lasting impression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img src={designerImg} alt="Rahul Karim" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <p className="text-gray-400 text-xs mb-1" style={{ fontFamily: "Lufga, sans-serif" }}>Based in</p>
              <p className="text-gray-900 flex items-center gap-2" style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700 }}>
                <span aria-hidden="true">{"\uD83C\uDDE7\uD83C\uDDE9"}</span>
                <span>Dhaka, Bangladesh</span>
              </p>
              <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: "Lufga, sans-serif" }}>Available worldwide</p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="rounded-3xl overflow-hidden aspect-[16/11]">
              <img src={workspaceImg} alt="Design workspace" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-xs tracking-widest uppercase text-white/50 mb-3" style={{ fontFamily: "Lufga, sans-serif" }}>My Journey</p>
            <h2 className="text-white mb-5" style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}>
              From Passion to Profession
            </h2>
            <div className="space-y-4 text-slate-300" style={{ fontFamily: "Lufga, sans-serif", fontSize: "0.95rem", lineHeight: "1.8" }}>
              <p>
                I started designing at 17, fueled by a love for visual storytelling. What began as creating posters for college events soon turned into a full-blown passion for brand identity and visual communication.
              </p>
              <p>
                After studying Graphic Communication Design, I started freelancing on platforms like Fiverr and Behance, quickly building a reputation for clean, minimal, and impactful work.
              </p>
              <p>
                Today, I work with personal brands, startups, and businesses across Bangladesh and beyond, helping them build visual identities that are authentic, memorable, and conversion-driven.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <StatsSection items={homeStats} />

      <section className="bg-[#0a0b1a] py-20">
        <CertificationsSection
          eyebrow="CERTIFICATIONS"
          title="Certifications That Back My Skills"
          description="A collection of certifications that validate my skills, practical experience, and commitment to quality design."
          items={homeCertifications}
          className="py-0"
          background="transparent"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <WhyChooseSection items={whyChoose} />
        </div>

        <ToolsSection
          eyebrow="TOOLS"
          title="Tools I Use to Deliver Quality Work"
          description="I use industry-standard tools to create clean, professional, and high-quality design work."
          items={tools}
          className="py-0"
          background="transparent"
        />
      </section>

      <CtaSection
        eyebrow="LET'S WORK TOGETHER"
        title="Let's Build a Brand That Stands Out"
        description="Ready to take your brand to the next level? Let's create something clean, professional, and impactful."
        buttonText="Start Your Project"
        onClick={openModal}
      />
    </div>
  );
}
