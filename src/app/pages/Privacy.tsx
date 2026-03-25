import { motion } from "motion/react";

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const sections = [
  {
    id: "information-collected",
    number: "01",
    title: "Information Collected",
    intro: "This website may collect the following information:",
    bullets: [
      "Personal information, such as name and email, when you submit a contact form or subscribe to a newsletter.",
      "Information you voluntarily provide through messages or inquiries.",
      "Technical data such as browser type, device, IP address, and pages visited.",
    ],
  },
  {
    id: "how-information-is-used",
    number: "02",
    title: "How Your Information Is Used",
    intro: "The collected information is used to:",
    bullets: [
      "Respond to inquiries and communication requests.",
      "Send newsletters or updates only if you subscribe.",
      "Improve website performance and user experience.",
      "Analyze website traffic and visitor behavior.",
    ],
    note: "Your personal information is never sold or shared with third parties for marketing purposes.",
  },
  {
    id: "cookies-tracking",
    number: "03",
    title: "Cookies & Tracking Technologies",
    paragraphs: [
      "This website uses cookies and similar technologies to enhance user experience and analyze traffic.",
      "Specifically, Google Analytics is used to understand how visitors interact with the website. This may include data such as pages visited, time spent, and general location (non-identifiable).",
      "You can control or disable cookies through your browser settings.",
    ],
  },
  {
    id: "third-party-services",
    number: "04",
    title: "Third-Party Services",
    intro: "This website uses third-party services such as:",
    bullets: ["Google Analytics for traffic analysis."],
    note: "These services may collect and process data according to their own privacy policies.",
  },
  {
    id: "data-protection",
    number: "05",
    title: "Data Protection",
    paragraphs: [
      "Appropriate measures are taken to protect your personal data. However, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    id: "your-rights",
    number: "06",
    title: "Your Rights",
    intro: "You have the right to:",
    bullets: [
      "Request access to your personal data.",
      "Request correction or deletion of your data.",
      "Withdraw consent for email communication at any time.",
    ],
    note: "To make a request, contact mdalfaysal17@gmail.com.",
  },
  {
    id: "changes-to-policy",
    number: "07",
    title: "Changes to This Policy",
    paragraphs: [
      "This Privacy Policy may be updated at any time. Changes will be posted on this page with an updated date.",
    ],
  },
  {
    id: "contact",
    number: "08",
    title: "Contact",
    paragraphs: [
      "If you have any questions about this Privacy Policy, you can contact:",
    ],
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
  children: React.ReactNode;
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

export default function Privacy() {
  return (
    <div
      className="min-h-screen bg-[#080916] text-white"
      style={{ fontFamily: FONT_STACK }}
    >
      <div className="sticky top-16 z-20 border-b border-white/8 bg-[#080916]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-medium tracking-[0.08em] text-white/65 uppercase">
            Privacy Policy
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
              Privacy
            </p>
            <h1
              className="mx-auto max-w-2xl text-[clamp(2.3rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white"
            >
              Privacy Policy
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Your privacy matters. This page explains how your data is handled.
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
                This Privacy Policy explains how information is collected, used, and protected when
                you visit <strong>abdullahalfaysal.co</strong>.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#131626] px-4 py-4">
                  <h3 className="mb-1 text-sm font-semibold text-white">No data selling</h3>
                  <p className="text-sm leading-6 text-white/62">
                    Personal information is never sold or shared for marketing purposes.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#131626] px-4 py-4">
                  <h3 className="mb-1 text-sm font-semibold text-white">Traffic insights</h3>
                  <p className="text-sm leading-6 text-white/62">
                    Google Analytics is used to understand website performance and visitor behavior.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#131626] px-4 py-4">
                  <h3 className="mb-1 text-sm font-semibold text-white">Questions?</h3>
                  <p className="text-sm leading-6 text-white/62">
                    Reach out anytime at{" "}
                    <a
                      href="mailto:mdalfaysal17@gmail.com"
                      className="font-medium text-[#b995ff] transition-colors duration-300 hover:text-[#e1fe5d]"
                    >
                      mdalfaysal17@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
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

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mb-4 text-[0.98rem] leading-8 text-white/70 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-[#e1fe5d]" />
                          <span className="text-[0.98rem] leading-8 text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.note && (
                    <div className="mt-6 rounded-2xl border border-[#b995ff]/18 bg-[#111322] px-5 py-4">
                      <p className="text-[0.96rem] leading-7 text-white/72">
                        <strong className="font-semibold text-white">Important:</strong>{" "}
                        {section.note.startsWith("To make a request")
                          ? section.note.replace("mdalfaysal17@gmail.com", "")
                          : section.note}
                        {section.note.startsWith("To make a request") && (
                          <>
                            <a
                              href="mailto:mdalfaysal17@gmail.com"
                              className="font-semibold text-[#b995ff] transition-colors duration-300 hover:text-[#e1fe5d]"
                            >
                              mdalfaysal17@gmail.com
                            </a>
                            .
                          </>
                        )}
                        {!section.note.startsWith("To make a request") && !section.note.endsWith(".") ? "." : ""}
                      </p>
                    </div>
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
