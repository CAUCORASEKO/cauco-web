(() => {
  "use strict";

  const editorRoot = document.getElementById("content-editor");
  if (!editorRoot) return;

  const saveButton = document.getElementById("save-button");
  const saveStatus = document.getElementById("save-status");
  const logoutForm = document.getElementById("logout-form");
  const languageTabs = Array.from(document.querySelectorAll("[data-language-code]"));
  const desktopAccordion = window.matchMedia("(min-width: 760px)");
  const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);
  const knownAbbreviations = new Set(["ai", "api", "cta", "url", "qa", "seo", "pdf", "ui", "id"]);
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
  ];
  const sectionDescriptions = {
    header: "Navigation, language labels and primary contact action",
    hero: "Main headline, introduction and primary calls to action",
    reel: "Text and chapter labels used in the 45-second systems reel",
    featuredSystems: "Aurora, QALens, AisoSec, WhaleScope and project summaries",
    ecosystem: "Shared trust-infrastructure narrative",
    lab: "Service catalogue, categories, products and detail-panel text",
    technicalFocus: "Engineering capabilities and focus areas",
    engineeringPrinciples: "Architecture and delivery principles",
    contact: "Contact section and inquiry form wording",
    footer: "Footer navigation and positioning text",
  };
  const textareaKeyPattern = /(description|body|copy|summary|subtitle|placeholder|statement|context|positioning|revelation)/i;

  let fieldId = 0;
  let revision = 0;
  let dirty = false;
  let publishing = false;

  const statusClassNames = ["is-saved", "is-unsaved", "is-publishing", "is-published", "is-failed"];

  const setStatus = (state) => {
    if (!saveStatus) return;
    saveStatus.textContent = state;
    saveStatus.classList.remove(...statusClassNames);
    const stateClass = {
      Saved: "is-saved",
      "Unsaved changes": "is-unsaved",
      "Publishing…": "is-publishing",
      Published: "is-published",
      "Publish failed": "is-failed",
    }[state];
    if (stateClass) saveStatus.classList.add(stateClass);
  };

  const updatePublishAvailability = () => {
    if (saveButton instanceof HTMLButtonElement) {
      saveButton.disabled = !dirty || publishing;
    }
  };

  const markDirty = () => {
    revision += 1;
    dirty = true;
    if (!publishing) setStatus("Unsaved changes");
    updatePublishAvailability();
  };

  const decodeDocument = (encoded) => {
    const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  };

  const hasForbiddenKey = (value) => {
    if (Array.isArray(value)) return value.some(hasForbiddenKey);
    if (value !== null && typeof value === "object") {
      return Object.keys(value).some(
        (key) => forbiddenKeys.has(key) || hasForbiddenKey(value[key]),
      );
    }
    return false;
  };

  const formatLabel = (value) =>
    value
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => {
        const lower = word.toLowerCase();
        if (knownAbbreviations.has(lower)) return lower.toUpperCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ");

  const countFields = (value) => {
    if (Array.isArray(value)) {
      return value.reduce((total, item) => total + countFields(item), 0);
    }
    if (value !== null && typeof value === "object") {
      return Object.keys(value).reduce((total, key) => total + countFields(value[key]), 0);
    }
    return 1;
  };

  const createLabel = (text, inputId) => {
    const label = document.createElement("label");
    label.className = "field-label";
    label.htmlFor = inputId;
    label.textContent = text;
    return label;
  };

  const shouldUseTextarea = (key, value) =>
    value.includes("\n") || value.length >= 88 || textareaKeyPattern.test(key);

  const renderString = (value, label, update, key, compact = false) => {
    const wrapper = document.createElement("div");
    wrapper.className = compact ? "field field-compact" : "field";
    const inputId = `content-field-${fieldId++}`;
    const input = shouldUseTextarea(key, value)
      ? document.createElement("textarea")
      : document.createElement("input");

    if (input instanceof HTMLInputElement) {
      input.type = "text";
    } else {
      wrapper.classList.add("field-textarea");
      input.rows = Math.min(8, Math.max(3, Math.ceil(value.length / 76)));
    }

    input.id = inputId;
    input.value = value;
    input.addEventListener("input", () => {
      update(input.value);
      markDirty();
    });
    wrapper.append(createLabel(label, inputId), input);
    return wrapper;
  };

  const renderNumber = (value, label, update) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const inputId = `content-field-${fieldId++}`;
    const input = document.createElement("input");
    let currentValue = value;
    input.id = inputId;
    input.type = "number";
    input.step = "any";
    input.value = String(value);
    input.addEventListener("change", () => {
      const nextValue = input.valueAsNumber;
      if (Number.isFinite(nextValue)) {
        currentValue = nextValue;
        update(nextValue);
        markDirty();
      } else {
        input.value = String(currentValue);
      }
    });
    wrapper.append(createLabel(label, inputId), input);
    return wrapper;
  };

  const renderBoolean = (value, label, update) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field field-checkbox";
    const inputId = `content-field-${fieldId++}`;
    const input = document.createElement("input");
    input.id = inputId;
    input.type = "checkbox";
    input.checked = value;
    input.addEventListener("change", () => {
      update(input.checked);
      markDirty();
    });
    wrapper.append(input, createLabel(label, inputId));
    return wrapper;
  };

  const getObjectTitle = (value, index) => {
    for (const key of ["name", "title", "id"]) {
      if (typeof value[key] === "string" && value[key].trim() !== "") return value[key];
    }
    return `Item ${String(index + 1).padStart(2, "0")}`;
  };

  const renderObjectCard = (value, index, depth) => {
    const card = document.createElement("article");
    card.className = "object-card";
    const header = document.createElement("header");
    header.className = "object-card-header";
    const title = document.createElement("h4");
    const metadata = document.createElement("div");
    metadata.className = "object-card-meta";
    const body = document.createElement("div");
    body.className = "object-card-body";

    const refreshHeading = () => {
      title.textContent = getObjectTitle(value, index);
      metadata.replaceChildren();
      for (const key of ["category", "engagement"]) {
        if (typeof value[key] === "string" && value[key].trim() !== "") {
          const badge = document.createElement("span");
          badge.textContent = value[key];
          metadata.append(badge);
        }
      }
    };
    refreshHeading();
    header.append(title, metadata);

    Object.keys(value).forEach((key) => {
      if (forbiddenKeys.has(key)) return;
      body.append(
        renderValue(
          value[key],
          formatLabel(key),
          (nextValue) => {
            value[key] = nextValue;
            if (["name", "title", "id", "category", "engagement"].includes(key)) refreshHeading();
          },
          depth + 1,
          key,
        ),
      );
    });

    card.append(header, body);
    return card;
  };

  const renderArray = (value, label, depth, key) => {
    const group = document.createElement("fieldset");
    group.className = "field-group array-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    group.append(legend);

    value.forEach((item, index) => {
      if (typeof item === "string") {
        const itemRow = document.createElement("div");
        itemRow.className = "array-string-item";
        const number = document.createElement("span");
        number.className = "array-item-number";
        number.setAttribute("aria-hidden", "true");
        number.textContent = String(index + 1).padStart(2, "0");
        itemRow.append(
          number,
          renderString(
            item,
            `Item ${String(index + 1).padStart(2, "0")}`,
            (nextValue) => {
              value[index] = nextValue;
            },
            key,
            true,
          ),
        );
        group.append(itemRow);
      } else if (item !== null && typeof item === "object" && !Array.isArray(item)) {
        group.append(renderObjectCard(item, index, depth));
      } else {
        group.append(
          renderValue(
            item,
            `Item ${String(index + 1).padStart(2, "0")}`,
            (nextValue) => {
              value[index] = nextValue;
            },
            depth + 1,
            key,
          ),
        );
      }
    });

    if (value.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-value";
      empty.textContent = "Empty array";
      group.append(empty);
    }
    return group;
  };

  const renderObject = (value, label, depth) => {
    const group = document.createElement("fieldset");
    group.className = "field-group nested-object";
    const legend = document.createElement("legend");
    legend.textContent = label;
    group.append(legend);
    Object.keys(value).forEach((key) => {
      if (forbiddenKeys.has(key)) return;
      group.append(
        renderValue(
          value[key],
          formatLabel(key),
          (nextValue) => {
            value[key] = nextValue;
          },
          depth + 1,
          key,
        ),
      );
    });
    return group;
  };

  function renderValue(value, label, update, depth = 0, key = "") {
    if (typeof value === "string") return renderString(value, label, update, key);
    if (typeof value === "number") return renderNumber(value, label, update);
    if (typeof value === "boolean") return renderBoolean(value, label, update);
    if (Array.isArray(value)) return renderArray(value, label, depth, key);
    if (value !== null && typeof value === "object") return renderObject(value, label, depth);

    const group = document.createElement("fieldset");
    group.className = "field-group";
    const legend = document.createElement("legend");
    legend.textContent = label;
    const unsupported = document.createElement("p");
    unsupported.className = "empty-value";
    unsupported.textContent = "This value is not editable.";
    group.append(legend, unsupported);
    return group;
  }

  let documentContent;
  const panels = [];
  try {
    documentContent = decodeDocument(editorRoot.dataset.content || "");
    if (
      documentContent === null
      || typeof documentContent !== "object"
      || Array.isArray(documentContent)
      || hasForbiddenKey(documentContent)
    ) {
      throw new Error("Invalid content document");
    }

    requiredSections.forEach((section) => {
      const sectionValue = documentContent[section];
      if (sectionValue === null || typeof sectionValue !== "object" || Array.isArray(sectionValue)) {
        throw new Error("Missing content section");
      }

      const panel = document.createElement("details");
      panel.className = "section-panel";
      const summary = document.createElement("summary");
      const summaryCopy = document.createElement("span");
      summaryCopy.className = "section-summary-copy";
      const title = document.createElement("span");
      title.className = "section-title";
      title.textContent = formatLabel(section);
      const description = document.createElement("span");
      description.className = "section-description";
      description.textContent = sectionDescriptions[section];
      summaryCopy.append(title, description);

      const summaryMeta = document.createElement("span");
      summaryMeta.className = "section-summary-meta";
      const fieldCount = document.createElement("span");
      fieldCount.className = "section-field-count";
      const totalFields = countFields(sectionValue);
      fieldCount.textContent = `${totalFields} ${totalFields === 1 ? "field" : "fields"}`;
      const indicator = document.createElement("span");
      indicator.className = "section-indicator";
      indicator.setAttribute("aria-hidden", "true");
      summaryMeta.append(fieldCount, indicator);
      summary.append(summaryCopy, summaryMeta);

      const body = document.createElement("div");
      body.className = "section-body";
      const note = document.createElement("p");
      note.className = "section-note";
      note.textContent = "Changes are published directly to the selected language after validation and backup.";
      body.append(note);

      Object.keys(sectionValue).forEach((key) => {
        if (forbiddenKeys.has(key)) return;
        body.append(
          renderValue(
            sectionValue[key],
            formatLabel(key),
            (nextValue) => {
              sectionValue[key] = nextValue;
            },
            0,
            key,
          ),
        );
      });

      panel.append(summary, body);
      panel.addEventListener("toggle", () => {
        if (!panel.open || !desktopAccordion.matches) return;
        panels.forEach((otherPanel) => {
          if (otherPanel !== panel) otherPanel.open = false;
        });
      });
      panels.push(panel);
      editorRoot.append(panel);
    });
  } catch (error) {
    editorRoot.textContent = "The content editor could not be initialized.";
    editorRoot.classList.add("editor-error");
    if (saveButton) saveButton.disabled = true;
    setStatus("Publish failed");
    return;
  }

  languageTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      if (tab.dataset.languageCode === editorRoot.dataset.language) {
        event.preventDefault();
        return;
      }
      if (dirty && !window.confirm("Discard unsaved changes and switch language?")) {
        event.preventDefault();
      } else if (dirty) {
        dirty = false;
      }
    });
  });

  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });

  if (logoutForm instanceof HTMLFormElement) {
    logoutForm.addEventListener("submit", (event) => {
      if (dirty && !window.confirm("Log out and discard unsaved changes?")) {
        event.preventDefault();
      } else if (dirty) {
        dirty = false;
      }
    });
  }

  if (saveButton instanceof HTMLButtonElement) {
    saveButton.addEventListener("click", async () => {
      if (!dirty || publishing) return;

      publishing = true;
      const submittedRevision = revision;
      setStatus("Publishing…");
      updatePublishAvailability();

      try {
        const response = await fetch(editorRoot.dataset.saveUrl || "save.php", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: editorRoot.dataset.language,
            csrf_token: editorRoot.dataset.csrfToken,
            content: documentContent,
          }),
        });
        const result = await response.json();
        if (!response.ok || result.ok !== true) throw new Error("Publish request failed");

        publishing = false;
        if (revision === submittedRevision) {
          dirty = false;
          setStatus("Published");
        } else {
          setStatus("Unsaved changes");
        }
      } catch (error) {
        publishing = false;
        setStatus("Publish failed");
      }

      updatePublishAvailability();
    });
  }

  setStatus("Saved");
  updatePublishAvailability();
})();
