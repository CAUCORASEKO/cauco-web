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
};

export type PrincipleContent = {
  title: string;
  body: string;
};

export type LabCategory = "all" | "software" | "research" | "ui" | "templates" | "ai" | "downloads";

export type LabProductContent = {
  title: string;
  description: string;
  category: Exclude<LabCategory, "all">;
  status: "coming" | "research" | "free" | "premium" | "prototype";
  statusLabel: string;
  cta: string;
  href?: string;
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
    entry: string[]; problemItems: string[]; problemStatement: string; aurora: string[]; qalens: string[]; aisosec: string[]; sharedCore: string; layers: string[]; revelation: string; lab: string[]; unlocked: string; end: string; chapters: string[];
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
    { label: "Focus", href: "#focus" },
    { label: "Principles", href: "#principles" },
    { label: "Contact", href: "#contact" },
  ],
  fi: [
    { label: "Järjestelmät", href: "#systems" },
    { label: "Painopisteet", href: "#focus" },
    { label: "Periaatteet", href: "#principles" },
    { label: "Yhteys", href: "#contact" },
  ],
  sv: [
    { label: "System", href: "#systems" },
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
      title: "CAUCO systems reel", play: "Play reel", close: "Close reel", pause: "Pause reel", resume: "Resume reel", restart: "Restart reel", replay: "Replay", explore: "Explore the ecosystem", back: "Back to site", controls: "Reel controls", progress: "Reel progress", reduced: "Motion-reduced reel summary",
      entry: ["BUILDING SYSTEMS", "FOR A TRUSTED", "DIGITAL ECONOMY"],
      problemItems: ["IDENTITY", "PERMISSIONS", "RISK", "QUALITY", "COMPLIANCE", "EVIDENCE", "DECISIONS"], problemStatement: "DISCONNECTED SYSTEMS CREATE UNTRUSTED OUTCOMES",
      aurora: ["Request", "Identity", "Permission", "Policy", "Evidence", "Human Review", "Controlled Decision"],
      qalens: ["Issue", "QA Risk", "Suggested Improvement", "Test Cases", "Delivery Evidence"],
      aisosec: ["Finding", "Evidence", "Severity", "OWASP / NIST / ISO mapping", "Compliance Gap", "Audit Output"],
      sharedCore: "Shared trust core", layers: ["Identity", "Policy", "Evidence", "Decisions"], revelation: "NOT SEPARATE PRODUCTS. ONE TRUST INFRASTRUCTURE.",
      lab: ["Aurora UI Kit", "Trust Infrastructure Blueprint", "Audit Report Templates", "Risk Matrix Toolkit", "Developer Starter Kit"], unlocked: "UNLOCKED", end: "SYSTEMS FOR TRUST",
      chapters: ["Trusted digital economy", "Disconnected systems", "Aurora controlled operations", "QALens quality intelligence", "AisoSec audit evidence", "One trust infrastructure", "CAUCO Lab", "Systems for trust"],
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
      label: "Available now",
      bridge: "Products and research objects emerging from the same trust-infrastructure lab.",
      title: "Explore the CAUCO Lab",
      description: "A growing collection of software, research, UI systems, templates and experimental digital products.",
      filters: { all: "All", software: "Software", research: "Research", ui: "UI", templates: "Templates", ai: "AI", downloads: "Downloads" },
      products: [
        { title: "Aurora UI Kit", description: "Interface primitives for controlled operations, evidence and institutional review flows.", category: "ui", status: "coming", statusLabel: "Coming Soon", cta: "Preview" },
        { title: "Trust Infrastructure Blueprint", description: "A practical architecture map for identity, policy, evidence and accountable automation.", category: "research", status: "research", statusLabel: "Research", cta: "Preview" },
        { title: "Audit Report Templates", description: "Clear, reusable structures for findings, evidence, controls and remediation reporting.", category: "templates", status: "free", statusLabel: "Free", cta: "Preview" },
        { title: "Compliance Icons", description: "A precise icon set for controls, approvals, risk states and audit interfaces.", category: "ui", status: "premium", statusLabel: "Premium", cta: "Preview" },
        { title: "AI Prompt Collection", description: "Focused prompts for analysis, QA review, structured evidence and delivery workflows.", category: "ai", status: "prototype", statusLabel: "Prototype", cta: "Preview" },
        { title: "Evidence Pack", description: "Modular evidence components for trustworthy technical and compliance documentation.", category: "downloads", status: "coming", statusLabel: "Coming Soon", cta: "Preview" },
        { title: "Risk Matrix Toolkit", description: "Research-backed scales and canvases for consistent technical risk assessment.", category: "research", status: "research", statusLabel: "Research", cta: "Preview" },
        { title: "Developer Starter Kit", description: "A compact foundation for building clear, resilient AI-assisted product interfaces.", category: "software", status: "free", statusLabel: "Free", cta: "Preview" },
      ],
    },
    technicalFocus: {
      kicker: "Technical Focus",
      title: "Built around systems that need clarity.",
      copy:
        "The work is strongest where product thinking, architecture and implementation quality need to meet in the same interface.",
      areas: [
        { title: "AI-assisted software systems" },
        { title: "Fintech and compliance tooling" },
        { title: "Desktop applications" },
        { title: "Backend architecture" },
        { title: "Audit-ready reporting" },
        { title: "Developer workflow automation" },
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
      title: "CAUCO-järjestelmien reel", play: "Katso reel", close: "Sulje reel", pause: "Keskeytä reel", resume: "Jatka reeliä", restart: "Aloita reel alusta", replay: "Katso uudelleen", explore: "Tutustu ekosysteemiin", back: "Takaisin sivustolle", controls: "Reelin ohjaimet", progress: "Reelin eteneminen", reduced: "Liikettä vähentävä reelin yhteenveto",
      entry: ["RAKENNAMME JÄRJESTELMIÄ", "LUOTETTAVAAN", "DIGITAALITALOUTEEN"],
      problemItems: ["IDENTITEETTI", "KÄYTTÖOIKEUDET", "RISKI", "LAATU", "VAATIMUSTENMUKAISUUS", "EVIDENSSI", "PÄÄTÖKSET"], problemStatement: "IRRALLISET JÄRJESTELMÄT TUOTTAVAT EPÄLUOTETTAVIA TULOKSIA",
      aurora: ["Pyyntö", "Identiteetti", "Käyttöoikeus", "Politiikka", "Evidenssi", "Ihmisen tarkistus", "Hallittu päätös"],
      qalens: ["Ongelma", "QA-riski", "Parannusehdotus", "Testitapaukset", "Toimitusevidenssi"],
      aisosec: ["Havainto", "Evidenssi", "Vakavuus", "OWASP / NIST / ISO -kartoitus", "Compliance-puute", "Auditointitulos"],
      sharedCore: "Jaettu luottamusydin", layers: ["Identiteetti", "Politiikka", "Evidenssi", "Päätökset"], revelation: "EI ERILLISIÄ TUOTTEITA. YKSI LUOTTAMUSINFRASTRUKTUURI.",
      lab: ["Aurora UI Kit", "Trust Infrastructure Blueprint", "Audit Report Templates", "Risk Matrix Toolkit", "Developer Starter Kit"], unlocked: "AVATTU", end: "JÄRJESTELMIÄ LUOTTAMUKSELLE",
      chapters: ["Luotettava digitaalitalous", "Irralliset järjestelmät", "Auroran hallitut operaatiot", "QALensin laatuäly", "AisoSecin auditointievidenssi", "Yksi luottamusinfrastruktuuri", "CAUCO Lab", "Järjestelmiä luottamukselle"],
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
      label: "Saatavilla nyt",
      bridge: "Tuotteita ja tutkimusobjekteja samasta luottamusinfrastruktuurin laboratoriosta.",
      title: "Tutustu CAUCO Labiin",
      description: "Kasvava kokoelma ohjelmistoja, tutkimusta, UI-järjestelmiä, mallipohjia ja kokeellisia digitaalisia tuotteita.",
      filters: { all: "Kaikki", software: "Ohjelmistot", research: "Tutkimus", ui: "UI", templates: "Mallipohjat", ai: "AI", downloads: "Lataukset" },
      products: [
        { title: "Aurora UI Kit", description: "Käyttöliittymäpalikoita hallittuihin operaatioihin, evidenssiin ja institutionaalisiin tarkistusprosesseihin.", category: "ui", status: "coming", statusLabel: "Tulossa", cta: "Esikatsele" },
        { title: "Trust Infrastructure Blueprint", description: "Käytännöllinen arkkitehtuurikartta identiteetille, politiikoille, evidenssille ja vastuulliselle automaatiolle.", category: "research", status: "research", statusLabel: "Tutkimus", cta: "Esikatsele" },
        { title: "Audit Report Templates", description: "Selkeät ja uudelleenkäytettävät rakenteet havainnoille, evidenssille, kontrolleille ja korjaustoimille.", category: "templates", status: "free", statusLabel: "Ilmainen", cta: "Esikatsele" },
        { title: "Compliance Icons", description: "Tarkka ikonisarja kontrolleille, hyväksynnöille, riskitiloille ja auditointiliittymille.", category: "ui", status: "premium", statusLabel: "Premium", cta: "Esikatsele" },
        { title: "AI Prompt Collection", description: "Kohdennettuja kehotteita analyysiin, QA-tarkistukseen, evidenssiin ja toimitustyönkulkuihin.", category: "ai", status: "prototype", statusLabel: "Prototyyppi", cta: "Esikatsele" },
        { title: "Evidence Pack", description: "Modulaarisia evidenssikomponentteja luotettavaan tekniseen ja compliance-dokumentaatioon.", category: "downloads", status: "coming", statusLabel: "Tulossa", cta: "Esikatsele" },
        { title: "Risk Matrix Toolkit", description: "Tutkimuspohjaiset asteikot ja pohjat johdonmukaiseen tekniseen riskien arviointiin.", category: "research", status: "research", statusLabel: "Tutkimus", cta: "Esikatsele" },
        { title: "Developer Starter Kit", description: "Kompakti perusta selkeiden ja kestävien AI-avusteisten tuotekäyttöliittymien rakentamiseen.", category: "software", status: "free", statusLabel: "Ilmainen", cta: "Esikatsele" },
      ],
    },
    technicalFocus: {
      kicker: "Tekninen painopiste",
      title: "Rakennettu järjestelmille, jotka tarvitsevat selkeyttä.",
      copy:
        "Työ on vahvimmillaan siellä, missä tuoteajattelun, arkkitehtuurin ja toteutuksen laadun pitää kohdata samassa käyttöliittymässä.",
      areas: [
        { title: "AI-avusteiset ohjelmistojärjestelmät" },
        { title: "Fintech- ja vaatimustenmukaisuustyökalut" },
        { title: "Työpöytäsovellukset" },
        { title: "Taustajärjestelmien arkkitehtuuri" },
        { title: "Auditointivalmis raportointi" },
        { title: "Kehittäjätyönkulkujen automaatio" },
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
      title: "CAUCO systemreel", play: "Spela reel", close: "Stäng reel", pause: "Pausa reel", resume: "Fortsätt reel", restart: "Starta om reel", replay: "Spela igen", explore: "Utforska ekosystemet", back: "Tillbaka till webbplatsen", controls: "Reelkontroller", progress: "Reelens förlopp", reduced: "Reelsammanfattning med minskad rörelse",
      entry: ["VI BYGGER SYSTEM", "FÖR EN BETRODD", "DIGITAL EKONOMI"],
      problemItems: ["IDENTITET", "BEHÖRIGHETER", "RISK", "KVALITET", "REGELEFTERLEVNAD", "EVIDENS", "BESLUT"], problemStatement: "FRÅNKOPPLADE SYSTEM SKAPAR OTILLFÖRLITLIGA RESULTAT",
      aurora: ["Begäran", "Identitet", "Behörighet", "Policy", "Evidens", "Mänsklig granskning", "Kontrollerat beslut"],
      qalens: ["Problem", "QA-risk", "Förbättringsförslag", "Testfall", "Leveransevidens"],
      aisosec: ["Fynd", "Evidens", "Allvarlighet", "OWASP / NIST / ISO-mappning", "Compliance-gap", "Revisionsunderlag"],
      sharedCore: "Gemensam tillitskärna", layers: ["Identitet", "Policy", "Evidens", "Beslut"], revelation: "INTE SEPARATA PRODUKTER. EN TILLITSINFRASTRUKTUR.",
      lab: ["Aurora UI Kit", "Trust Infrastructure Blueprint", "Audit Report Templates", "Risk Matrix Toolkit", "Developer Starter Kit"], unlocked: "UPPLÅST", end: "SYSTEM FÖR TILLIT",
      chapters: ["Betrodd digital ekonomi", "Frånkopplade system", "Auroras kontrollerade operationer", "QALens kvalitetsintelligens", "AisoSec revisionsevidens", "En tillitsinfrastruktur", "CAUCO Lab", "System för tillit"],
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
      label: "Tillgängligt nu",
      bridge: "Produkter och forskningsobjekt från samma laboratorium för tillitsinfrastruktur.",
      title: "Utforska CAUCO Lab",
      description: "En växande samling programvara, forskning, UI-system, mallar och experimentella digitala produkter.",
      filters: { all: "Alla", software: "Programvara", research: "Forskning", ui: "UI", templates: "Mallar", ai: "AI", downloads: "Nedladdningar" },
      products: [
        { title: "Aurora UI Kit", description: "Gränssnittselement för kontrollerade operationer, evidens och institutionella granskningsflöden.", category: "ui", status: "coming", statusLabel: "Kommer snart", cta: "Förhandsvisa" },
        { title: "Trust Infrastructure Blueprint", description: "En praktisk arkitekturkarta för identitet, policy, evidens och ansvarsfull automatisering.", category: "research", status: "research", statusLabel: "Forskning", cta: "Förhandsvisa" },
        { title: "Audit Report Templates", description: "Tydliga, återanvändbara strukturer för fynd, evidens, kontroller och åtgärdsrapportering.", category: "templates", status: "free", statusLabel: "Gratis", cta: "Förhandsvisa" },
        { title: "Compliance Icons", description: "En precis ikonuppsättning för kontroller, godkännanden, riskstatus och revisionsgränssnitt.", category: "ui", status: "premium", statusLabel: "Premium", cta: "Förhandsvisa" },
        { title: "AI Prompt Collection", description: "Fokuserade prompter för analys, QA-granskning, strukturerad evidens och leveransflöden.", category: "ai", status: "prototype", statusLabel: "Prototyp", cta: "Förhandsvisa" },
        { title: "Evidence Pack", description: "Modulära evidenskomponenter för tillförlitlig teknisk dokumentation och compliance.", category: "downloads", status: "coming", statusLabel: "Kommer snart", cta: "Förhandsvisa" },
        { title: "Risk Matrix Toolkit", description: "Forskningsbaserade skalor och underlag för konsekvent teknisk riskbedömning.", category: "research", status: "research", statusLabel: "Forskning", cta: "Förhandsvisa" },
        { title: "Developer Starter Kit", description: "En kompakt grund för tydliga, robusta och AI-assisterade produktgränssnitt.", category: "software", status: "free", statusLabel: "Gratis", cta: "Förhandsvisa" },
      ],
    },
    technicalFocus: {
      kicker: "Tekniskt fokus",
      title: "Byggt kring system som behöver tydlighet.",
      copy:
        "Arbetet är starkast där produkttänkande, arkitektur och genomförandekvalitet behöver mötas i samma gränssnitt.",
      areas: [
        { title: "AI-assisterade programvarusystem" },
        { title: "Fintech- och regelefterlevnadsverktyg" },
        { title: "Skrivbordsapplikationer" },
        { title: "Backendarkitektur" },
        { title: "Revisionsklar rapportering" },
        { title: "Automatisering av utvecklarflöden" },
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
