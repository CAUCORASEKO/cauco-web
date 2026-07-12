import { type FormEvent, useState } from "react";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/i18n/content";

const CONTACT_EMAIL = "claudio@aisosu.fi";
const LINKEDIN_URL = "https://www.linkedin.com/in/multimedia3d/";
const EMAIL_SUBJECT = "Project inquiry from CAUCO portfolio";
type ContactSectionProps = { content: SiteContent["contact"] };
type SubmitStatus = "idle" | "sending" | "success" | "error";

export function ContactSection({ content }: ContactSectionProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const reduceMotion = useReducedMotion();
  const isSwedish = typeof document !== "undefined" && document.documentElement.lang === "sv";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/sendmail.php", { method: "POST", body: new FormData(form) });
      if (response.ok) { setSubmitStatus("success"); form.reset(); } else { setSubmitStatus("error"); }
    } catch { setSubmitStatus("error"); }
  }

  return (
    <section id="contact" className="contact-scene">
      <div className="contact-grid" aria-hidden="true" />
      <div className="container contact-layout">
        <motion.div className="contact-statement" initial={reduceMotion ? false : isSwedish ? { opacity: 0, y: 20 } : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65 }}>
          <p className="section-kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
          <p className="contact-copy">{content.copy}</p>
          <div className="contact-direct">
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`}><Mail aria-hidden="true" />{content.emailCta}<ArrowUpRight aria-hidden="true" /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener"><Linkedin aria-hidden="true" />{content.linkedinCta}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="contact-coordinate" aria-hidden="true"><span>AI SYSTEMS</span><span>TRUST INFRASTRUCTURE</span><span>TECHNICAL PROTOTYPES</span></div>
        </motion.div>

        <motion.div className="contact-intake" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .65, delay: reduceMotion ? 0 : .12 }}>
          <header><span>01 / PROJECT BRIEF</span><h3>{content.inquiryTitle}</h3><i aria-hidden="true" /></header>
          <form aria-label={content.formAriaLabel} onSubmit={handleSubmit}>
            <label><span>01 — {content.nameLabel}</span><input name="name" placeholder={content.namePlaceholder} required type="text" /></label>
            <label><span>02 — {content.emailLabel}</span><input autoComplete="email" name="email" placeholder={content.emailPlaceholder} required type="email" /></label>
            <label><span>03 — {content.workstreamLabel}</span><input name="type" placeholder={content.workstreamPlaceholder} required type="text" /></label>
            <label><span>04 — {content.contextLabel}</span><textarea name="message" placeholder={content.contextPlaceholder} required /></label>
            <button type="submit" disabled={submitStatus === "sending"}>{submitStatus === "sending" ? content.sendingCta : content.prepareCta}<motion.span animate={!reduceMotion && submitStatus === "sending" ? { rotate: 360 } : undefined} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}><ArrowUpRight aria-hidden="true" /></motion.span></button>
            <AnimatePresence mode="wait">
              {submitStatus === "success" && <motion.p key="success" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="contact-success" role="status">{content.successMessage}</motion.p>}
              {submitStatus === "error" && <motion.p key="error" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="contact-error" role="alert">{content.errorMessage}</motion.p>}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
