# Copilot Workspace Instructions for Modern Website

## Overview
This workspace is a modern, full-stack web project with a Vite-based React frontend and a Node.js/Express backend API (see `server/`). The project is inspired by a Figma design and implements a personal/agency branding website with admin features.

## Build & Run
- **Install dependencies:**
  - `npm i`
- **Start development (frontend + backend):**
  - `npm run dev`
- **Start backend API only:**
  - `npm run server:dev`

## Key Conventions
- **Frontend:**
  - Uses React (with TypeScript) and Vite.
  - UI components and sections are in `src/app/components/` and `src/app/pages/`.
  - Brand colors: lime `#E1FE5D`, violet `#9F74FF` (use for accents, buttons, highlights).
  - Follow responsive, minimal, and clean design principles (see `guidelines/Guidelines.md`).
  - Use flexbox/grid for layout; avoid unnecessary absolute positioning.
  - Keep helper functions/components in their own files.
- **Backend:**
  - Node.js/Express API in `server/`.
  - Data models in `server/src/models/`.
  - Email templates in `server/src/utils/emailTemplates.js`.
  - Use `server/src/data/database.json` for mock data.

## Documentation & Guidelines
- **Design & UI:** See `guidelines/Guidelines.md` for design system rules and UI conventions.
- **Page/Section Structure:** See `src/imports/pasted_text/designer-branding-website.md` for page/section breakdowns and requirements.

## Pitfalls & Tips
- Always use the brand colors for admin panel and CTA highlights.
- Keep code modular and refactor as you go.
- Avoid duplicating logic between frontend and backend.
- Use the provided mock data/types for admin features.

## Example Prompts
- "Add a new pricing card to the Pricing page."
- "Refactor the ProjectModal to support a new field."
- "Update the admin dashboard to show subscriber stats."

## Related Customizations
- To further specialize Copilot, consider creating:
  - `/create-skill design-system` — for enforcing design system rules.
  - `/create-instruction admin-panel` — for admin UI conventions.
  - `/create-instruction backend-api` — for API/model best practices.

---

**Link, don't embed:** Always reference `guidelines/Guidelines.md` and `src/imports/pasted_text/designer-branding-website.md` for detailed rules instead of duplicating content here.
