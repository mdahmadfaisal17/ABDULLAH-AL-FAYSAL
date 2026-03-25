import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProjectModal } from "./ProjectModal";
import { ModalProvider } from "../context/ModalContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed right-4 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#9F74FF] text-white shadow-lg transition-all hover:bg-[#9F74FF]/90 md:right-6 md:bottom-8"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function Layout() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const isBlog = location.pathname === "/blog";
  const isDarkPage = isAbout || isBlog;

  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "Lufga, sans-serif" }}>
        <ScrollToTop />
        <Header />
        {/* Hero extends behind the fixed header on all pages — no top padding */}
        <main className={`flex-1 ${isDarkPage ? "bg-[#0a0b1a]" : ""}`}>
          <Outlet />
        </main>
        <Footer />
        <ScrollTopButton />
        <ProjectModal />
      </div>
    </ModalProvider>
  );
}

