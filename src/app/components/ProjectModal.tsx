import { useModal } from "../context/ModalContext";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAdminData } from "../context/AdminDataContext";

const FB = "Lufga, sans-serif";
const FH = "Lufga, sans-serif";

const services = [
  "Brand Identity & Strategy",
  "Monthly Social Media Design",
  "Event Branding & Visual System",
  "Apparel Presentation & Mockup System",
  "Other",
];

const budgets = [
  "$60 - $300",
  "$300 - $600",
  "$600 - $1,000",
  "$1,000 - $2,500",
  "$2,500+",
];

const contactMethods = ["WhatsApp", "Email"];

const dialCodeToCountryCode: Array<[string, string]> = [
  ["+880", "BD"],
  ["+91", "IN"],
  ["+92", "PK"],
  ["+94", "LK"],
  ["+971", "AE"],
  ["+966", "SA"],
  ["+974", "QA"],
  ["+965", "KW"],
  ["+968", "OM"],
  ["+973", "BH"],
  ["+44", "GB"],
  ["+49", "DE"],
  ["+33", "FR"],
  ["+39", "IT"],
  ["+34", "ES"],
  ["+31", "NL"],
  ["+1", "US"],
  ["+61", "AU"],
  ["+64", "NZ"],
  ["+65", "SG"],
  ["+60", "MY"],
];

function countryCodeToFlag(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function getFlagFromPhoneNumber(phoneNumber: string) {
  const normalized = phoneNumber.replace(/\s+/g, "");
  const match = dialCodeToCountryCode.find(([dialCode]) => normalized.startsWith(dialCode));

  if (!match) {
    return String.fromCodePoint(0x1F310);
  }

  return countryCodeToFlag(match[1]);
}

export function ProjectModal() {
  const { isOpen, closeModal } = useModal();
  const { addProjectRequest } = useAdminData();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [budget, setBudget] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const phoneFlag = getFlagFromPhoneNumber(whatsappNumber);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setWhatsappNumber("");
    setSelectedService("");
    setBudget("");
    setProjectDescription("");
    setContactMethod("WhatsApp");
    setServiceOpen(false);
    setBudgetOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await addProjectRequest({
        fullName,
        email,
        whatsappNumber,
        selectedService,
        budget,
        preferredContactMethod: contactMethod,
        projectDescription,
      });

      setSubmitted(true);
      resetForm();

      setTimeout(() => {
        setSubmitted(false);
        closeModal();
      }, 1800);
    } catch (error) {
      console.error("Project request submission failed.", error);
      setSubmitError("Could not submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeModal}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
              style={{ pointerEvents: "auto", background: "#0a0b1a" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: FB, color: "#E1FE5D" }}
                  >
                    Let's Work Together
                  </p>
                  <h2
                    className="text-white"
                    style={{ fontFamily: FH, fontSize: "1.8rem", fontWeight: 700 }}
                  >
                    Start a Project
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Row 1: Full Name and Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      Full Name <span className="text-[#E1FE5D]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9F74FF] focus:bg-white/10 transition-all"
                      style={{ fontFamily: FB, fontSize: "0.95rem" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      Email Address <span className="text-[#E1FE5D]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="mdalfaysal17@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9F74FF] focus:bg-white/10 transition-all"
                      style={{ fontFamily: FB, fontSize: "0.95rem" }}
                    />
                  </div>
                </div>

                {/* Row 2: WhatsApp Number and Select Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      WhatsApp Number <span className="text-[#E1FE5D]">*</span>
                    </label>
                    <div className="relative">
                      <span
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                        aria-hidden="true"
                      >
                        {phoneFlag}
                      </span>
                      <input
                        required
                        type="tel"
                        value={whatsappNumber}
                        onChange={(event) => setWhatsappNumber(event.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-4 pl-12 text-white placeholder-gray-500 transition-all focus:border-[#9F74FF] focus:bg-white/10 focus:outline-none"
                        style={{ fontFamily: FB, fontSize: "0.95rem" }}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      Select Service <span className="text-[#E1FE5D]">*</span>
                    </label>
                    <select
                      required
                      value={selectedService}
                      onChange={(event) => setSelectedService(event.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#9F74FF] focus:bg-white/10 transition-all appearance-none cursor-pointer"
                      style={{ fontFamily: FB, fontSize: "0.95rem" }}
                      onClick={() => setServiceOpen(!serviceOpen)}
                    >
                      <option value="" style={{ background: "#0a0b1a" }}>Choose a service</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: "#0a0b1a" }}>{s}</option>
                      ))}
                    </select>
                    {serviceOpen ? (
                      <ChevronUp 
                        className="absolute right-3 top-[43px] pointer-events-none text-gray-400" 
                        size={20} 
                      />
                    ) : (
                      <ChevronDown 
                        className="absolute right-3 top-[43px] pointer-events-none text-gray-400" 
                        size={20} 
                      />
                    )}
                  </div>
                </div>

                {/* Row 3: Budget Range and Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      Budget Range (USD)
                    </label>
                    <select
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#9F74FF] focus:bg-white/10 transition-all appearance-none cursor-pointer"
                      style={{ fontFamily: FB, fontSize: "0.95rem" }}
                      onClick={() => setBudgetOpen(!budgetOpen)}
                    >
                      <option value="" style={{ background: "#0a0b1a" }}>Select budget</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} style={{ background: "#0a0b1a" }}>{b}</option>
                      ))}
                    </select>
                    {budgetOpen ? (
                      <ChevronUp 
                        className="absolute right-3 top-[43px] pointer-events-none text-gray-400" 
                        size={20} 
                      />
                    ) : (
                      <ChevronDown 
                        className="absolute right-3 top-[43px] pointer-events-none text-gray-400" 
                        size={20} 
                      />
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm text-white mb-2"
                      style={{ fontFamily: FB, fontWeight: 500 }}
                    >
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4 pt-2">
                      {contactMethods.map((method) => (
                        <label
                          key={method}
                          className="flex items-center gap-2 cursor-pointer"
                          style={{ fontFamily: FB, fontSize: "0.95rem" }}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={contactMethod === method}
                            onChange={(e) => setContactMethod(e.target.value)}
                            className="w-4 h-4 accent-[#E1FE5D]"
                          />
                          <span className={contactMethod === method ? "text-[#E1FE5D]" : "text-gray-400"}>
                            {method}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 4: Project Description */}
                <div>
                  <label
                    className="block text-sm text-white mb-2"
                    style={{ fontFamily: FB, fontWeight: 500 }}
                  >
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    placeholder="Tell me about your project, goals, and any references..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#9F74FF] focus:bg-white/10 transition-all resize-none"
                    style={{ fontFamily: FB, fontSize: "0.95rem" }}
                  />
                </div>

                {submitError ? (
                  <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {submitError}
                  </p>
                ) : null}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitted || isSubmitting}
                  className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
                  style={{
                    background: submitted
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : "linear-gradient(135deg, #9F74FF, #7c54e0)",
                    fontFamily: FB,
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {submitted ? (
                    "\u2713 Request Sent! I'll be in touch soon."
                  ) : isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Project Details
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
