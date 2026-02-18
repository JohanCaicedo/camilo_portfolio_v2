---
name: notion-project-publisher
description: Convert Notion project content into React code for this portfolio while preserving the existing visual identity and using the same components. Use when adding content to existing category pages or adding a new highlighted project constrained to allowed categories.
version: 1.0.0
---

# Notion Project Publisher

Transforms Notion-style project content into code updates for this repository, preserving the current visual system and section patterns.

## Scope

This skill supports:

1. Add new content blocks to an existing category page.
2. Add a new featured project entry in home/project listings.
3. Refactor pasted Notion content into production-ready section copy and data arrays.

This skill does **not** introduce new categories.

## Hard Category Lock

Only these categories are valid:

- `diseño web` -> `web-design`
- `diseño grafico` -> `graphic-design`
- `diseño editorial` -> `editorial-design`
- `fotografia` -> `photography`
- `personal` -> `personal`

If the input category is outside this list, stop and ask the user to map it to one of the five allowed categories.

## Repository Mapping

- Home featured section list: `components/projects-section.tsx`
- Category pages:
  - `app/web-design/page.tsx`
  - `app/graphic-design/page.tsx`
  - `app/editorial-design/page.tsx`
  - `app/photography/page.tsx`
  - `app/personal/page.tsx`

Load visual rules from `references/site-patterns.md`.

## Input Contract (from Notion)

Expect raw or semi-structured content with:

- Project title
- Category (Spanish or English)
- Subtitle/summary
- Role, team, duration, tools
- Challenge/context/objective/result text
- Media list (images/video) with preferred ordering
- Optional badges/tags

If some fields are missing, infer minimally and keep placeholders explicit.

## Output Contract

When applying updates, keep this format:

1. Keep existing section rhythm: hero -> details -> context/process -> galleries -> closing.
2. Reuse existing components and patterns:
   - `SectionContainer`
   - `ViewerCard`
   - `LightboxImage`
   - `LightboxGallery`
   - Existing inline `BadgeRow` / `SectionHeader` style patterns used per page
3. Preserve narrative tone:
   - Technical labels (`// TOKEN_STYLE`)
   - Uppercase micro-labels and monospace accents
   - Existing spacing and border language already in the file
4. Keep links/media in arrays/constants at top of each page when the file already follows that pattern.
5. Keep accessibility basics:
   - meaningful `alt`
   - clear section headings

## Workflow

1. Normalize input:
   - sanitize category with hard lock
   - group text into canonical blocks (hero/details/context/process/results/media)
2. Locate target files:
   - category page + optional home highlighted list
3. Integrate content:
   - append or insert in same style location
   - do not change global design system tokens or unrelated sections
4. Validate:
   - run `npx tsc --noEmit`
   - report modified files and what was inserted

## Guardrails

- Never create a new category route.
- Never replace shared UI components with ad-hoc markup if an existing component already fits.
- Never alter brand palette/tokens as part of content ingestion.
- Prefer additive edits over structural rewrites.

## Fast Usage Prompts

- "Add this Notion project to diseño grafico and include it as featured content in home."
- "Expand the fotografia page with this new case study content and gallery."
- "Convert this Notion block into a new section inside personal, preserving existing style."
