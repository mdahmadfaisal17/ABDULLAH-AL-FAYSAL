import { createGradientPlaceholder } from "../lib/placeholders";
import type { BlogPost, PortfolioItem, ProjectRequest, Subscriber } from "../types/admin";

export const mockProjectRequests: ProjectRequest[] = [
  {
    id: "project-1",
    fullName: "Sarah Rahman",
    email: "mdalfaysal17@gmail.com",
    whatsappNumber: "+8801712000001",
    selectedService: "Fashion Brand Website",
    budget: "$2,500 - $5,000",
    preferredContactMethod: "WhatsApp",
    projectDescription:
      "Need a premium fashion label website with campaign landing pages, a lookbook section, and inquiry-based order flow before we connect ecommerce.",
    date: "2026-03-20T10:15:00.000Z",
  },
  {
    id: "project-2",
    fullName: "Hasib Mahmud",
    email: "mdalfaysal17@gmail.com",
    whatsappNumber: "+8801712000002",
    selectedService: "SaaS Dashboard Design",
    budget: "$5,000 - $8,000",
    preferredContactMethod: "Email",
    projectDescription:
      "Looking for a full redesign of our internal analytics dashboard with a cleaner admin UX and stronger reporting visuals for enterprise clients.",
    date: "2026-03-18T08:00:00.000Z",
  },
  {
    id: "project-3",
    fullName: "Nafisa Karim",
    email: "mdalfaysal17@gmail.com",
    whatsappNumber: "+8801712000003",
    selectedService: "Portfolio Website",
    budget: "$1,000 - $2,500",
    preferredContactMethod: "Phone",
    projectDescription:
      "Personal portfolio for a multidisciplinary designer with case studies, testimonials, downloadable profile, and blog integration.",
    date: "2026-03-16T14:30:00.000Z",
  },
  {
    id: "project-4",
    fullName: "Jahid Hassan",
    email: "mdalfaysal17@gmail.com",
    whatsappNumber: "+8801712000004",
    selectedService: "Corporate Website Refresh",
    budget: "$3,000 - $6,000",
    preferredContactMethod: "WhatsApp",
    projectDescription:
      "Modernize our existing company site with stronger service pages, lead forms, recruitment section, and multilingual content blocks.",
    date: "2026-03-14T11:45:00.000Z",
  },
  {
    id: "project-5",
    fullName: "Tania Sultana",
    email: "mdalfaysal17@gmail.com",
    whatsappNumber: "+8801712000005",
    selectedService: "Product Showcase Landing Page",
    budget: "$800 - $1,500",
    preferredContactMethod: "Email",
    projectDescription:
      "Need a single high-converting landing page for a new home decor collection with photography, pricing highlights, and subscriber capture.",
    date: "2026-03-12T16:20:00.000Z",
  },
];

export const mockBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Designing SaaS Dashboards That Teams Actually Enjoy Using",
    slug: "designing-saas-dashboards-teams-enjoy",
    content:
      "A strong admin interface should reduce decision fatigue, highlight what matters first, and make repetitive workflows feel crisp. This article breaks down practical patterns for better hierarchy, summaries, and action grouping in SaaS dashboards.",
    excerpt:
      "Practical patterns for admin interfaces with better hierarchy, summaries, and action grouping.",
    thumbnail: createGradientPlaceholder(
      "SaaS Dashboard Systems",
      "#0ea5e9",
      "#2563eb",
    ),
    publishedAt: "2026-03-10T09:00:00.000Z",
    status: "Published",
  },
  {
    id: "blog-2",
    title: "How Portfolio Websites Can Win Higher-Value Client Work",
    slug: "portfolio-websites-win-higher-value-clients",
    content:
      "Your portfolio is more than a gallery. It should tell a story, show process, prove outcomes, and create confidence before a discovery call ever happens. Here is a structure that helps premium clients self-qualify.",
    excerpt:
      "A portfolio structure that tells a stronger story and helps premium clients self-qualify.",
    thumbnail: createGradientPlaceholder(
      "Portfolio Growth Blueprint",
      "#f97316",
      "#ef4444",
    ),
    publishedAt: "2026-03-08T15:00:00.000Z",
    status: "Published",
  },
  {
    id: "blog-3",
    title: "What Makes a Modern Brand Site Feel Premium",
    slug: "what-makes-a-modern-brand-site-feel-premium",
    content:
      "Premium brand sites balance restraint with strong personality. Layout rhythm, image direction, and confident whitespace create that first impression faster than decorative effects ever can.",
    excerpt:
      "Layout rhythm, image direction, and confident whitespace are what make a site feel premium.",
    thumbnail: createGradientPlaceholder(
      "Premium Brand Presence",
      "#22c55e",
      "#14b8a6",
    ),
    publishedAt: "2026-03-05T12:30:00.000Z",
    status: "Draft",
  },
];

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Northstar Logistics Rebrand",
    image: createGradientPlaceholder("Northstar Logistics", "#3b82f6", "#8b5cf6"),
    category: "Corporate",
    description:
      "A sharp corporate redesign with service-focused landing pages, recruitment touchpoints, and a tighter visual identity system.",
    link: "https://www.behance.net/gallery/241097489/T-Shirt-Mockup-for-Clothing-Brand",
    featuredPosition: 1,
    createdAt: "2026-03-02T10:00:00.000Z",
  },
  {
    id: "portfolio-2",
    title: "Studio Bloom Portfolio",
    image: createGradientPlaceholder("Studio Bloom", "#ec4899", "#f97316"),
    category: "Portfolio",
    description:
      "Visual storytelling for a creative studio, pairing editorial typography with modular case-study layouts and softer color accents.",
    featuredPosition: 2,
    createdAt: "2026-02-26T13:20:00.000Z",
  },
  {
    id: "portfolio-3",
    title: "Copper & Clay Launch Page",
    image: createGradientPlaceholder("Copper & Clay", "#14b8a6", "#0f766e"),
    category: "Ecommerce",
    description:
      "A warm, conversion-focused launch page for a decor collection with newsletter capture, story-led sections, and campaign imagery.",
    featuredPosition: 3,
    createdAt: "2026-02-19T08:40:00.000Z",
  },
];

export const mockSubscribers: Subscriber[] = [
  {
    id: "subscriber-1",
    email: "mdalfaysal17@gmail.com",
    source: "Homepage CTA",
    subscribedAt: "2026-03-21T04:45:00.000Z",
    status: "Active",
  },
  {
    id: "subscriber-2",
    email: "mdalfaysal17@gmail.com",
    source: "Case Study Footer",
    subscribedAt: "2026-03-20T09:22:00.000Z",
    status: "Active",
  },
  {
    id: "subscriber-3",
    email: "mdalfaysal17@gmail.com",
    source: "Blog Sidebar",
    subscribedAt: "2026-03-18T17:05:00.000Z",
    status: "Active",
  },
  {
    id: "subscriber-4",
    email: "mdalfaysal17@gmail.com",
    source: "Newsletter Modal",
    subscribedAt: "2026-03-16T11:10:00.000Z",
    status: "Active",
  },
  {
    id: "subscriber-5",
    email: "mdalfaysal17@gmail.com",
    source: "Landing Page Form",
    subscribedAt: "2026-03-14T06:15:00.000Z",
    status: "Paused",
  },
  {
    id: "subscriber-6",
    email: "mdalfaysal17@gmail.com",
    source: "Blog CTA",
    subscribedAt: "2026-03-12T14:48:00.000Z",
    status: "Active",
  },
];
