# TECH_STACK_OPTIONS

Purpose: present viable technology-stack options to build LineIt3 (see `README.md`) and recommend a practical MVP approach.

---

## Option A — Web-first (recommended for MVP) ✅

- When to choose: fastest way to reach users, easy sharing, good for demos and iterative UX tuning.
- Core stack:
  - Frontend: React + TypeScript + Vite
  - Image processing: OpenCV.js / opencv-wasm (or Rust → WASM for heavy compute)
  - Rendering: HTML5 Canvas or WebGL (for GPU-accelerated effects)
  - Concurrency: Web Workers for heavy processing
  - UI: Tailwind CSS or Chakra UI; state: Zustand or Redux Toolkit
  - Deploy: Vercel / Netlify; CI: GitHub Actions
- Pros:
  - Cross-platform (browser) with no install; fast iteration; good developer ecosystem
  - Excellent UX for real-time parameter tuning using Canvas + Web Workers
- Cons:
  - Browser memory limits and startup cost for large WASM bundles
  - Limited native file/printing APIs compared to desktop
- Effort estimate: MVP in ~2–6 weeks

## Option B — Desktop native shell (Tauri recommended; Electron alternative) 🔧

- When to choose: need native filesystem access, large-image processing, offline use, or advanced export features.
- Core stack:
  - Frontend: React + TypeScript
  - Shell: Tauri (Rust) — lighter bundles; or Electron for mature ecosystem
  - Image processing: native OpenCV bindings (Rust or Node native) or reuse WASM
  - Packaging: Tauri bundler / Electron packagers
- Pros:
  - Native performance and direct access to filesystem, printers, GPU (optional)
  - Smaller runtime with Tauri; full control over native capabilities
- Cons:
  - More packaging and cross-platform release work
  - Bigger install size (Electron) or extra native build complexity
- Effort estimate: MVP in ~3–8 weeks

## Option C — Python desktop / research prototype 🧪

- When to choose: rapid algorithm experimentation, research, teaching, or CLI tooling.
- Core stack:
  - UI: PyQt / PySide, or Streamlit for quick web-like UI
  - Image processing: OpenCV (opencv-python) + NumPy
  - Distribution: PyInstaller / conda
- Pros:
  - Fast to prototype algorithms and iterate on detection parameters
  - Direct access to full OpenCV feature set and scientific libraries
- Cons:
  - Desktop-only; heavier installs; UI polish slower than web-native frameworks
- Effort estimate: prototype in 1–3 weeks

## Option D — Mobile-focused (optional) 📱

- When to choose: mobile capture + on-device processing is a primary goal.
- Core stack: Flutter or React Native + native OpenCV modules (or WASM where supported).
- Tradeoffs: higher integration complexity; consider after validating core UX on web/desktop.

---

## Recommendation (short) 🎯

Start Web-first: **React + TypeScript + opencv-wasm + Canvas + Web Workers**. This delivers the fastest path to an interactive, shareable MVP with real-time parameter tuning. If you later need native performance or richer file/export features, add a Tauri desktop build that reuses the web UI and swaps to native OpenCV where necessary.

## Minimal MVP tech checklist

- React + TypeScript + Vite
- opencv-wasm (or OpenCV.js) executed inside Web Workers
- Canvas for rendering + side-by-side comparison UI
- Tailwind CSS for fast UI
- Vercel deployment + GitHub Actions CI

## Next steps
1. Choose primary target: `web` (recommended) or `desktop`.
2. I can scaffold the chosen stack (example: React + Vite + opencv-wasm starter).
3. Implement core flow: upload → preprocess → detect → preview/export.

---

If you want, I can scaffold the recommended Web-MVP now (project skeleton, sample processing pipeline, and a demo image).