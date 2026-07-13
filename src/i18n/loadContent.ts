/// <reference types="vite/client" />

import { content, detectLanguage } from "@/i18n/content";
import type { Language, SiteContent } from "@/i18n/content";

const requiredSections = [
  "header",
  "hero",
  "reel",
  "featuredSystems",
  "ecosystem",
  "lab",
  "technicalFocus",
  "engineeringPrinciples",
  "contact",
  "footer",
] as const satisfies readonly (keyof SiteContent)[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSiteContent(value: unknown, language: Language): value is SiteContent {
  if (!isRecord(value) || value.language !== language) {
    return false;
  }

  return requiredSections.every((section) => isRecord(value[section]));
}

export async function loadSiteContent(): Promise<SiteContent> {
  const language = detectLanguage();
  const fallback = content[language];

  try {
    const response = await fetch(`/content/${language}.json`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const externalContent: unknown = await response.json();

    if (!isSiteContent(externalContent, language)) {
      throw new Error("invalid content structure");
    }

    return externalContent;
  } catch (error) {
    if (import.meta.env.DEV) {
      const reason = error instanceof Error ? error.message : "unknown error";
      console.warn(`[content] Using compiled ${language} fallback: ${reason}`);
    }

    return fallback;
  }
}
