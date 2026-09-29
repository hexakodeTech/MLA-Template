"use client";

import React, { useState } from "react";
import { AlertCircle, ShieldCheck, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

export const ContactForm: React.FC = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: "prototype-success" | "error";
    message: string;
    details?: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        language === "ml"
          ? "ദയവായി നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക"
          : "Please enter your full name.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        language === "ml"
          ? "പേരിന് കുറഞ്ഞത് 3 അക്ഷരങ്ങൾ വേണം"
          : "Name must be at least 3 characters.";
    }

    const phoneRegex = /^[0-9+ -]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone =
        language === "ml"
          ? "ദയവായി ഫോൺ നമ്പർ നൽകുക"
          : "Please enter your phone number.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        language === "ml"
          ? "സാധുവായ ഫോൺ നമ്പർ നൽകുക"
          : "Please enter a valid phone number (8-15 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email =
        language === "ml"
          ? "ദയവായി ഇമെയിൽ വിലാസം നൽകുക"
          : "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email =
        language === "ml"
          ? "സാധുവായ ഇമെയിൽ വിലാസം നൽകുക"
          : "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject =
        language === "ml"
          ? "ദയവായി വിഷയവിവരം നൽകുക"
          : "Please enter an enquiry subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        language === "ml"
          ? "ദയവായി സന്ദേശം രേഖപ്പെടുത്തുക"
          : "Please provide details in the message field.";
    } else if (formData.message.trim().length < 15) {
      newErrors.message =
        language === "ml"
          ? "സന്ദേശത്തിന് കുറഞ്ഞത് 15 അക്ഷരങ്ങൾ വേണം"
          : "Message must contain at least 15 characters.";
    }

    if (!formData.consent) {
      newErrors.consent =
        language === "ml"
          ? "തുടരുന്നതിന് സ്വകാര്യതാ സമ്മതം രേഖപ്പെടുത്തുക"
          : "You must acknowledge the privacy notice to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (formData.honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      setSubmissionFeedback({
        type: "prototype-success",
        message:
          language === "ml"
            ? "ഫോം പരിശോധന വിജയകരം (പ്രോട്ടോടൈപ്പ് മോഡ്)"
            : "Form Validation Successful (Demonstration Prototype)",
        details:
          language === "ml"
            ? "ബാക്ക്-എൻഡ് മെയിൽ സെർവർ ബന്ധിപ്പിച്ചിട്ടില്ലാത്തതിനാൽ യഥാർത്ഥ സന്ദേശം അയച്ചിട്ടില്ല. ക്ലയന്റ് അനുമതിക്ക് ശേഷം ഔദ്യോഗിക ഇമെയിൽ സർവീസ് സജ്ജീകരിക്കുന്നതാണ്."
            : "This is a demonstration prototype for client evaluation. The front-end validation and accessible state handling are fully functional. No outbound email was dispatched because an authorized SMTP/backend server is not yet connected.",
      });

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
        honeypot: "",
      });
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 sm:p-10 shadow-xs font-sans">
      <div className="mb-8 pb-5 border-b border-warm-grey dark:border-[#41413B] flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
            {language === "ml" ? "പൗരസമ്പർക്കം" : "Citizen Liaison"}
          </span>
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            {language === "ml"
              ? "ഔദ്യോഗിക അന്വേഷണ ഫോം"
              : "Official Enquiry Form"}
          </h3>
          <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1">
            {language === "ml"
              ? "നിവേദനങ്ങളും പരാതികളും ഓഫീസിലേക്ക് നേരിട്ട് സമർപ്പിക്കാം"
              : "Direct communication channel for public queries, petitions, and constituency matters"}
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-3 py-1 rounded-xs font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
          Prototype Form
        </span>
      </div>

      {submissionFeedback && (
        <div
          role="alert"
          className="mb-8 p-5 rounded-xs bg-stone/50 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-charcoal dark:text-[#F4F1E9]">{submissionFeedback.message}</h4>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                {submissionFeedback.details}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website-hp">Leave this field empty</label>
          <input
            id="website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) =>
              setFormData({ ...formData, honeypot: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
            >
              {language === "ml" ? "പൂർണ്ണ പേര്" : "Full Name"}{" "}
              <span className="text-copper dark:text-[#D29A78]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              placeholder={language === "ml" ? "നിങ്ങളുടെ പേര്" : "e.g., K. Radhakrishnan"}
              className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
            >
              {language === "ml" ? "ഫോൺ നമ്പർ" : "Phone Number"}{" "}
              <span className="text-copper dark:text-[#D29A78]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder={language === "ml" ? "+91 98XXXXXXXX" : "+91 98765 43210"}
              className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
            >
              {language === "ml" ? "ഇമെയിൽ വിലാസം" : "Email Address"}{" "}
              <span className="text-copper dark:text-[#D29A78]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="citizen@example.com"
              className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
            >
              {language === "ml" ? "വിഷയം" : "Subject"}{" "}
              <span className="text-copper dark:text-[#D29A78]">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                if (errors.subject) setErrors({ ...errors, subject: undefined });
              }}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              placeholder={
                language === "ml"
                  ? "ഉദാ: റോഡ് അറ്റകുറ്റപ്പണി സംബന്ധിച്ച്"
                  : "e.g., Drinking water supply maintenance enquiry"
              }
              className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
          >
            {language === "ml" ? "സന്ദേശം / പരാതി വിവരങ്ങൾ" : "Enquiry & Petition Details"}{" "}
            <span className="text-copper dark:text-[#D29A78]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder={
              language === "ml"
                ? "ദയവായി നിങ്ങളുടെ പരാതിയുടെയോ അന്വേഷണത്തിന്റെയോ വിശദാംശങ്ങൾ രേഖപ്പെടുത്തുക..."
                : "Please describe your query, location, or petition specifics in detail..."
            }
            className="w-full text-sm p-4 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors resize-y"
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={(e) => {
                setFormData({ ...formData, consent: e.target.checked });
                if (errors.consent) setErrors({ ...errors, consent: undefined });
              }}
              className="mt-1 w-4 h-4 rounded-xs text-charcoal border-warm-grey dark:border-[#41413B] focus:ring-charcoal dark:focus:ring-[#D29A78]"
            />
            <span className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
              {language === "ml" ? (
                <span>
                  ഞാൻ സമർപ്പിച്ച വിവരങ്ങൾ കൃത്യമാണ്. ഈ വിവരങ്ങൾ അന്വേഷണ പരിഹാരത്തിനായി ഓഫീസിന് ഉപയോഗിക്കാമെന്ന സ്വകാര്യതാ നയം ഞാൻ അംഗീകരിക്കുന്നു.
                </span>
              ) : (
                <span>
                  I confirm that the submitted information is accurate and consent to its use by the representative office for communication and redressal purposes in accordance with the{" "}
                  <a href="/privacy-policy" className="text-charcoal dark:text-[#F4F1E9] font-semibold underline underline-offset-2 hover:text-copper dark:hover:text-[#D29A78]">
                    Privacy Policy
                  </a>
                  .
                </span>
              )}
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={<ArrowRight className="w-4 h-4 text-white dark:text-[#191A18]" />}
            iconPosition="right"
          >
            {language === "ml" ? "സന്ദേശം അയക്കുക →" : "SUBMIT ENQUIRY →"}
          </Button>

          <p className="text-[11px] text-slate dark:text-[#A09F97] font-mono">
            * Direct Helplines: Emergency 112 · Fire 101 · Water 1916
          </p>
        </div>
      </form>
    </div>
  );
};
