import {
  Bot,
  BriefcaseBusiness,
  Code2,
  FileCheck2,
  MonitorCog,
  ServerCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const focusAreas = [
  { title: "AI-assisted software systems", icon: Bot },
  { title: "Fintech and compliance tooling", icon: BriefcaseBusiness },
  { title: "Desktop applications", icon: MonitorCog },
  { title: "Backend architecture", icon: ServerCog },
  { title: "Audit-ready reporting", icon: FileCheck2 },
  { title: "Developer workflow automation", icon: Code2 },
];

export function TechnicalFocus() {
  return (
    <section id="focus" className="py-20">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Technical Focus</p>
          <h2 className="section-title">Built around systems that need clarity.</h2>
          <p className="section-copy">
            The work is strongest where product thinking, architecture and
            implementation quality need to meet in the same interface.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map(({ title, icon: Icon }) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
