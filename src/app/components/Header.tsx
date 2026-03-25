import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { X, Mail, Phone, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "../context/ModalContext";
import brandLogo from "../../imports/Brand_logos/logo.svg";
import instagramIcon from "../../imports/social_links/instagram.svg";
import facebookIcon from "../../imports/social_links/facebook.svg";
import linkedinIcon from "../../imports/social_links/linkedin.svg";
import behanceIcon from "../../imports/social_links/behance.svg";
import pinterestIcon from "../../imports/social_links/pinterest.svg";

const arrowIcon = new URL("../../imports/Arrow-1.svg", import.meta.url).href;
const submitArrowIcon = new URL("../../imports/Arrow.svg", import.meta.url).href;
const detailsIcon = new URL("../../imports/details.svg", import.meta.url).href;

const FH = "Lufga, sans-serif";
const FB = "Lufga, sans-serif";
const FP = "Lufga, sans-serif";

const drawerSocials = [
  { icon: instagramIcon, href: "https://www.instagram.com/abdullahalfaysal.design/", label: "Instagram" },
  { icon: facebookIcon, href: "https://www.facebook.com/abdullahalfaysal.design", label: "Facebook" },
  { icon: linkedinIcon, href: "https://www.linkedin.com/in/abdullahalfaysaldesign", label: "LinkedIn" },
  { icon: behanceIcon, href: "https://www.behance.net/abdullahalfaysal", label: "Behance" },
  { icon: pinterestIcon, href: "https://www.pinterest.com/abdullahalfaysaldesign/", label: "Pinterest" },
];

// Navigation Link with Hover Animation
function NavLink({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="relative overflow-hidden h-6 flex items-center group text-sm whitespace-nowrap"
      style={{ fontFamily: FB, fontWeight: 400 }}
    >
      <span
        className={`block transition-all duration-300 ease-out group-hover:-translate-y-full ${
          isActive ? "text-[#E1FE5D]" : "text-white/80"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-0 flex items-center transition-all duration-300 ease-out translate-y-full group-hover:translate-y-0 ${
          isActive ? "text-[#E1FE5D]" : "text-white/80"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { openModal } = useModal();

  const apiBaseUrl =
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
    "/api";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = async () => {
    const email = subscribeEmail.trim();

    if (!email) {
      setSubscribeMessage("Please enter your email.");
      return;
    }

    try {
      setIsSubscribing(true);
      setSubscribeMessage("");

      const response = await fetch(`${apiBaseUrl}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "Website Header",
        }),
      });

      if (!response.ok) {
        let backendMessage = "Subscription failed.";
        try {
          const errorPayload = (await response.json()) as { message?: string };
          if (errorPayload?.message) {
            backendMessage = errorPayload.message;
          }
        } catch {
          // Keep default message when error payload is not JSON.
        }
        throw new Error(backendMessage);
      }

      const payload = (await response.json()) as {
        emailDelivery?: { sent?: boolean; error?: string | null };
      };

      setSubscribeEmail("");

      if (payload?.emailDelivery && payload.emailDelivery.sent === false) {
        setSubscribeMessage("Subscribed, but confirmation email could not be sent yet.");
      } else {
        setSubscribeMessage("Thanks for subscribing!");
      }
    } catch (error) {
      console.error("Subscriber registration failed.", error);
      setSubscribeMessage(
        error instanceof Error
          ? error.message
          : "Could not subscribe right now. Please try again.",
      );
    } finally {
      setIsSubscribing(false);
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
              className="flex items-center gap-2 shrink-0 pl-2 sm:pl-4 md:pl-8"
              onClick={handleLogoClick}
            >
              <img
                src={brandLogo}
                alt="Abdullah Al Faysal logo"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
              <span
                className="text-white font-bold text-sm sm:text-base md:text-lg whitespace-nowrap"
                style={{ fontFamily: FH }}
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
                className="hidden md:block transition-colors text-sm whitespace-nowrap text-[#E1FE5D] hover:text-[#E1FE5D]/90"
                style={{ fontFamily: FB, fontWeight: 400 }}
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
                <Menu className="w-6 h-6" />
              </button>
              {/* Let's Talk Button */}
              <button
                onClick={openModal}
                className="hidden min-[440px]:flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 md:py-2.5 bg-[#E1FE5D] text-[oklch(21%_0.034_264.665)] rounded-full hover:bg-[#E1FE5D]/90 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 ease-out font-semibold text-sm md:text-base whitespace-nowrap active:scale-[0.98]"
                style={{ fontFamily: FB }}
              >
                Let's Talk
                <img
                  src={arrowIcon}
                  alt=""
                  className="w-3 h-3 transition-transform duration-300"
                  style={{ filter: "brightness(0) saturate(100%)" }}
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
                  <div className="flex items-center gap-2">
                    <img
                      src={brandLogo}
                      alt="Abdullah Al Faysal logo"
                      className="w-6 h-6 object-contain"
                    />
                    <span
                      className="text-white font-bold text-xl"
                      style={{ fontFamily: FH }}
                    >
                      Abdullah Al Faysal
                    </span>
                  </div>
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
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/about"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
                  >
                    About me
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/services"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
                  >
                    Services
                  </Link>
                  <Link
                    to="/portfolio"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/portfolio"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/blog"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-white/80"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all text-lg font-medium ${
                      location.pathname === "/pricing"
                        ? "text-[#E1FE5D] bg-white/5"
                        : isHomePage
                        ? "text-[#E1FE5D]"
                        : "text-[#E1FE5D] hover:bg-white/5"
                    }`}
                    style={{ fontFamily: FB }}
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
                  style={{ fontFamily: FB }}
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
                  <div className="flex items-center gap-2">
                    <img
                      src={brandLogo}
                      alt="Abdullah Al Faysal logo"
                      className="w-6 h-6 object-contain"
                    />
                    <span
                      className="text-white font-bold text-xl"
                      style={{ fontFamily: FH }}
                    >
                      Abdullah Al Faysal
                    </span>
                  </div>
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
                    fontFamily: FP,
                  }}
                >
                  Your Partner in Building Brand Identity
                </h3>

                {/* Address */}
                <div className="mb-8">
                  <p className="text-[#E1FE5D] font-bold text-base uppercase tracking-[0.08em] leading-relaxed">
                    DHAKA, BANGLADESH
                  </p>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">
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
                    Get updates on branding, design & process
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={subscribeEmail}
                      onChange={(event) => setSubscribeEmail(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          if (!isSubscribing) {
                            void handleSubscribe();
                          }
                        }
                      }}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#9F74FF]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!isSubscribing) {
                          void handleSubscribe();
                        }
                      }}
                      disabled={isSubscribing}
                      className="px-5 py-2 bg-[#9F74FF] text-white rounded-lg hover:bg-[#9F74FF]/90 transition-colors flex items-center justify-center"
                      aria-label="Submit email"
                    >
                      <img
                        src={submitArrowIcon}
                        alt=""
                        className="w-4 h-4 brightness-0 invert"
                      />
                    </button>
                  </div>
                  <p className={`text-xs mt-2 ${subscribeMessage ? "text-[#E1FE5D]" : "text-white/40"}`}>
                    {subscribeMessage || "Your data is safe. No spam."}
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-white/55 text-sm mb-3">Connect with me</p>
                  <div className="flex gap-1">
                  {drawerSocials.map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group w-10 h-10 flex items-center justify-center"
                    >
                      <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-6 object-contain transition-all [filter:brightness(0)_saturate(100%)_invert(69%)_sepia(12%)_saturate(221%)_hue-rotate(176deg)_brightness(94%)_contrast(88%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(100%)]"
                      />
                    </a>
                  ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

