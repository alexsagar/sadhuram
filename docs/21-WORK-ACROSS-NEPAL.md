# 21. HOMEPAGE SECTION 05 — WORK ACROSS NEPAL

> **STATUS**: IMPLEMENTED
> **Route**: `/` (production)
> **Component**: `components/sections/work-across-nepal.tsx`
> **Anchors**: `#work-across-nepal`
> **Decisions**: `D-055`

---

## 1. Purpose
Section 05 answers the geographic question: *Where has Er. Sadhuram Lamichhane worked?* It presents an authentic geographic visualization connecting 14 verified project and field locations across all 7 provinces of Nepal.

## 2. Geographic Data Source & Accuracy
- **Nepal Administrative Boundaries**: Extracted and simplified from official Nepal Survey Department / Natural Earth administrative boundaries (EPSG:4326 WGS84).
- **Lightweight Implementation**: Vector SVG geometry generated via `scripts/process_nepal_map.py` (52 KB JSON in `lib/nepal-map-data.ts`).
- **Verified Locations**:
  - *Sudurpashchim*: Purchaudi (Baitadi), Gaumul (Bajura)
  - *Karnali*: Patarasi (Jumla), Phukot Karnali (Kalikot)
  - *Gandaki*: Manang & Chame (Manang), Gharapjhong (Mustang), Pokhara Valley (Kaski), Ghyampesal–Baarpaak (Gorkha)
  - *Bagmati*: Kathmandu / Lalitpur, Kavrepalanchok Middle Hills
  - *Lumbini*: Narayanghat–Mugling / Chitwan
  - *Koshi*: Dudhkoshi Reservoir Rim (Khotang/Solukhumbu), Inaruwa (Sunsari)
  - *Madhesh*: Surunga (Saptari)

## 3. Desktop & Mobile Interaction
- **Desktop (>= 1024px)**: Asymmetrical layout with sticky Nepal vector map on the left and a scrolling interactive location roster on the right. Selecting any location from the roster highlights the corresponding pinpoint and displays factual metadata.
- **Mobile (< 1024px)**: The map is static at the top of the section with the roster stacked beneath, avoiding scroll traps on mobile viewports.
