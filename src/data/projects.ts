export type Project = {
  name: string;
  description: string;
  tags: string[];
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
