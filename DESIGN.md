---
name: DreamPath Warm Pastel Design System (Pastel Oat & Sky)
project: DreamPath Student Career Dashboard (Stitch Project 11531639802859121831)
version: 2.0
last-updated: 2026-11-27
theme:
  colorMode: LIGHT
  font: Plus Jakarta Sans
  roundness: ROUND_EIGHT (0.75rem - 1.5rem)
  spacingScale: 4px base (0.25rem)
colors:
  # Oat-Milk Canvas & Tonal Surface Layers
  surface: '#fbf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fbf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f4ed'
  surface-container: '#f0eee7'
  surface-container-high: '#eae8e1'
  surface-container-highest: '#e4e2dc'
  surface-variant: '#e4e2dc'
  surface-tint: '#4e6074'
  background: '#fbf9f2'
  
  # Text & Outlines
  on-surface: '#1b1c18'
  on-surface-variant: '#43474c'
  on-background: '#1b1c18'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1ea'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  border-hairline: '#e8e5dc'

  # Primary Actions & Accents (Soft Pastel Sky Blue)
  primary: '#4e6074'
  on-primary: '#ffffff'
  primary-container: '#cfe2fa'
  on-primary-container: '#526579'
  primary-fixed: '#d1e4fc'
  primary-fixed-dim: '#b5c8e0'
  on-primary-fixed: '#091d2e'
  on-primary-fixed-variant: '#36485c'
  inverse-primary: '#b5c8e0'

  # Secondary Accents (Sage / Mint Green)
  secondary: '#506358'
  on-secondary: '#ffffff'
  secondary-container: '#d3e8da'
  on-secondary-container: '#56695e'
  secondary-fixed: '#d3e8da'
  secondary-fixed-dim: '#b7cbbe'
  on-secondary-fixed: '#0d1f17'
  on-secondary-fixed-variant: '#394b41'

  # Tertiary Accents (Soft Blush Pink / Plum)
  tertiary: '#6c5964'
  on-tertiary: '#ffffff'
  tertiary-container: '#f3dae7'
  on-tertiary-container: '#715e69'
  tertiary-fixed: '#f5dce9'
  tertiary-fixed-dim: '#d8c0cd'
  on-tertiary-fixed: '#251720'
  on-tertiary-fixed-variant: '#53424c'

  # Semantic Alerts
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
---

# DreamPath Design System: Visual Standards & Guidelines

This document synthesizes all visual rules, color hex codes, typographic hierarchies, border radii, elevation models, and component blueprints extracted directly from our connected Google Stitch project: **DreamPath Student Career Dashboard** (`projects/11531639802859121831`).

---

## 1. Brand Philosophy & Aesthetic Identity

DreamPath is an encouraging, student-centric career exploration and skills dashboard. The design system rejects sterile, intimidating corporate software patterns in favor of a **Warm Minimalist, Editorial Stationery, and Soft Tactile** aesthetic.

- **Tone & Mood:** Warm, optimistic, clear, approachable, and thoughtfully organized.
- **Target Audience:** Secondary school students (Ages 13–18, SPM / IGCSE candidates), tertiary education seekers, and early career explorers.
- **Emotional Response:** Interacting with DreamPath should feel like opening a clean, tactile physical stationery notebook or study journal—calm, organized, and inviting.

---

## 2. 🚨 The Cardinal Constraint: No Clinical White-and-Blue Palettes

> [!CAUTION]
> **Strictly Prohibited:** Under NO circumstances should any page, card, or modal in DreamPath use cold, sterile clinical palettes (e.g. pure `#F8FAFC` / `#F1F5F9` blue-gray backgrounds with electric `#2563EB` / `#0284C7` corporate blue buttons and pitch-black `#000000` text).
> 
> Clinical enterprise styling induces test anxiety and visual fatigue for teenage students. Every screen MUST be grounded in our warm oat-milk cream canvas (`#FBF9F2` / `#F5F3EC`) layered with soft pastel accents.

### Visual Comparison: Anti-Pattern vs. DreamPath Rule

| Element | ❌ Strictly Forbidden (Clinical Enterprise) | ✅ DreamPath Standard (Warm Pastel & Oat) |
| :--- | :--- | :--- |
| **Page Background** | Cold sterile white (`#FFFFFF`) or cold blue-gray (`#F1F5F9` / `#F8FAFC`) | Warm oat-milk cream: `#FBF9F2` (or `#FAF8F5` / `#F5F3EC`) |
| **Sidebar Canvas** | Dark navy (`#0F172A`) or stark gray (`#F8FAFC`) | Warm low-surface beige: `#F6F4ED` / `#ECEAE2` |
| **Card Background** | Cold flat white with heavy gray drop-shadow | Pure warm white `#FFFFFF` / `#FCFBF8` with hairline `#E8E5DC` border |
| **Primary Buttons** | Electric saturated blue (`#2563EB` / `#1D4ED8`) with white text | Soft pastel sky blue (`#CFE2FA` / `#D1E4FC`) with deep navy text (`#091D2E`) |
| **Body & Label Text** | Harsh `#000000` or washed-out cold gray (`#94A3B8`) | Soft dark charcoal (`#1B1C18` / `#22252A`) and warm muted slate (`#43474C` / `#5E626B`) |
| **Status Chips** | Saturated red/green/yellow warning blocks | Gentle pastel pills: Mint `#D3E8DA`, Yellow `#FDF1D2`, Pink `#F3DAE7` |
| **Borders & Dividers** | Stark dark lines (`#CBD5E1` / `#000000`) | Delicate warm hairline borders (`#E8E5DC` / `#E4E2DC` / `border-slate-200`) |

---

## 3. Comprehensive Color Palette & Tokens

DreamPath utilizes a multi-tiered surface hierarchy inspired by Material Design 3 surface tokens, recalibrated with warm cream and organic pastel pigments.

### 3.1 Surface & Neutral Tokens

| Token Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| `surface` / `background` | `#FBF9F2` | **Global Page Canvas.** The foundational warm oat-milk cream background. |
| `surface-container-lowest` | `#FFFFFF` | **Elevated Cards.** Pure white content cards, metric widgets, and input fields. |
| `surface-container-low` | `#F6F4ED` | **Sidebar & Nested Containers.** Left navigation rail, sub-sections. |
| `surface-container` | `#F0EEE7` | **Grouped Card Wrappers.** Active tab containers, card headers. |
| `surface-container-high` | `#EAE8E1` | **Muted Card Surfaces.** Slider tracks, inactive state containers. |
| `surface-container-highest`| `#E4E2DC` | **High-contrast Dividers.** Subtle divider lines and chip borders. |
| `border-hairline` | `#E8E5DC` | **Standard Card Borders.** 1px subtle hairline border on all cards. |
| `on-surface` | `#1B1C18` | **Headlines & Primary Metrics.** High-contrast charcoal text (glare-free). |
| `on-surface-variant` | `#43474C` | **Secondary Text & Labels.** Subtitles, metadata, inactive links. |
| `outline` | `#74777d` | Secondary icon outlines and input borders. |
| `outline-variant` | `#C4C6CD` | Subtle secondary borders and dividers. |

### 3.2 Accent & Semantic Pastel Tokens

Every pastel accent is paired with a designated deep-toned text color to guarantee WCAG AA accessible contrast without losing its soft feel:

| Role | Fill Hex | Text Hex | Contrast Pair Usage |
| :--- | :--- | :--- | :--- |
| **Primary Sky Blue** | `#CFE2FA` (`#D1E4FC`) | `#091D2E` (`#1E3A8A`) | Primary CTAs, active sidebar pills, user chat bubbles, key highlights |
| **Sage / Mint Green** | `#D3E8DA` (`#DDF2E4`) | `#0D1F17` (`#2E6F49`) | Streaks, salary metrics, completed challenges, XP growth |
| **Warm Sunshine** | `#FDF1D2` (`#FEF3C7`) | `#7A5C1B` | Active challenges, level milestones, warning tips |
| **Blush Plum / Pink** | `#F3DAE7` (`#F8DFEC`) | `#53424C` (`#7E3B5E`) | Simulation mode badges, creative tasks, special accolades |
| **Muted Slate Tint** | `#4E6074` | `#FFFFFF` | Send action buttons, solid brand accents, secondary headers |
| **Soft Coral / Error** | `#FFDAD6` | `#93000A` (`#BA1A1A`) | Form validation errors, penalty indicators |

---

## 4. Typography: Plus Jakarta Sans

The entire application relies on **Plus Jakarta Sans**, a modern geometric grotesque font with friendly rounded terminals that harmonize with our soft tactile cards.

### 4.1 Typographic Scale

```
Display Large:     44px / 52px  •  Weight 800  •  Tracking -0.03em  •  Hero greetings & metrics
Headline Large:    32px / 40px  •  Weight 700  •  Tracking -0.02em  •  Page titles
Headline Medium:   24px / 32px  •  Weight 700  •  Tracking -0.015em •  Module & Hub titles
Headline Small:    20px / 28px  •  Weight 600  •  Tracking -0.01em  •  Card titles & headers
Title Medium:      16px / 24px  •  Weight 600  •  Tracking 0em      •  Sub-card titles, list headers
Body Large:        16px / 26px  •  Weight 400  •  Tracking 0em      •  Introductory paragraphs
Body Medium:       14px / 22px  •  Weight 400  •  Tracking 0em      •  Standard body text & descriptions
Body Small:        13px / 18px  •  Weight 400  •  Tracking 0em      •  Metadata & supporting copy
Label Large:       14px / 20px  •  Weight 600  •  Tracking 0em      •  Button labels & tab pills
Label Medium:      13px / 18px  •  Weight 600  •  Tracking +0.01em  •  Chips, filter tags
Label Small:       11px / 14px  •  Weight 700  •  Tracking +0.04em  •  Uppercase category trackers (XP, Tier)
```

---

## 5. Shape Language & Corner Radii

DreamPath strictly enforces a **progressive rounding** hierarchy. Sharp `0px` or `4px` rectangular boxes are strictly prohibited for cards and interactive components.

| Token | Radius Value | Applied Components |
| :--- | :--- | :--- |
| `rounded-3xl` | `1.5rem` (24px) | Pop-up modal drawers, Ask Dreamy overlay window, hero cards |
| `rounded-2xl` | `1rem` (16px) | Standard content cards, structured AI response cards, user message bubbles |
| `rounded-xl` | `0.75rem` (12px) | Sub-cards, input wrappers, active sidebar nav pills, action buttons |
| `rounded-lg` | `0.5rem` (8px) | Inner table rows, dropdown select menus, minor badges |
| `rounded-full`| `9999px` | Suggestion chips, status pills, floating mascot badge, slider thumbs |

---

## 6. Elevation & Depth (Soft Tactile Lighting)

Instead of dramatic blur drops, DreamPath uses **Tonal Layering** combined with ultra-soft ambient occlusion shadows:

- **Subtle Surface Definition (`shadow-xs` / `shadow-sm`):**
  ```css
  box-shadow: 0 1px 3px 0 rgba(42, 36, 27, 0.04), 0 1px 2px -1px rgba(42, 36, 27, 0.02);
  ```
  *Applied to all white content cards on top of `#FBF9F2` canvas, always paired with `border border-[#E8E5DC]`.*
- **Tactile Card Elevation (`shadow-card` / `shadow-soft`):**
  ```css
  box-shadow: 0 8px 20px -4px rgba(40, 30, 20, 0.05), 0 2px 6px -2px rgba(40, 30, 20, 0.03);
  ```
- **Floating Modals & Mascot HUD (`shadow-2xl` / `shadow-float`):**
  ```css
  box-shadow: 0 16px 36px -6px rgba(30, 25, 20, 0.12), 0 6px 12px -3px rgba(30, 25, 20, 0.06);
  ```

---

## 7. Spacing & Layout Rhythm

DreamPath operates on a **4px base grid** with standard spacing multipliers:

```
space-xs:   0.25rem (4px)   •  Icon-to-text gaps, tight micro-padding
space-sm:   0.5rem  (8px)   •  Badge padding, list item vertical gaps
space-md:   1.0rem  (16px)  •  Standard card inner padding (compact), input padding
space-lg:   1.5rem  (24px)  •  Standard card inner padding (desktop), grid gutters
space-xl:   2.0rem  (32px)  •  Page margins, major section separations
space-2xl:  3.0rem  (48px)  •  Hero section vertical breathing room
```

### Grid Layout Rules:
- **Desktop Sidebar:** Fixed `240px` persistent left sidebar (`z-50`). Main content area: `max-w-7xl` centered with `px-4 sm:px-6 lg:px-8`.
- **Card Spacing:** Grids use `gap-4 sm:gap-6`. No content card should ever bleed directly to the page border.
- **Inner Padding:** Never use less than `p-4` (16px) inside an elevated card container; primary content cards use `p-6` (24px).

---

## 8. Component Blueprints

### 8.1 Navigation Sidebar (Desktop & Mobile)
- **Container:** Fixed `240px` left rail, `bg-[#F6F4ED]` (`bg-surface-container-low`), `border-r border-[#E8E5DC]`.
- **Allowed Sidebar Links (Strict Rule):** Exactly 5 items:
  1. `Home` (`/`)
  2. `Explore Careers` (`/paths`)
  3. `Practice` (`/modes`)
  4. `Leaderboard` (`/leaderboard`)
  5. `Profile` (`/profile`)
  *(Note: "Ask Dreamy" is a global floating 3D mascot, and "Resume Builder" is accessed exclusively via the Profile button).*
- **Active Navigation Item:** `bg-[#D1E4FC]` (`bg-primary-fixed`), `text-[#091D2E] font-bold`, `rounded-xl`, `shadow-xs`.
- **Inactive Navigation Item:** `text-[#43474C] hover:bg-[#EAE8E1] hover:text-[#1B1C18]`, `rounded-xl`.

### 8.2 Elevated Content Cards
```tsx
<div className="bg-white rounded-2xl border border-[#E8E5DC] p-6 shadow-sm hover:border-[#D1E4FC] transition-colors">
  <div className="flex items-center justify-between mb-4">
    <span className="text-xs font-bold uppercase tracking-wider text-[#74777D]">CATEGORY</span>
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D3E8DA] text-[#0D1F17]">Active</span>
  </div>
  <h3 className="text-lg font-bold text-[#1B1C18]">Card Title</h3>
  <p className="text-sm text-[#43474C] mt-1">Descriptive body text goes here.</p>
</div>
```

### 8.3 Buttons & Interactive Controls
- **Primary Action Button:**
  `bg-[#CFE2FA] hover:bg-[#B5C8E0] text-[#091D2E] font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer`
- **Dark Accent Button (e.g. Chat Send):**
  `bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-10 h-10 rounded-xl transition shadow-xs flex items-center justify-center cursor-pointer`
- **Secondary / Ghost Button:**
  `bg-white border border-[#E8E5DC] hover:bg-[#F6F4ED] text-[#1B1C18] font-semibold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer`
- **Quick-Reply Suggestion Chip:**
  `bg-white border border-[#E8E5DC] hover:bg-[#CFE2FA]/30 hover:border-[#CFE2FA] text-[#1E3A8A] text-xs font-semibold rounded-full px-3.5 py-1.5 transition shadow-xs cursor-pointer`

### 8.4 Form Inputs & Sliders
- **Text Inputs:**
  `bg-white border border-[#E8E5DC] focus:border-[#1E3A8A] text-[#1B1C18] placeholder-[#74777D] rounded-xl px-4 py-2.5 text-sm shadow-xs outline-none transition`
- **Skill Sliders:**
  Custom range sliders with `#EAE8E1` track, pure white thumb (`w-4 h-4 rounded-full border-2 border-[#60A5FA] shadow-xs`), with smooth gradient progress fill.

### 8.5 Ask Dreamy 3D Mascot & Overlay Window
- **Floating Mascot:**
  Positioned `fixed bottom-20 md:bottom-6 right-4 md:right-8 z-50 pointer-events-auto cursor-grab active:cursor-grabbing`. Supported by procedural Three.js WebGL with `alpha: true` (transparent background).
- **Ambient Teaser Speech Bubble:**
  `bg-white text-slate-800 border border-slate-200 shadow-lg rounded-2xl px-4 py-2 text-xs font-semibold select-none pointer-events-none` with soft triangular tail pointing towards Dreamy.
- **Pop-Up Chat Overlay:**
  `fixed bottom-20 md:bottom-6 right-3 sm:right-6 md:right-8 z-[70] w-[94vw] sm:w-[480px] md:w-[540px] h-[640px] max-h-[85vh] bg-[#F8F7F4] border border-[#E8E5DC] rounded-3xl shadow-2xl flex flex-col overflow-hidden`.
  - User bubbles: `bg-[#CFE2FA] text-[#1E3A8A] font-medium px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm shadow-xs`.
  - AI responses: pure white (`#FFFFFF`) `rounded-2xl` cards with `border border-[#E8E5DC]`.

---

## 9. Developer Rules & Implementation Checklist

When adding or refactoring components in DreamPath:

1. [ ] **Background check:** Is the outermost canvas using `bg-surface` / `#FBF9F2`?
2. [ ] **Card check:** Are cards using `bg-white` (or `bg-surface-container-lowest`), `rounded-2xl`, `border border-[#E8E5DC]`, and subtle `shadow-sm`?
3. [ ] **Button text check:** Are soft blue buttons (`#CFE2FA` / `#D1E4FC`) styled with dark navy/charcoal text (`text-[#091D2E] font-bold`) instead of white?
4. [ ] **No clinical blue:** Ensure no generic Tailwind `bg-blue-600`, `bg-sky-500`, or `text-blue-500` were accidentally used. Use our calibrated pastels (`#CFE2FA`, `#D1E4FC`, `#1E3A8A`).
5. [ ] **Sidebar purity:** Does the sidebar strictly contain only Home, Explore Careers, Practice, Leaderboard, and Profile?
6. [ ] **Font enforcement:** Is `Plus Jakarta Sans` loaded and applied via `font-sans`?
7. [ ] **Rounded edges:** Are corner radii at least `rounded-xl` (`12px`) or `rounded-2xl` (`16px`)? Never sharp `rounded-none` or `rounded-sm`.
