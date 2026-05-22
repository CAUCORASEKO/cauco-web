import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";

type EngineeringPrinciplesProps = {
  content: SiteContent["engineeringPrinciples"];
};

export function EngineeringPrinciples({ content }: EngineeringPrinciplesProps) {
  return (
    <section id="principles" className="py-20">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">{content.kicker}</p>
          <h2 className="section-title">{content.title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.principles.map((principle) => (
            <Card key={principle.title}>
              <CardHeader className="flex flex-row gap-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <CardTitle className="text-base">{principle.title}</CardTitle>
                  <CardContent className="px-0 pb-0 pt-3">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {principle.body}
                    </p>
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
