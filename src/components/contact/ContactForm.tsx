"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AlertCircle, Info, ArrowRight, ArrowLeft, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { getFocusableElements } from "@/utils/focusTrap";

type WorkflowType = "general-enquiry" | "grievance-request";
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  location: string;
  additionalDetails: string;
  message: string;
  consent: boolean;
  honeypot: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  location?: string;
  message?: string;
  consent?: string;
}

export const ContactForm: React.FC = () => {
  const { language } = useLanguage();

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const confirmTriggerRef = useRef<HTMLElement | null>(null);
  const confirmDialogRef = useRef<HTMLDivElement>(null);
  const confirmCancelBtnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    location: "",
    additionalDetails: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Check if citizen entered any data
  const hasEnteredData = Boolean(
    formData.fullName.trim() ||
    formData.phone.trim() ||
    formData.email.trim() ||
    formData.subject.trim() ||
    formData.location.trim() ||
    formData.additionalDetails.trim() ||
    formData.message.trim()
  );

  const handleSelectWorkflow = (workflow: WorkflowType) => {
    setSelectedWorkflow(workflow);
    setSubmissionStatus("idle");
    setErrors({});
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      location: "",
      additionalDetails: "",
      message: "",
      consent: false,
      honeypot: "",
    });
    setErrors({});
    setSubmissionStatus("idle");
  };

  const handleReturnToSelector = () => {
    handleResetForm();
    setSelectedWorkflow(null);
  };

  const handleRequestChangeWorkflow = (e?: React.MouseEvent) => {
    if (hasEnteredData && submissionStatus !== "success") {
      confirmTriggerRef.current = (e?.currentTarget as HTMLElement) || (document.activeElement as HTMLElement);
      setShowConfirmDialog(true);
    } else {
      handleReturnToSelector();
    }
  };

  const handleConfirmChangeWorkflow = () => {
    setShowConfirmDialog(false);
    handleReturnToSelector();
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
    requestAnimationFrame(() => {
      confirmTriggerRef.current?.focus();
    });
  };

  // Keyboard navigation & focus trap for dialog
  useEffect(() => {
    if (!showConfirmDialog) return;

    requestAnimationFrame(() => {
      confirmCancelBtnRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleCloseConfirmDialog();
        return;
      }

      if (e.key === "Tab") {
        if (!confirmDialogRef.current) return;
        const focusables = getFocusableElements(confirmDialogRef.current);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first || !focusables.includes(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last || !focusables.includes(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfirmDialog]);

  // Focus success or error container upon status update
  useEffect(() => {
    if (submissionStatus === "success" && successRef.current) {
      requestAnimationFrame(() => {
        successRef.current?.focus();
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } else if (submissionStatus === "error" && errorRef.current) {
      requestAnimationFrame(() => {
        errorRef.current?.focus();
        errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [submissionStatus]);

  const validate = (): { isValid: boolean; firstInvalidField: string | null } => {
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
        selectedWorkflow === "grievance-request"
          ? language === "ml"
            ? "ദയവായി പ്രശ്നത്തിന്റെ തലക്കെട്ട് രേഖപ്പെടുത്തുക"
            : "Please enter an issue title or subject."
          : language === "ml"
            ? "ദയവായി അന്വേഷണ വിഷയം രേഖപ്പെടുത്തുക"
            : "Please enter an enquiry subject.";
    }

    if (selectedWorkflow === "grievance-request" && !formData.location.trim()) {
      newErrors.location =
        language === "ml"
          ? "ദയവായി സ്ഥലം അല്ലെങ്കിൽ പ്രദേശം രേഖപ്പെടുത്തുക"
          : "Please specify the location, ward, or locality.";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        language === "ml"
          ? "ദയവായി വിശദാംശങ്ങൾ രേഖപ്പെടുത്തുക"
          : "Please provide details in the message field.";
    } else if (formData.message.trim().length < 15) {
      newErrors.message =
        language === "ml"
          ? "കുറഞ്ഞത് 15 അക്ഷരങ്ങൾ നൽകുക"
          : "Message must contain at least 15 characters.";
    }

    if (!formData.consent) {
      newErrors.consent =
        language === "ml"
          ? "തുടരുന്നതിന് വിവര കൈകാര്യ സമ്മതം രേഖപ്പെടുത്തുക"
          : "Please acknowledge the information handling notice to proceed.";
    }

    setErrors(newErrors);

    const fieldOrder: (keyof FormErrors)[] = [
      "fullName",
      "phone",
      "email",
      "subject",
      "location",
      "message",
      "consent",
    ];
    const firstInvalid = fieldOrder.find((k) => newErrors[k]) || null;

    return {
      isValid: Object.keys(newErrors).length === 0,
      firstInvalidField: firstInvalid,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while in progress
    if (submissionStatus === "submitting") return;
    if (formData.honeypot) return;

    // Field-level validation check
    const { isValid, firstInvalidField } = validate();
    if (!isValid) {
      if (firstInvalidField) {
        requestAnimationFrame(() => {
          const el = document.getElementById(firstInvalidField);
          if (el) {
            el.focus();
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }
      return;
    }

    // Set immediate loading state
    setSubmissionStatus("submitting");

    // Explicit submission payload with workflow type
    // Strictly no personal data is printed to console or URLs
    const _submissionPayload = {
      type: selectedWorkflow,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      location: selectedWorkflow === "grievance-request" ? formData.location : undefined,
      additionalDetails: selectedWorkflow === "grievance-request" ? formData.additionalDetails : undefined,
      message: formData.message,
      consent: formData.consent,
    };

    try {
      // Asynchronous dispatch processing
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (formData.honeypot) {
            reject(new Error("Spam detected"));
          } else {
            resolve();
          }
        }, 1100);
      });

      setSubmissionStatus("success");
    } catch {
      // On failure, preserve all entered form data intact and re-enable submission
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 sm:p-10 shadow-xs font-sans">
      {/* Confirmation Dialog for Changing Workflow */}
      {showConfirmDialog && (
        <div
          ref={confirmDialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-desc"
        >
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 max-w-md w-full shadow-lg space-y-4">
            <h4
              id="confirm-dialog-title"
              className="font-display text-lg text-charcoal dark:text-[#F4F1E9]"
            >
              {language === "ml" ? "അന്വേഷണ വിഭാഗം മാറ്റണമോ?" : "Change Enquiry Type?"}
            </h4>
            <p
              id="confirm-dialog-desc"
              className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed"
            >
              {language === "ml"
                ? "നിങ്ങൾ ഈ ഫോമിൽ വിവരങ്ങൾ രേഖപ്പെടുത്തിയിട്ടുണ്ട്. അന്വേഷണ വിഭാഗം മാറ്റാൻ നിങ്ങൾ ഉറപ്പാണോ?"
                : "You have entered information in this form. Are you sure you want to change the enquiry type?"}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                ref={confirmCancelBtnRef}
                type="button"
                onClick={handleCloseConfirmDialog}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] bg-stone/60 hover:bg-stone dark:bg-[#222320] dark:hover:bg-[#191A18] rounded-xs border border-warm-grey dark:border-[#41413B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
              >
                {language === "ml" ? "ഫോമിൽ തുടരുക" : "Stay on Form"}
              </button>
              <button
                type="button"
                onClick={handleConfirmChangeWorkflow}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-charcoal dark:text-[#191A18] dark:bg-[#F4F1E9] hover:bg-[#383935] dark:hover:bg-[#E5E2DA] rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
              >
                {language === "ml" ? "വിഭാഗം മാറ്റുക" : "Change Enquiry Type"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATE 1: Workflow Selector (HOW CAN WE HELP?) */}
      {selectedWorkflow === null ? (
        <div>
          {/* Header */}
          <div className="mb-8 pb-5 border-b border-warm-grey dark:border-[#41413B] flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
                {language === "ml" ? "പൗരസമ്പർക്കം" : "Citizen Liaison"}
              </span>
              <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
                {language === "ml" ? "ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും?" : "HOW CAN WE HELP?"}
              </h3>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1">
                {language === "ml"
                  ? "നിങ്ങളുടെ ഉദ്ദേശ്യം ഏറ്റവും അനുയോജ്യമായ രീതിയിൽ വ്യക്തമാക്കുന്ന ആശയവിനിമയ വിഭാഗം തിരഞ്ഞെടുക്കുക."
                  : "Choose the type of communication that best describes your purpose."}
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-3 py-1 rounded-xs font-mono font-medium">
              <Info className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
              {language === "ml" ? "ഔദ്യോഗിക ഡെസ്ക്" : "Official Desk"}
            </span>
          </div>

          {/* Differentiated Cards - Both Entire Cards Single-Tab Keyboard Accessible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Option 1: General Enquiry Entire Clickable Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleSelectWorkflow("general-enquiry")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectWorkflow("general-enquiry");
                }
              }}
              aria-label={
                language === "ml"
                  ? "പൊതുവായ അന്വേഷണം: ചോദ്യങ്ങൾ, വിവരങ്ങൾ അറിയാനുള്ള അപേക്ഷകൾ. പൊതുവായ അന്വേഷണവുമായി തുടരുക."
                  : "General Enquiry: For questions, information requests, or general communication. Continue with General Enquiry."
              }
              className="group text-left bg-ivory/40 dark:bg-[#222320]/60 rounded-sm border border-warm-grey dark:border-[#41413B] p-6 flex flex-col justify-between hover:border-charcoal/70 dark:hover:border-[#D29A78] hover:bg-stone/20 dark:hover:bg-[#2C2D29]/90 hover:shadow-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] focus-visible:ring-offset-2 select-none"
            >
              <div>
                <div className="w-10 h-10 rounded-xs bg-stone dark:bg-[#2C2D29] border border-warm-grey/60 dark:border-[#41413B] flex items-center justify-center mb-4 text-copper dark:text-[#D29A78] transition-colors group-hover:border-charcoal/40 dark:group-hover:border-[#D29A78]/40">
                  <HelpCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] mb-2 group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                  {language === "ml" ? "പൊതുവായ അന്വേഷണം" : "General Enquiry"}
                </h4>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed mb-4">
                  {language === "ml"
                    ? "ചോദ്യങ്ങൾ, വിവരങ്ങൾ അറിയാനുള്ള അപേക്ഷകൾ, ഓഫീസ് സംബന്ധമായ അന്വേഷണങ്ങൾ അല്ലെങ്കിൽ ജനപ്രതിനിധിയുടെ ഓഫീസുമായുള്ള പൊതുവായ ആശയവിനിമയത്തിന്."
                    : "For questions, information requests, office-related queries, or general communication with the representative’s office."}
                </p>

                <div className="border-t border-warm-grey/50 dark:border-[#41413B]/50 pt-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 dark:text-[#F4F1E9]/70 block mb-2 font-mono">
                    {language === "ml" ? "ഉദാഹരണങ്ങൾ:" : "Examples:"}
                  </span>
                  <ul className="text-xs text-slate dark:text-[#C6C5BD] space-y-1.5 list-disc pl-4">
                    <li>{language === "ml" ? "പൊതുവായ വിവരങ്ങൾ അറിയാൻ" : "Requesting general information"}</li>
                    <li>{language === "ml" ? "ഓഫീസ് സേവനങ്ങളെക്കുറിച്ച് ചോദിച്ചറിയാൻ" : "Asking about office services"}</li>
                    <li>{language === "ml" ? "മണ്ഡലത്തിലെ വികസന പ്രവർത്തനങ്ങളെക്കുറിച്ച് അറിയാൻ" : "Seeking information about constituency activities"}</li>
                    <li>{language === "ml" ? "ഓഫീസിലേക്കുള്ള പൊതുവായ ചോദ്യങ്ങൾ" : "General questions for the office"}</li>
                  </ul>
                </div>
              </div>

              {/* Preserved Visual CTA (No nested interactive button, preventing duplicate tab stops) */}
              <div
                aria-hidden="true"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] group-hover:bg-[#383935] dark:group-hover:bg-[#E5E2DA] rounded-sm transition-all shadow-2xs pointer-events-none"
              >
                <span>{language === "ml" ? "പൊതുവായ അന്വേഷണവുമായി തുടരുക" : "Continue with General Enquiry"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>

            {/* Option 2: Grievance / Request Entire Clickable Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleSelectWorkflow("grievance-request")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectWorkflow("grievance-request");
                }
              }}
              aria-label={
                language === "ml"
                  ? "പരാതി / നിവേദനം: പ്രാദേശിക പ്രശ്നങ്ങൾ അറിയിക്കാൻ. പരാതി / നിവേദനവുമായി തുടരുക."
                  : "Grievance / Request: For reporting local issues or public concerns. Continue with Grievance / Request."
              }
              className="group text-left bg-ivory/40 dark:bg-[#222320]/60 rounded-sm border border-warm-grey dark:border-[#41413B] p-6 flex flex-col justify-between hover:border-charcoal/70 dark:hover:border-[#D29A78] hover:bg-stone/20 dark:hover:bg-[#2C2D29]/90 hover:shadow-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] focus-visible:ring-offset-2 select-none"
            >
              <div>
                <div className="w-10 h-10 rounded-xs bg-stone dark:bg-[#2C2D29] border border-warm-grey/60 dark:border-[#41413B] flex items-center justify-center mb-4 text-copper dark:text-[#D29A78] transition-colors group-hover:border-charcoal/40 dark:group-hover:border-[#D29A78]/40">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] mb-2 group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                  {language === "ml" ? "പരാതി / നിവേദനം" : "Grievance / Request"}
                </h4>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed mb-4">
                  {language === "ml"
                    ? "പ്രാദേശിക പ്രശ്നങ്ങൾ അറിയിക്കുന്നതിനും, പൊതുവായ അപേക്ഷകൾ സമർപ്പിക്കുന്നതിനും, മണ്ഡലം സംബന്ധമായ കാര്യങ്ങൾ ഓഫീസിന്റെ ശ്രദ്ധയിൽപ്പെടുത്തുന്നതിനും."
                    : "For reporting a local issue, submitting a public request, or bringing a constituency-related matter to the office’s attention."}
                </p>

                <div className="border-t border-warm-grey/50 dark:border-[#41413B]/50 pt-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/70 dark:text-[#F4F1E9]/70 block mb-2 font-mono">
                    {language === "ml" ? "ഉദാഹരണങ്ങൾ:" : "Examples:"}
                  </span>
                  <ul className="text-xs text-slate dark:text-[#C6C5BD] space-y-1.5 list-disc pl-4">
                    <li>{language === "ml" ? "പ്രാദേശിക പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യാൻ" : "Reporting a local civic issue"}</li>
                    <li>{language === "ml" ? "മണ്ഡലത്തിലെ വിഷയങ്ങളിൽ ശ്രദ്ധ ക്ഷണിക്കാൻ" : "Requesting attention to a constituency matter"}</li>
                    <li>{language === "ml" ? "പൊതുവായ ആശങ്കകൾ ഉന്നയിക്കാൻ" : "Raising a public concern"}</li>
                    <li>{language === "ml" ? "സഹായത്തിനായുള്ള നിവേദനം സമർപ്പിക്കാൻ" : "Submitting a request for assistance"}</li>
                  </ul>
                </div>
              </div>

              {/* Preserved Visual CTA (No nested interactive button, preventing duplicate tab stops) */}
              <div
                aria-hidden="true"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] group-hover:bg-[#383935] dark:group-hover:bg-[#E5E2DA] rounded-sm transition-all shadow-2xs pointer-events-none"
              >
                <span>{language === "ml" ? "പരാതി / നിവേദനവുമായി തുടരുക" : "Continue with Grievance / Request"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Information Handling Overview Panel */}
          <section
            aria-labelledby="selector-info-handling-title"
            className="rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/60 dark:bg-[#222320]/80 p-5"
          >
            <div className="flex items-start gap-2.5 mb-2.5">
              <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
              <h4
                id="selector-info-handling-title"
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
                  ? "നിങ്ങളുടെ അന്വേഷണം, പരാതി അല്ലെങ്കിൽ നിവേദനം മനസ്സിലാക്കുന്നതിനും അതിന് മറുപടി നൽകാൻ ജനപ്രതിനിധിയുടെ ഓഫീസിനെ സഹായിക്കുന്നതിനുമായാണ് ഈ ഫോമുകൾ വഴി സമർപ്പിക്കുന്ന വിവരങ്ങൾ സ്വീകരിക്കുന്നത്. നിങ്ങളുടെ ആശയവിനിമയം പരിശോധിക്കുന്നതിനോ തുടർനടപടികൾ സ്വീകരിക്കുന്നതിനോ ആവശ്യമെങ്കിൽ വിവരങ്ങൾ ചുമതലപ്പെടുത്തിയ ഓഫീസ് ഉദ്യോഗസ്ഥർ പരിശോധിച്ചേക്കാം."
                  : "Information submitted through these forms is collected to understand your enquiry, grievance, or request and help the representative’s office respond to it. Your submission may be reviewed by authorized office personnel when necessary to process or follow up on your communication."}
              </p>
              <p>
                {language === "ml"
                  ? "നിങ്ങളുടെ അന്വേഷണത്തിന് ആവശ്യമായ വിവരങ്ങൾ മാത്രം നൽകുക. പാസ്‌വേഡുകൾ, ബാങ്ക് അല്ലെങ്കിൽ സാമ്പത്തിക വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖകൾ, ഓതന്റിക്കേഷൻ കോഡുകൾ അല്ലെങ്കിൽ അതീവ രഹസ്യസ്വഭാവമുള്ള മറ്റ് വിവരങ്ങൾ ഈ ഫോം വഴി സമർപ്പിക്കരുത്."
                  : "Please provide only the information necessary for your enquiry. Do not submit passwords, bank or financial details, identity documents, authentication codes, or other highly sensitive information through this form."}
              </p>
            </div>

            {/* Subtle Emergency Notice */}
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
        </div>
      ) : (
        /* STATE 2: Specific Form Workflow (General Enquiry or Grievance / Request) */
        <div>
          {/* Switch Workflow Back Link */}
          <div className="mb-6 flex items-center justify-between pb-4 border-b border-warm-grey dark:border-[#41413B]">
            <button
              type="button"
              onClick={handleRequestChangeWorkflow}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] rounded-xs px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" aria-hidden="true" />
              <span>{language === "ml" ? "← മറ്റൊരു വിഭാഗം തിരഞ്ഞെടുക്കുക" : "← Choose a different enquiry type"}</span>
            </button>

            <span className="text-[11px] font-mono uppercase tracking-wider text-copper dark:text-[#D29A78] font-semibold bg-stone/50 dark:bg-[#222320] px-2.5 py-1 rounded-xs border border-warm-grey/60 dark:border-[#41413B]">
              {selectedWorkflow === "general-enquiry"
                ? (language === "ml" ? "പൊതുവായ അന്വേഷണം" : "General Enquiry")
                : (language === "ml" ? "പരാതി / നിവേദനം" : "Grievance / Request")}
            </span>
          </div>

          {/* SUCCESS STATE FEEDBACK PANEL */}
          {submissionStatus === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="outline-none focus:outline-none bg-stone/30 dark:bg-[#222320]/80 rounded-sm border border-warm-grey dark:border-[#41413B] p-6 sm:p-8 space-y-6 text-charcoal dark:text-[#F4F1E9] animate-in fade-in duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-copper dark:text-[#D29A78] bg-stone dark:bg-[#2C2D29] px-2.5 py-0.5 rounded-xs border border-warm-grey/60 dark:border-[#41413B]">
                      {selectedWorkflow === "grievance-request"
                        ? (language === "ml" ? "പരാതി / നിവേദനം" : "Grievance / Request")
                        : (language === "ml" ? "പൊതുവായ അന്വേഷണം" : "General Enquiry")}
                    </span>
                  </div>
                  <h4 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
                    {selectedWorkflow === "grievance-request"
                      ? (language === "ml" ? "പരാതി / നിവേദനം സമർപ്പിച്ചു" : "Grievance / Request Submitted")
                      : (language === "ml" ? "പൊതുവായ അന്വേഷണം സമർപ്പിച്ചു" : "General Enquiry Submitted")}
                  </h4>
                  <p className="text-sm text-slate dark:text-[#C6C5BD] leading-relaxed">
                    {selectedWorkflow === "grievance-request"
                      ? (language === "ml"
                          ? "നിങ്ങളുടെ അപേക്ഷ വിജയകരമായി സ്വീകരിച്ചു. നൽകിയ വിവരങ്ങൾ ഓഫീസ് പരിശോധിച്ചേക്കാം; കൂടുതൽ വിവരങ്ങളോ തുടർനടപടികളോ ആവശ്യമാണെങ്കിൽ ഓഫീസ് നിങ്ങളുമായി ബന്ധപ്പെട്ടേക്കാം."
                          : "Your submission has been received successfully. The office may review the information provided and contact you if further information or follow-up is required.")
                      : (language === "ml"
                          ? "നിങ്ങളുടെ അന്വേഷണം വിജയകരമായി സമർപ്പിച്ചു. നൽകിയ വിവരങ്ങൾ ഓഫീസ് പരിശോധിച്ചേക്കാം; കൂടുതൽ വിവരങ്ങളോ തുടർനടപടികളോ ആവശ്യമാണെങ്കിൽ ഓഫീസ് നിങ്ങളുമായി ബന്ധപ്പെട്ടേക്കാം."
                          : "Your enquiry has been submitted successfully. The office may review the information provided and contact you if further information or follow-up is required.")}
                  </p>

                  {/* Prototype Transparency Note */}
                  <div className="pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60 text-xs text-slate/80 dark:text-[#A09F97] flex items-start gap-2">
                    <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                      {language === "ml"
                        ? "പ്രോട്ടോടൈപ്പ് മാതൃക: ഫോം സാധുത പരിശോധനയും സിമുലേഷനും വിജയകരമാണ്. ഔദ്യോഗിക ഓഫീസ് സെർവർ ബന്ധിപ്പിക്കുമ്പോൾ നേരിട്ട് മണ്ഡലം ഓഫീസിലേക്ക് സന്ദേശം കൈമാറുന്നതാണ്."
                        : "Prototype Mode Notice: Client-side validation and workflow processing completed successfully. Outbound transmission will route through the authorized constituency office mail server upon full activation."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post-submission action buttons */}
              <div className="pt-4 border-t border-warm-grey dark:border-[#41413B] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleResetForm}
                >
                  {selectedWorkflow === "grievance-request"
                    ? (language === "ml" ? "മറ്റൊരു അപേക്ഷ സമർപ്പിക്കുക" : "Submit Another Request")
                    : (language === "ml" ? "മറ്റൊരു അന്വേഷണം സമർപ്പിക്കുക" : "Submit Another Enquiry")}
                </Button>

                <button
                  type="button"
                  onClick={handleReturnToSelector}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:bg-stone/50 dark:hover:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal dark:focus:ring-[#D29A78]"
                >
                  {language === "ml" ? "← മറ്റൊരു വിഭാഗം തിരഞ്ഞെടുക്കുക" : "← Choose a different enquiry type"}
                </button>
              </div>
            </div>
          ) : (
            /* NORMAL FORM / SUBMISSION IN PROGRESS / ERROR STATE */
            <div>
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
                  {selectedWorkflow === "general-enquiry"
                    ? (language === "ml" ? "പൊതുവായ അന്വേഷണം" : "General Enquiry")
                    : (language === "ml" ? "പരാതി / നിവേദനം" : "Grievance / Request")}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                  {selectedWorkflow === "general-enquiry"
                    ? (language === "ml"
                        ? "ജനപ്രതിനിധിയുടെ ഓഫീസിലേക്കുള്ള പൊതുവായ ചോദ്യങ്ങൾക്കും വിവരങ്ങൾ അറിയാനുമുള്ള അപേക്ഷകൾക്കും ഈ ഫോം ഉപയോഗിക്കുക."
                        : "Use this form for general questions or information requests for the representative’s office.")
                    : (language === "ml"
                        ? "മണ്ഡലം സംബന്ധമായ പ്രശ്നങ്ങൾ, പൊതുവായ ആശങ്കകൾ അല്ലെങ്കിൽ അപേക്ഷകൾ ജനപ്രതിനിധിയുടെ ഓഫീസിന്റെ ശ്രദ്ധയിൽപ്പെടുത്തുന്നതിന് ഈ ഫോം ഉപയോഗിക്കുക."
                        : "Use this form to bring a constituency-related issue, public concern, or request to the attention of the representative’s office.")}
                </p>
              </div>

              {/* Dynamic Information Handling Notice */}
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
                  {selectedWorkflow === "general-enquiry" ? (
                    <>
                      <p>
                        {language === "ml"
                          ? "നിങ്ങളുടെ പൊതുവായ അന്വേഷണമോ വിവരങ്ങൾ അറിയാനുള്ള അപേക്ഷയോ മനസ്സിലാക്കുന്നതിനും അതിന് മറുപടി നൽകാൻ ജനപ്രതിനിധിയുടെ ഓഫീസിനെ സഹായിക്കുന്നതിനുമായാണ് ഈ വിവരങ്ങൾ സ്വീകരിക്കുന്നത്. നിങ്ങളുടെ ആവശ്യം പരിശോധിക്കുന്നതിനായി വിവരങ്ങൾ ചുമതലപ്പെടുത്തിയ ഓഫീസ് ഉദ്യോഗസ്ഥർ പരിശോധിച്ചേക്കാം."
                          : "Information submitted through this form is collected to understand your general enquiry or information request and help the representative’s office respond to your communication. Your submission may be reviewed by authorized office personnel when necessary to process your request."}
                      </p>
                      <p>
                        {language === "ml"
                          ? "നിങ്ങളുടെ അന്വേഷണത്തിന് ആവശ്യമായ വിവരങ്ങൾ മാത്രം നൽകുക. പാസ്‌വേഡുകൾ, ബാങ്ക് അല്ലെങ്കിൽ സാമ്പത്തിക വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖകൾ, ഓതന്റിക്കേഷൻ കോഡുകൾ അല്ലെങ്കിൽ അതീവ രഹസ്യസ്വഭാവമുള്ള മറ്റ് വിവരങ്ങൾ ഈ ഫോം വഴി സമർപ്പിക്കരുത്."
                          : "Please provide only the information necessary for your enquiry. Do not submit passwords, bank or financial details, identity documents, authentication codes, or other highly sensitive information through this form."}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        {language === "ml"
                          ? "നിങ്ങളുടെ പരാതിയോ, പൊതുവായ ആശങ്കയോ, മണ്ഡലം സംബന്ധമായ അപേക്ഷയോ മനസ്സിലാക്കുന്നതിനും വിഷയം പരിശോധിക്കുന്നതിനും വേണ്ടിയാണ് ഈ വിവരങ്ങൾ സ്വീകരിക്കുന്നത്. തുടർനടപടികൾ ഏകോപിപ്പിക്കുന്നതിനായി വിവരങ്ങൾ ചുമതലപ്പെടുത്തിയ ഓഫീസ് ഉദ്യോഗസ്ഥർ പരിശോധിച്ചേക്കാം."
                          : "Information submitted through this form is collected to understand your grievance, public concern, or constituency request and help the representative’s office review the matter. Your submission may be reviewed by authorized office personnel when necessary to coordinate follow-up with relevant civic bodies."}
                      </p>
                      <p>
                        {language === "ml"
                          ? "നിങ്ങളുടെ പരാതിയോ അപേക്ഷയോ വ്യക്തമാക്കാൻ ആവശ്യമായ വിവരങ്ങൾ മാത്രം നൽകുക. പാസ്‌വേഡുകൾ, ബാങ്ക് അല്ലെങ്കിൽ സാമ്പത്തിക വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖകൾ, ഓതന്റിക്കേഷൻ കോഡുകൾ അല്ലെങ്കിൽ അതീവ രഹസ്യസ്വഭാവമുള്ള മറ്റ് വ്യക്തിഗത വിവരങ്ങൾ സമർപ്പിക്കരുത്."
                          : "Please provide only the information necessary to describe your grievance or request. Do not submit passwords, bank or financial details, identity documents, authentication codes, or other highly sensitive personal information."}
                      </p>
                    </>
                  )}
                </div>

                {/* Contextual 3-Step Process Flow */}
                <div className="mt-4 pt-4 border-t border-warm-grey/70 dark:border-[#41413B]/70">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                          {language === "ml" ? "1 — സമർപ്പിക്കുക" : "1 — SUBMIT"}
                        </span>
                        <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                          {selectedWorkflow === "general-enquiry"
                            ? language === "ml"
                              ? "നിങ്ങളുടെ ചോദ്യമോ വിവര അഭ്യർത്ഥനയോ ഉൾപ്പെടുത്തി അന്വേഷണം അയക്കുക."
                              : "Send your enquiry with the information needed to understand your request."
                            : language === "ml"
                              ? "സ്ഥലം സഹിതം പ്രശ്നത്തിന്റെയോ നിവേദനത്തിന്റെയോ പൂർണ്ണ വിവരങ്ങൾ സമർപ്പിക്കുക."
                              : "Submit details of the local issue or constituency request along with the location."}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                          {language === "ml" ? "2 — പരിശോധന" : "2 — REVIEW"}
                        </span>
                        <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                          {selectedWorkflow === "general-enquiry"
                            ? language === "ml"
                              ? "അന്വേഷണം ജനപ്രതിനിധിയുടെ ഓഫീസോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥരോ പരിശോധിച്ചേക്കാം."
                              : "The enquiry may be reviewed by the representative’s office or authorized personnel."
                            : language === "ml"
                              ? "പരാതിയോ നിവേദനമോ ജനപ്രതിനിധിയുടെ ഓഫീസോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥരോ പരിശോധിച്ചേക്കാം."
                              : "The grievance or request may be reviewed by the representative’s office or authorized personnel."}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 dark:bg-[#2C2D29]/80 p-3 rounded-xs border border-warm-grey/50 dark:border-[#41413B]/50 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-copper dark:text-[#D29A78] block mb-1">
                          {language === "ml" ? "3 — മറുപടി / തുടർനടപടി" : "3 — RESPONSE / FOLLOW-UP"}
                        </span>
                        <p className="text-[11px] text-slate dark:text-[#C6C5BD] leading-relaxed">
                          {selectedWorkflow === "general-enquiry"
                            ? language === "ml"
                              ? "മറുപടിയോ കൂടുതൽ വിവരങ്ങളോ ആവശ്യമുള്ളപ്പോൾ നിങ്ങൾ നൽകിയ വിവരങ്ങൾ ഉപയോഗിച്ച് ഓഫീസ് ബന്ധപ്പെട്ടേക്കാം."
                              : "The office may contact you using the details you provide when a response or additional information is required."
                            : language === "ml"
                              ? "കൂടുതൽ വിവരങ്ങളോ തുടർനടപടികളോ ആവശ്യമെങ്കിൽ നൽകിയിട്ടുള്ള വിലാസത്തിൽ ഓഫീസ് ബന്ധപ്പെട്ടേക്കാം."
                              : "The office may contact you using the provided details if additional information or follow-up is required."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Emergency Notice */}
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

              {/* SUBMISSION ERROR ALERT (Requirement 4 & 7) */}
              {submissionStatus === "error" && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className="mb-8 p-5 rounded-xs bg-red-50/90 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-charcoal dark:text-[#F4F1E9] animate-in fade-in duration-200 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-red-900 dark:text-red-300">
                        {language === "ml" ? "സമർപ്പിക്കാൻ സാധിച്ചില്ല" : "Unable to Submit"}
                      </h4>
                      <p className="text-xs text-red-800 dark:text-red-300/90 leading-relaxed">
                        {language === "ml"
                          ? "ഈ സമയത്ത് ഫോം സമർപ്പിക്കാൻ സാധിച്ചില്ല. വിവരങ്ങൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക."
                          : "We couldn't submit your form at this time. Please check your details and try again."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Form Fields */}
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-busy={submissionStatus === "submitting"}
                className="space-y-6"
              >
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

                  {/* Subject / Issue Title */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
                    >
                      {selectedWorkflow === "grievance-request"
                        ? (language === "ml" ? "വിഷയം / പ്രശ്നത്തിന്റെ തലക്കെട്ട്" : "Subject / Issue Title")
                        : (language === "ml" ? "വിഷയം" : "Subject")}{" "}
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
                        selectedWorkflow === "grievance-request"
                          ? language === "ml"
                            ? "ഉദാ: സ്റ്റേഷൻ റോഡിലെ തെരുവ് വിളക്ക് അറ്റകുറ്റപ്പണി"
                            : "e.g., Street lighting maintenance on Station Road"
                          : language === "ml"
                            ? "ഉദാ: ഓഫീസ് സന്ദർശന സമയങ്ങൾ സംബന്ധിച്ച്"
                            : "e.g., Office visiting hours enquiry"
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

                {/* Grievance Specific Fields: Location / Area & Additional Details */}
                {selectedWorkflow === "grievance-request" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                    {/* Location / Area */}
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
                      >
                        {language === "ml" ? "സ്ഥലം / പ്രദേശം" : "Location / Area"}{" "}
                        <span className="text-copper dark:text-[#D29A78]" aria-hidden="true">*</span>
                        <span className="sr-only">({language === "ml" ? "ആവശ്യമാണ്" : "required"})</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({ ...formData, location: e.target.value });
                          if (errors.location) setErrors({ ...errors, location: undefined });
                        }}
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? "location-error" : undefined}
                        placeholder={
                          language === "ml"
                            ? "ഉദാ: വാർഡ്, പ്രദേശം, തെരുവ് അല്ലെങ്കിൽ പ്രധാന ലാൻഡ്‌മാർക്ക്"
                            : "e.g. Ward, locality, street, or landmark"
                        }
                        className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
                      />
                      {errors.location && (
                        <p id="location-error" role="alert" className="mt-1.5 text-xs text-copper dark:text-[#D29A78] flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.location}</span>
                        </p>
                      )}
                    </div>

                    {/* Additional Details (Optional) */}
                    <div>
                      <label
                        htmlFor="additionalDetails"
                        className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
                      >
                        {language === "ml" ? "കൂടുതൽ വിവരങ്ങൾ (ഓപ്ഷണൽ)" : "Additional Details (Optional)"}
                      </label>
                      <input
                        type="text"
                        id="additionalDetails"
                        name="additionalDetails"
                        value={formData.additionalDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, additionalDetails: e.target.value })
                        }
                        placeholder={
                          language === "ml"
                            ? "ഉദാ: റഫറൻസ് നമ്പറുകൾ, മുൻ നിവേദനങ്ങൾ, അല്ലെങ്കിൽ മറ്റ് വിവരങ്ങൾ"
                            : "e.g. Previous reference numbers, relevant dates, or specific landmarks"
                        }
                        className="w-full text-sm px-4 py-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-ivory/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50 focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Message / Details */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] mb-2"
                  >
                    {selectedWorkflow === "grievance-request"
                      ? (language === "ml" ? "പരാതി / നിവേദനത്തിന്റെ പൂർണ്ണ വിവരങ്ങൾ" : "Grievance or Request Details")
                      : (language === "ml" ? "അന്വേഷണ വിവരങ്ങൾ" : "Enquiry Details")}{" "}
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
                      selectedWorkflow === "grievance-request"
                        ? language === "ml"
                          ? "പ്രശ്നത്തിന്റെ സ്വഭാവം, ബാധിക്കപ്പെട്ട ആളുകൾ, ആവശ്യപ്പെടുന്ന പരിഹാരം എന്നിവ വിശദമായി രേഖപ്പെടുത്തുക..."
                          : "Please provide complete details about the issue, affected community, and requested assistance..."
                        : language === "ml"
                          ? "നിങ്ങളുടെ അന്വേഷണത്തിന്റെ വിശദാംശങ്ങൾ രേഖപ്പെടുത്തുക..."
                          : "Please describe your question or information request in detail..."
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
                      {selectedWorkflow === "grievance-request" ? (
                        language === "ml"
                          ? "എന്റെ പരാതിയോ നിവേദനമോ പരിശോധിക്കുന്നതിനും തുടർനടപടികൾ സ്വീകരിക്കുന്നതിനുമായി ഞാൻ നൽകുന്ന വിവരങ്ങൾ ജനപ്രതിനിധിയുടെ ഓഫീസിനോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥർക്കോ ഉപയോഗിക്കാമെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു."
                          : "I understand that the information I provide may be used by the representative’s office or authorized personnel to review and follow up on my grievance or request."
                      ) : (
                        language === "ml"
                          ? "എന്റെ അന്വേഷണം പരിശോധിക്കുന്നതിനും മറുപടി നൽകുന്നതിനുമായി ഞാൻ നൽകുന്ന വിവരങ്ങൾ ജനപ്രതിനിധിയുടെ ഓഫീസിനോ ചുമതലപ്പെടുത്തിയ ഉദ്യോഗസ്ഥർക്കോ ഉപയോഗിക്കാമെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു."
                          : "I understand that the information I provide may be used by the representative’s office or authorized personnel to review and respond to my enquiry."
                      )}
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

                {/* Submit Button with Loading State */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submissionStatus === "submitting"}
                    isLoading={submissionStatus === "submitting"}
                    aria-busy={submissionStatus === "submitting"}
                    icon={submissionStatus !== "submitting" ? <ArrowRight className="w-4 h-4 text-white dark:text-[#191A18]" /> : undefined}
                    iconPosition="right"
                  >
                    {submissionStatus === "submitting"
                      ? (selectedWorkflow === "grievance-request"
                          ? (language === "ml" ? "പരാതി / നിവേദനം സമർപ്പിക്കുന്നു…" : "Submitting Grievance / Request…")
                          : (language === "ml" ? "അന്വേഷണം സമർപ്പിക്കുന്നു…" : "Submitting Enquiry…"))
                      : (selectedWorkflow === "grievance-request"
                          ? (language === "ml" ? "പരാതി / നിവേദനം സമർപ്പിക്കുക" : "Submit Grievance / Request")
                          : (language === "ml" ? "പൊതുവായ അന്വേഷണം സമർപ്പിക്കുക" : "Submit General Enquiry"))}
                  </Button>

                  <p className="text-[11px] text-slate dark:text-[#A09F97] font-mono">
                    * Direct Helplines: Emergency 112 · Fire 101 · Water 1916
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
