import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";

const CONTACT_EMAIL = "claudio@aisosu.fi";
const LINKEDIN_URL = "https://www.linkedin.com/in/multimedia3d/";
const EMAIL_SUBJECT = "Project inquiry from CAUCO portfolio";

type ContactSectionProps = {
  content: SiteContent["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(91,141,239,0.18),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(155,212,198,0.12),transparent_30%)]" />
          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
            <div>
              <p className="section-kicker">{content.kicker}</p>
              <h2 className="section-title">{content.title}</h2>
              <p className="section-copy max-w-2xl">
                {content.copy}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      EMAIL_SUBJECT,
                    )}`}
                  >
                    <Mail className="h-4 w-4" /> {content.emailCta}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Linkedin className="h-4 w-4" /> {content.linkedinCta}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-5">
              <CardHeader className="p-0">
                <CardTitle className="text-base">{content.inquiryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-5">
                <form className="space-y-4" aria-label={content.formAriaLabel}>
                  <label className="block">
                    <span className="mb-2 block text-sm text-muted-foreground">
                      {content.workstreamLabel}
                    </span>
                    <input
                      className="h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={content.workstreamPlaceholder}
                      type="text"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-muted-foreground">
                      {content.contextLabel}
                    </span>
                    <textarea
                      className="min-h-28 w-full resize-y rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={content.contextPlaceholder}
                    />
                  </label>
                  <Button type="button" variant="outline" className="w-full">
                    {content.prepareCta}
                  </Button>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
