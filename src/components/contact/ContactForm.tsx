"use client";

import { useRef, useState, type FormEvent } from "react";
import Swal from "sweetalert2";

interface ContactFormCopy {
  formIntro: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  privacyNote: string;
  subject: string;
}

interface ContactFormProps {
  endpointEmail: string;
  copy: ContactFormCopy;
}

type SubmissionState = "idle" | "sending";

export function ContactForm({ endpointEmail, copy }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  async function showAlert(type: "success" | "error") {
    const isLight = document.documentElement.dataset.theme === "light";

    await Swal.fire({
      icon: type,
      title: type === "success" ? copy.success : copy.error,
      confirmButtonText: "OK",
      background: isLight ? "#ffffff" : "#071b1d",
      color: isLight ? "#152124" : "#f7fbfb",
      confirmButtonColor: "#00a99f",
      customClass: { popup: "portfolio-swal" },
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const honeypot = String(formData.get("_honey") ?? "").trim();
    if (honeypot !== "") {
      form.reset();
      return;
    }

    setSubmissionState("sending");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      _subject: copy.subject,
      _template: "table",
      _honey: "",
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${endpointEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`FormSubmit returned ${response.status}`);
      const result = (await response.json()) as { success?: string | boolean };
      const succeeded = result.success === true || result.success === "true";
      if (!succeeded) throw new Error("FormSubmit did not confirm success");

      formRef.current?.reset();
      await showAlert("success");
    } catch {
      await showAlert("error");
    } finally {
      setSubmissionState("idle");
    }
  }

  return (
    <div className="contact-form-card">
      <p className="contact-section-label">{copy.formIntro}</p>

      <form ref={formRef} className="contact-form" onSubmit={handleSubmit} autoComplete="on">
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="contact-field">
          <label htmlFor="name">{copy.nameLabel}</label>
          <input className="inp" name="name" type="text" placeholder={copy.namePlaceholder} id="name" autoComplete="name" required />
        </div>
        <div className="contact-field">
          <label htmlFor="email">{copy.emailLabel}</label>
          <input className="inp" name="email" type="email" placeholder={copy.emailPlaceholder} id="email" autoComplete="email" required />
        </div>
        <div className="contact-field">
          <label htmlFor="company">{copy.companyLabel}</label>
          <input className="inp" name="company" type="text" placeholder={copy.companyPlaceholder} id="company" autoComplete="organization" />
        </div>
        <div className="contact-field">
          <label htmlFor="message">{copy.messageLabel}</label>
          <textarea className="inp" name="message" id="message" rows={5} placeholder={copy.messagePlaceholder} required />
        </div>

        <div className="contact-form__actions">
          <button className="site-btn contact-submit" type="submit" disabled={submissionState === "sending"}>
            {submissionState === "sending" ? copy.sending : copy.send}
          </button>
        </div>
      </form>
    </div>
  );
}
