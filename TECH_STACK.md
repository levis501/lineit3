# TECH_STACK

Focused tech-stack for the Web-first MVP (extracted from `DEVELOPMENT_PLAN.md`).

---

## Core (MVP) ⚙️
- Frontend: **React + TypeScript** (component-driven, strong typing)
- Bundler / dev server: **Vite** (fast HMR and small build times)
- Image processing: **opencv-wasm** (OpenCV.js / WASM build) — runs in-browser
- Rendering: **HTML5 Canvas** (primary) — optionally WebGL for GPU effects
- Concurrency: **Web Workers** (process images off-main-thread, use ImageBitmap / OffscreenCanvas)
- UI styling: **Tailwind CSS** (fast utility-based styling)
- State: **Zustand** (lightweight) or **Redux Toolkit** (if app grows)

## Tooling & infra 🔧
- Type checking: **TypeScript**
- Lint & format: **ESLint** + **Prettier**
- Unit tests: **Vitest**
- E2E / visual tests: **Playwright**
- CI/CD: **GitHub Actions** → deploy to **Vercel** (or Netlify)
- Performance: lazy-load WASM, cache assets (CDN), downscale previews for responsiveness

## Optional / future platforms 📦
- Desktop shell: **Tauri** (preferred) or **Electron** (reuse web UI, swap to native OpenCV if needed)
- Native image processing: native OpenCV bindings (Rust / Node) for heavy workloads
- Mobile: **Flutter** or **React Native** with native OpenCV modules (post-MVP)

## Minimal MVP tech checklist ✅
- `React + TypeScript + Vite`
- `opencv-wasm` loaded inside a **Web Worker**
- `Canvas` preview using `ImageBitmap` / `OffscreenCanvas` where available
- `Tailwind CSS` for UI
- `GitHub Actions` + deploy to `Vercel`

## Trade-offs / notes ⚠️
- WASM bundle size → mitigate with lazy-loading and CDN hosting.
- Browser memory limits for large images → preview downscaling and full-res export option.
- Processing stays local by default (privacy-friendly); server-side processing only if explicitly added.

---

Next step: confirm this stack or request changes; I can scaffold the Web-MVP (`Vite + React + opencv-wasm`) on request.