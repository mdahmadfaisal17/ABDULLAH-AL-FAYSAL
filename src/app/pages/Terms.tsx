import { motion } from "motion/react";
import type { ReactNode } from "react";

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

type TermsSection = {
  id: string;
  number: string;
  title: string;
  intro?: ReactNode;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
  subsections?: Array<{
    title: string;
    bullets: ReactNode[];
  }>;
  closing?: ReactNode;
  contact?: {
    name: string;
    website: string;
    email: string;
  };
};

const sections: TermsSection[] = [
  {
    id: "services",
    number: "01",
    title: "Services",
    intro: "The website provides professional design services, including:",
    bullets: [
      "Brand Identity & Strategy",
      "Monthly Social Media Design",
      "Event Branding & Visual System",
      "Apparel Presentation & Mockup System",
    ],
    paragraphs: ["All services are delivered based on project scope and agreement with the client."],
  },
  {
    id: "project-process",
    number: "02",
    title: "Project Process",
    bullets: [
      "All projects begin after discussion and agreement on scope.",
      "Timelines may vary depending on project complexity.",
      "Clear communication is required from both sides for smooth delivery.",
    ],
  },
  {
    id: "payments",
    number: "03",
    title: "Payments",
    bullets: [
      "Payments are accepted via Payoneer, bank transfer, or services such as Remitly, TapTap Send, Western Union, and wire transfer.",
      <>
        Projects may require <strong>full payment</strong> or partial upfront payment.
      </>,
      "Work will not be finalized or delivered until payment is completed.",
    ],
  },
  {
    id: "revisions",
    number: "04",
    title: "Revisions",
    bullets: [
      "A limited number of revisions may be included depending on the project.",
      "Additional revisions may require extra charges.",
    ],
  },
  {
    id: "refund-policy",
    number: "05",
    title: "Refund Policy",
    paragraphs: [
      <>
        "The buyer and the seller have the option to cancel the transaction as long as they have not
        separated. And if they speak the truth and make everything clear, they will be blessed in
        their transaction."
        <br />
        <span className="text-sm text-white/55">
          -Prophet Muhammad Sa., Sahih al-Bukhari &amp; Sahih Muslim
        </span>
      </>,
      "This reflects a commitment to fairness, transparency, and honest business practices.",
    ],
    subsections: [
      {
        title: "Principles",
        bullets: [
          "No payment is taken without work being delivered.",
          "All services are provided with honesty and clarity.",
          "Refunds are handled fairly based on the amount of work completed.",
          "Business outcomes depend on multiple factors and are not guaranteed by design alone.",
        ],
      },
      {
        title: "Refund Terms",
        bullets: [
          <>
            Payments are generally <strong>non-refundable</strong> due to the nature of digital
            design services.
          </>,
          <>
            If the project is canceled before any work has started, a <strong>full refund</strong>{" "}
            will be provided.
          </>,
          <>
            If work has already started, a <strong>partial refund</strong> may be provided based on
            the amount of work completed.
          </>,
          <>
            Once the project is fully completed or delivered, <strong>no refund</strong> will be
            applicable.
          </>,
          <>
            If the client fails to communicate, delays feedback, or does not provide required
            materials, the project will <strong>not be eligible for a refund</strong>.
          </>,
          <>
            If the designer is unable to deliver the agreed work due to their own limitation or
            fault, a <strong>fair refund will be provided</strong>.
          </>,
        ],
      },
    ],
    closing: "All refund decisions are handled with fairness, transparency, and mutual respect.",
  },
  {
    id: "intellectual-property",
    number: "06",
    title: "Intellectual Property",
    paragraphs: [
      <>
        <strong>Ownership</strong> of the final design is transferred to the client only after{" "}
        <strong>full payment</strong> is completed.
      </>,
      "ABDULLAH AL FAYSAL reserves the right to showcase completed work in portfolio, case studies, and promotional materials.",
      "If the client requests confidentiality before the project begins, the work will not be displayed publicly.",
    ],
  },
  {
    id: "client-responsibilities",
    number: "07",
    title: "Client Responsibilities",
    bullets: [
      "Provide accurate content, feedback, and necessary materials on time.",
      "Delays in communication may affect delivery timelines.",
    ],
  },
  {
    id: "limitation-of-liability",
    number: "08",
    title: "Limitation of Liability",
    paragraphs: [
      "All services are provided with professional care and best effort.",
      "However, ABDULLAH AL FAYSAL is not responsible for any business results, performance, or losses that may occur after the use of the design.",
      "The client acknowledges that design outcomes do not guarantee specific business results.",
    ],
  },
  {
    id: "website-use",
    number: "09",
    title: "Website Use",
    bullets: [
      "Content on this website is for informational and portfolio purposes.",
      "Unauthorized use, copying, or redistribution of content is not allowed.",
    ],
  },
  {
    id: "changes-to-terms",
    number: "10",
    title: "Changes to Terms",
    paragraphs: ["These Terms & Conditions may be updated at any time. Changes will be reflected on this page."],
  },
  {
    id: "contact",
    number: "11",
    title: "Contact",
    paragraphs: ["For any questions regarding these terms:"],
    contact: {
      name: "ABDULLAH AL FAYSAL",
      website: "https://abdullahalfaysal.co",
      email: "mdalfaysal17@gmail.com",
    },
  },
];

function FadeInSection({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#080916] text-white" style={{ fontFamily: FONT_STACK }}>
      <div className="sticky top-16 z-20 border-b border-white/8 bg-[#080916]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-white/65">
            Terms & Conditions
          </p>
          <a
            href="#top"
            className="text-sm text-[#b995ff] transition-colors duration-300 hover:text-[#e1fe5d]"
          >
            Back to top
          </a>
        </div>
      </div>

      <section id="top" className="px-5 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#b995ff]">
              Terms
            </p>
            <h1 className="mx-auto max-w-2xl text-[clamp(2.3rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
              Terms & Conditions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              These terms outline how services are provided and how we work together.
            </p>
          </motion.div>

          <FadeInSection>
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                    Last updated
                  </p>
                  <p className="inline-flex rounded-full bg-[#e1fe5d] px-4 py-2 text-sm font-semibold text-[#111827]">
                    March 25, 2026
                  </p>
                </div>
                <a
                  href="mailto:mdalfaysal17@gmail.com"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#b995ff] transition-all duration-300 hover:border-[#b995ff]/40 hover:bg-white/8 hover:text-[#e1fe5d]"
                >
                  mdalfaysal17@gmail.com
                </a>
              </div>

              <p className="text-base leading-8 text-white/72">
                Welcome to <strong>abdullahalfaysal.co</strong>. By accessing this website or
                working with the services, you agree to the following terms.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.05}>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-8">
              <h2 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-white">
                Table of Contents
              </h2>
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/72 transition-all duration-300 hover:border-[#b995ff]/45 hover:bg-white/[0.06] hover:text-[#e1fe5d]"
                  >
                    {section.number}. {section.title}
                  </a>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-2 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-8">
            {sections.map((section, index) => (
              <FadeInSection key={section.id} delay={index * 0.03}>
                <section
                  id={section.id}
                  className="scroll-mt-32 border-b border-white/8 py-10 last:border-b-0 sm:py-12"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-sm font-semibold text-[#b995ff]">
                      {section.number}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                        Section
                      </p>
                      <h2 className="text-[1.6rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.9rem]">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {section.intro && (
                    <h3 className="mb-4 text-lg font-semibold text-white">{section.intro}</h3>
                  )}

                  {section.paragraphs?.map((paragraph, idx) => (
                    <p
                      key={`${section.id}-paragraph-${idx}`}
                      className="mb-4 text-[0.98rem] leading-8 text-white/70 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-3">
                      {section.bullets.map((item, idx) => (
                        <li key={`${section.id}-bullet-${idx}`} className="flex items-start gap-3">
                          <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-[#e1fe5d]" />
                          <span className="text-[0.98rem] leading-8 text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="space-y-8">
                      {section.subsections.map((subsection) => (
                        <div key={`${section.id}-${subsection.title}`}>
                          <h3 className="mb-4 text-lg font-semibold text-white">{subsection.title}</h3>
                          <ul className="space-y-3">
                            {subsection.bullets.map((item, idx) => (
                              <li
                                key={`${section.id}-${subsection.title}-bullet-${idx}`}
                                className="flex items-start gap-3"
                              >
                                <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-[#e1fe5d]" />
                                <span className="text-[0.98rem] leading-8 text-white/70">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.closing && (
                    <p className="mt-6 text-[0.98rem] leading-8 text-white/70">{section.closing}</p>
                  )}

                  {section.contact && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#111322] px-5 py-5">
                      <p className="text-base font-semibold text-white">{section.contact.name}</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/42">
                        Website
                      </p>
                      <a
                        href={section.contact.website}
                        className="mt-1 inline-block text-[0.98rem] text-[#b995ff] transition-colors duration-300 hover:text-[#e1fe5d]"
                      >
                        {section.contact.website}
                      </a>
                      <p className="mt-5 text-sm uppercase tracking-[0.16em] text-white/42">
                        Email
                      </p>
                      <a
                        href={`mailto:${section.contact.email}`}
                        className="mt-1 inline-block text-[0.98rem] font-medium text-[#b995ff] transition-colors duration-300 hover:text-[#e1fe5d]"
                      >
                        {section.contact.email}
                      </a>
                    </div>
                  )}
                </section>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
