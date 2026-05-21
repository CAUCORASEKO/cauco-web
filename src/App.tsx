import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/sections/ContactSection";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { FeaturedSystems } from "@/components/sections/FeaturedSystems";
import { Hero } from "@/components/sections/Hero";
import { TechnicalFocus } from "@/components/sections/TechnicalFocus";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <FeaturedSystems />
        <TechnicalFocus />
        <EngineeringPrinciples />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
