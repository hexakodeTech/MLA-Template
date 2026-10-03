"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Info, ArrowRight } from "lucide-react";
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
    type: "success" | "error";
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
          ? "തുടരുന്നതിന് വിവര കൈകാര്യ സമ്മതം രേഖപ്പെടുത്തുക"
          : "Please acknowledge the information handling notice to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (formData.honeypot) return;

    if (!validate()) {
      setSubmissionFeedback({
        type: "error",
        message:
          language === "ml" ? "സമർപ്പിക്കാൻ സാധിച്ചില്ല" : "Unable to Submit",
        details:
          language === "ml"
            ? "ഈ സമയത്ത് നിങ്ങളുടെ അന്വേഷണം സമർപ്പിക്കാൻ സാധിച്ചില്ല. വിവരങ്ങൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക."
            : "We couldn't submit your enquiry at this time. Please check your details and try again.",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      setSubmissionFeedback({
        type: "success",
        message:
          language === "ml" ? "അന്വേഷണം സമർപ്പിച്ചു" : "Enquiry Submitted",
        details:
          language === "ml"
            ? "നിങ്ങളുടെ അന്വേഷണം വിജയകരമായി സമർപ്പിച്ചു. നൽകിയ വിവരങ്ങൾ ഓഫീസ് പരിശോധിച്ചേക്കാം; കൂടുതൽ വിവരങ്ങളോ തുടർനടപടികളോ ആവശ്യമാണെങ്കിൽ ഓഫീസ് നിങ്ങളുമായി ബന്ധപ്പെട്ടേക്കാം."
            : "Your enquiry has been submitted successfully. The office may review the information provided and contact you if further information or follow-up is required.",
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
      {/* Header */}
      <div className="mb-6 pb-5 border-b border-warm-grey dark:border-[#41413B] flex items-start justify-between gap-4">
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
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-3 py-1 rounded-xs font-mono font-medium">
          <Info className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
          {language === "ml" ? "ഔദ്യോഗിക ഡെസ്ക്" : "Official Desk"}
        </span>
      </div>

      {/* How Your Information Is Handled Panel */}
      <section
        aria-labelledby="info-handling-title"
        className="rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/60 dark:bg-[#222320]/80 p-5 mb-8"
      >
        <div className="flex items-start gap-2.5 mb-2.5">
          <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
          <h4
            id="info-handling-title"
            className="font-bold text-xs uppercase tracking-wider text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml"
              ? "വിവരങ്ങൾ കൈകാര്യം ചെയ്യുന്ന രീതി"
              : "HOW YOUR INFORMATION IS HANDLED"}
          </h4>
        </div>

        <div className="space-y-2 text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
          <p>
            {language === "ml"
              ? "നിങ്ങളുടെ അന്വേഷണം മനസ്സിലാക്കുന്നതിനും അതിന് മറുപടി നൽകാൻ ജനപ്രതിനിധിയുടെ ഓഫീസിനെ സഹായിക്കുന്നതിനുമായാണ് ഈ ഫോം വഴി സമർപ്പിക്കുന്ന വിവരങ്ങൾ സ്വീകരിക്കുന്നത്. നിങ്ങളുടെ അഭ്യർത്ഥന പരിശോധിക്കുന്നതിനോ തുടർനടപടികൾ സ്വീകരിക്കുന്നതിനോ ആവശ്യമെങ്കിൽ വിവരങ്ങൾ ചുമതലപ്പെടുത്തിയ ഓഫീസ് ഉദ്യോഗസ്ഥർ പരിശോധിച്ചേക്കാം."
              : "Information submitted through this form is collected to understand your enquiry and help the representative’s office respond to it. Your submission may be reviewed by authorized office personnel when necessary to process or follow up on your request."}
          </p>
          <p>
            {language === "ml"
              ? "നിങ്ങളുടെ അന്വേഷണത്തിന് ആവശ്യമായ വിവരങ്ങൾ മാത്രം നൽകുക. പാസ്‌വേഡുകൾ, ബാങ്ക് അല്ലെങ്കിൽ സാമ്പത്തിക വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖകൾ, ഓതന്റിക്കേഷൻ കോഡുകൾ അല്ലെങ്കിൽ അതീവ രഹസ്യസ്വഭാവമുള്ള മറ്റ് വിവരങ്ങൾ ഈ ഫോം വഴി സമർപ്പിക്കരുത്."
              : "Please provide only the information necessary for your enquiry. Do not submit passwords, bank or financial details, identity documents, authentication codes, or other highly sensitive information through this form."}
          </p>
        </div>

        {/* 3-Step Process Flow */}
        <div className="mt-4 pt-4 border-t border-warm-grey/70 dark:border-[#41413B]/70">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                  {language === "ml" ? "1 — സമർപ്പിക്കുക" : "1 — SUBMIT"}
                </span>
                <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "നിങ്ങളുടെ അഭ്യർത്ഥന മനസ്സിലാക്കാൻ ആവശ്യമായ വിവരങ്ങൾ ഉൾപ്പെടുത്തി അന്വേഷണം അയക്കുക."
                    : "Send your enquiry with the information needed to understand your request."}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                  {language === "ml" ? "2 — പരിശോധന" : "2 — REVIEW"}
                </span>
                <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "അന്വേഷണം ജനപ്രതിനിധിയുടെ ഓഫീസോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥരോ പരിശോധിച്ചേക്കാം."
                    : "The enquiry may be reviewed by the representative’s office or authorized personnel."}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                  {language === "ml" ? "3 — മറുപടി / തുടർനടപടി" : "3 — RESPONSE / FOLLOW-UP"}
                </span>
                <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "മറുപടിയോ കൂടുതൽ വിവരങ്ങളോ ആവശ്യമുള്ളപ്പോൾ നിങ്ങൾ നൽകിയ വിവരങ്ങൾ ഉപയോഗിച്ച് ഓഫീസ് ബന്ധപ്പെട്ടേക്കാം."
                    : "The office may contact you using the details you provide when a response or additional information is required."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Important Notice (Emergency Service) */}
        <div className="mt-4 pt-3 border-t border-warm-grey/50 dark:border-[#41413B]/50 flex items-start gap-2 text-[11px] text-slate/85 dark:text-[#A09F97]">
          <span className="font-semibold text-charcoal dark:text-[#F4F1E9] shrink-0">
            {language === "ml" ? "ശ്രദ്ധിക്കുക:" : "Notice:"}
          </span>
          <p>
            {language === "ml"
              ? "അടിയന്തിര ആവശ്യങ്ങൾക്കായി ഈ ഫോം ഉപയോഗിക്കരുത്. അടിയന്തിര സഹായത്തിനായി ബന്ധപ്പെട്ട എമർജൻസി സർവീസുകളുമായി ബന്ധപ്പെടുക."
              : "Please do not use this form for emergencies. For urgent assistance, contact the appropriate emergency service."}
          </p>
        </div>
      </section>

      {/* Submission Feedback Alert */}
      {submissionFeedback && (
        <div
          role="alert"
          aria-live="polite"
          className={`mb-8 p-5 rounded-xs border text-charcoal dark:text-[#F4F1E9] animate-in fade-in duration-200 ${
            submissionFeedback.type === "success"
              ? "bg-[#F7F6F2] dark:bg-[#222320] border-warm-grey dark:border-[#41413B]"
              : "bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-900/50"
          }`}
        >
          <div className="flex items-start gap-3">
            {submissionFeedback.type === "success" ? (
              <Info className="w-5 h-5 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div>
              <h4 className="text-sm font-bold text-charcoal dark:text-[#F4F1E9]">
                {submissionFeedback.message}
              </h4>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                {submissionFeedback.details}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Fields */}
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
              <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
              <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
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
              <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
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
              <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
              <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
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
              <p id="phone-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
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
              <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
              <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
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
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
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
              <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
              <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
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
              <p id="subject-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
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
            <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
            <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
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
            <p id="message-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2 border-t border-warm-grey/60 dark:border-[#41413B]/60 space-y-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={(e) => {
                setFormData({ ...formData, consent: e.target.checked });
                if (errors.consent) setErrors({ ...errors, consent: undefined });
              }}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-4 w-4 rounded-xs border-warm-grey dark:border-[#41413B] text-charcoal focus:ring-2 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:ring-offset-2 cursor-pointer transition-colors"
            />
            <label
              htmlFor="consent"
              className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed cursor-pointer select-none"
            >
              {language === "ml"
                ? "എന്റെ അന്വേഷണം പരിശോധിക്കുന്നതിനും മറുപടി നൽകുന്നതിനുമായി ഞാൻ നൽകുന്ന വിവരങ്ങൾ ജനപ്രതിനിധിയുടെ ഓഫീസിനോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥർക്കോ ഉപയോഗിക്കാമെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു."
                : "I understand that the information I provide may be used by the representative’s office or authorized personnel to review and respond to my enquiry."}
            </label>
          </div>

          <div className="pl-7">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1 text-xs text-charcoal dark:text-[#F4F1E9] underline underline-offset-2 hover:text-copper dark:hover:text-[#D29A78] font-medium transition-colors"
            >
              <span>{language === "ml" ? "സ്വകാര്യതാ നയം വായിക്കുക" : "Read Privacy Policy"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {errors.consent && (
            <p id="consent-error" role="alert" className="pl-7 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
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
            disabled={!formData.consent || isSubmitting}
            isLoading={isSubmitting}
            aria-busy={isSubmitting}
            icon={!isSubmitting ? <ArrowRight className="w-4 h-4 text-white dark:text-[#191A18]" /> : undefined}
            iconPosition="right"
          >
            {isSubmitting
              ? (language === "ml" ? "അന്വേഷണം സമർപ്പിക്കുന്നു…" : "Submitting Enquiry…")
              : (language === "ml" ? "ഔദ്യോഗിക അന്വേഷണം സമർപ്പിക്കുക" : "Submit Official Enquiry")}
          </Button>

          <p className="text-[11px] text-slate dark:text-[#A09F97] font-mono">
            * Direct Helplines: Emergency 112 · Fire 101 · Water 1916
          </p>
        </div>
      </form>
    </div>
  );
};
