import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/sections/ContactSection";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { FeaturedSystems } from "@/components/sections/FeaturedSystems";
import { Hero } from "@/components/sections/Hero";
import { TechnicalFocus } from "@/components/sections/TechnicalFocus";
import { content, detectLanguage } from "@/i18n/content";

export default function App() {
  const siteContent = content[detectLanguage()];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header content={siteContent.header} currentLanguage={siteContent.language} />
      <main>
        <Hero content={siteContent.hero} />
        <FeaturedSystems content={siteContent.featuredSystems} />
        <TechnicalFocus content={siteContent.technicalFocus} />
        <EngineeringPrinciples content={siteContent.engineeringPrinciples} />
        <ContactSection content={siteContent.contact} />
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
