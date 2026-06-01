# WebAgency Templates (gtrails)

This project is a Next.js application designed to generate static, tailored websites (templates) for interior design studios and related businesses based on automated intelligence, scraping workflows, and robust data management.

## 🏗 System Architecture & How It Works

The architecture of this application is highly modular, functioning as a full end-to-end pipeline: it accepts a Google Maps URL, scrapes the profile in real-time, ingests the data into a distributed Appwrite backend, allows deep administrative editing, generates dynamic previews, and finally builds independent, static, cache-rewritten HTML sites deployed onto an Appwrite CDN.

Here is a deep and detailed breakdown of each architectural layer diagnosing the entire system workflow.

### 1. The Scraping Layer (Intake & Playwright)
The scraping logic is internalized within the repository using **Playwright** via Chrome/Chromium (`lib/scraper.ts`), fully initiated through the `/api/intake` endpoint.
*   **Execution:** A request containing a `gbpUrl` (Google Business Profile URL) initiates a Playwright session. 
*   **Data Extraction:** The browser parses through the DOM to retrieve the business name, address, phone number, star rating, and exact text from customer reviews.
*   **Intelligent Image Resolution & Lazy Evaluation:** The scraper features a remarkably sophisticated sub-system for images. It triggers page scrolls, manipulates DOM container `scrollTop` positions to bypass Google's lazy load, and reads `src`, `srcset`, and `style` props. It includes intelligent regex-driven link cleaning (`decodeRepeated`, `extractEmbeddedGooglePhotoUrl`) that intentionally *promotes* small thumbnail resolutions (`w24-h24`) into high-resolution native Google photo images (`=w2048-h1536`) to guarantee sharp layouts across templates.
*   **Handling State:** When scraped, images are passed to a local `ProcessAndSaveImage` mechanism which partitions images categorically (`clinicImages`, `treatmentImages`, `otherImages`) bounding up to 150 entries to safeguard upload limits.

### 2. The Data Store Layer (Appwrite)
The data store has transitioned deeply from Supabase (now deprecated/disabled) to **Appwrite** mapping to the `scraped_data` collection within the `gtrails` project.
*   **Central Truth Source:** All JSON permutations, client contacts, ratings, review lists, and dynamic overrides rest in the `scraped_data` Appwrite collection. Appwrite serves as the single source of truth for the entire application.
*   **Idempotent Writes:** Handled intensely inside `lib/dataBuilder.ts`, scraping formats the payload securely into Appwrite. It hashes the client slug (`MD5` or raw text) for deterministic Appwrite Document IDs. If a document collision (`409` conflict) occurs, it automatically patches via `updateDocument`. 
*   **Ephemeral Runtime Cache:** While the repository itself contains no `data/` folder, the Next.js runtime dynamically generates a local, git-ignored `data/[slug]/source.json` cache on the server disk during execution. This provides temporary fallback stability to prevent build-time crashes if Appwrite experiences network faults, though the primary synchronization always mandates `databases.updateDocument`.

### 3. The Editing Layer (Administrative Modifications)
A gigantic administrative surface handles data sanitization and granular adjustments located at `/app/private/admin/edit/[slug]/page.tsx`.
*   **Visual Control System:** This is a heavy Next.js frontend route supplying full CRUD visual tools for the JSON model. Site owners can correct OCR errors, modify reviews, change "doctor" or studio leadership team details, configure template overrides, and swap images.
*   **API Broker (`/api/data`):** The client state performs massive REST requests to `app/api/data/route.ts` bridging `PUT` requests back to the local `data/[slug]/source.json` and universally patching the `source_data` field within Appwrite's NoSQL system.
*   **Scrubbing Integration:** Because scraping is imperfect, this layer ensures the agency can adjust the narrative and remove noise (like unrelated map images mistakenly caught by the scraper).

### 4. The Previews Layer
Served under `/app/preview/[slug]/page.tsx`, this route offers administrators a live look at their configurations against the actual website frameworks before rendering hard HTML.
*   **Layout Swapping:** The previews page lists arrays of active UI frameworks (e.g., *Modern Studio*, *Luxe Interiors*, *Neo-Brutalist*, etc.). Instead of generating raw HTML initially, administrators use the Next.js interactive environment to inject the JSON configurations deep into identical React trees.
*   **State Injection:** Previews load data by pinging `/api/data`, locking in the schema, and supplying a realistic window of exactly what the Next.js `app/designwebsite/` pages will compute over build-time.
*   **Actionable Hand-Off:** Contains the mission-critical **"Publish"** trigger, dispatching selected `templateId` arrays payload to `/api/publish`.

### 5. The Build & Deployment Layer
Instead of utilizing standard Node.js server architectures, the system produces heavily processed static sites, ensuring instantaneous performance, no operational computing cost, and platform agnosticism.
*   **Publish Trigger:** `app/api/publish/route.ts` is called, registering the final `selected_template` back to Appwrite, and triggering a custom local build compiler dynamically (`lib/websiteBuild.ts`).
*   **Next.js Pre-rendering:** Under the hood, Next spins up and compiles static `.html` and `_next` chunks specifically mapping to `app/designwebsite/[templateId]/[slug]`.
*   **Path Destructuring & Rewrites (`scripts/deploy_build.js`):** Next.js assumes it is rendering from the root (`/_next/...`). `deploy_build.js` rips the raw Next.js output files, restructures directories locally (placing them inside `data/[slug]/website/`), and runs extensive RegEx patterns replacing strictly absolute pathways into completely relative file targets. APIs calls mapped to image processors are intercepted and translated to localized `/images/` pathways.
*   **Appwrite CDN Sync:** Immediately following HTML modification, the script uses FormData and HTTP streams inside Node to upload all HTML, CSS, script bundles, and imagery directly into Appwrite's storage buckets (`templates/files`), making the fully decoupled client site live to the cloud.

---

## 📂 Key Directories

*   **`/app/api/intake`**: API route orchestrating the complete Playwright scraping pipeline. 
*   **`/app/designwebsite/template[1-10]`**: React component codesets responsible for each unique client template. 
*   **`/app/private/admin/edit/[slug]`**: The editing layer environment. 
*   **`/app/preview/[slug]`**: The dynamic layout selection dashboard.
*   **`/lib/scraper.ts`**: Deep DOM traversal logic for discovering and promoting internal Google Maps imagery.
*   **`/lib/dataBuilder.ts`**: Multi-tiered database synchronization schema wrapping both JSON on disk and Appwrite's `scraped_data` documents.
*   **`/scripts/deploy_build.js`**: Critical regex HTML-interceptor mapping App Router payloads to universally portable static sites.

## 🚀 Available Scripts

*   `npm run dev`: Bootstraps the local admin portal on `localhost:3000`.
*   `npm run build:deploy`: Full workspace compilation mapping directly to the `deploy_build.js` standalone export protocols. 
