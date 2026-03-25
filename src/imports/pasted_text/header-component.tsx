import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { X, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "../../app/context/ModalContext";
import logo from "../../imports/Logo-01.svg";
import menuIcon from "../../imports/menu.svg";
import detailsIcon from "../../imports/details.svg";
import arrowIcon from "../../imports/Arrow.svg";

// Navigation Link with Hover Animation
function NavLink({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className="relative overflow-hidden h-6 flex items-center group text-sm font-medium whitespace-nowrap"
      style={{ fontFamily: "Lufga, sans-serif" }}
    >
      <span className="block transition-all duration-300 ease-out group-hover:-translate-y-full text-white/80 group-hover:text-white">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center transition-all duration-300 ease-out translate-y-full group-hover:translate-y-0 text-white">
        {children}
      </span>
    </Link>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToSection("home");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 md:py-4">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between gap-2 sm:gap-4 md:gap-8 px-3 sm:px-4 md:px-6 py-2 md:py-3 transition-all duration-300 ${
              isScrolled
                ? "bg-[oklch(21%_0.034_264.665)]/80 backdrop-blur-md shadow-lg rounded-full"
                : "bg-[oklch(21%_0.034_264.665)]/40 backdrop-blur-sm rounded-full"
            }`}
            style={{
              border: isScrolled
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Logo & Name */}
            <Link
              to="/"
              className="flex items-center shrink-0 pl-2 sm:pl-4 md:pl-8"
              onClick={handleLogoClick}
            >
              <span
                className="text-white font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
                style={{ fontFamily: "Lufga, sans-serif" }}
              >
                Abdullah Al Faysal
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About me</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pr-2 sm:pr-4 md:pr-8">
              {/* Pricing */}
              <Link
                to="/pricing"
                className="hidden md:block text-[#E1FE5D] hover:text-[#E1FE5D]/80 transition-colors text-sm font-medium whitespace-nowrap"
                style={{ fontFamily: "Lufga, sans-serif" }}
              >
                Pricing
              </Link>
              {/* Details Button - Shows on all screen sizes */}
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <img
                  src={detailsIcon}
                  alt="Details"
                  className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                />
              </button>
              {/* Mobile Menu Button - Shows when navbar is hidden */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <img
                  src={menuIcon}
                  alt="Menu"
                  className="w-6 h-6 brightness-0 invert"
                />
              </button>
              {/* Let's Talk Button */}
              <button
                onClick={openModal}
                className="hidden min-[440px]:flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 md:py-2.5 bg-[#E1FE5D] text-[oklch(21%_0.034_264.665)] rounded-full hover:bg-[#E1FE5D]/90 transition-all font-semibold text-sm md:text-base whitespace-nowrap"
                style={{ fontFamily: "Lufga, sans-serif" }}
              >
                Let's Talk
                <img
                  src={arrowIcon}
                  alt=""
                  className="w-3 h-3"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-[oklch(21%_0.034_264.665)] z-[70] overflow-y-auto shadow-2xl"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                  <span
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Abdullah Al Faysal
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="mb-8 space-y-1">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    About me
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Services
                  </Link>
                  <Link
                    to="/portfolio"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-lg font-medium"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Pricing
                  </Link>
                </nav>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#E1FE5D] text-[oklch(21%_0.034_264.665)] rounded-full hover:bg-[#E1FE5D]/90 transition-all font-semibold text-base mb-8"
                  style={{ fontFamily: "Lufga, sans-serif" }}
                >
                  Let's Talk
                  <img
                    src={arrowIcon}
                    alt=""
                    className="w-3 h-3"
                  />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Details Drawer - Right Side */}
      <AnimatePresence>
        {isDetailsOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[oklch(21%_0.034_264.665)] z-[70] overflow-y-auto shadow-2xl"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
                  <span
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    Abdullah Al Faysal
                  </span>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Tagline */}
                <h3
                  className="text-2xl text-white mb-8"
                  style={{
                    fontFamily: "Lufga, sans-serif",
                  }}
                >
                  Your Partner in Building Brand Identity
                </h3>

                {/* Address */}
                <div className="mb-8">
                  <h4 className="text-[#E1FE5D] font-bold mb-2">
                    DHAKA
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    617/312 Delpara, Sharifbag, Fatullah,
                    <br />
                    Kutubpur-1421, Narayanganj
                  </p>
                </div>

                {/* Contact */}
                <div className="mb-8 space-y-3">
                  <a
                    href="mailto:mdalfaysal17@gmail.com"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">
                      mdalfaysal17@gmail.com
                    </span>
                  </a>
                  <a
                    href="https://wa.me/8801600140898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">
                      +880 1600 140898
                    </span>
                  </a>
                </div>

                {/* Subscription */}
                <div className="mb-8">
                  <p className="text-white/70 text-sm mb-3">
                    Subscribe to get free updates
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#9F74FF]"
                    />
                    <button className="px-6 py-2 bg-[#9F74FF] text-white rounded-lg hover:bg-[#9F74FF]/90 transition-colors">
                      Submit
                    </button>
                  </div>
                  <p className="text-white/40 text-xs mt-2">
                    Privacy policy protected
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#9F74FF] transition-colors text-white"
                  >
                    <span className="text-sm">in</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#9F74FF] transition-colors text-white"
                  >
                    <span className="text-sm">??</span>
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#9F74FF] transition-colors text-white"
                  >
                    <span className="text-sm">Db</span>
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#9F74FF] transition-colors text-white"
                  >
                    <span className="text-sm">Be</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
