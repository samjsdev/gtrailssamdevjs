# GTrails Template Integration Guidelines

This document details the contract and rules that all website templates under `app/designwebsite/` must follow. By adhering to these guidelines, templates will render beautifully and allow the automated Playwright-based scraper (`scripts/generate_template_schemas.js`) to generate correct, complete Editor UI schemas automatically.

---

## 1. Dynamic Data Contract

Templates **must never** hardcode client-specific copy or images. Every editable asset on the page must be wired to the JSON configuration returned by `readSourceConfig(slug, templateId)`.

### Core Data Schema Paths

Below are the mapped fields from the client profile JSON schema (`source.json`):

| Type | Path | Description | Recommended Label |
| :--- | :--- | :--- | :--- |
| **Text** | `['clinic', 'name']` | Studio or clinic's business name | Studio Name |
| **Text** | `['clinic', 'tagline']` | Catchy headline / tagline for Hero | Hero Tagline |
| **Textarea** | `['clinic', 'description']` | Long paragraph introducing the business | Studio Description |
| **Text** | `['clinic', 'contact', 'phone']` | Primary phone number | Contact Phone Number |
| **Text** | `['clinic', 'address', 'full']` | Complete business address | Full Address location |
| **Text** | `['doctor', 'name']` | Principal designer or lead team name | Principal Designer Name |
| **Text** | `['doctor', 'experience']` | Experience details (e.g., "5+ years") | Designer Experience Details |
| **Text** | `['doctor', 'specialization']` | Specialization details | Specialization Details |
| **List** | `['business', 'services']` | Array of services offered by the business | Services List (1 per line) |
| **List** | `['business', 'highlights']` | Bullet points / highlights | Highlights List (1 per line) |

---

## 2. Image Integration Contract

Client images are uploaded to Supabase storage and provided in the config under the `media` object as arrays of URLs:
- `media.clinicImages`: General studio, gallery, and banner photos.
- `media.treatmentImages` / `media.projectImages`: Pictures of completed projects, rooms, or treatments.
- `media.otherImages`: Team portraits, close-up details, or utility graphics.

### The Fallback Pattern
Clients might not upload enough images to cover every image slot in a template. To keep templates visual and complete at all times, **always use the fallback pattern with a high-quality Unsplash stock image**:

```tsx
// Correct dynamic rendering with Unsplash fallback
<img
  src={media.clinicImages?.[0] || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"}
  alt="Studio Main Lobby"
  className="..."
/>
```

### Preferred Scraper Image Map Coordinates
The automated generator maps image elements based on their resolved filenames. To keep editor schemas consistent across templates, align your indices with these guidelines:

* **Hero Banner / Main Image**: `media.clinicImages?.[0]`
* **Clinic / Studio Secondary Image**: `media.clinicImages?.[1]`
* **Principal Designer Portrait**: `media.otherImages?.[0]`
* **Associate / Secondary Portrait**: `media.otherImages?.[1]`
* **Philosophy / Feature Details**: `media.otherImages?.[2]` through `media.otherImages?.[5]`
* **Services / Project Grid**: `media.treatmentImages?.[0]` onwards, or maps from `media.otherImages` indices `6` to `13`

---

## 3. HTML Layout & Sectioning Rules

The Editor UI is grouped by page sections (e.g., "Hero Section", "Services Section"). The Playwright scraper slices the DOM by finding `<section>` elements.

### Rules for `<section>` Elements:

1. **Wrap all editable blocks in `<section>` tags**:
   Any component, grid, or text block that contains client data or images **must** be inside a `<section>` tag. If elements exist in a sibling `div` outside of a `<section>` tag, they will be **completely ignored** by the scraper if other sections exist on the page.
   
   *Example (Sparse Gallery Page Issue Fixed)*:
   ```tsx
   // INACCURATE: Scraper misses the grid because it is outside <section>
   <section>Hero Banner Header</section>
   <div className="grid">
     <GalleryGrid items={PORTFOLIO} />
   </div>
   
   // ACCURATE: Scraper will identify and map images inside the grid
   <section>Hero Banner Header</section>
   <section id="gallery-grid">
     <GalleryGrid items={PORTFOLIO} />
   </section>
   ```

2. **Give sections semantic headings or IDs**:
   To help the scraper generate aesthetic labels for sections, either add an `id` or ensure the section contains a heading tag (`h1` - `h4`).
   
   ```tsx
   <section id="services" className="...">
     <h2>Our Design Services</h2>
     ...
   </section>
   ```

3. **Avoid Duplicating Elements Across Sections**:
   Avoid displaying the exact same data field (e.g., phone number or address) inside multiple sections on the same page, as the scraper dedupes page elements and will associate the path with the first section it encounters.

---

## 4. Scraper Working Principle

The schema generator (`scripts/generate_template_schemas.js`) works as follows:
1. Loads baseline mock data from `data/navaneeth-interiors/source.json`.
2. Builds dictionaries of normalized values (case-collapsed, alphanumeric-only) for text items and file name maps for images.
3. Launches a headless Chrome browser via Playwright and crawls pages (`/about`, `/services`, etc.) on `localhost:3000`.
4. Sections the rendered pages by querying `<section>`.
5. Scans each section's DOM nodes:
   - Matches rendered text values back to JSON paths.
   - Extract image source URLs, isolates the filename, and matches it against database URLs in `media`.
6. Compiles the matches and outputs typesafe configurations directly to `app/private/admin/edit/[slug]/schemas.ts`.

If a template uses hardcoded Unsplash images or placeholder strings, the scraper will fail to map them, resulting in empty or incomplete Editor UIs.
