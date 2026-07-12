import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/i18n/content";

const CONTACT_EMAIL = "claudio@aisosu.fi";
const LINKEDIN_URL = "https://www.linkedin.com/in/multimedia3d/";
type FooterProps = { content: SiteContent["footer"] };

export function Footer({ content }: FooterProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.footer initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7 }} className="ecosystem-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-positioning"><span>CAUCO® / AISOSU</span><p>{content.positioning}</p></div>
          <nav className="footer-nav" aria-label={content.navigationLabel}>
            <div><h2>{content.systemsLabel}</h2><a href="/projects/aurora-digital-assets.html">Aurora<ArrowUpRight /></a><span>QALens</span><span>AisoSec Audit</span><span>WhaleScope</span></div>
            <div><h2>{content.labLabel}</h2><a href="#lab">CAUCO Lab<ArrowUpRight /></a></div>
            <div><h2>{content.connectLabel}</h2><a href={`mailto:${CONTACT_EMAIL}`}>{content.emailLabel}<ArrowUpRight /></a><a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener">LinkedIn<ArrowUpRight /></a></div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {content.copyright}</p>
          <div><a href="/privacy-policy.html">{content.privacy}</a><a href="/data-deletion.html">{content.dataDeletion}</a><a href="#top">{content.topLabel} ↑</a></div>
        </div>
      </div>
    </motion.footer>
  );
}
