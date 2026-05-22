import {
  Bot,
  BriefcaseBusiness,
  Code2,
  FileCheck2,
  MonitorCog,
  ServerCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";

const focusIcons = [
  Bot,
  BriefcaseBusiness,
  MonitorCog,
  ServerCog,
  FileCheck2,
  Code2,
];

type TechnicalFocusProps = {
  content: SiteContent["technicalFocus"];
};

export function TechnicalFocus({ content }: TechnicalFocusProps) {
  return (
    <section id="focus" className="py-20">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">{content.kicker}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy">{content.copy}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.areas.map(({ title }, index) => {
            const Icon = focusIcons[index] ?? Bot;

            return (
              <Card key={title} className="bg-card/55">
                <CardHeader>
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-px w-full bg-gradient-to-r from-primary/40 via-white/10 to-transparent" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
