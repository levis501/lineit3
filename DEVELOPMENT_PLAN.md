# DEVELOPMENT_PLAN — Web-first (React + WASM) MVP

**Target:** build the Web-first MVP for LineIt3 (see `README.md`) using React + TypeScript + opencv-wasm, Canvas rendering and Web Workers.

---

## Summary
- Primary goal: a fast, interactive browser app that transforms photos into coloring-book-style line drawings with real-time parameter control and side-by-side comparison.
- Recommended stack: **React + TypeScript + Vite**, **OpenCV.js / opencv-wasm** for image processing, **Canvas** (or WebGL) for rendering, **Web Workers** for concurrency, **Tailwind CSS** for UI.

---

## Success criteria (MVP acceptance)
- Users can upload an image and see a processed line-drawing preview within ~1–3s for typical photos.
- At least three algorithms implemented: **Canny**, **Sobel**, **Laplacian**.
- Real-time parameter controls with immediate preview updates (using Web Workers).
- Side-by-side original vs processed view and ability to export result as PNG.
- Deployed preview available at a public URL (Vercel or similar).

---

## MVP feature set (must-haves)
- Image upload (file + drag & drop)
- Processing pipeline with worker + opencv-wasm
- UI: controls panel (thresholds, blur, thickness, contrast)
- Algorithms: Canny, Sobel, Laplacian (+ simple threshold method)
- Side-by-side comparison, zoom/pan, reset presets
- Export to PNG (transparent background option)
- Basic responsive layout and keyboard accessibility

---

## Architecture & data flow
- Single-page React app.
- Heavy image processing runs in a dedicated Web Worker that loads opencv-wasm.
- Main thread handles UI, Canvas rendering, and user events.

Data flow (high-level):
App UI -> set params -> postMessage(params + image) -> Worker runs OpenCV pipeline -> posts processed ImageBitmap -> Main thread draws to Canvas

---

## Key components
- `ImageUploader` — accept files / drag-drop
- `ControlsPanel` — parameter sliders + presets
- `ProcessingWorker` — opencv-wasm + algorithm implementations
- `CanvasPreview` — renders ImageBitmap + overlays
- `ExportButton` — save PNG/SVG
- `State` — small global store (Zustand or React context)

---

## Suggested project structure

```
src/
├─ main.tsx
├─ App.tsx
├─ components/
│  ├─ ImageUploader.tsx
│  ├─ CanvasPreview.tsx
│  ├─ ControlsPanel.tsx
│  ├─ PresetSelector.tsx
│  └─ ExportButton.tsx
├─ workers/
│  └─ imageProcessor.worker.ts
├─ libs/
│  ├─ opencv-loader.ts
│  └─ algorithms/
│     ├─ canny.ts
│     ├─ sobel.ts
│     └─ laplacian.ts
├─ hooks/
├─ styles/
└─ tests/
```

---

## Dev tools & dependencies (recommended)
- Build: Vite + React + TypeScript
- Image processing: OpenCV.js / opencv-wasm (WASM build)
- UI: Tailwind CSS (or Chakra UI)
- State: Zustand (lightweight) or Redux Toolkit
- Tests: Vitest (unit) + Playwright (E2E/visual)
- CI/CD: GitHub Actions → deploy to Vercel
- Linting / formatting: ESLint + Prettier

---

## Sprint plan & estimates (solo dev / small team)
- Total MVP estimate: **2–4 weeks** (solo) or **1–2 sprints (2–3 weeks)** for a small team.

1) Sprint 0 — Setup & scaffolding (1–2 days)
   - Create Vite + React TypeScript app
   - Install Tailwind, configure ESLint/Prettier
   - Add GitHub Actions skeleton (build + tests)
   - Deliverable: working dev server, CI passes
   - Acceptance: `npm run dev` + `npm run build` succeed

2) Sprint 1 — Core pipeline & UI (1–2 weeks)
   - Integrate opencv-wasm inside a Web Worker
   - Implement `ImageUploader` + `CanvasPreview`
   - Implement Canny and one more algorithm (Sobel)
   - Add basic controls (thresholds, blur)
   - Deliverable: upload → process → preview
   - Acceptance: real-time preview with worker offloading

3) Sprint 2 — Features & export (3–6 days)
   - Add Laplacian + threshold method
   - Export to PNG, presets, undo/reset
   - Responsive layout and accessibility fixes
   - Deliverable: full MVP feature parity
   - Acceptance: user can export a PNG with chosen settings

4) Sprint 3 — Polish, tests, deploy (3–6 days)
   - Add unit tests + Playwright E2E tests
   - Performance tuning (image downscale, worker pool)
   - Deploy to Vercel; add README + docs
   - Deliverable: public demo URL + test suite
   - Acceptance: CI green, deployed URL functional

Optional — Desktop wrapper (Tauri): 1 week (after web MVP)

---

## Task breakdown (example - Sprint 1)
- Load WASM in Worker (1d)
- Implement Canny in worker and return ImageBitmap (1d)
- UI: file upload + preview canvas (1d)
- Controls + parameter sync to worker (1d)
- Basic presets + persistence (localStorage) (0.5d)

---

## Testing strategy
- Unit: algorithm helper functions (Vitest)
- Integration: worker message/response tests (mocked) and Canvas output snapshot
- E2E: upload → apply filter → export (Playwright)
- Optional visual regression snapshots for UI and generated images

---

## CI / CD
- GitHub Actions workflows:
  - push → run lint + unit tests + build
  - pull-request → run E2E in PR preview
  - main → deploy to Vercel

---

## Performance & scalability notes
- Use Web Workers to keep UI responsive.
- Lazy-load opencv-wasm and cache the WASM file.
- Use ImageBitmap and OffscreenCanvas where supported.
- Downscale large images for preview; provide full-resolution export.

---

## Privacy, security & compliance
- Process images locally in the browser by default (no server uploads).
- If adding cloud export/storage later, make it opt-in and secure (signed uploads, user consent).

---

## Risks & mitigations
- WASM bundle size → mitigation: lazy-load, CDN, smaller custom OpenCV builds
- Large images causing OOM → mitigation: cap upload size, progressive downscaling
- Browser incompatibilities → mitigation: feature detection + graceful fallback

---

## Deliverables
- Source code (React + TypeScript)
- Demo deployment (Vercel) and README with usage
- Unit and E2E test suites
- Developer docs and a changelog entry for the MVP

---

## Acceptance checklist (MVP)
- [ ] Upload + process + preview (Canny, Sobel, Laplacian)
- [ ] Real-time controls with <300–2000ms update for medium images
- [ ] Export PNG
- [ ] CI green and deployed demo

---

## Next steps
1. Confirm `web` as primary target (recommended).  
2. I can scaffold the project (Vite + React + opencv-wasm + sample worker + minimal UI) — say "scaffold" to start.  
3. Assign priorities or modify the sprint estimates if you have constraints.

---

*Prepared for the Web-first MVP — let me know if you want me to scaffold the repo or adjust timelines/priorities.*