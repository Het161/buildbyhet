# Claude Code – Master Skill Instructions
# Covers: Brand Guidelines + UI/UX Pro + Design Auditor + Frontend Design + Webapp Testing

---

## 🎨 SKILL 01 — Brand Guidelines

- Always maintain consistent brand identity across all components
- Ask for brand colors, fonts, and logo before starting any UI work
- Store brand tokens as CSS variables or design tokens (never hardcode colors)
- Follow brand voice: if no style guide is provided, default to clean, modern, and professional
- Never mix more than 2 font families in a single project
- Maintain consistent spacing, border-radius, and shadow styles throughout
- All UI must feel like it belongs to the same product family
- If brand guidelines are provided in a file, follow them strictly over your own defaults

---

## 🖥️ SKILL 02 — UI/UX Pro Max

- Always prioritize user experience over visual complexity
- Follow Gestalt principles: proximity, alignment, contrast, repetition
- Use a clear visual hierarchy: H1 → H2 → Body → Caption
- Every interactive element must have hover, focus, active, and disabled states
- Spacing should follow an 8pt grid system (8, 16, 24, 32, 48, 64px)
- Use semantic HTML elements (nav, main, section, article, button, etc.)
- All clickable elements must be minimum 44x44px for touch accessibility
- Forms must have clear labels, placeholders, validation messages, and error states
- Avoid information overload — use progressive disclosure where needed
- Mobile-first design by default; always make layouts responsive
- Use skeleton loaders for async content, never show blank spaces
- Micro-interactions and smooth transitions (150–300ms) improve perceived quality

---

## 🔍 SKILL 03 — Design Auditor

- Before writing new UI, audit existing code/design for these issues:
  - Inconsistent spacing or padding
  - Mismatched font sizes or weights
  - Low color contrast (must meet WCAG AA: 4.5:1 for text)
  - Missing alt text on images
  - Non-responsive elements
  - Hardcoded pixel values instead of relative units
  - Unused or duplicate CSS classes
- Report audit findings in this format:
  [ ISSUE ] Description of problem
  [ FIX ]   What should be done
  [ WHERE ]  File / component / line
- After audit, ask before making changes
- Flag any accessibility violations as HIGH priority

---

## 💻 SKILL 04 — Frontend Design (Install This First)

- Default stack: HTML + CSS + JavaScript (vanilla) unless told otherwise
- For React projects: use functional components + hooks only, no class components
- CSS approach priority: Tailwind CSS → CSS Modules → plain CSS
- Never use inline styles except for dynamic values
- Component structure:
  /components
    /ui         → buttons, inputs, cards (reusable)
    /layout     → header, footer, sidebar
    /pages      → full page components
- Always separate concerns: logic in .js/.ts, styles in .css/.module.css
- Use CSS custom properties (variables) for all colors, fonts, spacing
- Images must be optimized, use next/image or lazy loading where possible
- Dark mode support using prefers-color-scheme or a class toggle
- No external UI libraries unless explicitly requested
- Code must work across Chrome, Firefox, Safari, Edge

---

## 🧪 SKILL 05 — Webapp Testing

- After building any feature, write or suggest tests
- Testing priority order:
  1. Unit tests for utility functions and logic
  2. Component tests for UI behavior
  3. Integration tests for user flows
  4. E2E tests for critical paths (login, checkout, form submit)
- Use these tools by default:
  - Unit/Component: Vitest or Jest
  - E2E: Playwright
- Every form must be tested for:
  - Empty submission
  - Invalid input
  - Valid submission
  - Error state display
- Every API call must be tested for:
  - Success response
  - Error/failure response
  - Loading state
- Accessibility testing: check with axe-core or similar
- Performance: flag if any component causes layout shift or slow render
- After completing a feature say:
  ✅ Built | 🧪 Tests written | ♿ Accessibility checked

---

## 🔧 General Rules (All Skills)

- Think step by step before writing any code
- Ask if brand/design assets are available before starting
- Always handle errors gracefully with user-friendly messages
- Never hardcode API keys or sensitive values — use .env
- Use conventional commits: feat:, fix:, style:, test:, refactor:
- After every task, give a short summary of what was done
