export type Language = "en" | "fi" | "sv";

export type NavItemContent = {
  label: string;
  href: string;
};

export type ProjectContent = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
};

export type SystemContent = {
  id: "aurora" | "qalens" | "aisosec" | "whalescope";
  name: string;
  category: string;
  description: string;
  status: string;
  capabilities: string[];
  story: string[];
  cta: string;
  href?: string;
};

export type FocusAreaContent = {
  title: string;
  description: string;
  capabilities: string[];
  related?: string[];
};

export type PrincipleContent = {
  title: string;
  body: string;
};

export type LabCategory = "all" | "web" | "commerce" | "operations" | "mobile" | "ai" | "intelligence" | "trust" | "custom";

export type LabEngagement = "Starter" | "Professional" | "Advanced" | "Enterprise";

export type LabProductContent = {
  title: string;
  description: string;
  category: Exclude<LabCategory, "all">;
  idealFor: string[];
  capabilities: string[];
  delivery: string;
  engagement: LabEngagement;
  cta: string;
};

export type SiteContent = {
  language: Language;
  header: {
    homeLabel: string;
    nav: NavItemContent[];
    cta: string;
    languages: Record<Language, string>;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  reel: {
    title: string; play: string; close: string; pause: string; resume: string; restart: string; replay: string; explore: string; back: string; controls: string; progress: string; reduced: string;
    phaseLabels: string[]; entry: string[]; question: string; capabilities: string[]; capabilityStatement: string; buildLabel: string; buildSpan: string[]; buildStatement: string; projects: string[]; evidenceStatement: string; architectureLabel: string; architectureStatement: string; technology: string[]; technologyStatement: string; closing: string; chapters: string[];
  };
  featuredSystems: {
    kicker: string;
    title: string;
    copy: string;
    systems: SystemContent[];
    projects: ProjectContent[];
  };
  ecosystem: {
    label: string;
    title: string;
    description: string;
    coreLabel: string;
    layers: string[];
    summary: string;
  };
  lab: {
    label: string;
    bridge: string;
    title: string;
    description: string;
    filters: Record<LabCategory, string>;
    products: LabProductContent[];
    detail: { close: string; includes: string; idealFor: string; capabilities: string; delivery: string; engagement: string; contact: string };
  };
  technicalFocus: {
    kicker: string;
    title: string;
    copy: string;
    areas: FocusAreaContent[];
  };
  engineeringPrinciples: {
    kicker: string;
    title: string;
    principles: PrincipleContent[];
  };
  contact: {
    kicker: string;
    title: string;
    copy: string;
    emailCta: string;
    linkedinCta: string;
    inquiryTitle: string;
    formAriaLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    workstreamLabel: string;
    workstreamPlaceholder: string;
    contextLabel: string;
    contextPlaceholder: string;
    prepareCta: string;
    sendingCta: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    dataDeletion: string;
    positioning: string;
    navigationLabel: string;
    systemsLabel: string;
    labLabel: string;
    connectLabel: string;
    emailLabel: string;
    topLabel: string;
  };
};

const nav = {
  en: [
    { label: "Systems", href: "#systems" },
    { label: "Projects", href: "#lab" },
    { label: "Focus", href: "#focus" },
    { label: "Principles", href: "#principles" },
    { label: "Contact", href: "#contact" },
  ],
  fi: [
    { label: "Järjestelmät", href: "#systems" },
    { label: "Projektit", href: "#lab" },
    { label: "Painopisteet", href: "#focus" },
    { label: "Periaatteet", href: "#principles" },
    { label: "Yhteys", href: "#contact" },
  ],
  sv: [
    { label: "System", href: "#systems" },
    { label: "Projekt", href: "#lab" },
    { label: "Fokus", href: "#focus" },
    { label: "Principer", href: "#principles" },
    { label: "Kontakt", href: "#contact" },
  ],
} satisfies Record<Language, NavItemContent[]>;

export const content = {
  en: {
    language: "en",
    header: {
      homeLabel: "CAUCO home",
      nav: nav.en,
      cta: "Start a Conversation",
      languages: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    hero: {
      eyebrow: "Claudio Valenzuela / CAUCO",
      title: "Software Architect & AI Systems Builder",
      subtitle:
        "I design and build practical AI-powered software systems for finance, compliance, developer productivity and institutional workflows.",
      primaryCta: "View Systems",
      secondaryCta: "Contact",
    },
    reel: {
      title: "CAUCO engineering reel", play: "Play reel", close: "Close reel", pause: "Pause reel", resume: "Resume reel", restart: "Restart reel", replay: "Replay", explore: "Explore the work", back: "Back to site", controls: "Reel controls", progress: "Reel progress", reduced: "Motion-reduced reel summary",
      phaseLabels: ["Capabilities", "Evidence", "Technology"], entry: ["SOFTWARE ARCHITECT", "AI SYSTEMS BUILDER", "COMPLETE PRODUCTS"], question: "WHAT CAN THIS PERSON BUILD?",
      capabilities: ["AI Systems", "Backend Architecture", "Developer Tools", "Desktop Applications", "Fintech", "Compliance", "Digital Trust", "Automation", "Product Engineering"], capabilityStatement: "FROM COMPLEX PROBLEM TO WORKING PRODUCT.",
      buildLabel: "End-to-end engineering", buildSpan: ["Product thinking", "System architecture", "Production software"], buildStatement: "ONE ENGINEER. THE COMPLETE SYSTEM.",
      projects: ["Aurora", "QALens", "AisoSec Audit", "WhaleScope", "Market Surveillance AI", "KümeVet", "Streakly", "AisoFlow"], evidenceStatement: "EIGHT PRODUCTS. ONE PRACTICE: BUILD THE WHOLE THING.",
      architectureLabel: "The connecting discipline", architectureStatement: "INTERFACES, INTELLIGENCE, INFRASTRUCTURE AND TRUST — DESIGNED AS ONE.",
      technology: ["TypeScript", "React", "Node.js", "Python", "FastAPI", "Flutter", "PostgreSQL", "Docker", "Git", "AI"], technologyStatement: "TOOLS CHANGE. ENGINEERING JUDGMENT SCALES.",
      closing: "I BUILD SOFTWARE WHERE ARCHITECTURE, AI AND TRUST MEET.", chapters: ["Software architect and product builder", "Capabilities across product engineering", "End-to-end engineering", "Eight shipped product directions", "Architecture as the connecting discipline", "A versatile technology stack", "Architecture, AI and trust"],
    },
    featuredSystems: {
      kicker: "Featured Systems",
      title: "Applied software for high-trust workflows.",
      copy:
        "Selected systems and prototypes focused on practical automation, deterministic review flows, reporting and usable technical interfaces.",
      systems: [
        {
          id: "aurora",
          name: "Aurora",
          category: "Digital Trust & Asset Platform",
          description: "Institutional control for identity, evidence, permissions and regulated digital asset operations.",
          status: "Active development",
          capabilities: ["Policy gates", "Verified identity", "Evidence packages", "Audit trail"],
          story: ["Request received", "Identity verified", "Permission checked", "Policy gate", "Evidence package", "Human review", "Controlled decision"],
          cta: "Explore Aurora",
          href: "/projects/aurora-digital-assets.html",
        },
        {
          id: "qalens",
          name: "QALens",
          category: "AI Engineering & Quality Intelligence",
          description: "Transforms software issues into QA risk analysis, improvements, test cases and delivery evidence.",
          status: "Prototype",
          capabilities: ["Issue analysis", "QA risk", "Test design", "Delivery trust"],
          story: ["Issue received", "QA risk detected", "Improvement suggested", "Test cases generated", "Delivery evidence"],
          cta: "Case study in development",
        },
        {
          id: "aisosec",
          name: "AisoSec Audit",
          category: "AI Compliance & Security Audit Platform",
          description: "Turns technical findings into captured evidence, compliance mappings, risk gaps and professional audit outputs.",
          status: "Active development",
          capabilities: ["Finding review", "Evidence capture", "Control mapping", "Audit reports"],
          story: ["Finding detected", "Evidence captured", "Severity assessed", "Framework mapping", "Compliance gap", "Audit output"],
          cta: "Case study in development",
        },
        {
          id: "whalescope",
          name: "WhaleScope",
          category: "Digital Asset Research Intelligence",
          description: "Market, institutional flow and on-chain analysis for rigorous digital asset research.",
          status: "Research system",
          capabilities: ["Institutional flow", "Whale signals", "Market context", "Research reports"],
          story: ["Market event", "Institutional flow", "Whale transaction", "Signal interpretation", "Research insight"],
          cta: "Research system",
        },
      ],
      projects: [
        {
          name: "AgentDock",
          description:
            "Mobile-first command center for AI coding agents, repository workflows, approval gates and safe automation.",
          tags: [
            "AI Agents",
            "Developer Tools",
            "FastAPI",
            "Mobile",
            "Git Workflows",
          ],
        },
        {
          name: "Aurora Digital Assets",
          description:
            "Institutional control layer for regulated digital asset operations, combining risk review, compliance workflows, security guardrails and audit-ready evidence.",
          tags: [
            "Digital Assets",
            "Banking",
            "Compliance",
            "Custody Guardrails",
            "Audit Trail",
          ],
          href: "/projects/aurora-digital-assets.html",
        },
        {
          name: "Market Surveillance AI",
          description:
            "Desktop compliance and market surveillance application with deterministic alerts, case review and PDF reporting.",
          tags: [
            "Compliance",
            "PySide6",
            "SQLite",
            "PDF Reports",
            "Market Surveillance",
          ],
        },
        {
          name: "WhaleScope Desktop",
          description:
            "Market and on-chain analytics desktop application for crypto research, whale activity analysis and reporting.",
          tags: [
            "Desktop App",
            "Python",
            "Electron",
            "Market Data",
            "On-chain Analytics",
          ],
        },
        {
          name: "Deterministic Vault Factory",
          description:
            "Institutional smart contract risk analysis system with attack surface review, governance risk and evidence packaging.",
          tags: [
            "Smart Contracts",
            "Security",
            "Slither",
            "Risk Analysis",
            "Evidence Packaging",
          ],
        },
      ],
    },
    ecosystem: {
      label: "Trust infrastructure ecosystem",
      title: "Not separate products. One trust infrastructure.",
      description: "Aurora, QALens and AisoSec model connected review flows around a shared trust core: identity, policy, evidence and accountable decisions.",
      coreLabel: "Aurora Trust Engine / Shared trust core",
      layers: ["Identity", "Policy", "Evidence", "Decisions"],
      summary: "A visualized architecture showing how system-specific review flows can share identity, policy, evidence and decision layers.",
    },
    lab: {
      label: "Available for client work",
      bridge: "Commercial software engineering for practical operations and complex institutional requirements.",
      title: "Software systems for real business problems.",
      description: "A catalog of websites, platforms, mobile applications, AI systems, analytics tools and custom engineering solutions designed for organizations of different sizes.",
      filters: { all: "All", web: "Web", commerce: "Commerce", operations: "Operations", mobile: "Mobile", ai: "AI", intelligence: "Intelligence", trust: "Trust", custom: "Custom" },
      products: [
        { title: "Business Websites", description: "Professional multilingual websites that present a company clearly and convert visitors into customers.", category: "web", idealFor: ["Growing businesses", "Professional services", "International teams"], capabilities: ["Content management", "Multilingual UX", "SEO and conversion tracking"], delivery: "2–5 weeks", engagement: "Starter", cta: "Explore solution" },
        { title: "E-Commerce Platforms", description: "Online stores with payments, product management, order workflows, inventory and analytics.", category: "commerce", idealFor: ["Retailers", "Manufacturers", "Subscription businesses"], capabilities: ["Payments and checkout", "Inventory and orders", "Commerce analytics"], delivery: "4–8 weeks", engagement: "Professional", cta: "View capabilities" },
        { title: "Booking & Reservation Systems", description: "Scheduling, availability, reminders, payments and administrative tools in one operational flow.", category: "operations", idealFor: ["Clinics and studios", "Hospitality", "Field services"], capabilities: ["Live availability", "Automated reminders", "Payments and admin tools"], delivery: "4–8 weeks", engagement: "Professional", cta: "Explore solution" },
        { title: "Customer & Member Portals", description: "Secure portals for customers, members, partners or internal teams, with authentication and document access.", category: "operations", idealFor: ["Member organizations", "B2B services", "Distributed teams"], capabilities: ["Identity and permissions", "Document workflows", "Self-service dashboards"], delivery: "6–12 weeks", engagement: "Advanced", cta: "Discuss this system" },
        { title: "Mobile Applications", description: "Cross-platform iOS and Android applications with backend services, notifications and account management.", category: "mobile", idealFor: ["Digital services", "Operational teams", "Connected products"], capabilities: ["iOS and Android", "Push notifications", "Secure API integration"], delivery: "8–16 weeks", engagement: "Advanced", cta: "View capabilities" },
        { title: "AI Business Assistants", description: "Private AI assistants connected to company knowledge, documents, APIs and internal workflows.", category: "ai", idealFor: ["Knowledge teams", "Customer operations", "Regulated organizations"], capabilities: ["Private knowledge retrieval", "Workflow automation", "Access controls and evaluation"], delivery: "6–12 weeks", engagement: "Advanced", cta: "Discuss this system" },
        { title: "Analytics & Monitoring Platforms", description: "Dashboards, reporting, real-time monitoring, alerts and decision-support systems.", category: "intelligence", idealFor: ["Operations leaders", "Research teams", "Data-driven organizations"], capabilities: ["Data integrations", "Live dashboards", "Alerts and reporting"], delivery: "6–12 weeks", engagement: "Advanced", cta: "View capabilities" },
        { title: "Investigation & Evidence Systems", description: "Software for research, case management, evidence organization, timelines and investigative workflows.", category: "intelligence", idealFor: ["Investigative teams", "Researchers", "Public institutions"], capabilities: ["Case and evidence management", "Timeline and relationship analysis", "Controlled reporting"], delivery: "8–16 weeks", engagement: "Enterprise", cta: "Discuss this system" },
        { title: "Trust, Compliance & Quality Systems", description: "Governance, audit, evidence and quality engineering for controlled operational workflows.", category: "trust", idealFor: ["Regulated businesses", "Quality teams", "Public institutions"], capabilities: ["Controls and audit trails", "Evidence-based decisions", "Aurora, QALens and AisoSec integration"], delivery: "8–16 weeks", engagement: "Enterprise", cta: "View capabilities" },
        { title: "Custom Engineering", description: "Tailored software for complex or unusual business problems that do not fit a standard category.", category: "custom", idealFor: ["Complex operations", "New digital ventures", "Specialist organizations"], capabilities: ["Discovery and architecture", "Custom integrations", "Production engineering"], delivery: "Scope-dependent", engagement: "Enterprise", cta: "Discuss this system" },
      ],
      detail: { close: "Close", includes: "What the solution includes", idealFor: "Ideal for", capabilities: "Core capabilities", delivery: "Typical delivery", engagement: "Engagement level", contact: "Discuss your project" },
    },
    technicalFocus: {
      kicker: "Technical Focus",
      title: "Built around systems that need clarity.",
      copy:
        "The work is strongest where product thinking, architecture and implementation quality need to meet in the same interface.",
      areas: [
        { title: "AI-assisted software systems", description: "Applied AI that supports real decisions while keeping evidence, review and control visible.", capabilities: ["Knowledge retrieval", "Evaluation", "Human review"], related: ["QALens", "AisoSec Audit"] },
        { title: "Fintech and compliance tooling", description: "Controlled workflows for regulated operations, risk analysis and traceable decisions.", capabilities: ["Policy gates", "Risk controls", "Audit trails"], related: ["Aurora", "Market Surveillance AI"] },
        { title: "Desktop applications", description: "Focused tools for analysts and specialists who need dense information without interface friction.", capabilities: ["Cross-platform UI", "Local workflows", "Secure integration"], related: ["WhaleScope Desktop"] },
        { title: "Backend architecture", description: "Service foundations designed for clear boundaries, reliable operations and measured growth.", capabilities: ["API design", "Data models", "Observability"], related: [] },
        { title: "Audit-ready reporting", description: "Structured outputs that connect findings to evidence, controls and accountable review.", capabilities: ["Evidence capture", "Control mapping", "PDF outputs"], related: ["AisoSec Audit", "Aurora"] },
        { title: "Developer workflow automation", description: "Guardrailed automation that reduces repetitive work without hiding consequential actions.", capabilities: ["AI agents", "Approval gates", "Delivery evidence"], related: ["AgentDock", "QALens"] },
      ],
    },
    engineeringPrinciples: {
      kicker: "Engineering Principles",
      title: "Architecture choices that reduce risk.",
      principles: [
        {
          title: "Practical AI over hype",
          body:
            "AI is used where it improves a workflow, reduces review time or clarifies evidence. The system still has to be useful without a pitch deck.",
        },
        {
          title: "Deterministic outputs where trust matters",
          body:
            "Compliance, finance and audit workflows need repeatable results, traceable inputs and clear failure states.",
        },
        {
          title: "Secure-by-default workflows",
          body:
            "Approval gates, scoped permissions, transparent logs and conservative automation are treated as product requirements.",
        },
        {
          title: "Human-in-the-loop decision systems",
          body:
            "Good software improves expert judgment. It should surface context, explain outputs and keep final decisions accountable.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Discuss a serious software system.",
      copy:
        "For AI-assisted applications, compliance tools, developer workflow automation or technical prototypes that need a clear architecture before they need noise.",
      emailCta: "Email CAUCO",
      linkedinCta: "LinkedIn",
      inquiryTitle: "Project inquiry",
      formAriaLabel: "Project inquiry placeholder",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      workstreamLabel: "Workstream",
      workstreamPlaceholder: "AI system, compliance tool, prototype...",
      contextLabel: "Context",
      contextPlaceholder:
        "Shortly describe the workflow, risk or system you want to build.",
      prepareCta: "Prepare Inquiry",
      sendingCta: "Sending...",
      successMessage: "Message sent successfully. I’ll get back to you soon.",
      errorMessage:
        "Message could not be sent. Please email claudio@aisosu.fi directly.",
    },
    footer: {
      copyright: "Claudio Valenzuela / CAUCO.",
      privacy: "Privacy",
      dataDeletion: "Data deletion",
      positioning: "Applied AI systems, trust infrastructure and technical interfaces for work that needs clarity.",
      navigationLabel: "CAUCO ecosystem",
      systemsLabel: "Systems",
      labLabel: "Lab",
      connectLabel: "Connect",
      emailLabel: "Email",
      topLabel: "Back to top",
    },
  },
  fi: {
    language: "fi",
    header: {
      homeLabel: "CAUCO etusivu",
      nav: nav.fi,
      cta: "Aloita keskustelu",
      languages: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    hero: {
      eyebrow: "Claudio Valenzuela / CAUCO",
      title: "Ohjelmistoarkkitehti & AI-järjestelmien rakentaja",
      subtitle:
        "Suunnittelen ja rakennan käytännönläheisiä AI-pohjaisia ohjelmistojärjestelmiä finanssialalle, vaatimustenmukaisuuteen, kehittäjätyönkulkuihin ja institutionaalisiin prosesseihin.",
      primaryCta: "Katso järjestelmät",
      secondaryCta: "Yhteys",
    },
    reel: {
      title: "CAUCO engineering reel", play: "Katso reel", close: "Sulje reel", pause: "Keskeytä reel", resume: "Jatka reeliä", restart: "Aloita reel alusta", replay: "Katso uudelleen", explore: "Tutustu töihin", back: "Takaisin sivustolle", controls: "Reelin ohjaimet", progress: "Reelin eteneminen", reduced: "Liikettä vähentävä reelin yhteenveto",
      phaseLabels: ["Osaaminen", "Näytöt", "Teknologia"], entry: ["OHJELMISTOARKKITEHTI", "AI-JÄRJESTELMIEN RAKENTAJA", "KOKONAISIA TUOTTEITA"], question: "MITÄ TÄMÄ HENKILÖ OSAA RAKENTAA?",
      capabilities: ["AI-järjestelmät", "Backend-arkkitehtuuri", "Kehittäjätyökalut", "Työpöytäsovellukset", "Fintech", "Vaatimustenmukaisuus", "Digitaalinen luottamus", "Automaatio", "Tuotekehitys"], capabilityStatement: "MONIMUTKAISESTA ONGELMASTA TOIMIVAKSI TUOTTEEKSI.",
      buildLabel: "Kokonaisvaltainen toteutus", buildSpan: ["Tuoteajattelu", "Järjestelmäarkkitehtuuri", "Tuotantovalmis ohjelmisto"], buildStatement: "YKSI TEKIJÄ. KOKO JÄRJESTELMÄ.",
      projects: ["Aurora", "QALens", "AisoSec Audit", "WhaleScope", "Market Surveillance AI", "KümeVet", "Streakly", "AisoFlow"], evidenceStatement: "KAHDEKSAN TUOTETTA. YKSI TAPA TOIMIA: RAKENNA KOKONAISUUS.",
      architectureLabel: "Yhdistävä osaaminen", architectureStatement: "KÄYTTÖLIITTYMÄT, ÄLY, INFRASTRUKTUURI JA LUOTTAMUS — YHTENÄ KOKONAISUUTENA.",
      technology: ["TypeScript", "React", "Node.js", "Python", "FastAPI", "Flutter", "PostgreSQL", "Docker", "Git", "AI"], technologyStatement: "TYÖKALUT VAIHTUVAT. INSINÖÖRIOSAAMINEN SKAALAUTUU.",
      closing: "RAKENNAN OHJELMISTOJA ARKKITEHTUURIN, TEKOÄLYN JA LUOTTAMUKSEN RAJAPINTAAN.", chapters: ["Ohjelmistoarkkitehti ja tuoterakentaja", "Laaja-alainen tuotekehitysosaaminen", "Kokonaisvaltainen toteutus", "Kahdeksan tuotesuuntaa näyttönä", "Arkkitehtuuri yhdistävänä osaamisena", "Monipuolinen teknologiapino", "Arkkitehtuuri, tekoäly ja luottamus"],
    },
    featuredSystems: {
      kicker: "Valitut järjestelmät",
      title: "Sovellettua ohjelmistoa korkean luottamuksen työnkulkuihin.",
      copy:
        "Valikoituja järjestelmiä ja prototyyppejä, joissa painottuvat käytännön automaatio, deterministiset tarkistusprosessit, raportointi ja selkeät tekniset käyttöliittymät.",
      systems: [
        {
          id: "aurora",
          name: "Aurora",
          category: "Digitaalisen luottamuksen ja varojen alusta",
          description: "Institutionaalinen kontrolli identiteetille, evidenssille, käyttöoikeuksille ja säännellyille digitaalisten varojen operaatioille.",
          status: "Aktiivinen kehitys",
          capabilities: ["Politiikkaportit", "Vahvistettu identiteetti", "Evidenssipaketit", "Auditointijälki"],
          story: ["Pyyntö vastaanotettu", "Identiteetti vahvistettu", "Käyttöoikeus tarkistettu", "Politiikkaportti", "Evidenssipaketti", "Ihmisen tarkistus", "Hallittu päätös"],
          cta: "Tutustu Auroraan",
          href: "/projects/aurora-digital-assets.html",
        },
        {
          id: "qalens",
          name: "QALens",
          category: "AI-ohjelmistotuotannon laatuäly",
          description: "Muuntaa ohjelmisto-ongelmat QA-riskianalyysiksi, parannuksiksi, testitapauksiksi ja toimitusevidenssiksi.",
          status: "Prototyyppi",
          capabilities: ["Ongelma-analyysi", "QA-riski", "Testisuunnittelu", "Toimitusluottamus"],
          story: ["Ongelma vastaanotettu", "QA-riski havaittu", "Parannus ehdotettu", "Testitapaukset luotu", "Toimitusevidenssi"],
          cta: "Tapaustutkimus kehitteillä",
        },
        {
          id: "aisosec",
          name: "AisoSec Audit",
          category: "AI-vaatimustenmukaisuus- ja auditointialusta",
          description: "Jalostaa tekniset havainnot evidenssiksi, kontrollikartoituksiksi, riskipuutteiksi ja ammattimaisiksi auditointituloksiksi.",
          status: "Aktiivinen kehitys",
          capabilities: ["Havaintojen tarkistus", "Evidenssin keruu", "Kontrollikartoitus", "Auditointiraportit"],
          story: ["Havainto tunnistettu", "Evidenssi kerätty", "Vakavuus arvioitu", "Viitekehyskartoitus", "Compliance-puute", "Auditointitulos"],
          cta: "Tapaustutkimus kehitteillä",
        },
        {
          id: "whalescope",
          name: "WhaleScope",
          category: "Digitaalisten varojen tutkimusäly",
          description: "Markkinoiden, institutionaalisten virtojen ja lohkoketjudatan analyysi digitaalisten varojen tutkimukseen.",
          status: "Tutkimusjärjestelmä",
          capabilities: ["Institutionaaliset virrat", "Whale-signaalit", "Markkinakonteksti", "Tutkimusraportit"],
          story: ["Markkinatapahtuma", "Institutionaalinen virta", "Suuri transaktio", "Signaalin tulkinta", "Tutkimushavainto"],
          cta: "Tutkimusjärjestelmä",
        },
      ],
      projects: [
        {
          name: "AgentDock",
          description:
            "Mobiililähtöinen komentokeskus AI-koodausagenteille, repositoriotyönkuluille, hyväksyntäporteille ja hallitulle automaatiolle.",
          tags: [
            "AI-agentit",
            "Kehittäjätyökalut",
            "FastAPI",
            "Mobiili",
            "Git-työnkulut",
          ],
        },
        {
          name: "Aurora Digital Assets",
          description:
            "Institutionaalinen kontrollikerros säännellyille digitaalisten varojen työnkuluille, yhdistäen riskien arvioinnin, vaatimustenmukaisuuden, turvallisuusrajat ja auditointivalmiin evidenssin.",
          tags: [
            "Digitaaliset varat",
            "Pankkitoiminta",
            "Vaatimustenmukaisuus",
            "Säilytyksen rajat",
            "Auditointijälki",
          ],
          href: "/projects/aurora-digital-assets.html",
        },
        {
          name: "Market Surveillance AI",
          description:
            "Työpöytäsovellus vaatimustenmukaisuuteen ja markkinavalvontaan, jossa on deterministiset hälytykset, tapauskäsittely ja PDF-raportointi.",
          tags: [
            "Vaatimustenmukaisuus",
            "PySide6",
            "SQLite",
            "PDF-raportit",
            "Markkinavalvonta",
          ],
        },
        {
          name: "WhaleScope Desktop",
          description:
            "Markkina- ja lohkoketjuanalytiikan työpöytäsovellus kryptotutkimukseen, suurten transaktioiden analyysiin ja raportointiin.",
          tags: [
            "Työpöytäsovellus",
            "Python",
            "Electron",
            "Markkinadata",
            "Lohkoketjuanalytiikka",
          ],
        },
        {
          name: "Deterministic Vault Factory",
          description:
            "Institutionaalinen älysopimusten riskianalyysijärjestelmä hyökkäyspinnan arviointiin, hallintoriskeihin ja todistusaineiston paketointiin.",
          tags: [
            "Älysopimukset",
            "Tietoturva",
            "Slither",
            "Riskianalyysi",
            "Todistusaineisto",
          ],
        },
      ],
    },
    ecosystem: {
      label: "Luottamusinfrastruktuurin ekosysteemi",
      title: "Ei erillisiä tuotteita. Yksi luottamusinfrastruktuuri.",
      description: "Aurora, QALens ja AisoSec mallintavat yhdistettyjä tarkistusprosesseja jaetun luottamusytimen ympärillä: identiteetti, politiikka, evidenssi ja vastuulliset päätökset.",
      coreLabel: "Aurora Trust Engine / Jaettu luottamusydin",
      layers: ["Identiteetti", "Politiikka", "Evidenssi", "Päätökset"],
      summary: "Visualisoitu arkkitehtuuri siitä, miten järjestelmäkohtaiset tarkistusprosessit voivat jakaa identiteetti-, politiikka-, evidenssi- ja päätöskerrokset.",
    },
    lab: {
      label: "Saatavilla asiakastöihin",
      bridge: "Kaupallista ohjelmistokehitystä käytännön toimintaan ja vaativiin institutionaalisiin tarpeisiin.",
      title: "Ohjelmistojärjestelmiä todellisiin liiketoiminnan tarpeisiin.",
      description: "Verkkosivustoja, alustoja, mobiilisovelluksia, tekoälyjärjestelmiä, analytiikkatyökaluja ja räätälöityjä teknisiä ratkaisuja erikokoisille organisaatioille.",
      filters: { all: "Kaikki", web: "Verkko", commerce: "Kauppa", operations: "Toiminnot", mobile: "Mobiili", ai: "AI", intelligence: "Analytiikka", trust: "Luottamus", custom: "Räätälöity" },
      products: [
        { title: "Yritysten verkkosivustot", description: "Ammattimaiset monikieliset sivustot, jotka esittelevät yrityksen selkeästi ja muuttavat kävijät asiakkaiksi.", category: "web", idealFor: ["Kasvuyritykset", "Asiantuntijapalvelut", "Kansainväliset tiimit"], capabilities: ["Sisällönhallinta", "Monikielinen käyttökokemus", "Hakukoneoptimointi ja mittaus"], delivery: "2–5 viikkoa", engagement: "Starter", cta: "Tutustu ratkaisuun" },
        { title: "Verkkokauppa-alustat", description: "Verkkokaupat maksuineen, tuotehallintoineen, tilausprosesseineen, varastoineen ja analytiikkoineen.", category: "commerce", idealFor: ["Kauppiaat", "Valmistajat", "Tilauspalvelut"], capabilities: ["Maksut ja kassa", "Varasto ja tilaukset", "Kaupan analytiikka"], delivery: "4–8 viikkoa", engagement: "Professional", cta: "Katso ominaisuudet" },
        { title: "Ajanvarausjärjestelmät", description: "Ajanvaraus, saatavuus, muistutukset, maksut ja hallintatyökalut yhtenä kokonaisuutena.", category: "operations", idealFor: ["Klinikat ja studiot", "Majoitusala", "Kenttäpalvelut"], capabilities: ["Reaaliaikainen saatavuus", "Automaattiset muistutukset", "Maksut ja hallinta"], delivery: "4–8 viikkoa", engagement: "Professional", cta: "Tutustu ratkaisuun" },
        { title: "Asiakas- ja jäsenportaalit", description: "Turvalliset portaalit asiakkaille, jäsenille, kumppaneille tai sisäisille tiimeille.", category: "operations", idealFor: ["Jäsenorganisaatiot", "B2B-palvelut", "Hajautetut tiimit"], capabilities: ["Tunnistautuminen ja oikeudet", "Dokumenttityönkulut", "Itsepalvelunäkymät"], delivery: "6–12 viikkoa", engagement: "Advanced", cta: "Keskustele järjestelmästä" },
        { title: "Mobiilisovellukset", description: "iOS- ja Android-sovellukset taustapalveluineen, ilmoituksineen ja käyttäjähallintoineen.", category: "mobile", idealFor: ["Digitaaliset palvelut", "Operatiiviset tiimit", "Yhdistetyt tuotteet"], capabilities: ["iOS ja Android", "Push-ilmoitukset", "Turvalliset API-liitännät"], delivery: "8–16 viikkoa", engagement: "Advanced", cta: "Katso ominaisuudet" },
        { title: "AI-liiketoiminta-avustajat", description: "Yksityiset tekoälyavustajat, jotka hyödyntävät yrityksen tietoa, dokumentteja, rajapintoja ja työnkulkuja.", category: "ai", idealFor: ["Asiantuntijatiimit", "Asiakastoiminnot", "Säännellyt organisaatiot"], capabilities: ["Yksityinen tiedonhaku", "Työnkulkuautomaatio", "Käyttöoikeudet ja arviointi"], delivery: "6–12 viikkoa", engagement: "Advanced", cta: "Keskustele järjestelmästä" },
        { title: "Analytiikka- ja valvonta-alustat", description: "Kojelaudat, raportointi, reaaliaikainen valvonta, hälytykset ja päätöksenteon tuki.", category: "intelligence", idealFor: ["Operatiivinen johto", "Tutkimustiimit", "Dataohjatut organisaatiot"], capabilities: ["Dataintegraatiot", "Reaaliaikaiset kojelaudat", "Hälytykset ja raportointi"], delivery: "6–12 viikkoa", engagement: "Advanced", cta: "Katso ominaisuudet" },
        { title: "Tutkinta- ja evidenssijärjestelmät", description: "Ohjelmistoja tutkimukseen, tapausten hallintaan, evidenssin jäsentämiseen, aikajanoihin ja raportointiin.", category: "intelligence", idealFor: ["Tutkintatiimit", "Tutkijat", "Julkiset organisaatiot"], capabilities: ["Tapaus- ja evidenssihallinta", "Aikajana- ja suhdeanalyysi", "Hallittu raportointi"], delivery: "8–16 viikkoa", engagement: "Enterprise", cta: "Keskustele järjestelmästä" },
        { title: "Luottamus-, compliance- ja laatujärjestelmät", description: "Hallintoa, auditointia, evidenssiä ja laatujärjestelmiä kontrolloituihin työnkulkuihin.", category: "trust", idealFor: ["Säännellyt yritykset", "Laatutiimit", "Julkiset organisaatiot"], capabilities: ["Kontrollit ja auditointijäljet", "Evidenssipohjaiset päätökset", "Aurora-, QALens- ja AisoSec-integraatiot"], delivery: "8–16 viikkoa", engagement: "Enterprise", cta: "Katso ominaisuudet" },
        { title: "Räätälöity ohjelmistokehitys", description: "Mittatilausohjelmistoja monimutkaisiin tai poikkeuksellisiin tarpeisiin, joihin vakioratkaisu ei sovi.", category: "custom", idealFor: ["Monimutkaiset toiminnot", "Uudet digitaaliset palvelut", "Erikoisorganisaatiot"], capabilities: ["Määrittely ja arkkitehtuuri", "Räätälöidyt integraatiot", "Tuotantotason toteutus"], delivery: "Laajuuden mukaan", engagement: "Enterprise", cta: "Keskustele järjestelmästä" },
      ],
      detail: { close: "Sulje", includes: "Mitä ratkaisu sisältää", idealFor: "Sopii erityisesti", capabilities: "Keskeiset ominaisuudet", delivery: "Tyypillinen toimitusaika", engagement: "Yhteistyön taso", contact: "Keskustele projektistasi" },
    },
    technicalFocus: {
      kicker: "Tekninen painopiste",
      title: "Rakennettu järjestelmille, jotka tarvitsevat selkeyttä.",
      copy:
        "Työ on vahvimmillaan siellä, missä tuoteajattelun, arkkitehtuurin ja toteutuksen laadun pitää kohdata samassa käyttöliittymässä.",
      areas: [
        { title: "AI-avusteiset ohjelmistojärjestelmät", description: "Sovellettua tekoälyä todellisten päätösten tueksi niin, että evidenssi, tarkistus ja hallinta säilyvät näkyvinä.", capabilities: ["Tiedonhaku", "Arviointi", "Ihmisen tarkistus"], related: ["QALens", "AisoSec Audit"] },
        { title: "Fintech- ja vaatimustenmukaisuustyökalut", description: "Hallittuja työnkulkuja säänneltyihin toimintoihin, riskianalyysiin ja jäljitettäviin päätöksiin.", capabilities: ["Käytäntöportit", "Riskikontrollit", "Auditointijäljet"], related: ["Aurora", "Market Surveillance AI"] },
        { title: "Työpöytäsovellukset", description: "Kohdennettuja työkaluja analyytikoille ja asiantuntijoille, jotka tarvitsevat tiivistä tietoa ilman käyttöliittymän kitkaa.", capabilities: ["Monialustainen UI", "Paikalliset työnkulut", "Turvalliset integraatiot"], related: ["WhaleScope Desktop"] },
        { title: "Taustajärjestelmien arkkitehtuuri", description: "Palveluperustat selkeisiin vastuualueisiin, luotettavaan toimintaan ja hallittuun kasvuun.", capabilities: ["API-suunnittelu", "Tietomallit", "Havainnoitavuus"], related: [] },
        { title: "Auditointivalmis raportointi", description: "Rakenteiset tulokset, jotka yhdistävät havainnot evidenssiin, kontrolleihin ja vastuulliseen tarkistukseen.", capabilities: ["Evidenssin tallennus", "Kontrollikartoitus", "PDF-tulosteet"], related: ["AisoSec Audit", "Aurora"] },
        { title: "Kehittäjätyönkulkujen automaatio", description: "Suojakaiteilla rajattua automaatiota, joka vähentää toistuvaa työtä piilottamatta merkityksellisiä toimia.", capabilities: ["AI-agentit", "Hyväksyntäportit", "Toimitusevidenssi"], related: ["AgentDock", "QALens"] },
      ],
    },
    engineeringPrinciples: {
      kicker: "Suunnitteluperiaatteet",
      title: "Arkkitehtuurivalintoja, jotka vähentävät riskiä.",
      principles: [
        {
          title: "Käytännön AI ennen hypeä",
          body:
            "AI:ta käytetään siellä, missä se parantaa työnkulkua, lyhentää tarkistusaikaa tai selkeyttää todistusaineistoa. Järjestelmän pitää olla hyödyllinen ilman myyntiesitystäkin.",
        },
        {
          title: "Deterministiset tulokset siellä, missä luottamus ratkaisee",
          body:
            "Vaatimustenmukaisuus-, finanssi- ja auditointityönkulut tarvitsevat toistettavia tuloksia, jäljitettäviä syötteitä ja selkeitä virhetiloja.",
        },
        {
          title: "Oletusarvoisesti turvalliset työnkulut",
          body:
            "Hyväksyntäportit, rajatut käyttöoikeudet, läpinäkyvät lokit ja varovainen automaatio käsitellään tuotevaatimuksina.",
        },
        {
          title: "Ihminen mukana päätöksenteossa",
          body:
            "Hyvä ohjelmisto parantaa asiantuntijan harkintaa. Sen tulee nostaa esiin konteksti, selittää tulokset ja pitää lopulliset päätökset vastuullisina.",
        },
      ],
    },
    contact: {
      kicker: "Yhteys",
      title: "Keskustellaan vaativasta ohjelmistojärjestelmästä.",
      copy:
        "AI-avusteisiin sovelluksiin, vaatimustenmukaisuustyökaluihin, kehittäjätyönkulkujen automaatioon tai teknisiin prototyyppeihin, jotka tarvitsevat selkeän arkkitehtuurin ennen melua.",
      emailCta: "Lähetä sähköpostia",
      linkedinCta: "LinkedIn",
      inquiryTitle: "Projektikysely",
      formAriaLabel: "Projektikyselyn luonnos",
      nameLabel: "Nimi",
      namePlaceholder: "Nimesi",
      emailLabel: "Sähköposti",
      emailPlaceholder: "sinä@example.com",
      workstreamLabel: "Työnkulku",
      workstreamPlaceholder:
        "AI-järjestelmä, vaatimustenmukaisuustyökalu, prototyyppi...",
      contextLabel: "Konteksti",
      contextPlaceholder:
        "Kuvaa lyhyesti työnkulku, riski tai järjestelmä, jonka haluat rakentaa.",
      prepareCta: "Valmistele kysely",
      sendingCta: "Lähetetään...",
      successMessage: "Viesti lähetettiin onnistuneesti. Palaan pian asiaan.",
      errorMessage:
        "Viestiä ei voitu lähettää. Lähetä sähköpostia suoraan osoitteeseen claudio@aisosu.fi.",
    },
    footer: {
      copyright: "Claudio Valenzuela / CAUCO.",
      privacy: "Tietosuoja",
      dataDeletion: "Tietojen poistaminen",
      positioning: "Sovellettuja AI-järjestelmiä, luottamusinfrastruktuuria ja teknisiä käyttöliittymiä selkeyttä vaativaan työhön.",
      navigationLabel: "CAUCO-ekosysteemi",
      systemsLabel: "Järjestelmät",
      labLabel: "Lab",
      connectLabel: "Yhteys",
      emailLabel: "Sähköposti",
      topLabel: "Takaisin alkuun",
    },
  },
  sv: {
    language: "sv",
    header: {
      homeLabel: "CAUCO startsida",
      nav: nav.sv,
      cta: "Starta en dialog",
      languages: {
        en: "English",
        fi: "Suomi",
        sv: "Svenska",
      },
    },
    hero: {
      eyebrow: "Claudio Valenzuela / CAUCO",
      title: "Programvaruarkitekt & AI-systembyggare",
      subtitle:
        "Jag designar och bygger praktiska AI-drivna programvarusystem för finans, regelefterlevnad, utvecklarflöden och institutionella arbetsflöden.",
      primaryCta: "Visa system",
      secondaryCta: "Kontakt",
    },
    reel: {
      title: "CAUCO engineering reel", play: "Spela reel", close: "Stäng reel", pause: "Pausa reel", resume: "Fortsätt reel", restart: "Starta om reel", replay: "Spela igen", explore: "Utforska arbetet", back: "Tillbaka till webbplatsen", controls: "Reelkontroller", progress: "Reelens förlopp", reduced: "Reelsammanfattning med minskad rörelse",
      phaseLabels: ["Förmågor", "Bevis", "Teknik"], entry: ["PROGRAMVARUARKITEKT", "AI-SYSTEMBYGGARE", "KOMPLETTA PRODUKTER"], question: "VAD KAN DEN HÄR PERSONEN BYGGA?",
      capabilities: ["AI-system", "Backendarkitektur", "Utvecklarverktyg", "Skrivbordsapplikationer", "Fintech", "Regelefterlevnad", "Digital tillit", "Automation", "Produktutveckling"], capabilityStatement: "FRÅN KOMPLEXT PROBLEM TILL FUNGERANDE PRODUKT.",
      buildLabel: "Helhetsansvar", buildSpan: ["Produkttänkande", "Systemarkitektur", "Produktionsmjukvara"], buildStatement: "EN INGENJÖR. HELA SYSTEMET.",
      projects: ["Aurora", "QALens", "AisoSec Audit", "WhaleScope", "Market Surveillance AI", "KümeVet", "Streakly", "AisoFlow"], evidenceStatement: "ÅTTA PRODUKTER. ETT ARBETSSÄTT: BYGG HELHETEN.",
      architectureLabel: "Den förenande disciplinen", architectureStatement: "GRÄNSSNITT, INTELLIGENS, INFRASTRUKTUR OCH TILLIT — UTFORMADE SOM EN HELHET.",
      technology: ["TypeScript", "React", "Node.js", "Python", "FastAPI", "Flutter", "PostgreSQL", "Docker", "Git", "AI"], technologyStatement: "VERKTYG FÖRÄNDRAS. INGENJÖRSOMDÖME SKALAR.",
      closing: "JAG BYGGER PROGRAMVARA DÄR ARKITEKTUR, AI OCH TILLIT MÖTS.", chapters: ["Programvaruarkitekt och produktbyggare", "Förmågor inom hela produktutvecklingen", "Helhetsansvar", "Åtta produktriktningar som bevis", "Arkitektur som förenande disciplin", "En mångsidig teknikstack", "Arkitektur, AI och tillit"],
    },
    featuredSystems: {
      kicker: "Utvalda system",
      title: "Tillämpad programvara för arbetsflöden med högt förtroende.",
      copy:
        "Utvalda system och prototyper med fokus på praktisk automatisering, deterministiska granskningsflöden, rapportering och användbara tekniska gränssnitt.",
      systems: [
        {
          id: "aurora",
          name: "Aurora",
          category: "Plattform för digital tillit och tillgångar",
          description: "Institutionell kontroll för identitet, evidens, behörigheter och reglerade operationer med digitala tillgångar.",
          status: "Aktiv utveckling",
          capabilities: ["Policygrindar", "Verifierad identitet", "Evidenspaket", "Revisionsspår"],
          story: ["Begäran mottagen", "Identitet verifierad", "Behörighet kontrollerad", "Policygrind", "Evidenspaket", "Mänsklig granskning", "Kontrollerat beslut"],
          cta: "Utforska Aurora",
          href: "/projects/aurora-digital-assets.html",
        },
        {
          id: "qalens",
          name: "QALens",
          category: "AI-driven kvalitet för programvaruutveckling",
          description: "Omvandlar programvaruproblem till QA-riskanalys, förbättringar, testfall och leveransevidens.",
          status: "Prototyp",
          capabilities: ["Problemanalys", "QA-risk", "Testdesign", "Leveranstillit"],
          story: ["Ärende mottaget", "QA-risk identifierad", "Förbättring föreslagen", "Testfall genererade", "Leveranstillit"],
          cta: "Fallstudie under utveckling",
        },
        {
          id: "aisosec",
          name: "AisoSec Audit",
          category: "AI-plattform för compliance och säkerhetsrevision",
          description: "Omvandlar tekniska fynd till evidens, regelverksmappningar, riskluckor och professionella revisionsunderlag.",
          status: "Aktiv utveckling",
          capabilities: ["Fyndgranskning", "Evidensinsamling", "Kontrollmappning", "Revisionsrapporter"],
          story: ["Fynd identifierat", "Evidens insamlad", "Allvarlighet bedömd", "Ramverksmappning", "Compliance-gap", "Revisionsunderlag"],
          cta: "Fallstudie under utveckling",
        },
        {
          id: "whalescope",
          name: "WhaleScope",
          category: "Analys för forskning om digitala tillgångar",
          description: "Marknadsanalys, institutionella flöden och on-chain-data för kvalificerad forskning om digitala tillgångar.",
          status: "Forskningssystem",
          capabilities: ["Institutionella flöden", "Whale-signaler", "Marknadskontext", "Forskningsrapporter"],
          story: ["Marknadshändelse", "Institutionellt flöde", "Stor transaktion", "Signaltolkning", "Forskningsinsikt"],
          cta: "Forskningssystem",
        },
      ],
      projects: [
        {
          name: "AgentDock",
          description:
            "Mobilförst kommandocenter för AI-kodningsagenter, repository-flöden, godkännandegrindar och kontrollerad automatisering.",
          tags: [
            "AI-agenter",
            "Utvecklarverktyg",
            "FastAPI",
            "Mobil",
            "Git-flöden",
          ],
        },
        {
          name: "Aurora Digital Assets",
          description:
            "Institutionellt kontrollager för reglerade digitala tillgångsflöden, med riskgranskning, regelefterlevnad, säkerhetsgränser och revisionsklar evidens.",
          tags: [
            "Digitala tillgångar",
            "Banking",
            "Regelefterlevnad",
            "Förvaringsgränser",
            "Revisionsspår",
          ],
          href: "/projects/aurora-digital-assets.html",
        },
        {
          name: "Market Surveillance AI",
          description:
            "Skrivbordsapplikation för regelefterlevnad och marknadsövervakning med deterministiska larm, ärendegranskning och PDF-rapportering.",
          tags: [
            "Regelefterlevnad",
            "PySide6",
            "SQLite",
            "PDF-rapporter",
            "Marknadsövervakning",
          ],
        },
        {
          name: "WhaleScope Desktop",
          description:
            "Skrivbordsapplikation för marknads- och on-chain-analys inom kryptoforskning, analys av stora transaktioner och rapportering.",
          tags: [
            "Skrivbordsapp",
            "Python",
            "Electron",
            "Marknadsdata",
            "On-chain-analys",
          ],
        },
        {
          name: "Deterministic Vault Factory",
          description:
            "Institutionellt system för riskanalys av smarta kontrakt med granskning av attackyta, styrningsrisk och paketering av bevisunderlag.",
          tags: [
            "Smarta kontrakt",
            "Säkerhet",
            "Slither",
            "Riskanalys",
            "Bevisunderlag",
          ],
        },
      ],
    },
    ecosystem: {
      label: "Ekosystem för tillitsinfrastruktur",
      title: "Inte separata produkter. En tillitsinfrastruktur.",
      description: "Aurora, QALens och AisoSec modellerar sammanhängande granskningsflöden kring en gemensam tillitskärna: identitet, policy, evidens och ansvariga beslut.",
      coreLabel: "Aurora Trust Engine / Gemensam tillitskärna",
      layers: ["Identitet", "Policy", "Evidens", "Beslut"],
      summary: "En visualiserad arkitektur som visar hur systemspecifika granskningsflöden kan dela identitets-, policy-, evidens- och beslutslager.",
    },
    lab: {
      label: "Tillgängligt för kunduppdrag",
      bridge: "Kommersiell programvaruutveckling för praktisk verksamhet och komplexa institutionella behov.",
      title: "Programvarusystem för verkliga affärsproblem.",
      description: "En katalog med webbplatser, plattformar, mobilappar, AI-system, analysverktyg och skräddarsydda tekniska lösningar för organisationer av olika storlek.",
      filters: { all: "Alla", web: "Webb", commerce: "Handel", operations: "Verksamhet", mobile: "Mobil", ai: "AI", intelligence: "Analys", trust: "Tillit", custom: "Skräddarsytt" },
      products: [
        { title: "Företagswebbplatser", description: "Professionella flerspråkiga webbplatser som presenterar företaget tydligt och omvandlar besökare till kunder.", category: "web", idealFor: ["Växande företag", "Expertjänster", "Internationella team"], capabilities: ["Innehållshantering", "Flerspråkig UX", "SEO och konverteringsmätning"], delivery: "2–5 veckor", engagement: "Starter", cta: "Utforska lösningen" },
        { title: "E-handelsplattformar", description: "Nätbutiker med betalningar, produkthantering, orderflöden, lager och analys.", category: "commerce", idealFor: ["Återförsäljare", "Tillverkare", "Prenumerationstjänster"], capabilities: ["Betalning och kassa", "Lager och order", "Handelsanalys"], delivery: "4–8 veckor", engagement: "Professional", cta: "Se funktioner" },
        { title: "Boknings- och reservationssystem", description: "Tidsbokning, tillgänglighet, påminnelser, betalningar och administration i ett flöde.", category: "operations", idealFor: ["Kliniker och studior", "Hotell och restaurang", "Fälttjänster"], capabilities: ["Tillgänglighet i realtid", "Automatiska påminnelser", "Betalning och administration"], delivery: "4–8 veckor", engagement: "Professional", cta: "Utforska lösningen" },
        { title: "Kund- och medlemsportaler", description: "Säkra portaler för kunder, medlemmar, partner eller interna team med dokumentåtkomst.", category: "operations", idealFor: ["Medlemsorganisationer", "B2B-tjänster", "Distribuerade team"], capabilities: ["Identitet och behörighet", "Dokumentflöden", "Självbetjäningsvyer"], delivery: "6–12 veckor", engagement: "Advanced", cta: "Diskutera systemet" },
        { title: "Mobilapplikationer", description: "Plattformsoberoende appar för iOS och Android med backend, notiser och kontohantering.", category: "mobile", idealFor: ["Digitala tjänster", "Operativa team", "Uppkopplade produkter"], capabilities: ["iOS och Android", "Pushnotiser", "Säker API-integration"], delivery: "8–16 veckor", engagement: "Advanced", cta: "Se funktioner" },
        { title: "AI-assistenter för företag", description: "Privata AI-assistenter kopplade till företagets kunskap, dokument, API:er och arbetsflöden.", category: "ai", idealFor: ["Kunskapsteam", "Kundverksamhet", "Reglerade organisationer"], capabilities: ["Privat kunskapssökning", "Automatiserade arbetsflöden", "Åtkomstkontroll och utvärdering"], delivery: "6–12 veckor", engagement: "Advanced", cta: "Diskutera systemet" },
        { title: "Analys- och övervakningsplattformar", description: "Instrumentpaneler, rapportering, realtidsövervakning, larm och beslutsstöd.", category: "intelligence", idealFor: ["Verksamhetsledning", "Forskningsteam", "Datadrivna organisationer"], capabilities: ["Dataintegrationer", "Livepaneler", "Larm och rapportering"], delivery: "6–12 veckor", engagement: "Advanced", cta: "Se funktioner" },
        { title: "Utrednings- och bevissystem", description: "Programvara för forskning, ärendehantering, bevisstruktur, tidslinjer och utredningsflöden.", category: "intelligence", idealFor: ["Utredningsteam", "Forskare", "Offentliga institutioner"], capabilities: ["Ärende- och bevishantering", "Tidslinje- och relationsanalys", "Kontrollerad rapportering"], delivery: "8–16 veckor", engagement: "Enterprise", cta: "Diskutera systemet" },
        { title: "System för tillit, compliance och kvalitet", description: "Styrning, revision, evidens och kvalitetsteknik för kontrollerade arbetsflöden.", category: "trust", idealFor: ["Reglerade företag", "Kvalitetsteam", "Offentliga institutioner"], capabilities: ["Kontroller och revisionsspår", "Evidensbaserade beslut", "Aurora-, QALens- och AisoSec-integration"], delivery: "8–16 veckor", engagement: "Enterprise", cta: "Se funktioner" },
        { title: "Skräddarsydd systemutveckling", description: "Specialbyggd programvara för komplexa eller ovanliga behov som saknar standardlösning.", category: "custom", idealFor: ["Komplex verksamhet", "Nya digitala tjänster", "Specialistorganisationer"], capabilities: ["Förstudie och arkitektur", "Skräddarsydda integrationer", "Produktionsklar utveckling"], delivery: "Enligt omfattning", engagement: "Enterprise", cta: "Diskutera systemet" },
      ],
      detail: { close: "Stäng", includes: "Det här ingår", idealFor: "Passar särskilt", capabilities: "Centrala funktioner", delivery: "Typisk leveranstid", engagement: "Samarbetsnivå", contact: "Diskutera ditt projekt" },
    },
    technicalFocus: {
      kicker: "Tekniskt fokus",
      title: "Byggt kring system som behöver tydlighet.",
      copy:
        "Arbetet är starkast där produkttänkande, arkitektur och genomförandekvalitet behöver mötas i samma gränssnitt.",
      areas: [
        { title: "AI-assisterade programvarusystem", description: "Tillämpad AI som stöder verkliga beslut samtidigt som evidens, granskning och kontroll förblir synliga.", capabilities: ["Kunskapssökning", "Utvärdering", "Mänsklig granskning"], related: ["QALens", "AisoSec Audit"] },
        { title: "Fintech- och regelefterlevnadsverktyg", description: "Kontrollerade arbetsflöden för reglerad verksamhet, riskanalys och spårbara beslut.", capabilities: ["Policygrindar", "Riskkontroller", "Revisionsspår"], related: ["Aurora", "Market Surveillance AI"] },
        { title: "Skrivbordsapplikationer", description: "Fokuserade verktyg för analytiker och specialister som behöver tät information utan gränssnittsfriktion.", capabilities: ["Plattformsoberoende UI", "Lokala arbetsflöden", "Säker integration"], related: ["WhaleScope Desktop"] },
        { title: "Backendarkitektur", description: "Tjänstegrunder utformade för tydliga gränser, tillförlitlig drift och kontrollerad tillväxt.", capabilities: ["API-design", "Datamodeller", "Observerbarhet"], related: [] },
        { title: "Revisionsklar rapportering", description: "Strukturerade resultat som kopplar fynd till evidens, kontroller och ansvarig granskning.", capabilities: ["Evidensinsamling", "Kontrollmappning", "PDF-utdata"], related: ["AisoSec Audit", "Aurora"] },
        { title: "Automatisering av utvecklarflöden", description: "Skyddad automation som minskar repetitivt arbete utan att dölja betydelsefulla åtgärder.", capabilities: ["AI-agenter", "Godkännandegrindar", "Leveransevidens"], related: ["AgentDock", "QALens"] },
      ],
    },
    engineeringPrinciples: {
      kicker: "Tekniska principer",
      title: "Arkitekturval som minskar risk.",
      principles: [
        {
          title: "Praktisk AI framför hype",
          body:
            "AI används där den förbättrar ett arbetsflöde, minskar granskningstid eller förtydligar bevisunderlag. Systemet måste fortfarande vara användbart utan en säljpresentation.",
        },
        {
          title: "Deterministiska resultat där förtroende är avgörande",
          body:
            "Arbetsflöden inom regelefterlevnad, finans och revision behöver upprepningsbara resultat, spårbara indata och tydliga feltillstånd.",
        },
        {
          title: "Säkra arbetsflöden som standard",
          body:
            "Godkännandegrindar, avgränsade behörigheter, transparenta loggar och försiktig automatisering behandlas som produktkrav.",
        },
        {
          title: "Människa i beslutsflödet",
          body:
            "Bra programvara förbättrar expertbedömning. Den ska lyfta fram kontext, förklara resultat och hålla slutliga beslut ansvariga.",
        },
      ],
    },
    contact: {
      kicker: "Kontakt",
      title: "Diskutera ett seriöst programvarusystem.",
      copy:
        "För AI-assisterade applikationer, verktyg för regelefterlevnad, automatisering av utvecklarflöden eller tekniska prototyper som behöver tydlig arkitektur innan de behöver brus.",
      emailCta: "E-posta CAUCO",
      linkedinCta: "LinkedIn",
      inquiryTitle: "Projektförfrågan",
      formAriaLabel: "Utkast till projektförfrågan",
      nameLabel: "Namn",
      namePlaceholder: "Ditt namn",
      emailLabel: "E-post",
      emailPlaceholder: "du@example.com",
      workstreamLabel: "Arbetsflöde",
      workstreamPlaceholder:
        "AI-system, verktyg för regelefterlevnad, prototyp...",
      contextLabel: "Kontext",
      contextPlaceholder:
        "Beskriv kort arbetsflödet, risken eller systemet du vill bygga.",
      prepareCta: "Förbered förfrågan",
      sendingCta: "Skickar...",
      successMessage:
        "Meddelandet skickades. Jag återkommer till dig snart.",
      errorMessage:
        "Meddelandet kunde inte skickas. Mejla claudio@aisosu.fi direkt.",
    },
    footer: {
      copyright: "Claudio Valenzuela / CAUCO.",
      privacy: "Integritet",
      dataDeletion: "Radering av data",
      positioning: "Tillämpade AI-system, tillitsinfrastruktur och tekniska gränssnitt för arbete som kräver tydlighet.",
      navigationLabel: "CAUCO-ekosystem",
      systemsLabel: "System",
      labLabel: "Lab",
      connectLabel: "Kontakt",
      emailLabel: "E-post",
      topLabel: "Tillbaka till toppen",
    },
  },
} satisfies Record<Language, SiteContent>;

export function detectLanguage(pathname = window.location.pathname): Language {
  if (pathname.includes("index-fi")) {
    return "fi";
  }

  if (pathname.includes("index-sv")) {
    return "sv";
  }

  return "en";
}
