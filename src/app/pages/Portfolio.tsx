import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CtaSection } from "../components/sections/CtaSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { ToolsSection } from "../components/sections/ToolsSection";
import { useModal } from "../context/ModalContext";
import { processSteps, tools } from "../components/sections/sectionData";

const ArrowIcon = new URL("../../imports/Arrow-1.svg", import.meta.url).href;

type Category = "All" | string;

type PortfolioApiItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  projectLink?: string;
};

export default function Portfolio() {
  const { openModal } = useModal();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioApiItem[]>([]);
  const [active, setActive] = useState<Category>("All");

  useEffect(() => {
    let isMounted = true;

    const loadPortfolioItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");

        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio items: ${response.status}`);
        }

        const items = (await response.json()) as PortfolioApiItem[];

        if (isMounted) {
          setPortfolioItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio items.", error);
      }
    };

    void loadPortfolioItems();

    return () => {
      isMounted = false;
    };
  }, []);

  // Derive unique categories from portfolio items plus "All"
  const categories: Category[] = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  // Map portfolio items to the expected format
  const projects = portfolioItems.map((item) => ({
    id: item.id,
    title: item.title,
    cat: item.category,
    img: item.imageUrl,
    client: item.title || "Client",
    link: item.projectLink || "",
  }));

  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <div
      className="bg-[#07091a] text-white"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(225,254,93,0.08), transparent 24%), radial-gradient(circle at top right, rgba(159,116,255,0.16), transparent 28%), linear-gradient(180deg, #07091a 0%, #0a0b1a 52%, #060714 100%)",
      }}
    >
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "Lufga, sans-serif", color: "rgba(255,255,255,0.5)" }}>Portfolio</p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "Lufga, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Work That{" "}
            <span style={{ background: "linear-gradient(135deg, #9F74FF, #E1FE5D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Stands Out
            </span>
          </h1>
          <p className="max-w-xl mx-auto" style={{ fontFamily: "Lufga, sans-serif", fontSize: "1rem", lineHeight: "1.75", color: "rgba(255,255,255,0.68)" }}>
            A selection of projects where I helped brands look more professional, build a clear identity, and stand out in a competitive market.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-xl text-sm transition-all"
              style={{
                fontFamily: "Lufga, sans-serif",
                fontWeight: 500,
                background:
                  active === cat
                    ? "linear-gradient(135deg, #9F74FF, #7c54e0)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                color: active === cat ? "white" : "rgba(255,255,255,0.72)",
                border: active === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: active === cat ? "0 16px 40px rgba(159,116,255,0.22)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`group relative rounded-2xl overflow-hidden aspect-[8/5] ${
                  project.link ? "cursor-pointer" : "cursor-default"
                }`}
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 24px 55px rgba(0,0,0,0.22)",
                }}
                onClick={() => {
                  if (project.link) {
                    window.open(project.link, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {project.link && (
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
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    {project.cat}
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "Lufga, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {project.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProcessSection
        eyebrow="PROCESS"
        title="My Simple Design Process"
        description="A clear, strategic process designed to build a brand that works."
        items={processSteps}
        className="pt-0 pb-24"
        background="transparent"
      />

      <ToolsSection
        eyebrow="TOOLS"
        title="Tools I Use to Deliver Quality Work"
        description="I use industry-standard tools to create clean, professional, and high-quality design work."
        items={tools}
        className="py-0"
        background="transparent"
        marginBottom="mb-24"
      />

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
