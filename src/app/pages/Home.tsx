import { motion } from "motion/react";
import { useModal } from "../context/ModalContext";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { Award, Star } from "lucide-react";
import { StatsSection } from "../components/sections/StatsSection";
import { CertificationsSection } from "../components/sections/CertificationsSection";
import { FadeUp } from "../components/sections/FadeUp";
import { PricingPlansGrid } from "../components/sections/PricingPlansGrid";
import { ServicesSection } from "../components/sections/ServicesSection";
import { WhyChooseSection } from "../components/sections/WhyChooseSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { ToolsSection } from "../components/sections/ToolsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { FaqSection } from "../components/sections/FaqSection";
import { CtaSection } from "../components/sections/CtaSection";
import {
  defaultPricingService,
  pricingByService,
  pricingServices,
  type PricingService,
} from "../data/pricing";
import {
  faqs,
  homeCertifications,
  homeServices,
  homeStats,
  processSteps,
  reviews,
  tools,
  whyChoose,
} from "../components/sections/sectionData";
import { API_BASE_URL } from "../lib/api";
import { buildResponsiveImageSet, optimizeImageUrl } from "../lib/images";

const ArrowIcon = new URL("../../imports/Arrow-1.svg", import.meta.url).href;

// Company logos for marquee
const Logo01 = new URL("../../imports/Logo-01.svg", import.meta.url).href;
const Logo02 = new URL("../../imports/Logo-02.svg", import.meta.url).href;
const Logo03 = new URL("../../imports/Logo-03.svg", import.meta.url).href;
const Logo04 = new URL("../../imports/Logo-04.svg", import.meta.url).href;
const Logo05 = new URL("../../imports/Logo-05.svg", import.meta.url).href;
const Logo06 = new URL("../../imports/Logo-06.svg", import.meta.url).href;
const Logo07 = new URL("../../imports/Logo-07.svg", import.meta.url).href;
const Logo08 = new URL("../../imports/Logo-08.svg", import.meta.url).href;
const Logo09 = new URL("../../imports/Logo-09.svg", import.meta.url).href;
const Logo10 = new URL("../../imports/Logo-10.svg", import.meta.url).href;

/* ── Brand font constants ─────────────────────────────────────────── */
const FH = "Lufga, sans-serif"; // headlines / display
const FB = "Lufga, sans-serif"; // body text, buttons, labels
const FS = "Lufga, sans-serif"; // stylistic / accent headlines

const heroImg = optimizeImageUrl(
  "https://res.cloudinary.com/dun3eercd/image/upload/v1774104038/Images02_uzq9uf.jpg",
  { width: 960 },
);
const heroImgResponsive = buildResponsiveImageSet(
  "https://res.cloudinary.com/dun3eercd/image/upload/v1774104038/Images02_uzq9uf.jpg",
  [480, 720, 960, 1200],
);

// Client profile images for trust section
const client1 = optimizeImageUrl("https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczODkzODY0fDA&ixlib=rb-4.1.0&q=80&w=1080", { width: 160 });
const client2 = optimizeImageUrl("https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczODY2NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080", { width: 160 });
const client3 = optimizeImageUrl("https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzgzMTkxNHww&ixlib=rb-4.1.0&q=80&w=1080", { width: 160 });
const client4 = optimizeImageUrl("https://images.unsplash.com/photo-1771898343647-bd979ad8cca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM4OTM4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080", { width: 160 });

// Client logos with brand names
const clientLogos = [
  { logo: Logo01, name: "Nexus Labs" },
  { logo: Logo02, name: "Quantum Edge" },
  { logo: Logo03, name: "Pulse Digital" },
  { logo: Logo04, name: "Elevate Co." },
  { logo: Logo05, name: "Horizon Tech" },
  { logo: Logo06, name: "Apex Studios" },
  { logo: Logo07, name: "Vertex Group" },
  { logo: Logo08, name: "Infinity Brands" },
  { logo: Logo09, name: "Summit Ventures" },
  { logo: Logo10, name: "Pinnacle Media" },
];

const portfolio1 =
  "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nbyUyMGRlc2lnbiUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NzM4MTAzOTl8MA&ixlib=rb-4.1.0&q=80&w=600";
const portfolio2 =
  "https://images.unsplash.com/photo-1663153206213-d45285ce3fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGRlc2lnbiUyMGNyZWF0aXZlJTIwY29udGVudHxlbnwxfHx8fDE3NzM4MTA0MDB8MA&ixlib=rb-4.1.0&q=80&w=600";
const portfolio3 =
  "https://images.unsplash.com/photo-1752398760609-e4be4e766ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbW9ja3VwJTIwcGFja2FnaW5nJTIwZGVzaWduJTIwbWluaW1hbHxlbnwxfHx8fDE3NzM4MTA0MDB8MA&ixlib=rb-4.1.0&q=80&w=600";
const portfolio4 =
  "https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbiUyMHR5cG9ncmFwaHklMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzczNzMyMjExfDA&ixlib=rb-4.1.0&q=80&w=600";
const portfolio5 =
  "https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXAlMjBjcmVhdGl2ZSUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NzM5NDIwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const portfolio6 =
  "https://images.unsplash.com/photo-1751991713869-7e5ae07db1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBicmFuZGluZyUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NzM5NDIwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080";



function PricingTabs({ openModal }: { openModal: () => void }) {
  const [active, setActive] = useState<PricingService>(defaultPricingService);
  const plans = pricingByService[active];
  const FB = "Lufga, sans-serif";

  return (
    <div>
      {/* Pills */}
      <div
        className="flex flex-wrap justify-center gap-0 mb-10 overflow-hidden rounded-[28px] px-[10px] py-[10px] sm:rounded-full"
        style={{
          background: "rgba(159,116,255,0.12)",
          width: "fit-content",
          margin: "0 auto 2.5rem auto",
          boxShadow: "0 8px 24px rgba(159,116,255,0.12)",
          border: "1px solid rgba(159,116,255,0.18)",
        }}
      >
        {pricingServices.map((svc) => {
          const isActive = svc === active;
          return (
            <button
              key={svc}
              onClick={() => setActive(svc)}
              className="px-7 py-2.5 text-sm font-medium focus:outline-none transition-colors duration-200 border-none"
              style={{
                fontFamily: FB,
                background: isActive ? "#9F74FF" : "transparent",
                color: isActive ? "#fff" : "#3b3159",
                transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                borderRadius: "999px",
                boxShadow: isActive ? "0 10px 24px rgba(159,116,255,0.22)" : undefined,
                cursor: "pointer",
              }}
              onMouseOver={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(159,116,255,0.14)";
                  e.currentTarget.style.color = "#1f1636";
                }
              }}
              onMouseOut={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#3b3159";
                }
              }}
            >
              {svc}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mb-8">
        <NavLink
          to="/pricing"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ fontFamily: FB, fontWeight: 500, color: "#0a0b1a" }}
        >
          View Pricing Details
          <img
            src={ArrowIcon}
            alt=""
            className="w-3 h-3"
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
        </NavLink>
      </div>

      {/* Cards */}
      <PricingPlansGrid plans={plans} openModal={openModal} />
    </div>
  );
}

export default function Home() {
  const { openModal } = useModal();
  const [portfolioItems, setPortfolioItems] = useState<Array<{
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    projectLink?: string;
    featuredSlot: number | null;
  }>>([]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio items: ${response.status}`);
        }

        const rawItems = (await response.json()) as Array<{
          id: string;
          title?: string;
          category?: string;
          imageUrl?: string;
          image?: string;
          projectLink?: string;
          link?: string;
          featuredSlot?: number | null;
          featuredPosition?: number | null;
        }>;

        const normalizedItems = rawItems.map((item) => ({
          id: item.id,
          title: item.title ?? "Untitled",
          category: item.category ?? "Uncategorized",
          imageUrl: item.imageUrl ?? item.image ?? "",
          projectLink: item.projectLink ?? item.link,
          featuredSlot: item.featuredSlot ?? item.featuredPosition ?? null,
        }));

        if (isMounted) {
          setPortfolioItems(normalizedItems);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch featured portfolio items.", error);
      }
    };

    void fetchPortfolioItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Render featured slots in strict order: 1, 2, 3, 4
  const featuredPortfolioItemsFromApi = [1, 2, 3, 4]
    .map((slot) => portfolioItems.find((item) => item.featuredSlot === slot))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const fallbackPortfolioItems = [
    { id: "f1", title: "Brand Identity Design", category: "Branding", imageUrl: portfolio1, projectLink: undefined, featuredSlot: 1 },
    { id: "f2", title: "Social Media Campaign", category: "Social Media", imageUrl: portfolio2, projectLink: undefined, featuredSlot: 2 },
    { id: "f3", title: "Product Packaging", category: "Packaging", imageUrl: portfolio3, projectLink: undefined, featuredSlot: 3 },
    { id: "f4", title: "Editorial Design", category: "Print", imageUrl: portfolio4, projectLink: undefined, featuredSlot: 4 },
  ];

  const featuredPortfolioItems =
    featuredPortfolioItemsFromApi.length > 0
      ? featuredPortfolioItemsFromApi
      : fallbackPortfolioItems;

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      {/*
        Layout omits pt-16 on home so this section starts at y=0,
        sitting behind the fixed transparent header.
        pt-28 clears the 64px header + breathing room.
      */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#07091a" }}
      >
        {/* ─ Animated glow blobs ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "-5%",
              left: "-12%",
              width: "60%",
              height: "80%",
              background:
                "radial-gradient(ellipse at 40% 40%, #E1FE5D40 0%, #E1FE5D18 50%, transparent 72%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              position: "absolute",
              top: "10%",
              right: "-10%",
              width: "58%",
              height: "85%",
              background:
                "radial-gradient(ellipse at 60% 40%, #9F74FF4A 0%, #9F74FF1C 50%, transparent 72%)",
              filter: "blur(70px)",
            }}
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "5%",
              width: "40%",
              height: "55%",
              background:
                "radial-gradient(ellipse at center, #6B4FFF38 0%, transparent 70%)",
              filter: "blur(55px)",
            }}
          />
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
            style={{
              position: "absolute",
              bottom: "5%",
              left: "35%",
              width: "30%",
              height: "35%",
              background:
                "radial-gradient(ellipse at center, #E1FE5D28 0%, transparent 70%)",
              filter: "blur(45px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(7,9,26,0) 60%, rgba(7,9,26,0.7) 100%)",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-[450px]:flex max-[450px]:flex-col max-[450px]:items-center max-[450px]:w-full max-[1024px]:text-center"
          >
            {/* Trust/Social Proof Section */}
            <div className="flex items-center gap-3 min-[1025px]:gap-4 mb-6 max-[1024px]:justify-center">
              {/* Client Profile Images - Overlapping */}
              <div className="flex items-center">
                {[client1, client2, client3, client4].map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-[39px] h-[39px] min-[1025px]:w-[51px] min-[1025px]:h-[51px] rounded-full border-2 border-[#07091a] overflow-hidden ${idx > 0 ? "ml-[-10px] min-[1025px]:ml-[-13px]" : ""}`}
                  >
                    <img
                      src={img}
                      alt={`Client ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* 5-Star Rating + Text */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[13px] h-[13px] min-[1025px]:w-[17px] min-[1025px]:h-[17px]"
                      fill="#E1FE5D"
                      stroke="none"
                    />
                  ))}
                </div>
                <p
                  className="text-[0.7rem] min-[1025px]:text-[0.91rem]"
                  style={{
                    fontFamily: FB,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  Trusted by 150+ Clients Worldwide
                </p>
              </div>
            </div>

            {/* Headline with intro */}
            <p
              className="text-sm mb-2 hero-intro-text"
              style={{
                fontFamily: FB,
                fontWeight: 500,
                fontSize: "2rem",
                color: "rgba(255,255,255,0.55)",
              }}
            >
            Hi, I’m
            </p>
            <h1
              className="leading-[1.05] mb-5 max-[450px]:text-[clamp(2.7rem,11.4vw,4.26rem)] text-[clamp(4.004rem,7.865vw,7.15rem)] min-[768px]:text-[clamp(4.312rem,8.47vw,7.7rem)] min-[1025px]:text-[clamp(3.45rem,6.78vw,6.15rem)]"
              style={{
                fontFamily: FH,
                fontWeight: 800,
                color: "rgba(255,255,255,0.97)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              ABDULLAH
              <br />
              AL FAYSAL
            </h1>

            {/* Body */}
            <p
              className="mb-8 max-w-lg max-[1024px]:mx-auto"
              style={{
                fontFamily: FB,
                fontSize: "1.05rem",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.50)",
              }}
            >
              I help businesses build clean, professional brand identities and mockups that make their ideas feel real and ready to present with confidence.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-12 max-[1024px]:justify-center">
              <button
                onClick={openModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white transition-all duration-300 ease-out hover:opacity-90 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, #9F74FF, #7c54e0)",
                  fontFamily: FB,
                  fontWeight: 600,
                  boxShadow:
                    "0 8px 32px rgba(159,116,255,0.35)",
                }}
              >
                Start a Project <img src={ArrowIcon} alt="" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" style={{ filter: "brightness(0) saturate(100%) invert(1)" }} />
              </button>
              <NavLink
                to="/portfolio"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 ease-out hover:bg-white/10 hover:scale-[1.02] hover:border-white/30"
                style={{
                  fontFamily: FB,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.80)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
               View My Work
              </NavLink>
            </div>

            {/* Logo Marquee */}
            <div className="relative overflow-hidden hero-brand-marquee w-full max-[450px]:self-stretch max-[450px]:mx-[-0.75rem] max-[450px]:w-[calc(100%+1.5rem)] max-[450px]:px-1">
              <p
                className="text-sm mb-3"
                style={{
                  fontFamily: FB,
                  color: "rgba(255,255,255,0.35)",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                Brands I’ve worked with
              </p>
              <div className="relative h-16 min-[1025px]:h-14 overflow-hidden hero-brand-marquee-viewport w-full">
                <div className="hero-brand-marquee-track">
                  {[0, 1].map((groupIndex) => (
                    <div
                      key={groupIndex}
                      className="hero-brand-marquee-group"
                      aria-hidden={groupIndex === 1}
                    >
                      {clientLogos.map((client) => (
                        <div
                          key={`${client.name}-${groupIndex}`}
                          className="flex items-center gap-2.5 px-4 min-[451px]:px-3.5 py-2.5 min-[451px]:py-2 rounded-lg shrink-0 hero-brand-marquee-item"
                        >
                          <div className="w-10 h-10 min-[451px]:w-9 min-[451px]:h-9 min-[1025px]:w-7 min-[1025px]:h-7 flex items-center justify-center hero-brand-marquee-logo">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="w-full h-full object-contain"
                              decoding="async"
                            />
                          </div>
                          <p
                            className="text-[0.95rem] min-[451px]:text-sm min-[1025px]:text-xs whitespace-nowrap hero-brand-marquee-text"
                            style={{
                              fontFamily: FB,
                              fontWeight: 500,
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {client.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow rings behind image */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, #9F74FF28 0%, transparent 65%)",
                filter: "blur(28px)",
                transform: "scale(1.08)",
              }}
            />
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 20%, #E1FE5D18 0%, transparent 60%)",
                filter: "blur(24px)",
                transform: "scale(1.05)",
              }}
            />

            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Image card */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] w-full"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.55)",
                }}
              >
                <img
                  src={heroImg}
                  srcSet={heroImgResponsive.srcSet}
                  alt="Designer at work"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 450px) 92vw, (max-width: 1024px) 88vw, 46vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(159,116,255,0.15) 0%, transparent 50%, rgba(7,9,26,0.25) 100%)",
                  }}
                />
              </div>

              {/* Floating badge — Top Rated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 rounded-2xl p-4 flex items-center gap-3"
                style={{
                  background: "rgba(14,16,38,0.90)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.40)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#E1FE5D" }}
                >
                  <Award size={18} className="text-gray-900" />
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: FH,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    Certified Graphic Designer
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: FB,
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    National Skills Development Authority
                  </p>
                </div>
              </motion.div>

              {/* Floating badge — Open for Work */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 max-[450px]:-top-10 max-[450px]:right-2 rounded-2xl p-3"
                style={{
                  background: "rgba(14,16,38,0.90)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.40)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: FB,
                      color: "rgba(255,255,255,0.40)",
                    }}
                  >
                  Available Now
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: FH,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.90)",
                    }}
                  >
                Available for New Projects
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(7,9,26,0.6))",
          }}
        />
      </section>

      {/* ── Stats Section (Reusable) ── */}
      <StatsSection items={homeStats} />

      <CertificationsSection
        eyebrow="CERTIFICATIONS"
        title="Certifications That Back My Skills"
        description="A collection of certifications that validate my skills, practical experience, and commitment to quality design."
        items={homeCertifications}
      />

      {/* ── Unified Section: What I Do, Selected Work, Why Me, How It Works ── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0a0b1a" }}>
        {/* ── Glow blobs ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-5%",
              right: "-12%",
              width: "55%",
              height: "40%",
              background: "radial-gradient(ellipse at 65% 40%, #9F74FF48 0%, #9F74FF10 55%, transparent 75%)",
              filter: "blur(85px)",
            }}
          />
          <motion.div
            animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{
              position: "absolute",
              top: "10%",
              left: "-8%",
              width: "48%",
              height: "45%",
              background: "radial-gradient(ellipse at 35% 45%, #E1FE5D38 0%, #E1FE5D0C 55%, transparent 75%)",
              filter: "blur(75px)",
            }}
          />
          <motion.div
            animate={{ y: [0, 22, 0], x: [0, -15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 7 }}
            style={{
              position: "absolute",
              top: "40%",
              left: "25%",
              width: "50%",
              height: "40%",
              background: "radial-gradient(ellipse at center, #9F74FF30 0%, #E1FE5D18 55%, transparent 75%)",
              filter: "blur(70px)",
            }}
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 11 }}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "10%",
              width: "44%",
              height: "38%",
              background: "radial-gradient(ellipse at 60% 50%, #E1FE5D28 0%, transparent 70%)",
              filter: "blur(65px)",
            }}
          />
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            style={{
              position: "absolute",
              bottom: "20%",
              left: "-5%",
              width: "40%",
              height: "35%",
              background: "radial-gradient(ellipse at 40% 60%, #9F74FF26 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ServicesSection items={homeServices} />

          {/* Selected Work - Portfolio Highlights */}
          <FadeUp>
            {/* Headline - centered */}
            <div className="text-center mb-6">
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ fontFamily: FB, color: "rgba(255,255,255,0.5)" }}
              >
              PORTFOLIO
              </p>
              <h2
                className="mb-4"
                style={{
                  fontFamily: FH,
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
              Some of My Recent Work
              </h2>
              <p
                className="max-w-xl mx-auto"
                style={{
                  fontFamily: FB,
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
              A selection of projects where I helped brands look more professional and stand out.
              </p>
            </div>
            
            {/* View all button - right aligned */}
            <div className="flex justify-end mb-8">
              <NavLink
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ fontFamily: FB, fontWeight: 500, color: "#E1FE5D" }}
              >
                View Full Portfolio <img src={ArrowIcon} alt="" className="w-3 h-3" style={{ filter: "brightness(0) saturate(100%) invert(88%) sepia(95%) saturate(391%) hue-rotate(13deg) brightness(104%) contrast(97%)" }} />
              </NavLink>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-32">
            {featuredPortfolioItems.map((item, i) => (
              <FadeUp key={item.id} delay={i * 0.08}>
                <div
                  className={`group relative rounded-2xl overflow-hidden aspect-[8/5] bg-gray-100 ${item.projectLink ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => { if (item.projectLink) window.open(item.projectLink, "_blank", "noopener,noreferrer"); }}
                >
                  <img
                    src={optimizeImageUrl(item.imageUrl, { width: 960 })}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 639px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {item.projectLink && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(225, 254, 93, 0.9)" }}
                      >
                        <img
                          src={ArrowIcon}
                          alt=""
                          className="w-6 h-6"
                          style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p
                      className="text-xs text-[#E1FE5D] mb-0.5"
                      style={{ fontFamily: FB }}
                    >
                      {item.category}
                    </p>
                    <p
                      className="text-white"
                      style={{
                        fontFamily: FH,
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <WhyChooseSection items={whyChoose} />
          <div className="mb-32">
            <ProcessSection
              eyebrow="PROCESS"
              title="My Simple Design Process"
              description="A clear, strategic process designed to build a brand that not only looks good but actually works and delivers real results."
              items={processSteps}
              className="py-0"
              background="transparent"
            />
          </div>
          <ToolsSection
            eyebrow="TOOLS"
            title="Tools I Use to Deliver Quality Work"
            description="I use industry-standard tools to create clean, professional, and high-quality design work."
            items={tools}
            className="py-0"
            background="transparent"
            marginBottom="mb-32"
          />
          <TestimonialsSection items={reviews} />
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="bg-[#fafafa] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <p
              className="text-xs tracking-widest uppercase text-gray-400 mb-3 text-center"
              style={{ fontFamily: FB }}
            >
              PRICING
            </p>
            <h2
              className="text-gray-900 mb-4 text-center"
              style={{
                fontFamily: FH,
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              Simple Pricing That Makes Sense
            </h2>
            <p
              className="text-gray-400 text-center max-w-xl mx-auto mb-6"
              style={{ fontFamily: FB, fontSize: "1rem", lineHeight: "1.7" }}
            >
              Clear pricing, no confusion. Choose a package that fits your needs.
            </p>

            <PricingTabs openModal={openModal} />
          </FadeUp>
        </div>
      </section>

      {/* ── Final CTA ── */}
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


