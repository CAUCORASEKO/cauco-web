export type Project = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "AgentDock",
    description:
      "Mobile-first command center for AI coding agents, repository workflows, approval gates and safe automation.",
    tags: ["AI Agents", "Developer Tools", "FastAPI", "Mobile", "Git Workflows"],
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
    tags: ["Desktop App", "Python", "Electron", "Market Data", "On-chain Analytics"],
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
];
