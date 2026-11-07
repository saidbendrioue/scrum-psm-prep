# Design System Master File

> Unslopped with [heydamir/unslop](https://github.com/heydamir/unslop) (CC BY 4.0, Damir Sokolovsky).

---

**Project:** PSM Quizz  
**Updated:** 2026-11-07

## Direction

- **Product.** Practice questions and timed mock exams for people preparing for the Professional Scrum Master I assessment
- **Character.** exact, quiet, a little warm
- **World.** Study desk before an open-book exam — paper, ink, the Scrum Guide
- **Moments.** Category accuracy chart; score figures with the pass threshold
- **Signature.** Quiet mono `Pass 85%` near scores, exam setup, and sidebar meta

## Color

Warm graphite ramp. Surfaces stay neutral; ink blue accent is rare.

| Role | Light | Dark |
|------|-------|------|
| Canvas | `#f7f4ee` | `#161513` |
| Surface | `#fdfbf7` | `#1c1a18` |
| Raised | `#efe9df` | `#262421` |
| Ink | `#1f1b16` | `#efe9de` |
| Muted | `#5e554a` | `#aaa398` |
| Accent | `#1d4ed8` | `#93c5fd` |
| Nav | `#12110f` | `#0f0f10` |

Primary buttons use ink fill (light) or off-white fill (dark), not the accent. Accent marks selection, chart lead, and the pass-mark tick.

## Type

- Interface: Instrument Sans (400 / 500)
- Display titles: Newsreader (500)
- Meta / pass mark: IBM Plex Mono (400)

## Radius & depth

- Controls 8px, cards 14px
- Light: soft neutral shadow `0 1px 2px rgba(0,0,0,0.05)`
- Dark: surface steps + hairlines only

## Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- One short entrance stagger on dashboard stats
- Press scale 0.98; no bounce, no pulse on static chrome
