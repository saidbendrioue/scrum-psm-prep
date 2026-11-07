# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that page file exists, its rules **override** this Master file.

---

**Project:** PSM Quizz  
**Generated:** 2026-11-07 (UI/UX Pro Max)  
**Adapted:** Claymorphism education style + trust teal/navy palette (purple study default overridden for brand clarity)  
**Category:** Flashcard & Study Tool / Certification prep  
**Design Dials:** Variance 5/10 | Motion 5/10 | Density 7/10

---

## Global Rules

### Style
- **Name:** Claymorphism (professional education)
- Soft 3D surfaces, 3px borders, double shadows (outer offset + inset), 16–24px radii
- Soft press on interactive controls (~200ms)
- Stagger rise on dashboard tiles; honor `prefers-reduced-motion`

### Color Palette

| Role | Hex | Token |
|------|-----|-------|
| Primary / CTA | `#0F766E` | `--color-accent` |
| On Primary | `#FFFFFF` | `--color-accent-ink` |
| Background | `#EEF6F3` | `--color-canvas` |
| Foreground | `#0F1C1A` | `--color-ink` |
| Card | `#FFFFFF` | `--color-surface` |
| Muted text | `#5B6B67` | `--color-muted` |
| Border | `#C5DBD4` | `--color-line` |
| Nav | `#0B1F1C` | `--color-nav` |
| Success | `#047857` | `--color-good` |
| Danger | `#B91C1C` | `--color-bad` |
| Flag | `#B45309` | `--color-flag` |

**Notes:** Trust teal + deep navy-green nav. Avoid purple-on-lavender study defaults.

### Typography
- **Display / headings:** Fraunces
- **Body / UI:** Manrope
- Google Fonts: `Fraunces` + `Manrope`

### Motion
- Soft press: translateY on active
- Stagger: `.reveal-stagger` children, ~40–60ms steps, `clay-rise`
- Skip when `prefers-reduced-motion: reduce`

### Components
- `.panel` / `.stat-tile`: clay borders + `--shadow-clay`
- `.btn-primary` / `.btn-ghost`: pill shape, clay shadow, press feedback
- Nav icons: outline SVG (Phosphor-style), no emoji icons

### Anti-patterns
- Flat single-color canvases without atmosphere
- Purple/lilac default AI study themes
- Emoji as structural icons
- Missing focus rings or reduced-motion support
