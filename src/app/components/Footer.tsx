import { NavLink } from "react-router";
import { Mail } from "lucide-react";
import { toCurrentColorSvg } from "../lib/svg";
import brandLogo from "../../imports/Brand_logos/logo.svg";
import instagramIcon from "../../imports/social_links/instagram.svg?raw";
import facebookIcon from "../../imports/social_links/facebook.svg?raw";
import linkedinIcon from "../../imports/social_links/linkedin.svg?raw";
import behanceIcon from "../../imports/social_links/behance.svg?raw";
import pinterestIcon from "../../imports/social_links/pinterest.svg?raw";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "Pricing", to: "/pricing" },
];

const services = [
  "Personal Branding",
  "Brand Identity",
  "Social Media Design",
  "Mockup Design",
];

const legal = [
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

const socials = [
  { icon: toCurrentColorSvg(instagramIcon), href: "https://www.instagram.com/abdullahalfaysal.design/", label: "Instagram" },
  { icon: toCurrentColorSvg(facebookIcon), href: "https://www.facebook.com/abdullahalfaysal.design", label: "Facebook" },
  { icon: toCurrentColorSvg(linkedinIcon), href: "https://www.linkedin.com/in/abdullahalfaysaldesign", label: "LinkedIn" },
  { icon: toCurrentColorSvg(behanceIcon), href: "https://www.behance.net/abdullahalfaysal", label: "Behance" },
  { icon: toCurrentColorSvg(pinterestIcon), href: "https://www.pinterest.com/abdullahalfaysaldesign/", label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0b1a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={brandLogo}
                alt="Abdullah Al Faysal logo"
                className="w-8 h-8 object-contain"
              />
              <span style={{ fontFamily: "Lufga, sans-serif", fontWeight: 700 }}>
                Abdullah Al Faysal
              </span>
            </div>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "Lufga, sans-serif" }}
            >
              Helping businesses build clean, professional brand identities and visuals that stand out.
            </p>
            <a
              href="mailto:mdalfaysal17@gmail.com"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "Lufga, sans-serif" }}
            >
              <Mail size={14} />
              mdalfaysal17@gmail.com
            </a>
          </div>

          <div>
            <h4
              className="text-xs tracking-widest uppercase text-gray-500 mb-4"
              style={{ fontFamily: "Lufga, sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs tracking-widest uppercase text-gray-500 mb-4"
              style={{ fontFamily: "Lufga, sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <NavLink
                    to="/services"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    {service}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs tracking-widest uppercase text-gray-500 mb-4"
              style={{ fontFamily: "Lufga, sans-serif" }}
            >
              Legal
            </h4>
            <ul className="space-y-2.5 mb-6">
              {legal.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: "Lufga, sans-serif" }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex gap-1">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-10 h-10 flex items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="block w-6 h-6 text-gray-400 transition-colors group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: icon }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600"
          style={{ fontFamily: "Lufga, sans-serif" }}
        >
          <p>{"\u00A9"} {new Date().getFullYear()} Abdullah Al Faysal. All rights reserved.</p>
          <p>
            Designed & Developed by Abdullah Al Faysal
          </p>
        </div>
      </div>
    </footer>
  );
}

