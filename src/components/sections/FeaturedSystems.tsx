import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";

export function FeaturedSystems() {
  return (
    <section id="systems" className="py-20">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Featured Systems</p>
          <h2 className="section-title">Applied software for high-trust workflows.</h2>
          <p className="section-copy">
            Selected systems and prototypes focused on practical automation,
            deterministic review flows, reporting and usable technical interfaces.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.name}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
