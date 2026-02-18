# Site Patterns Reference

Use this file to keep generated changes consistent with the portfolio's existing visual language.

## 1) Allowed category mapping

- `diseño web` -> `app/web-design/page.tsx`
- `diseño grafico` -> `app/graphic-design/page.tsx`
- `diseño editorial` -> `app/editorial-design/page.tsx`
- `fotografia` -> `app/photography/page.tsx`
- `personal` -> `app/personal/page.tsx`

Home featured cards live in `components/projects-section.tsx`.

## 2) Reusable components in project pages

- `SectionContainer`: page blocks and separators
- `ViewerCard`: content card wrapper
- `LightboxImage`: single hero or detail image
- `LightboxGallery`: image collections
- `Link` + `ArrowLeft`: back navigation (`// BACK_TO_PROJECTS`)

## 3) Typical page structure

1. Back link section
2. Hero (technical micro-label + title + subtitle + badge row + hero media)
3. Project details (usually 2 cards + specs strip)
4. Context/challenges/process blocks
5. Gallery and/or outcome sections
6. Closing CTA/back link

## 4) Visual identity rules

- Keep technical labels format: `// UPPERCASE_TOKEN`
- Keep monospace micro-text and uppercase chips
- Keep card/border rhythm; avoid introducing new component styles
- Keep color accents from existing tokens/classes (`brand-salmon`, `brand-blue`, etc.)

## 5) Content style rules

- Direct, concise, portfolio-case-study tone
- Emphasize problem -> process -> result
- Prefer measurable outcomes when possible
- Keep media alt texts descriptive and specific
