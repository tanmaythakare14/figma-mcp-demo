# CLAUDE UI GENERATION STANDARD

This document defines the **UI generation structure and design standards** that Claude must follow when generating interfaces for this project.

This file is **READ-ONLY** and acts as a **reference system for all UI prompts** to ensure consistency, hierarchy, and professional frontend quality.

Claude must always follow the structure below when designing any UI.

---

# 1. CONTEXT

Describe the **product, feature, and target user**.

Include:

* Product name
* Type of product (SaaS / Healthcare platform / Dashboard / Mobile app)
* Primary users
* Purpose of the screen

Example:

Product: OrganOptima
Type: Healthcare coordination platform
Users: Organ Procurement Organizations, transplant coordinators, clinicians
Purpose: Manage donor evaluation and transplant coordination.

---

# 2. VISUAL TONE

Define the emotional and visual direction.

Examples of tone:

* Premium
* Minimal
* Clinical
* Modern SaaS
* Data-driven
* Professional
* Confident
* Calm healthcare aesthetic

Avoid:

* Cartoonish UI
* Overly playful elements
* Excessive gradients
* Heavy skeuomorphism

Preferred feel:

* Clean
* Structured
* Calm
* Efficient
* Information-focused

---

# 3. LAYOUT STRUCTURE

Define the page layout clearly.

Possible patterns:

Dashboard Layout

* Top navigation bar
* Left sidebar
* Main content area
* Widget grid
* Tables or data panels

Landing Page Layout

* Hero section
* Feature grid
* Social proof
* Pricing
* Footer

App Screen Layout

* Header
* Filters / controls
* Data area
* Action panel
* Footer actions

Rules:

* Use clear visual sections
* Maintain breathing space
* Avoid overcrowding
* Content should flow top → bottom logically

---

# 4. TYPOGRAPHY

Default font stack:

Primary Font
Inter, system-ui, -apple-system, Segoe UI, sans-serif

Hierarchy:

Hero Title
64px
Weight: 700
Letter spacing: -0.03em

Section Title
32–36px
Weight: 600

Subheading
18px
Weight: 400

Body Text
15–16px
Weight: 400

Caption / Metadata
13–14px
Weight: 400
Muted color

Typography rules:

* Tight tracking on headlines
* Comfortable line height for body
* Clear hierarchy between sections
* Avoid more than 5 font sizes

---

# 5. COLORGRAPHY

Define a calm and modern color system.

Default palette example:

Background
#0A0A0F

Surface / Cards
#111118

Primary Accent
#6366F1

Text Primary
#F4F4F5

Text Muted
#71717A

Border
rgba(255,255,255,0.06)

Rules:

* Avoid pure black (#000)
* Prefer deep neutral backgrounds
* Use accent colors sparingly
* Maintain strong contrast for readability

---

# 6. VISUAL HIERARCHY

The interface must guide the eye naturally.

Priority order:

1️⃣ Primary heading
2️⃣ Supporting text
3️⃣ Primary action button
4️⃣ Data / feature content
5️⃣ Secondary actions

Rules:

* Headlines must dominate visually
* CTAs must stand out clearly
* Data blocks should be visually grouped
* Avoid visual noise

---

# 7. CRISP UI RULES

Spacing system:

Use an **8px grid**

Allowed spacing:

8px
16px
24px
32px
48px
64px

Borders

1px
Low opacity

Rounded corners

Cards → 12px
Inputs → 8px
Buttons → Full or 10px

Shadows

Soft and subtle

Example:

box-shadow:
0 10px 30px rgba(0,0,0,0.25)

Avoid:

* Harsh shadows
* Thick borders
* Overly rounded shapes

---

# 8. COMPONENT DETAILS

Common reusable components:

Buttons

* Primary
* Secondary
* Ghost

Cards

* KPI cards
* Data cards
* Feature cards

Inputs

* Text input
* Dropdown
* Search field

Badges

* Status indicators
* Alert indicators

Tables

* Clean rows
* Hover highlight
* Minimal separators

Rules:

* Components must be reusable
* Avoid one-off styles
* Maintain consistent padding

---

# 9. REFERENCE DESIGN SYSTEMS

Preferred inspiration:

Linear.app
Stripe
Vercel
Notion
Apple system UI

Characteristics:

* Minimal
* High contrast typography
* Structured spacing
* Elegant simplicity

---

# 10. TECH IMPLEMENTATION

Claude must generate code using one of the following stacks depending on prompt instruction.

Supported stacks:

React + Tailwind
React + CSS Modules
HTML + CSS
Next.js + Tailwind

Code rules:

* Clean structure
* Comment important sections
* Avoid inline styles unless necessary
* Use reusable components
* Maintain accessibility best practices

---

# FINAL OUTPUT EXPECTATION

When generating UI, Claude must output:

1️⃣ Clear layout structure
2️⃣ Proper typography hierarchy
3️⃣ Consistent spacing
4️⃣ Reusable components
5️⃣ Clean and readable code

The UI must feel:

Professional
Minimal
Modern
Production-ready

---

END OF FILE

