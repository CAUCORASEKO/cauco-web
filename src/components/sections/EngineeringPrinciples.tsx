import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  {
    title: "Practical AI over hype",
    body: "AI is used where it improves a workflow, reduces review time or clarifies evidence. The system still has to be useful without a pitch deck.",
  },
  {
    title: "Deterministic outputs where trust matters",
    body: "Compliance, finance and audit workflows need repeatable results, traceable inputs and clear failure states.",
  },
  {
    title: "Secure-by-default workflows",
    body: "Approval gates, scoped permissions, transparent logs and conservative automation are treated as product requirements.",
  },
  {
    title: "Human-in-the-loop decision systems",
    body: "Good software improves expert judgment. It should surface context, explain outputs and keep final decisions accountable.",
  },
];

export function EngineeringPrinciples() {
  return (
    <section id="principles" className="py-20">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Engineering Principles</p>
          <h2 className="section-title">Architecture choices that reduce risk.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
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
