import {
  Calendar,
  Megaphone,
  Shield,
  Shirt,
  SlidersHorizontal,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import type {
  CertificationItem,
  FaqItem,
  ProcessStepItem,
  ReviewItem,
  ServiceItem,
  StatItem,
  ToolItem,
  WhyChooseItem,
} from "./types";

const TargetIcon = new URL("../../../imports/service-icons/target.svg", import.meta.url).href;
const CalendarServiceIcon = new URL("../../../imports/service-icons/calendar.svg", import.meta.url).href;
const ReceiptIcon = new URL("../../../imports/service-icons/receipt.svg", import.meta.url).href;
const MockupIcon = new URL("../../../imports/service-icons/mockup.svg", import.meta.url).href;

const BlenderTool = new URL("../../../imports/tools/Blender.png", import.meta.url).href;
const Clo3dTool = new URL("../../../imports/tools/clo3d.png", import.meta.url).href;
const FigmaTool = new URL("../../../imports/tools/figma.svg", import.meta.url).href;
const IllustratorTool = new URL("../../../imports/tools/illustrator.svg", import.meta.url).href;
const IndesignTool = new URL("../../../imports/tools/indesign.svg", import.meta.url).href;
const PhotoshopTool = new URL("../../../imports/tools/photoshop.svg", import.meta.url).href;
const LightroomTool = new URL("../../../imports/tools/photoshop-lightroom.svg", import.meta.url).href;
const XdTool = new URL("../../../imports/tools/xd.svg", import.meta.url).href;

export const homeStats: StatItem[] = [
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 150, suffix: "+", label: "Clients Worldwide" },
  { value: 97, suffix: "%", label: "High Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years of Design Experience" },
];

export const processSteps: ProcessStepItem[] = [
  {
    num: "01",
    title: "Discover",
    desc: "I understand your business, audience, and what makes you different.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "I define a clear direction for your brand’s look, feel, and message.",
  },
  {
    num: "03",
    title: "Design",
    desc: "I create a strong visual identity based on the strategy.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "You get ready-to-use assets and guidelines to stay consistent everywhere.",
  },
];

export const tools: ToolItem[] = [
  {
    name: "Photoshop",
    type: "Image Editing",
    logo: PhotoshopTool,
    glow: "linear-gradient(135deg, #2b6fff, #78a6ff)",
  },
  {
    name: "Illustrator",
    type: "Design",
    logo: IllustratorTool,
    glow: "linear-gradient(135deg, #ff9a2b, #ffd166)",
  },
  {
    name: "Figma",
    type: "UI/UX Design",
    logo: FigmaTool,
    glow: "linear-gradient(135deg, #9f74ff, #ff6bb3)",
  },
  {
    name: "Blender",
    type: "3D Design",
    logo: BlenderTool,
    glow: "linear-gradient(135deg, #ff7b2c, #5da4ff)",
  },
  {
    name: "InDesign",
    type: "Layout & Print",
    logo: IndesignTool,
    glow: "linear-gradient(135deg, #6f52ff, #b893ff)",
  },
  {
    name: "Lightroom",
    type: "Color Grading",
    logo: LightroomTool,
    glow: "linear-gradient(135deg, #39a0ff, #8dd4ff)",
  },
  {
    name: "Adobe XD",
    type: "Prototyping",
    logo: XdTool,
    glow: "linear-gradient(135deg, #ff4fd8, #8e5cff)",
  },
  {
    name: "CLO 3D",
    type: "3D Fashion Design",
    logo: Clo3dTool,
    glow: "linear-gradient(135deg, #6b8cff, #90d6ff)",
  },
];

export const homeServices: ServiceItem[] = [
  {
    icon: TargetIcon,
    title: "Brand Identity & Strategy",
    desc: "Build a clear, consistent brand that stands out and earns trust.",
    tag: null,
  },
  {
    icon: CalendarServiceIcon,
    title: "Monthly Social Media Design",
    desc: "Get consistent, high-quality visuals every month to keep your brand active and engaging.",
    tag: null,
  },
  {
    icon: ReceiptIcon,
    title: "Event Branding & Visual System",
    desc: "Create a complete visual experience for your event, from promotion to execution.",
    tag: null,
  },
  {
    icon: MockupIcon,
    title: "Apparel Presentation & Mockup System",
    desc: "Showcase your clothing brand with realistic, high-quality visuals that attract customers.",
    tag: null,
  },
];

export const whyChoose: WhyChooseItem[] = [
  {
    icon: SlidersHorizontal,
    title: "I Keep Things Simple",
    desc: "Clear, focused designs that communicate your message without confusion.",
  },
  {
    icon: UserCheck,
    title: "Easy to Work With",
    desc: "Smooth process, clear communication, and zero unnecessary hassle.",
  },
  {
    icon: Target,
    title: "I Design for Impact",
    desc: "Every design is made to grab attention and build trust.",
  },
  {
    icon: TrendingUp,
    title: "I Care About Your Growth",
    desc: "Designs that don’t just look good, but help your brand move forward.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in Brand Identity & Strategy, Monthly Social Media Design, Event Branding, and Apparel Presentation & Mockup Systems. In addition to these, I support closely related design needs such as marketing materials, digital assets, and brand visuals when they align with the overall project and brand direction. If you have a specific requirement, feel free to reach out.",
  },
  {
    question: "How does the project process work?",
    answer:
      "We start with a clear discussion about your goals, then move into concept development, revisions, and final delivery. The process is simple, structured, and focused on results.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on the project scope. Smaller projects may take a few days, while full brand systems can take a few weeks. You'll always get a clear timeline before we start.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Each project includes a limited number of revisions to keep the process focused and efficient. Additional revisions can be requested if needed.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are made via Payoneer or direct bank transfer (Remitly, TapTap Send, Western Union, Wire). Projects may require full or partial upfront payment before starting.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds are handled fairly. Full refunds are available before work starts. After that, refunds depend on the amount of work completed. Once a project is fully delivered, refunds are not applicable.",
  },
  {
    question: "Who owns the final design?",
    answer:
      "You get full ownership of the final design after full payment. I retain the right to showcase the work in my portfolio unless confidentiality is requested before the project begins.",
  },
  {
    question: "Can you guarantee business results?",
    answer:
      "No. Design plays a key role in branding, but business results depend on multiple factors such as marketing, product, and strategy.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Clear goals, brand information, content (if available), and timely feedback. Good collaboration leads to better results.",
  },
  {
    question: "Do you work with all types of businesses?",
    answer:
      "I work with startups and businesses that value quality design. I do not take on projects that go against my ethical or professional standards.",
  },
];

export const reviews: ReviewItem[] = [
  {
    name: "Ariana Blake",
    role: "Founder, Nura Studio",
    short: "Amazing Work!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "Abdullah understood the brand direction fast and turned vague ideas into visuals that felt polished from day one.",
  },
  {
    name: "Marcus Chen",
    role: "Marketing Lead, Volt Agency",
    short: "Great Experience!",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "The communication was clear, the delivery was fast, and every revision came back better than expected.",
  },
  {
    name: "Sophie Laurent",
    role: "Creative Director, Maison Belle",
    short: "Beautiful Results!",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "What stood out most was the attention to spacing, typography, and small details that made the brand feel premium.",
  },
  {
    name: "Daniel Brooks",
    role: "CEO, Northline Digital",
    short: "Highly Recommended!",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "The final assets were organized, thoughtful, and ready to use immediately across web and social channels.",
  },
  {
    name: "Nadia Rahman",
    role: "Personal Brand Coach",
    short: "So Impressive!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "He made my personal brand feel more confident and consistent without losing the human side of it.",
  },
  {
    name: "Leo Martins",
    role: "Product Owner, Syntro",
    short: "Top Quality!",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "Every concept looked intentional. Nothing felt generic, and that made the whole collaboration feel high-end.",
  },
  {
    name: "Emily Carter",
    role: "Brand Strategist, Fable House",
    short: "Smart Design!",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "The designs were beautiful, but the real value was how well they matched the strategy behind the brand.",
  },
  {
    name: "Owen Hayes",
    role: "Co-Founder, Beacon Works",
    short: "Smooth Process!",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "Smooth process, thoughtful ideas, and a level of consistency that made our launch feel a lot stronger.",
  },
  {
    name: "Camila Torres",
    role: "E-commerce Manager, Veya",
    short: "Excellent Service!",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "The mockups and supporting visuals helped our products look more credible and much easier to market.",
  },
  {
    name: "Ryan Foster",
    role: "Founder, Foster Fit",
    short: "Loved It!",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
    review:
      "Quick turnaround, easy collaboration, and final work that genuinely looked better than what I had imagined.",
  },
];

export const homeCertifications: CertificationItem[] = [
  {
    title: "Certificate of Appreciation - Nebs-IT",
    description:
      "Recognized for my performance and contribution, reflecting my ability to deliver quality design work consistently.",
    image:
      "https://res.cloudinary.com/dun3eercd/image/upload/v1774172869/Certificate_of_Appreciation_-_Nebs-IT_bilpab.jpg",
  },
  {
    title: "Certified Graphic Designer - National Skills Development Authority (NSDA)",
    description:
      "Government-recognized certification validating my practical skills in graphic design, client communication, and real-world project execution.",
    image:
      "https://res.cloudinary.com/dun3eercd/image/upload/v1774172848/Certified_Graphic_Designer_-_National_Skills_Development_Authority_NSDA_fxyftv.jpg",
  },
  {
    title: "Diploma in Graphic Design & UI/UX - Creative IT Institute",
    description:
      "Completed a professional diploma focused on design fundamentals, tools, and practical project work for real-world applications.",
    image:
      "https://res.cloudinary.com/dun3eercd/image/upload/v1774172856/Diploma_in_Graphic_Design_UIUX_-_Creative_IT_Institute_puful3.jpg",
  },
];
