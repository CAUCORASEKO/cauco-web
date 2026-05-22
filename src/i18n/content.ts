export type Language = "en" | "fi" | "sv";

export type NavItemContent = {
  label: string;
  href: string;
};

export type ProjectContent = {
  name: string;
  description: string;
  tags: string[];
};

export type FocusAreaContent = {
  title: string;
};

export type PrincipleContent = {
  title: string;
  body: string;
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
  featuredSystems: {
    kicker: string;
    title: string;
    copy: string;
    projects: ProjectContent[];
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
    featuredSystems: {
      kicker: "Featured Systems",
      title: "Applied software for high-trust workflows.",
      copy:
        "Selected systems and prototypes focused on practical automation, deterministic review flows, reporting and usable technical interfaces.",
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
            "Bank-integrated digital asset prototype focused on custody, compliance, education and audit-ready workflows.",
          tags: [
            "Fintech",
            "Banking UX",
            "Crypto Custody",
            "Compliance",
            "Audit Trail",
          ],
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
    featuredSystems: {
      kicker: "Valitut järjestelmät",
      title: "Sovellettua ohjelmistoa korkean luottamuksen työnkulkuihin.",
      copy:
        "Valikoituja järjestelmiä ja prototyyppejä, joissa painottuvat käytännön automaatio, deterministiset tarkistusprosessit, raportointi ja selkeät tekniset käyttöliittymät.",
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
            "Pankki-integroitu digitaalisten varojen prototyyppi, joka keskittyy säilytykseen, vaatimustenmukaisuuteen, koulutukseen ja auditointivalmiisiin työnkulkuihin.",
          tags: [
            "Fintech",
            "Pankkikäyttöliittymä",
            "Kryptovarojen säilytys",
            "Vaatimustenmukaisuus",
            "Auditointijälki",
          ],
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
    featuredSystems: {
      kicker: "Utvalda system",
      title: "Tillämpad programvara för arbetsflöden med högt förtroende.",
      copy:
        "Utvalda system och prototyper med fokus på praktisk automatisering, deterministiska granskningsflöden, rapportering och användbara tekniska gränssnitt.",
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
            "Bankintegrerad prototyp för digitala tillgångar med fokus på förvaring, regelefterlevnad, utbildning och revisionsklara arbetsflöden.",
          tags: [
            "Fintech",
            "Bank-UX",
            "Kryptoförvaring",
            "Regelefterlevnad",
            "Revisionsspår",
          ],
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
