# Placeholder Rules Summary

## Panels and Flow
- Left panel is split into 3 sections with navigation: Hospital Details, Lead Roles, Other Services.
- Section navigation uses step buttons and Back/Next footer controls.
- Other Services (Night/Satellite) only show when that section is active.

## Units, Rooms, and Grid Structure
- Unit count controls how many unit blocks are shown.
- Room count per unit drives how many room blocks are generated.
- Single unit mode removes columns C/D and reflows to A/B/E only.
- Room labels display as "Room X" (unit name omitted).
- Specialty labels display as "Specialty X" (unit prefix omitted).

## Coordinator Logic
- Coordinators per unit are configurable (1–2 per unit).
- If Unit 2 has 2 coordinators, C1/C2 unmerge and show Coordinator 3/4.
- Coordinator headers include an additional placeholder line:
  - "(Title): (FIRST INITIAL) (SURNAME) (SHIFT PATTERN)"
- Coordinator placeholders hide when placeholders are toggled off.

## Placeholder Visibility Toggle
- A toggle switch (rounded rectangle) controls placeholder visibility.
- When OFF, the following are hidden:
  - Cell reference labels (A1, B5, etc.)
  - Slot number placeholders (1.1.1*, 2.1.1*, etc.)
  - Staff placeholder text
  - Coordinator placeholder text
  - E‑column placeholders (M1/F1/U1) are visually hidden

## Slot Content and Placeholders
- Slot numbers (e.g., 1.1.1*) are right‑aligned and grey.
- Staff placeholder text is left‑aligned within the slot cell:
  - "(Title): (FIRST INITIAL) (SURNAME) (SHIFT PATTERN)"
- Slot placeholders are grey and non‑bold.
- Slot number size is driven inline to 20px for B/D cells.

## E Column Logic
- E column is used for Management, Floater(s), and Unallocated labels and slots.
- Labels are uppercase: MANAGEMENT, FLOATER(S), UNALLOCATED.
- Slot placeholders M1/F1/U1 are grey and hidden when placeholders are off.

## Other Services
- Night Unit and Satellite blocks only render when toggled on.
- Satellite label appears only if Satellite Service is enabled.

## Styling / Visual Updates
- Premium blue theme for the grid and left panel.
- Section headers, labels, and inputs enlarged for clarity.
- TOM panel text updated to “TOM” with refined copy.

---

Notes:
- Staff placeholder text currently appears in all Unit 1/2 slot cells and Night/Satellite slots.
- Placeholders toggle affects all placeholder elements consistently.

## Slot Role Logic
- Slot .1 (e.g., 1.1.1*) is always the Room Lead/Charge and is marked with * in the placeholder scheme.
- This is a logical rule only; no extra text is rendered in the UI.

## Archived Placeholder Text
- Removed from the live template, but retained for future reuse:
  - "(Title): (FIRST INITIAL) (SURNAME) (SHIFT PATTERN)"
